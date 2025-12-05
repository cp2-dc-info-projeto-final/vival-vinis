var express = require('express');
var router = express.Router();
const pool = require('../db/config');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Configuração do Multer para upload de imagens
  const uploadsDir = path.join(__dirname, '../uploads');

  // Garante que a pasta uploads existe
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'produto-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);

      if (mimetype && extname) {
        cb(null, true);
      } else {
        cb(new Error('Apenas imagens são permitidas (JPEG, PNG, GIF, WebP)'));
      }
    }
  });




/* GET - Buscar todos os produtos */
// requer usuário autenticado como admin (na verdade, Judis alrterou para permitir apenas os produtos serem visualizados; checamos o admin em frontend)
router.get('/', verifyToken, isAdmin, async function(req, res) {
  try {
    const result = await pool.query('SELECT id, nome, descricao, preco, estoque, imagem FROM produto ORDER BY id');
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

/* GET parametrizado - Buscar produto autenticado */
router.get('/me', verifyToken, async function(req, res, ) {
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

/* GET parametrizado - Buscar produto por nome */
router.get('/nome/:nome', async function(req, res, next) {
  try {
    const { nome } = req.params;
    const result = await pool.query('SELECT * FROM produto WHERE nome LIKE $1', ['%'+nome+'%']);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.rows
   });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST - Criar novo produto */
router.post('/', verifyToken, isAdmin, upload.single('imagem'), async function(req, res) {
  try {
    const { nome, descricao, preco, estoque, imagem } = req.body;

    if (req.file) {
      imagemPath = `/uploads/${req.file.filename}`;
      console.log(imagemPath);
    }
    else{
      console.log("sem imagem");
      imagemPath = ""
    }

    console.log('imagem abaixo');
    console.log(imagem);

    if (!nome || !descricao || preco == null || estoque == null) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
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
router.put('/:id', verifyToken, isAdmin,  upload.single('imagem'), async function(req, res) {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, imagem} = req.body;

    console.log("Aqui: ", req.body);

    if (req.file) {
      imagemPath = `/uploads/${req.file.filename}`;
      console.log(imagemPath);
    }
    else{
      console.log("sem imagem");
      imagemPath = "";
    }

    if (!nome || !descricao || preco == null || estoque == null) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    const produtoExists = await pool.query('SELECT id, imagem FROM produto WHERE id = $1', [id]);
    if (produtoExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }

    const caminhoImagemAntiga = path.join(__dirname, '..'+ produtoExists.rows[0].imagem);
    console.log(caminhoImagemAntiga);
    

    const query = 'UPDATE produto SET nome = $1, descricao = $2, preco = $3, estoque = $4, imagem = $5 WHERE id = $6 RETURNING id, nome, descricao, preco, estoque, imagem';
    const params = [nome, descricao, preco, estoque, (imagemPath != "" ? imagemPath : caminhoImagemAntiga), id];
// erro ao apagar imagem antiga e deixar a imagem anterior
    const result = await pool.query(query, params);

    if(imagemPath != "") fs.unlinkSync(caminhoImagemAntiga);

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