-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/10/2023 às 20:30
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `campeonato`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `competicao`
--

CREATE TABLE `competicao` (
  `id` varchar(36) NOT NULL,
  `nome` varchar(128) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_finalizacao` date NOT NULL,
  `localidade` varchar(64) NOT NULL,
  `formato` enum('TORNEIO','CAMPEONATO') NOT NULL,
  `fk_esporte_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `competicao`
--

INSERT INTO `competicao` (`id`, `nome`, `data_inicio`, `data_finalizacao`, `localidade`, `formato`, `fk_esporte_id`) VALUES
('ced7c30a-6311-11ee-9afd-34735afcb48a', 'Torneio de vôlei', '2023-10-03', '2023-10-07', 'Cedro-Ceará', 'TORNEIO', '554c16d6-6311-11ee-9afd-34735afcb48a'),
('ced7d3c6-6311-11ee-9afd-34735afcb48a', 'Torneio vôlei cedro', '2023-10-10', '2023-10-14', 'Cedro-Ceará ', 'CAMPEONATO', '554c291b-6311-11ee-9afd-34735afcb48a'),
('ced7e039-6311-11ee-9afd-34735afcb48a', 'Torneio de Vôlei Fênix ', '2023-10-25', '2023-10-28', 'Cedro-Ceará', 'TORNEIO', '554c3946-6311-11ee-9afd-34735afcb48a');

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `fk_jogador_id` varchar(36) NOT NULL,
  `logradouro` varchar(128) NOT NULL,
  `numero` varchar(5) DEFAULT 'S/N',
  `bairro` varchar(64) NOT NULL,
  `cidade` varchar(64) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `estado` varchar(64) NOT NULL,
  `pais` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`fk_jogador_id`, `logradouro`, `numero`, `bairro`, `cidade`, `cep`, `estado`, `pais`) VALUES
('f3ee728d-6317-11ee-9afd-34735afcb48a', 'Joel Passos ', '26', 'Caldeirão', 'Cedro', '6252000', 'Ceará', 'Brasil'),
('f3ee8373-6317-11ee-9afd-34735afcb48a', 'Centro', '988', 'Salustiano Moura', 'Cedro', '64400-00', 'Ceará', 'Brasil'),
('f3ee900c-6317-11ee-9afd-34735afcb48a', 'Alameda José Quintino', '56', 'Prado', 'Cedro', '63522-00', 'Ceará', 'Brasil');

-- --------------------------------------------------------

--
-- Estrutura para tabela `esporte`
--

