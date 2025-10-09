 
DROP TABLE IF EXISTS produto;

CREATE TABLE produto (
    id bigint GENERATED ALWAYS AS IDENTITY,
    nome text NOT NULL,
    descricao text,
    preco numeric(10,2) NOT NULL,
    estoque integer NOT NULL DEFAULT 0,
   

    CONSTRAINT pk_produto PRIMARY KEY (id),
    CONSTRAINT uk_produto_nome UNIQUE (nome),
    CONSTRAINT ck_produto_nome_length CHECK (length(nome) >= 3 AND length(nome) <= 100),
    CONSTRAINT ck_produto_preco_positive CHECK (preco >= 0),
    CONSTRAINT ck_produto_estoque_non_negative CHECK (estoque >= 0)
);