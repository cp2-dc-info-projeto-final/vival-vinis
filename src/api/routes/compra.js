var express = require('express');
var router = express.Router();
const pool = require('../db/config');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


/* GET - Buscar todos as compras */
// requer usuário autenticado como admin (na verdade, Judis alterou para permitir apenas os produtos serem visualizados; checamos o admin em frontend)
router.get('/', verifyToken, isAdmin, async function(req, res) {
  try {
    const result = await pool.query('SELECT id, usuario_id, endereco, total, status, data_pedido, atualizado_em FROM compras ORDER BY id');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar compras:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST - Criar novo compra */
router.post('/', verifyToken, isAdmin, async function(req, res) {
  try {
    const { usuario_id, endereco, total, status, data_pedido, atualizado_em } = req.body;

    if (!endereco) {
      return res.status(400).json({
        success: false,
        message: 'Preencha o campo do endereço'
      });
    }
  
    const result = await pool.query(
      'INSERT INTO compras (usuario_id, endereco, total, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, endereco, total, status]
    );

    res.status(201).json({
      success: true,
      message: 'Compra feita com sucesso!',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao finalizar compra:', error);
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

module.exports = router;