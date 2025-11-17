DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id bigint GENERATED ALWAYS AS IDENTITY,
    login text NOT NULL,
    email text NOT NULL, 
    senha text NOT NULL,
     role text NOT NULL DEFAULT 'user',

     -- Constraints
    CONSTRAINT pk_usuario PRIMARY KEY (id),
    CONSTRAINT uk_usuario_login UNIQUE (login), -- unicidade
    CONSTRAINT uk_usuario_email UNIQUE (email), -- unicidade
    CONSTRAINT ck_usuario_login_length CHECK (length(login) >= 3 AND length(login) <= 50), -- comprimento
    CONSTRAINT ck_usuario_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), -- formato de email com expressão regular
    CONSTRAINT ck_usuario_senha_length CHECK (length(senha) >= 6), -- comprimento mínimo
    CONSTRAINT ck_usuario_role_valid CHECK (role IN ('admin', 'user')) -- tipos de usuário
);

INSERT INTO usuario (login, email, senha, role) VALUES
-- senha efelantinho
('hermenegildo', 'hermenegildo@email.com', '$2a$12$f2c.uHGHS4drfaz6HR870OLamkarD57kI.gkr4//Vbbp0vN9IrFfG', 'admin'),
('zoroastra', 'zoroastra@email.com', '$2a$12$f2c.uHGHS4drfaz6HR870OLamkarD57kI.gkr4//Vbbp0vN9IrFfG', 'user');
 


DROP TABLE IF EXISTS produto;

CREATE TABLE produto (
    id bigint GENERATED ALWAYS AS IDENTITY,
    nome text NOT NULL,
    descricao text,
    preco numeric(10,2),
    estoque integer DEFAULT 0,
    imagem text, -- campo para armazenar o caminho da imagem

    CONSTRAINT pk_produto PRIMARY KEY (id),
    CONSTRAINT uk_produto_nome UNIQUE (nome),
    CONSTRAINT ck_produto_nome_length CHECK (length(nome) >= 3 AND length(nome) <= 100),
    CONSTRAINT ck_produto_preco_positive CHECK (preco >= 0),
    CONSTRAINT ck_produto_estoque_non_negative CHECK (estoque >= 0)
);

 CREATE TABLE carrinho (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  produto_id bigint NOT NULL,
  quantidade INT NOT NULL DEFAULT 1,
 
  CONSTRAINT fk_produto
    FOREIGN KEY(produto_id) REFERENCES produto(id)
    ON DELETE CASCADE
);

CREATE TABLE compras (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id BIGINT NOT NULL,
  endereco TEXT,
  total DECIMAL(10, 2) NOT NULL, 
  status TEXT NOT NULL DEFAULT 'PENDENTE',
  data_pedido TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW(),

  -- chave estrangeira para usuários

  CONSTRAINT fl_pedido_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario(id)
    ON DELETE CASCADE
    );

CREATE TABLE itens_pedidos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    compras_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),

    --chaves estrangeiras

   CONSTRAINT fl_item_pedido
    FOREIGN KEY (compras_id)
    REFERENCES compras(id)
    ON DELETE CASCADE,

   CONSTRAINT fl_item_produto
    FOREIGN KEY (produto_id)
    REFERENCES produto(id)
    ON DELETE CASCADE
    );