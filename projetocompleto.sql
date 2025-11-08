DROP DATABASE IF EXISTS super_herois_db;
CREATE DATABASE super_herois_db;
USE super_herois_db;

DROP TABLE IF EXISTS Heroi_Poder;
DROP TABLE IF EXISTS Super_Herois;
DROP TABLE IF EXISTS Poderes;
DROP TABLE IF EXISTS Afiliacoes;

-- equipes/afiliações dos heróis
CREATE TABLE Afiliacoes (
    id_afiliacao INT PRIMARY KEY AUTO_INCREMENT,
    nome_afiliacao VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- super-poderes
CREATE TABLE Poderes (
    id_poder INT PRIMARY KEY AUTO_INCREMENT,
    nome_poder VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

-- Super-Heróis
CREATE TABLE Super_Herois (
    id_heroi INT PRIMARY KEY AUTO_INCREMENT,
    nome_heroi VARCHAR(100) NOT NULL,
    identidade_secreta VARCHAR(100),
    origem VARCHAR(100),
    id_afiliacao INT,
    FOREIGN KEY (id_afiliacao) REFERENCES Afiliacoes(id_afiliacao) -- Chave Estrangeira
);

-- junção para o relacionamento Muitos-para-Muitos entre Heróis e Poderes
CREATE TABLE Heroi_Poder (
    id_heroi_poder INT PRIMARY KEY AUTO_INCREMENT,
    id_heroi INT,
    id_poder INT,
    FOREIGN KEY (id_heroi) REFERENCES Super_Herois(id_heroi),
    FOREIGN KEY (id_poder) REFERENCES Poderes(id_poder)
);

INSERT INTO Afiliacoes (nome_afiliacao, descricao) VALUES
('Vingadores', 'Equipe de heróis mais poderosos da Terra, reunidos para lutar contra ameaças que nenhum herói sozinho conseguiria.'),
('Liga da Justiça', 'Uma equipe de super-heróis que se une para proteger o mundo de ameaças catastróficas.'),
('X-Men', 'Um grupo de mutantes que luta pela paz e igualdade entre humanos e mutantes.'),
('Independente', 'Heróis que geralmente atuam sozinhos ou não possuem uma afiliação fixa.');

INSERT INTO Poderes (nome_poder, descricao) VALUES
('Super Força', 'Capacidade de exercer força física muito além dos limites humanos normais.'),
('Voo', 'Capacidade de se impulsionar pelo ar sem assistência.'),
('Intelecto Genial', 'Inteligência e capacidade de processamento de informações no nível de um gênio.'),
('Regeneração Celular', 'Capacidade de curar ferimentos em um ritmo acelerado.'),
('Disparar Rajadas de Energia', 'Habilidade de projetar energia de partes do corpo.'),
('Telepatia', 'Capacidade de ler, projetar e manipular pensamentos.'),
('Velocidade Sobre-Humana', 'Capacidade de se mover em velocidades muito superiores às de um ser humano.');

INSERT INTO Super_Herois (nome_heroi, identidade_secreta, origem, id_afiliacao) VALUES
('Homem de Ferro', 'Tony Stark', 'Terra', 1), -- id_afiliacao 1 = Vingadores
('Capitão América', 'Steve Rogers', 'Terra', 1),
('Superman', 'Clark Kent', 'Krypton', 2), -- id_afiliacao 2 = Liga da Justiça
('Batman', 'Bruce Wayne', 'Terra', 2),
('Wolverine', 'James "Logan" Howlett', 'Terra (Mutante)', 3), -- id_afiliacao 3 = X-Men
('Professor X', 'Charles Xavier', 'Terra (Mutante)', 3),
('Flash', 'Barry Allen', 'Terra', 2);

-- Homem de Ferro (ID 1): Intelecto Genial (ID 3), Disparar Rajadas de Energia (ID 5), Voo (ID 2)
INSERT INTO Heroi_Poder (id_heroi, id_poder) VALUES (1, 3), (1, 5), (1, 2);

-- Capitão América (ID 2): Super Força (ID 1)
INSERT INTO Heroi_Poder (id_heroi, id_poder) VALUES (2, 1);

-- Superman (ID 3): Super Força (ID 1), Voo (ID 2), Velocidade Sobre-Humana (ID 7)
INSERT INTO Heroi_Poder (id_heroi, id_poder) VALUES (3, 1), (3, 2), (3, 7);

-- Batman (ID 4): Intelecto Genial (ID 3)
INSERT INTO Heroi_Poder (id_heroi, id_poder) VALUES (4, 3);

-- Wolverine (ID 5): Regeneração Celular (ID 4)
INSERT INTO Heroi_Poder (id_heroi, id_poder) VALUES (5, 4);

-- Professor X (ID 6): Telepatia (ID 6)
INSERT INTO Heroi_Poder (id_heroi, id_poder) VALUES (6, 6);

-- Flash (ID 7): Velocidade Sobre-Humana (ID 7)
INSERT INTO Heroi_Poder (id_heroi, id_poder) VALUES (7, 7);

-- (SELECT) --

-- 1. Todos os heróis e suas identidades secretas.
SELECT nome_heroi, identidade_secreta FROM Super_Herois;

-- 2. Encontrar todos os heróis que são da Terra.
SELECT nome_heroi, origem FROM Super_Herois WHERE origem = 'Terra';

-- 3. Listar todos os heróis e o nome de sua afiliação.
SELECT
    sh.nome_heroi,
    af.nome_afiliacao
FROM
    Super_Herois sh
JOIN
    Afiliacoes af ON sh.id_afiliacao = af.id_afiliacao;

-- 4. Listar os poderes de um herói específico.
SELECT
    sh.nome_heroi,
    p.nome_poder
FROM
    Super_Herois sh
JOIN
    Heroi_Poder hp ON sh.id_heroi = hp.id_heroi
JOIN
    Poderes p ON hp.id_poder = p.id_poder
WHERE
    sh.nome_heroi = 'Superman';

-- 5. Contar quantos heróis existem em cada afiliação.
SELECT
    af.nome_afiliacao,
    COUNT(sh.id_heroi) AS numero_de_herois
FROM
    Afiliacoes af
LEFT JOIN 
    Super_Herois sh ON af.id_afiliacao = af.id_afiliacao
GROUP BY
    af.nome_afiliacao
ORDER BY
    numero_de_herois DESC;


-- (UPDATE) --

-- 1. O Homem de Ferro revelou sua identidade.
UPDATE Super_Herois
SET identidade_secreta = 'Publicamente conhecida'
WHERE nome_heroi = 'Homem de Ferro';

-- Verificando a alteração:
SELECT nome_heroi, identidade_secreta FROM Super_Herois WHERE nome_heroi = 'Homem de Ferro';


-- 2. Mover o Wolverine para os Vingadores.
UPDATE Super_Herois
SET id_afiliacao = (SELECT id_afiliacao FROM Afiliacoes WHERE nome_afiliacao = 'Vingadores')
WHERE nome_heroi = 'Wolverine';

-- mudança do Wolverine para os Vingadores:
SELECT
    sh.nome_heroi,
    af.nome_afiliacao
FROM
    Super_Herois sh
JOIN
    Afiliacoes af ON sh.id_afiliacao = af.id_afiliacao
WHERE
    sh.nome_heroi = 'Wolverine';
