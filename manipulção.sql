-- 1. todos os heróis e suas identidades secretas.
SELECT nome_heroi, identidade_secreta FROM Super_Herois;

-- 2. todos os heróis que são da Terra.
SELECT nome_heroi, origem FROM Super_Herois WHERE origem = 'Terra';

-- 3. todos os heróis e o nome de sua afiliação.
SELECT
    sh.nome_heroi,
    af.nome_afiliacao
FROM
    Super_Herois sh
JOIN
    Afiliacoes af ON sh.id_afiliacao = af.id_afiliacao;

-- 4. Listar os poderes de um herói específico (Superman).
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

-- 5. quantos heróis existem em cada afiliação.
SELECT
    af.nome_afiliacao,
    COUNT(sh.id_heroi) AS numero_de_herois
FROM
    Afiliacoes af
LEFT JOIN
    Super_Herois sh ON af.id_afiliacao = sh.id_afiliacao
GROUP BY
    af.nome_afiliacao
ORDER BY
    numero_de_herois DESC;


-- (UPDATE) --

-- 1. O Homem de Ferro revelou sua identidade
UPDATE Super_Herois
SET identidade_secreta = 'Publicamente conhecida'
WHERE nome_heroi = 'Homem de Ferro';

-- alteração:
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
