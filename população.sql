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
