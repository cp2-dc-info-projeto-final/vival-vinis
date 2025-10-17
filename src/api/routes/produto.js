var express = require('express');
var router = express.Router();
const pool = require('../db/config');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // pasta onde será salvo
  },
  filename: function (req, file, cb) {
    // Renomear o arquivo para evitar duplicações, usando timestamp + nome original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filtro para aceitar só imagens
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Apenas arquivos de imagem são permitidos'));
}

const upload = multer({ storage, fileFilter });




/* GET - Buscar todos os produtos */
// requer usuário autenticado como admin
router.get('/', verifyToken, isAdmin, async function(req, res) {
  try {
    const result = await pool.query('SELECT id, nome, descricao, preco, estoque FROM produto ORDER BY id');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET parametrizado - Buscar usuário autenticado */
router.get('/me', verifyToken, async function(req, res) {
  try {
    // parâmetro obtido do token pelo middleware
    const id = req.user.id;
    const result = await pool.query('SELECT id, nome, descricao, preco, estoque  FROM produto WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET parametrizado - Buscar usuário por ID */
router.get('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, nome, descricao, preco, estoque FROM produto WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message:'Produto não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST - Criar novo produto */
router.post('/', verifyToken, isAdmin, upload.single('imagem'), async function(req, res) {
  try {
    const { nome, descricao, preco, estoque } = req.body;

    if (!nome || !descricao || preco == null || estoque == null) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Verificar se já existe o nome
    const existingAlbum = await pool.query('SELECT id FROM produto WHERE nome = $1', [nome]);
    if (existingAlbum.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Esse nome de álbum já existe'
      });
    }

    // A imagem fica disponível em req.file
    let imagemPath = null;
    if (req.file) {
      imagemPath = req.file.path;  // caminho onde foi salvo o arquivo
    }

    const result = await pool.query(
      'INSERT INTO produto (nome, descricao, preco, estoque, imagem) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, descricao, preco, estoque, imagemPath]
    );

    res.status(201).json({
      success: true,
      message: 'Álbum criado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao criar álbum:', error);
    if (error.code === '23514') {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos. Verifique os campos e tente novamente.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* PUT - Atualizar usuário */
router.put('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;

    if (!nome || !descricao || preco == null || estoque == null) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    const produtoExists = await pool.query('SELECT id FROM produto WHERE id = $1', [id]);
    if (produtoExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }

    const query = 'UPDATE produto SET nome = $1, descricao = $2, preco = $3, estoque = $4 WHERE id = $5 RETURNING id, nome, descricao, preco, estoque';
    const params = [nome, descricao, preco, estoque, id];

    const result = await pool.query(query, params);

    res.json({
      success: true,
      message: 'Produto atualizado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});
/* DELETE - Remover usuário */
router.delete('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    
    // Verificar se o usuário existe
    const userExists = await pool.query('SELECT id FROM produto WHERE id = $1', [id]);
    if (userExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }
    
    await pool.query('DELETE FROM produto WHERE id = $1', [id]);
    
    res.json({
      success: true,
      message: 'Produto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;