DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id bigint GENERATED ALWAYS AS IDENTITY,
    login text NOT NULL,
    email text NOT NULL, 
    senha text NOT NULL
);

INSERT INTO usuario (login, email, senha) VALUES
('hermenegildo', 'hermenegildo@email.com', 'hmgd1234'),
('zoroastra', 'zoroastra@email.com', 'senha1234');
