CREATE DATABASE dbgear;
USE dbgear;

/*
	Ordem das tabelas:
    Usuario
		-poster
			--curtida
            --comentario
		-acesso
*/

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

CREATE TABLE poster(
	idPoster INT,
    fkCriador INT,
    poster VARCHAR(255),
    legenda VARCHAR(300),
    formato VARCHAR(45),
    tipo VARCHAR(45),
    dtHora DATETIME,
    CONSTRAINT pkPoster
		PRIMARY KEY(idPoster, fkCriador),
	CONSTRAINT fkCriadorPoster
		FOREIGN KEY (fkCriador) REFERENCES usuario(idUsuario)
);

CREATE TABLE curtida(
	fkPoster INT,
    fkCriador INT,
    fkUsuario INT,
    statusCurtida TINYINT,
    CONSTRAINT pkCurtida
		PRIMARY KEY (fkPoster, fkCriador, fkUsuario),
	CONSTRAINT fkPosterCurtida 
		FOREIGN KEY (fkPoster) REFERENCES poster(idPoster),
	CONSTRAINT fkCriadorPostCurtida
		FOREIGN KEY (fkCriador) REFERENCES poster(fkCriador),
	CONSTRAINT fkUsuario 
		FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
	CONSTRAINT chkStatusCurtida	
		CHECK(statusCurtida IN (0,1))
);

CREATE TABLE comentario(
	idComentario INT,
	fkPoster INT,
    fkCriador INT,
    fkUsuario INT,
	CONSTRAINT pkComentario
		PRIMARY KEY (idComentario, fkPoster, fkCriador, fkUsuario),
	CONSTRAINT fkPosterComentario
		FOREIGN KEY (fkPoster) REFERENCES poster(idPoster),
	CONSTRAINT fkCriadorPostComentario
		FOREIGN KEY (fkCriador) REFERENCES poster(fkCriador),
    CONSTRAINT fkUsuarioComentario
		FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE acesso(
	idAcesso INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    dtAcesso DATETIME,
    CONSTRAINT fkUsuarioAcesso
		FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

DESC usuario;
DESC poster;
DESC curtida;
DESC comentario;
DESC acesso;

SELECT * FROM usuario;
SELECT * FROM poster;
SELECT * FROM curtida;
SELECT * FROM comentario;
SELECT * FROM acesso;

SELECT	tipo, 
	COUNT(tipo) AS quantidade FROM poster
	WHERE fkCriador = 1
    GROUP BY tipo;

SELECT idPoster, poster, COUNT(fkPoster) 
	FROM poster p LEFT JOIN curtida c ON p.idPoster = c.fkPoster
	WHERE p.fkCriador = 1 
    GROUP BY idPoster
    order by dtHora DESC;
    
SELECT idPoster, COUNT(idPoster), dtHora from poster
	WHERE dtHora >= date_sub(now(), interval 7 day) AND dtHora <= current_timestamp()
    GROUP BY dtHora;
    
    
SELECT idPoster, COUNT(l.fkPoster), COUNT(c.idComentario) FROM poster p
	LEFT JOIN curtida l ON p.idPoster = l.fkPoster
    LEFT JOIN comentario c ON p.idPoster = c.fkPoster
    GROUP BY idPoster;
    
