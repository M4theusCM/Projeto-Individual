CREATE DATABASE dbgear;
USE dbgear;
-- DROP DATABASE dbgear; -- uso apenas para limpar dados
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
    dtPostagem DATE,
    hrPostagem TIME,
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
/*
CREATE TABLE acesso(
	idAcesso INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    dtAcesso DATETIME,
    CONSTRAINT fkUsuarioAcesso
		FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);
*/
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
    
DESC curtida;
SELECT count(fkPoster) from curtida WHERE fkPoster = 9 AND fkCriador = 1 AND statusCurtida = 1;
SELECT count(fkPoster) from comentario WHERE fkPoster = 9 AND fkCriador = 1;
SELECT * FROM comentario WHERE fkPoster = 3;
UPDATE curtida SET statusCurtida = 1
	WHERE fkPoster = 1 AND fkUsuario = 3;
    
DESC usuario;

SELECT idComentario, comentario AS comentario,
	imgPerfil AS Imgusuario,
    nickName AS nomeUsuario
	FROM comentario 
    JOIN usuario ON idUsuario = fkUsuario
    WHERE fkPoster = 9 AND fkCriador = 1
    ORDER BY idComentario DESC  LIMIT 3;

SELECT * FROM curtida ;

SELECT * FROM comentario WHERE fkPoster = 10;

SELECT * FROM curtida WHERE fkPoster = 8;

Desc curtida;

SELECT idPoster,
        COUNT(c.idComentario) AS qtdComentarios
        FROM poster p
        LEFT JOIN curtida l ON p.idPoster = l.fkPoster AND p.fkCriador = l.fkCriador
        LEFT JOIN comentario c ON p.idPoster = c.fkPoster AND p.fkCriador = c.fkCriador
        WHERE p.fkCriador = 1
        GROUP BY idPoster
        ORDER BY idPoster DESC LIMIT 6;

SELECT idPoster,
	CASE
		WHEN statusCurtida = 0 THEN 0
        ELSE count(fkPoster)
	END AS qtdCurtida
	FROM poster p
    LEFT JOIN curtida l ON p.idPoster = l.fkPoster AND p.fkCriador = l.fkCriador
	GROUP BY idPoster, statusCurtida
    ORDER BY p.idPoster DESC LIMIT 6;


SELECT
	(SELECT COUNT(idPoster) FROM poster WHERE fkCriador = 1) AS totalPoster,
    (SELECT COUNT(fkCriador) FROM curtida WHERE fkCriador = 1 AND statusCurtida = 1) AS totalCurtidas,
    (SELECT COUNT(fkCriador) FROM comentario WHERE fkCriador = 1) AS totalComentarios,
    (SELECT COUNT(fkUsuario) FROM curtida WHERE fkUsuario = 1) AS curtidasEnviadas
    FROM poster WHERE fkCriador = 1
    GROUP BY fkCriador;
    

SELECT * FROM curtida
        WHERE fkPoster = 1 AND fkUsuario = 2 AND statusCurtida = 1;
        
        
SELECT p.idPoster AS idPoster,
	        p.poster AS imgPoster,
            p.legenda AS legendaPoster,
            p.formato AS formatoPoster,
            p.tipo AS tipoPoster,
            CONCAT(p.dtPostagem, ' ', p.hrPostagem) AS dataPostagem,
            p.fkCriador AS criadorPostagem,
            u.nickName AS nickNameCriador,
            u.imgPerfil AS imgCriador,
            COUNT(cur.fkPoster) AS qtdCurtida,
            COUNT(comen.fkPoster) AS qtdComentarios
            FROM poster p
            JOIN usuario u ON u.idUsuario = p.fkCriador
            LEFT JOIN curtida cur ON p.idPoster = cur.fkPoster AND p.fkCriador = cur.fkCriador
            LEFT JOIN comentario comen ON p.idPoster = comen.fkPoster AND p.fkCriador = comen.fkCriador
            WHERE p.tipo = 'filme'
            GROUP BY p.idPoster, p.poster, p.legenda, p.formato, p.tipo, dataPostagem, p.fkCriador, u.nickName, u.imgPerfil
            ORDER BY CONCAT(p.dtPostagem, p.hrPostagem) DESC LIMIT 8;
            
select * from usuario;

SELECT idPoster, 
            COUNT(c.idComentario) AS qtdComentarios
            FROM poster p
            LEFT JOIN curtida l ON p.idPoster = l.fkPoster AND p.fkCriador = l.fkCriador
            LEFT JOIN comentario c ON p.idPoster = c.fkPoster AND p.fkCriador = c.fkCriador
            WHERE p.fkCriador = 9
            GROUP BY idPoster 
            ORDER BY idPoster DESC limit 6;

SELECT idPoster,
            CASE
                WHEN statusCurtida = 0 THEN 0
                ELSE count(fkPoster)
            END AS qtdCurtidas
            FROM poster p
                LEFT JOIN curtida l ON p.idPoster = l.fkPoster AND p.fkCriador = l.fkCriador
                WHERE p.fkCriador = 9
                GROUP BY idPoster, statusCurtida
                ORDER BY p.idPoster DESC LIMIT 6;
                
 SELECT COUNT(idPoster) AS qtdPostagens,
	    dtPostagem AS datasPostagens FROM poster
	    WHERE dtPostagem >= date_sub(now(), interval 7 day) AND dtPostagem <= current_timestamp() AND fkCriador = 1
        GROUP BY dtPostagem LIMIT 7;
        
select * from usuario;
INSERT INTO usuario (nome, email, tell, nickName, senha, dtNasc, descricao, imgPerfil) VALUES
	('GearUp User', 'gearup@gr.com', null, 'GearUP Admin', 'gearup-adm','2006-12-22', 'Conta destinada para os usuarios terem uma boa primeira impressão', 'gearup-perfil.png');

select * from poster;
insert into poster (idPoster, fkCriador, poster, legenda, formato, tipo, dtPostagem, hrPostagem) VALUES
	(1, 1, 'poster-carro.jpg', 'Primeiro poster de carro, edit de mustang', '1', 'carro', curdate(), current_time()),
	(2, 1, 'poster-evento.jpg', 'Evento no MidNigth Club Br tá chegando, se preparem', '1', 'evento', curdate(), current_time()),
	(3, 1, 'poster-jogo.jpg', 'GT, um dos melhores jogos de corrida já criado, recomendo muito', '1', 'filme', curdate(), current_time()),
	(4, 1, 'poster-filme.jpg', 'Começou a chover dentro do capaçete, mas o filme é bom', '1', 'jogo', curdate(), current_time());
    
DESC comentario;
-- insert into comentario (idComentario, fkPosterm fkCriador) VALUES


 SELECT COUNT(fkUsuario) AS statusCurtida FROM curtida
        WHERE fkPoster = 4 AND fkUsuario = 4 AND fkCriador = 1 AND statusCurtida = 1;
select * from curtida;

SELECT
	(SELECT COUNT(idPoster) FROM poster WHERE fkCriador = 4) AS totalPoster,
    (SELECT COUNT(fkCriador) FROM curtida WHERE fkCriador = 4 AND statusCurtida = 1) AS totalCurtidas,
    (SELECT COUNT(fkCriador) FROM comentario WHERE fkCriador = 4) AS totalComentarios,
    (SELECT COUNT(fkUsuario) FROM curtida WHERE fkUsuario = 4 AND statusCurtida = 1) AS curtidasEnviadas
    FROM poster WHERE fkCriador = 4 ;

select * from usuario;
SELECT COUNT(fkUsuario) FROM curtida WHERE fkUsuario = 4 AND statusCurtida = 1