CREATE TABLE `esporte` (
  `id` varchar(36) NOT NULL,
  `nome` varchar(64) NOT NULL,
  `maximo_jogador_por_time` tinyint(3) UNSIGNED NOT NULL,
  `maximo_jogadores_titulares` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `esporte`
--

INSERT INTO `esporte` (`id`, `nome`, `maximo_jogador_por_time`, `maximo_jogadores_titulares`) VALUES
('554c16d6-6311-11ee-9afd-34735afcb48a', 'vôlei', 5, 3),
('554c291b-6311-11ee-9afd-34735afcb48a', 'Vôlei', 5, 3),
('554c3946-6311-11ee-9afd-34735afcb48a', 'Vôlei', 5, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `ficha_tecnica`
--

CREATE TABLE `ficha_tecnica` (
  `fk_jogador_id` varchar(36) NOT NULL,
  `altura` tinyint(3) UNSIGNED NOT NULL,
  `peso` tinyint(3) UNSIGNED NOT NULL,
  `membro_inferior_dominante` enum('DIR','ESQ','AMB') DEFAULT NULL,
  `membro_superior_dominante` enum('DIR','ESQ','AMB') DEFAULT NULL,
  `is_capitao` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ficha_tecnica`
--

INSERT INTO `ficha_tecnica` (`fk_jogador_id`, `altura`, `peso`, `membro_inferior_dominante`, `membro_superior_dominante`, `is_capitao`) VALUES
('f3ee728d-6317-11ee-9afd-34735afcb48a', 2, 56, 'DIR', 'AMB', 1),
('f3ee8373-6317-11ee-9afd-34735afcb48a', 2, 80, 'DIR', 'AMB', 2),
('f3ee900c-6317-11ee-9afd-34735afcb48a', 2, 69, 'ESQ', 'ESQ', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `jogador`
--

CREATE TABLE `jogador` (
  `id` varchar(36) NOT NULL,
  `cpf` varchar(36) NOT NULL,
  `nome_completo` varchar(128) NOT NULL,
  `telefone` varchar(11) NOT NULL,
  `experiencia` enum('AMADOR','MODERADO','VETERANO','PROFISSIONAL') DEFAULT NULL,
  `fk_posicao_id` varchar(36) NOT NULL,
  `fk_time_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `jogador`
--

INSERT INTO `jogador` (`id`, `cpf`, `nome_completo`, `telefone`, `experiencia`, `fk_posicao_id`, `fk_time_id`) VALUES
('f3ee728d-6317-11ee-9afd-34735afcb48a', '966.322.555-45', 'José Anderson Alencar', '889995646', 'AMADOR', '554c16d6-6311-11ee-9afd-34735afcb48a', '0b9471ba-6313-11ee-9afd-34735afcb48a'),
('f3ee8373-6317-11ee-9afd-34735afcb48a', '986.365.555-25', 'Luan Fernandes Alves', '889975642', 'MODERADO', '554c3946-6311-11ee-9afd-34735afcb48a', '0b9471ba-6313-11ee-9afd-34735afcb48a'),
('f3ee900c-6317-11ee-9afd-34735afcb48a', '882.553.546-24', 'Caio Almeida Araújo', '8895462327', 'PROFISSIONAL', '554c3946-6311-11ee-9afd-34735afcb48a', '0b948e07-6313-11ee-9afd-34735afcb48a');

-- --------------------------------------------------------

--
-- Estrutura para tabela `jogo`
--

CREATE TABLE `jogo` (
  `id` varchar(36) NOT NULL,
  `data` date NOT NULL,
  `horario` time NOT NULL,
  `fase` tinyint(3) UNSIGNED NOT NULL,
  `fk_time_1_id` varchar(36) NOT NULL,
  `fk_time_2_id` varchar(36) NOT NULL,
  `fk_competicao_id` varchar(36) DEFAULT NULL,
  `fk_local_de_jogo_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `jogo`
--

INSERT INTO `jogo` (`id`, `data`, `horario`, `fase`, `fk_time_1_id`, `fk_time_2_id`, `fk_competicao_id`, `fk_local_de_jogo_id`) VALUES
('ee4619fb-6313-11ee-9afd-34735afcb48a', '0000-00-00', '14:00:00', 1, '0b948e07-6313-11ee-9afd-34735afcb48a', '0b9471ba-6313-11ee-9afd-34735afcb48a', 'ced7c30a-6311-11ee-9afd-34735afcb48a', '98e8df45-6313-11ee-9afd-34735afcb48a'),
('ee462ac1-6313-11ee-9afd-34735afcb48a', '0000-00-00', '15:00:00', 1, '0b948e07-6313-11ee-9afd-34735afcb48a', '0b9471ba-6313-11ee-9afd-34735afcb48a', 'ced7c30a-6311-11ee-9afd-34735afcb48a', '98e8df45-6313-11ee-9afd-34735afcb48a'),
('ee46377b-6313-11ee-9afd-34735afcb48a', '0000-00-00', '17:00:00', 2, '0b948e07-6313-11ee-9afd-34735afcb48a', '0b9471ba-6313-11ee-9afd-34735afcb48a', 'ced7c30a-6311-11ee-9afd-34735afcb48a', '98e8fd6e-6313-11ee-9afd-34735afcb48a');

-- --------------------------------------------------------

--
-- Estrutura para tabela `local_de_jogo`
--

CREATE TABLE `local_de_jogo` (
  `id` varchar(36) NOT NULL,
  `nome` varchar(128) NOT NULL,
  `logradouro` varchar(128) NOT NULL,
  `numero` varchar(5) DEFAULT 'S/N',
  `bairro` varchar(64) NOT NULL,
  `cidade` varchar(64) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `estado` varchar(64) NOT NULL,
  `pais` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `local_de_jogo`
--

INSERT INTO `local_de_jogo` (`id`, `nome`, `logradouro`, `numero`, `bairro`, `cidade`, `cep`, `estado`, `pais`) VALUES
('98e8df45-6313-11ee-9afd-34735afcb48a', 'Ginásio Poliesportivo de Cedro', 'Rua Padre Sá\r\n', 'S/N', 'Centro', 'Cedro', '63400-00', 'Ceará', 'Brasil'),
('98e8f09d-6313-11ee-9afd-34735afcb48a', 'Areninha Gabriel Diniz', 'José Pacifico', 'S/N', 'Centro', 'Cedro', '63400-00', 'Ceará', 'Brasil'),
('98e8fd6e-6313-11ee-9afd-34735afcb48a', 'Areninha Pega Avoante', 'Pega Avoante', 'S/N', 'São José', 'Cedro', '63400-00', 'Ceará', 'Brasil');

-- --------------------------------------------------------

--
-- Estrutura para tabela `posicao`
--

CREATE TABLE `posicao` (
  `fk_esporte_id` varchar(36) NOT NULL,
  `nome` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `posicao`
--

INSERT INTO `posicao` (`fk_esporte_id`, `nome`) VALUES
('554c16d6-6311-11ee-9afd-34735afcb48a', 'Central'),
('554c291b-6311-11ee-9afd-34735afcb48a', 'Levantador'),
('554c3946-6311-11ee-9afd-34735afcb48a', 'Ponteiro');

-- --------------------------------------------------------

--
-- Estrutura para tabela `resultado`
--

CREATE TABLE `resultado` (
  `fk_jogo_id` varchar(36) NOT NULL,
  `fk_time_vencedor` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `resultado`
--

INSERT INTO `resultado` (`fk_jogo_id`, `fk_time_vencedor`) VALUES
('ee46377b-6313-11ee-9afd-34735afcb48a', '0b9471ba-6313-11ee-9afd-34735afcb48a'),
('ee4619fb-6313-11ee-9afd-34735afcb48a', '0b9481d5-6313-11ee-9afd-34735afcb48a'),
('ee462ac1-6313-11ee-9afd-34735afcb48a', '0b948e07-6313-11ee-9afd-34735afcb48a');

-- --------------------------------------------------------

--
-- Estrutura para tabela `time`
--

CREATE TABLE `time` (
  `id` varchar(36) NOT NULL,
  `nome` varchar(64) NOT NULL,
  `fk_esporte_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `time`
--

INSERT INTO `time` (`id`, `nome`, `fk_esporte_id`) VALUES
('0b9471ba-6313-11ee-9afd-34735afcb48a', 'Cedro +30', '554c16d6-6311-11ee-9afd-34735afcb48a'),
('0b9481d5-6313-11ee-9afd-34735afcb48a', 'Vôlei as Fênix', '554c16d6-6311-11ee-9afd-34735afcb48a'),
('0b948e07-6313-11ee-9afd-34735afcb48a', 'Atlas sub 17', '554c16d6-6311-11ee-9afd-34735afcb48a');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `competicao`
--
ALTER TABLE `competicao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_competicao_2` (`fk_esporte_id`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`fk_jogador_id`);

--
-- Índices de tabela `esporte`
--
ALTER TABLE `esporte`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ficha_tecnica`
--
ALTER TABLE `ficha_tecnica`
  ADD PRIMARY KEY (`fk_jogador_id`);

--
-- Índices de tabela `jogador`
--
ALTER TABLE `jogador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `FK_jogador_3` (`fk_time_id`),
  ADD KEY `FK_jogador_4` (`fk_posicao_id`);

--
-- Índices de tabela `jogo`
--
ALTER TABLE `jogo`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `FK_jogo_1` (`fk_time_2_id`),
  ADD KEY `FK_jogo_2` (`fk_competicao_id`),
  ADD KEY `FK_jogo_3` (`fk_local_de_jogo_id`),
  ADD KEY `FK_jogo_5` (`fk_time_1_id`);

--
-- Índices de tabela `local_de_jogo`
--
ALTER TABLE `local_de_jogo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `posicao`
--
ALTER TABLE `posicao`
  ADD PRIMARY KEY (`fk_esporte_id`);

--
-- Índices de tabela `resultado`
--
ALTER TABLE `resultado`
  ADD PRIMARY KEY (`fk_jogo_id`),
  ADD KEY `FK_resultado_2` (`fk_time_vencedor`);

--
-- Índices de tabela `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_time_2` (`fk_esporte_id`);

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `competicao`
--
ALTER TABLE `competicao`
  ADD CONSTRAINT `FK_competicao_2` FOREIGN KEY (`fk_esporte_id`) REFERENCES `esporte` (`id`);

--
-- Restrições para tabelas `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `FK_endereco_2` FOREIGN KEY (`fk_jogador_id`) REFERENCES `jogador` (`id`);

--
-- Restrições para tabelas `ficha_tecnica`
--
ALTER TABLE `ficha_tecnica`
  ADD CONSTRAINT `FK_ficha_tecnica_1` FOREIGN KEY (`fk_jogador_id`) REFERENCES `jogador` (`id`);

--
-- Restrições para tabelas `jogador`
--
ALTER TABLE `jogador`
  ADD CONSTRAINT `FK_jogador_3` FOREIGN KEY (`fk_time_id`) REFERENCES `time` (`id`),
  ADD CONSTRAINT `FK_jogador_4` FOREIGN KEY (`fk_posicao_id`) REFERENCES `posicao` (`fk_esporte_id`);

--
-- Restrições para tabelas `jogo`
--
ALTER TABLE `jogo`
  ADD CONSTRAINT `FK_jogo_1` FOREIGN KEY (`fk_time_2_id`) REFERENCES `time` (`id`),
  ADD CONSTRAINT `FK_jogo_2` FOREIGN KEY (`fk_competicao_id`) REFERENCES `competicao` (`id`),
  ADD CONSTRAINT `FK_jogo_3` FOREIGN KEY (`fk_local_de_jogo_id`) REFERENCES `local_de_jogo` (`id`),
  ADD CONSTRAINT `FK_jogo_5` FOREIGN KEY (`fk_time_1_id`) REFERENCES `time` (`id`);

--
-- Restrições para tabelas `posicao`
--
ALTER TABLE `posicao`
  ADD CONSTRAINT `FK_posicao_2` FOREIGN KEY (`fk_esporte_id`) REFERENCES `esporte` (`id`);

--
-- Restrições para tabelas `resultado`
--
ALTER TABLE `resultado`
  ADD CONSTRAINT `FK_resultado_2` FOREIGN KEY (`fk_time_vencedor`) REFERENCES `time` (`id`),
  ADD CONSTRAINT `FK_resultado_3` FOREIGN KEY (`fk_jogo_id`) REFERENCES `jogo` (`id`);

--
-- Restrições para tabelas `time`
--
ALTER TABLE `time`
  ADD CONSTRAINT `FK_time_2` FOREIGN KEY (`fk_esporte_id`) REFERENCES `esporte` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
