-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2023 at 09:02 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wozbase`
--

-- --------------------------------------------------------

--
-- Table structure for table `group sequence`
--

CREATE TABLE `group sequence` (
  `groupid` int(11) NOT NULL,
  `responseid` int(11) NOT NULL,
  `sequence` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group sequence`
--

INSERT INTO `group sequence` (`groupid`, `responseid`, `sequence`) VALUES
(0, 5038804, 4),
(3968704, 5038804, 4),
(3968704, 6003441, 4);

-- --------------------------------------------------------

--
-- Table structure for table `research group`
--

CREATE TABLE `research group` (
  `groupid` int(11) NOT NULL,
  `groupname` varchar(39) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `research group`
--

INSERT INTO `research group` (`groupid`, `groupname`) VALUES
(2043442, 'Uwi group'),
(3968704, 'migo');

-- --------------------------------------------------------

--
-- Table structure for table `research studies`
--

CREATE TABLE `research studies` (
  `id` int(13) NOT NULL,
  `name` varchar(30) NOT NULL,
  `creator` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `research studies`
--

INSERT INTO `research studies` (`id`, `name`, `creator`) VALUES
(4958577, 'investigated by the feds', '111111113592'),
(9400509, 'woz', '111111113592'),
(131314653, 'Study of adhd', '100001111');

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE `responses` (
  `responseid` int(11) NOT NULL,
  `contents` varchar(50) NOT NULL,
  `research study` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `responses`
--

INSERT INTO `responses` (`responseid`, `contents`, `research study`) VALUES
(5038804, 'u good bro', 4958577),
(6003441, 'im not good', 4958577),
(6949378, 'giveon', 4958577);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` bigint(17) NOT NULL,
  `Fname` varchar(15) NOT NULL,
  `Lname` varchar(15) NOT NULL,
  `Role` varchar(10) NOT NULL,
  `Password` varchar(68) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Username` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserId`, `Fname`, `Lname`, `Role`, `Password`, `Email`, `Username`) VALUES
(2044, 'anonymous', 'anonymous', 'user', '$2a$10$DLC8UJKhXDDD5V6oGSliLeUZdBLyAdTS7kiE5CsTPE0ZCgDUK4Us.', '3968704', 'testuser.userna'),
(2174, 'anonymous', 'anonymous', 'user', '$2a$10$g2/Fc0Gihn4rbryHLxGhgevkGz3LJTXdSIQdDm0pYmE0MX9JqMIdG', '3968704', 'testuser.userna'),
(2294, 'anonymous', 'anonymous', 'user', '$2a$10$nR78jbhu4OoI1uhJOAcs6.v5v90UsP6G5jEnU/KpvWeuXD16HITbC', '3968704', 'testuser.userna'),
(6565, 'anonymous', 'anonymous', 'user', '$2a$10$gTFDEhdy7RL6kyMlNZj56Ow9mc4nQmvBfUbD02z7XElDO8UKq4GQy', '3968704', 'testuser.userna'),
(6878, 'anonymous', 'anonymous', 'user', '$2a$10$WzYW6X982DWdr4PVLJPcB.i7bNIIdHcdB93yowAnD9nb67R.BivoW', '3968704', 'testuser.userna'),
(9138, 'anonymous', 'anonymous', 'user', '$2a$10$bzQpx0HDYXTT7sa/rV0UEef8y7yPzxRbx0l8sGJhYoY/8C60CxVwy', '3968704', 'testuser.userna'),
(111111113592, 'De', 'Bostic', 'admin', '$2a$10$3XCX/NAoS8tktHcMhxfecOga2Wla4cskZ1OdgybEYn3AHf8SuS4v2', 'deshad12@gmail.com', 'jeff');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `name` varchar(20) NOT NULL,
  `videoid` varchar(44) NOT NULL,
  `responseid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`name`, `videoid`, `responseid`) VALUES
('', 'lamb-120739-1682483469408.mp4', 5038804),
('', 'lion-158980-1682480726156.mp4', 5038804),
('', 'ocean-135658-1682483462160.mp4', 5038804),
('', 'vinyl-57307-1682483478902.mp4', 6003441);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `group sequence`
--
ALTER TABLE `group sequence`
  ADD PRIMARY KEY (`groupid`,`responseid`);

--
-- Indexes for table `research group`
--
ALTER TABLE `research group`
  ADD PRIMARY KEY (`groupid`);

--
-- Indexes for table `research studies`
--
ALTER TABLE `research studies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`responseid`),
  ADD KEY `FOREIGN` (`research study`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`videoid`,`responseid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
