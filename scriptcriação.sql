DROP DATABASE IF EXISTS super_herois_db;
CREATE DATABASE super_herois_db;
USE super_herois_db;

DROP TABLE IF EXISTS Heroi_Poder;
DROP TABLE IF EXISTS Super_Herois;
DROP TABLE IF EXISTS Poderes;
DROP TABLE IF EXISTS Afiliacoes;

CREATE TABLE Afiliacoes (
    id_afiliacao INT PRIMARY KEY AUTO_INCREMENT,
    nome_afiliacao VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE Poderes (
    id_poder INT PRIMARY KEY AUTO_INCREMENT,
    nome_poder VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE Super_Herois (
    id_heroi INT PRIMARY KEY AUTO_INCREMENT,
    nome_heroi VARCHAR(100) NOT NULL,
    identidade_secreta VARCHAR(100),
    origem VARCHAR(100),
    id_afiliacao INT,
    FOREIGN KEY (id_afiliacao) REFERENCES Afiliacoes(id_afiliacao) -- Chave Estrangeira
);

CREATE TABLE Heroi_Poder (
    id_heroi_poder INT PRIMARY KEY AUTO_INCREMENT,
    id_heroi INT,
    id_poder INT,
    FOREIGN KEY (id_heroi) REFERENCES Super_Herois(id_heroi),
    FOREIGN KEY (id_poder) REFERENCES Poderes(id_poder)
);
