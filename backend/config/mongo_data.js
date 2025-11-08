const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'super_herois_db_nosql';
const client = new MongoClient(mongoUrl);

const perfis = [
    {
        id_heroi_mysql: 1, // Superman
        poderes: 'Super-força, voo, visão de calor, super-velocidade, invulnerabilidade, sopro congelante.',
        referencias: 'Action Comics #1, Superman (1978), A Morte do Superman (HQ), O Homem de Aço (2013), Reino do Amanhã (HQ).',
        trajes: 'Clássico (azul/vermelho), Traje de Recuperação (preto), Reino do Amanhã, Novos 52.',
        outros_viloes: 'Brainiac, General Zod, Apocalipse, Bizarro.',
        feito_notavel: 'Ajudou a levantar o livro da eternidade (HQ Crise final).'
    },
    {
        id_heroi_mysql: 2, // Batman
        poderes: 'Intelecto genial, mestre em artes marciais, detetive especialista, vastos recursos tecnológicos, mestre da fuga, intimidação.',
        referencias: 'Detective Comics #27, Batman: O Cavaleiro das Trevas (2008), Batman: Ano Um (HQ), A Piada Mortal (HQ), Batman (1989).',
        trajes: 'Clássico (azul/cinza), Traje de Gotham (preto/cinza), Hellbat, Traje de O Cavaleiro das Trevas (HQ).',
        outros_viloes: 'Pinguim, Charada, Duas-Caras, Espantalho, Bane.',
        feito_notavel: 'Derrotar o Superman usando estratégia e kryptonita em "O Cavaleiro das Trevas Ressurge" (HQ).'
    },
    {
        id_heroi_mysql: 3, // Homem-Aranha
        poderes: 'Força, agilidade e reflexos sobre-humanos, "Sentido-Aranha" (percepção de perigo), escalar paredes, teias artificiais.',
        referencias: 'Amazing Fantasy #15, Homem-Aranha (2002), Homem-Aranha: De Volta ao Lar (2017), A Morte de Gwen Stacy (HQ), Guerra Civil (HQ).',
        trajes: 'Clássico (vermelho/azul), Traje Simbionte (preto), Aranha de Ferro, Traje Furtivo (Longe de Casa).',
        outros_viloes: 'Doutor Octopus, Venom, Kraven, O Caçador, Lagarto.',
        feito_notavel: 'Com os poderes da força cósmica Enigma, destruiu o tri-sentinela (HQ Atos de vingança)'
    },
    {
        id_heroi_mysql: 4, // Mulher-Maravilha
        poderes: 'Super-força, voo, super-velocidade, quase-imortalidade, fator de cura, sabedoria divina.',
        referencias: 'All Star Comics #8, Mulher-Maravilha (2017), Liga da Justiça (Snyder Cut), Crise nas Infinitas Terras (HQ), Odisseia (HQ).',
        trajes: 'Clássico (águia), Traje de Batalha (filme), Novos 52 (prateado), Armadura Dourada (Águia).',
        outros_viloes: 'Mulher-Leopardo (Cheetah), Circe, Doutor Veneno, Giganta.',
        feito_notavel: 'Enfrentar Superman (HQ Injustice).'
    },
    {
        id_heroi_mysql: 5, // Homem de Ferro
        poderes: 'Intelecto genial, engenheiro mestre, traje motorizado (voo, raios repulsores, força, mísseis).',
        referencias: 'Tales of Suspense #39, Homem de Ferro (2008), Vingadores: Ultimato (2019), Guerra Civil (HQ), O Demônio na Garrafa (HQ).',
        trajes: 'Mark I (Caverna), Clássico (vermelho/dourado), Hulkbuster, Bleeding Edge (Nanotech), Mark 85 (Ultimato).',
        outros_viloes: 'Obadiah Stane (Monge de Ferro), Justin Hammer, Chicote Negro, Madame Máscara.',
        feito_notavel: 'Infundiu uma armadura com poder cósmico e lutou contra Korvac (HQ Iron Man #13 e #14)'
    },
    {
        id_heroi_mysql: 6, // Capitão América
        poderes: 'Pico do potencial humano (força, agilidade, resistência), mestre em combate, líder tático, fator de cura acelerado, uso de escudo.',
        referencias: 'Captain America Comics #1, Capitão América: O Primeiro Vingador (2011), O Soldado Invernal (Filme/HQ), Vingadores: Ultimato (2019).',
        trajes: 'Traje da WWII, Traje Furtivo (Soldado Invernal), Traje Vingadores (MCU), Nômade.',
        outros_viloes: 'Barão Zemo, Soldado Invernal (Bucky), Ossos Cruzados, Arnim Zola.',
        feito_notavel: 'Já liderou os Vingadores e a Liga da Justiça juntos (HQ JLA/Avengers)'
    },
    {
        id_heroi_mysql: 7, // Thor
        poderes: 'Deus do Trovão (controle climático/raios), super-força, longevidade Asgardiana, voo (com Mjolnir/Stormbreaker), durabilidade.',
        referencias: 'Journey into Mystery #83, Thor (2011), Thor: Ragnarok (2017), Vingadores: Guerra Infinita (2018), A Saga de Gorr (HQ).',
        trajes: 'Clássico (HQ, com elmo), Traje do MCU (Vingadores 1), Traje Ragnarok (Gladiador), Traje "Rei Thor".',
        outros_viloes: 'Hela, Malekith, Surtur, Gorr (O Carniceiro dos Deuses).',
        feito_notavel: 'Derrotou entidades que existem além dos deuses tradicionais. Aqueles que sentam nas sombras (HQ The Immortal Thor)'
    },
    {
        id_heroi_mysql: 8, // Hulk
        poderes: 'Super-força virtualmente ilimitada (baseada na raiva), fator de cura, super-resistência, super-salto (locomoção).',
        referencias: 'The Incredible Hulk #1, Vingadores (2012), Thor: Ragnarok (2017), Planeta Hulk (HQ), Futuro Imperfeito (HQ).',
        trajes: '(Calças rasgadas), Armadura de Gladiador (Planeta Hulk), Traje Professor Hulk (Ultimato).',
        outros_viloes: 'Abominável, O Líder, Maestro, Zzzax.',
        feito_notavel: 'Já enfrentou e conseguiu impedir a manifestação do TOBA (HQ Immortal Hulk)'
    },
    {
        id_heroi_mysql: 9, // Wolverine
        poderes: 'Fator de cura regenerativo, esqueleto e garras de Adamantium, sentidos aguçados, longevidade, mestre em combate.',
        referencias: 'The Incredible Hulk #181, X-Men (2000), Logan (2017), Arma X (HQ), Velho Logan (HQ).',
        trajes: 'Clássico (amarelo/azul), Traje Marrom/Bronze, Traje X-Force (preto/cinza), Traje "Logan" (civil/jaqueta).',
        outros_viloes: 'William Stryker, Samurai de Prata, Lady Letal, Ômega Vermelho.',
        feito_notavel: 'Já matou Hulk de dentro pra fora (HQ The Old Logan)'
    },
    {
        id_heroi_mysql: 10, // Flash
        poderes: 'Super-velocidade (conectado à Força de Aceleração), viajar no tempo/dimensões, intangibilidade (vibrar moléculas), cura rápida.',
        referencias: 'Showcase #4, The Flash (Série TV), Liga da Justiça (2017), Flashpoint (Ponto de Ignição - HQ), Crise nas Infinitas Terras (HQ).',
        trajes: 'Clássico (vermelho/amarelo), Traje Novos 52 (com linhas de energia), Traje do DCEU, Traje "Future Flash".',
        outros_viloes: 'Capitão Frio, Gorila Grodd, Zoom, Mestre dos Espelhos.',
        feito_notavel: 'Correr mais rápido que a própria morte, sacrificando-se para destruir o canhão do Anti-Monitor (HQ Crise nas Infinitas Terras)'
    },
    {
        id_heroi_mysql: 11, // Doutor Estranho
        poderes: 'Mago Supremo (feitiços diversos), projeção astral, teletransporte (portais), manipulação de energia, uso de artefatos (Olho de Agamotto).',
        referencias: 'Strange Tales #110, Doutor Estranho (2016), Vingadores: Guerra Infinita (2018), O Juramento (HQ), Doutor Estranho (Série 1974).',
        trajes: 'Clássico (azul/vermelho, capa), Traje do MCU, Traje "Defensores", Traje Cirurgião (antes de ser mago).',
        outros_viloes: 'Barão Mordo, Pesadelo, Shuma-Gorath, Kaecilius.',
        feito_notavel: 'Já impediu que o sonho do Criador Divino desmoronasse (HQ Defenders 2021)'
    },
    {
        id_heroi_mysql: 12, // Pantera Negra
        poderes: 'Força, agilidade e sentidos aprimorados (erva coração), intelecto genial, mestre em combate, traje de Vibranium (absorção/redistribuição de energia).',
        referencias: 'Fantastic Four #52, Capitão América: Guerra Civil (2016), Pantera Negra (2018), A Fúria do Pantera (HQ).',
        trajes: 'Traje Clássico (HQ, com capa), Traje do MCU (Guerra Civil), Traje de Nanotecnologia (filme solo), Traje "Rei dos Mortos".',
        outros_viloes: 'Garra Sônica (Klaw), M\'Baku (Homem-Gorila), Doutor Destino, Homem-Hídrico.',
        feito_notavel: 'Já empunhou a manopla do infinito com todas joias (HQ Avengers Vol. 8 #38 (2020))'
    },
    {
        id_heroi_mysql: 13, // Homem-Borracha
        poderes: 'Elasticidade sobre-humana, invulnerabilidade física, regeneração acelerada, imortalidade funcional, capacidade de alterar forma e tamanho, resistência a ataques psíquicos.',
        referencias: 'Police Comics #1 (1941), JLA (1997), Batman: The Brave and the Bold (2008), Justice League: Doom (2012), The Flash (2023).',
        trajes: 'Traje vermelho com cinto amarelo (clássico), uniforme da Liga da Justiça (azul e vermelho), visual moderno com óculos escuros e jaqueta.',
        outros_viloes: 'Doctor Light, The Thinker, Amazo, Eclipso.',
        feito_notavel: 'Já sobreviveu à destruição total do seu corpo, regenerando-se a partir de uma única gota de si mesmo.'
    },
    {
        id_heroi_mysql: 14, // Professor X
        poderes: 'Telepatia (leitura, controle, projeção mental), ilusões mentais, rajadas psíquicas, paralisia mental, localizar mutantes (com Cérebro).',
        referencias: 'The X-Men #1, X-Men (2000), X-Men: Primeira Classe (2011), Dias de um Futuro Esquecido (Filme/HQ), Dinastia X (HQ).',
        trajes: 'Terno (civil), Traje de vôo amarelo (X-Men clássico), Traje preto (filmes), Traje Krakoa (com Cérebro).',
        outros_viloes: 'Apocalipse, Sr. Sinistro, Clube do Inferno, Cassandra Nova.',
        feito_notavel: 'Já controlou o Hulk (HQ X-men: First Class Vol. 2 #5)'
    },
    {
        id_heroi_mysql: 15, // Lanterna Verde
        poderes: 'Anel de Poder (cria construtos de energia baseados na força de vontade), voo, campo de força, tradução universal.',
        referencias: 'Showcase #22, Lanterna Verde (2011), A Noite Mais Densa (HQ), Renascimento (HQ), Crepúsculo Esmeralda (HQ).',
        trajes: 'Uniforme da Tropa (verde/preto), Traje de Parallax, Traje de Espectro.',
        outros_viloes: 'Atrocitus (Lanternas Vermelhos), Nekron, Krona, Mão Negra.',
        feito_notavel: 'Liderar todas as Tropas de Lanternas (de todas as emoções) contra Nekron e a Tropa dos Lanternas Negros. (HQ A Noite Mais Densa).'
    }
];


async function seedDB() {
    try {
        await client.connect();
        console.log("Conectado ao MongoDB para seeding...");
        const db = client.db(dbName);
        const collection = db.collection('perfis_extendidos');

        await collection.deleteMany({});
        console.log("Coleção 'perfis_extendidos' limpa.");

        const result = await collection.insertMany(perfis);
        console.log(`✅ Sucesso! ${result.insertedCount} perfis de heróis inseridos no MongoDB.`);

    } catch (err) {
        console.error("❌ Erro durante o seeding do MongoDB:", err);
    } finally {
        await client.close();
        console.log("Conexão com MongoDB fechada.");
    }
}

seedDB();