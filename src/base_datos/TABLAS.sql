CREATE DATABASE aerolinea;
use aerolinea;

CREATE TABLE Persona (
    dni BIGINT(8) PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(15)
);

CREATE TABLE Rol (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE  -- (Ej. Cliente, Administrativo)
);

CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_rol INT DEFAULT 1,  -- 1 hace referencia al rol 'Cliente' por defecto
    dni BIGINT (8),
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol),
    FOREIGN KEY (dni) REFERENCES Persona(dni)
);

CREATE TABLE Avion (
    id_avion INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(50) NOT NULL,
    capacidad INT NOT NULL,
    aerolinea VARCHAR(50) NOT NULL
);

CREATE TABLE Vuelo (
    id_vuelo INT PRIMARY KEY AUTO_INCREMENT,
    numero_vuelo VARCHAR(10) NOT NULL,
    origen VARCHAR(50) NOT NULL,
    destino VARCHAR(50) NOT NULL,
    id_avion INT NOT NULL,
    fecha_salida DATETIME NOT NULL,
    fecha_llegada DATETIME NOT NULL,
    FOREIGN KEY (id_avion) REFERENCES Avion(id_avion)
);

CREATE TABLE Asiento (
    id_asiento INT PRIMARY KEY AUTO_INCREMENT,
    id_vuelo INT,
    numero_asiento VARCHAR(5) NOT NULL,
    clase ENUM('Económica', 'Ejecutiva', 'Primera_Clase') NOT NULL,
    estado ENUM('Disponible', 'Reservado') DEFAULT 'Disponible',
    FOREIGN KEY (id_vuelo) REFERENCES Vuelo(id_vuelo)
);

CREATE TABLE Reserva (
    id_reserva INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_vuelo INT,
    monto DECIMAL(10, 2) NOT NULL,
    metodo_pago ENUM('TCredito', 'Transferencia', 'Debito', 'Efectivo'),
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    id_asiento INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_vuelo) REFERENCES Vuelo(id_vuelo),
    FOREIGN KEY (id_asiento) REFERENCES Asiento(id_asiento)
);