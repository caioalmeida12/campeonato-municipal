-- Consulta entre jogador, esporte e posição

SELECT j.nome_completo AS 'Nome do Jogador', p.nome AS 'Posição'
FROM jogador j
JOIN posicao p ON j.fk_posicao_id = p.fk_esporte_id;

-- Consulta entre jogos e resultados

SELECT j.id AS 'ID do Jogo', t1.nome AS 'Time 1', t2.nome AS 'Time 2', r.fk_time_vencedor AS 'Time Vencedor'
FROM jogo j
JOIN time t1 ON j.fk_time_1_id = t1.id
JOIN time t2 ON j.fk_time_2_id = t2.id
JOIN resultado r ON j.id = r.fk_jogo_id;

-- Consulta entre time e esporte

SELECT t.nome AS 'Nome do Time', e.nome AS 'Nome do Esporte'
FROM time t
JOIN esporte e ON t.fk_esporte_id = e.id;

-- Consulta entre competição, jogo e time

SELECT c.nome AS 'Nome da Competição', j.id AS 'ID do Jogo', t1.nome AS 'Time 1', t2.nome AS 'Time 2'
FROM competicao c
JOIN jogo j ON c.id = j.fk_competicao_id
JOIN time t1 ON j.fk_time_1_id = t1.id
JOIN time t2 ON j.fk_time_2_id = t2.id;

-- Consulta entre jogador, endereco e ficha técnica

SELECT
    j.nome_completo AS 'Nome do Jogador',
    e.logradouro AS 'Logradouro',
    e.numero AS 'Número',
    e.bairro AS 'Bairro',
    e.cidade AS 'Cidade',
    e.cep AS 'CEP',
    e.estado AS 'Estado',
    e.pais AS 'País',
    f.altura AS 'Altura (cm)',
    f.peso AS 'Peso (kg)',
    f.membro_inferior_dominante AS 'Membro Inferior Dominante',
    f.membro_superior_dominante AS 'Membro Superior Dominante',
    CASE f.is_capitao WHEN 1 THEN 'Sim' ELSE 'Não' END AS 'É Capitão'
FROM endereco e
JOIN jogador j ON e.fk_jogador_id = j.id
JOIN ficha_tecnica f ON j.id = f.fk_jogador_id;

-- Consulta entre jogo, local de jogo e time

SELECT
    lj.nome AS 'Local de Jogo',
    j.id AS 'ID do Jogo',
    t1.nome AS 'Time 1',
    t2.nome AS 'Time 2'
FROM jogo j
JOIN local_de_jogo lj ON j.fk_local_de_jogo_id = lj.id
JOIN time t1 ON j.fk_time_1_id = t1.id
JOIN time t2 ON j.fk_time_2_id = t2.id;

-- Consulta tudo

SELECT
    jogador.nome_completo AS "Nome Completo",
    endereco.cidade AS "Cidade",
    ficha_tecnica.altura AS "Altura",
    esporte.nome AS "Esporte",
    posicao.nome AS "Posicao",
    time.nome AS "Time",
    competicao.nome AS "Competicao",
    jogo.data AS "Data do jogo",
    local_de_jogo.nome AS "Local do jogo"
FROM jogador
JOIN endereco ON jogador.id = endereco.fk_jogador_id
JOIN time ON jogador.fk_time_id = time.id
JOIN posicao ON jogador.fk_posicao_id = posicao.fk_esporte_id
JOIN ficha_tecnica ON jogador.id = ficha_tecnica.fk_jogador_id
JOIN esporte ON time.fk_esporte_id = esporte.id
JOIN jogo ON (time.id = jogo.fk_time_1_id OR time.id = jogo.fk_time_2_id)
JOIN competicao ON jogo.fk_competicao_id = competicao.id
JOIN local_de_jogo ON jogo.fk_local_de_jogo_id = local_de_jogo.id;