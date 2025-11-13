CREATE DATABASE dbgear;
USE dbgear;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(50) UNIQUE,
    tell CHAR(11) UNIQUE,
    nickName VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45),
    dtNasc DATE,
    statusUser TINYINT,
		CONSTRAINT chkStatus CHECK(statusUser IN (1,2)),
	descricao VARCHAR(300),
    imgPerfil VARCHAR(255)
);

SELECT * FROM usuario;