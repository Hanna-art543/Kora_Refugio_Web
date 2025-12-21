-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-12-2025 a las 19:40:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kora_refugio_web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diario`
--

CREATE TABLE `diario` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish_ci;

--
-- Volcado de datos para la tabla `diario`
--

INSERT INTO `diario` (`id`, `usuario_id`, `contenido`, `fecha`) VALUES
(1, 1, '\"Hoy estoy feliz porque mi código funciona\".', '2025-11-30 02:45:56'),
(2, 2, 'Me siento un poco agotada por los exámenes.', '2025-12-18 04:07:36'),
(3, 1, 'Hoy estoy tratando de terminar todos mis trabajos.', '2025-12-18 04:10:04'),
(4, 1, 'Hoy estoy terminando mis proyectos para no estresarme a último momento.', '2025-12-19 02:06:04'),
(5, 3, 'Hoy se realizó un compartir con mis compañeros, estoy muy feliz :D', '2025-12-19 02:53:14'),
(6, 4, 'Hoy día salí con mis amigos a jugar futbol, jugamos como tres horas me gustó mucho compartir tiempo con mis amigos.', '2025-12-19 03:06:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `mensaje` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `nombre`, `edad`, `mensaje`, `fecha`) VALUES
(1, 'hanna', 18, 'Me gusta tu página, gracias.', '2025-11-30 02:48:07'),
(2, 'Anis123', 20, 'Me encantó tu página web, podrías agregarle para que cada uno personalice su perfil.', '2025-12-19 02:48:33'),
(3, 'Miguelito12', 15, 'Una recomendación sería agregarle notificaciones de su bienestar y como va mejorando.', '2025-12-19 02:50:11'),
(4, 'Sam4545', 21, 'Me gustó mucho, puedo leer diversas historias de acuerdo a como me siento y hay bonitas historias.', '2025-12-19 03:08:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish_ci;

--
-- Volcado de datos para la tabla `register`
--

INSERT INTO `register` (`id`, `usuario`, `password`) VALUES
(1, 'prueba1', '12345'),
(2, 'Shami123', '12345'),
(3, 'Nikoll1456', '145623'),
(4, 'Sam4545', '454567');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `diario`
--
ALTER TABLE `diario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `diario`
--
ALTER TABLE `diario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `diario`
--
ALTER TABLE `diario`
  ADD CONSTRAINT `diario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `register` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
