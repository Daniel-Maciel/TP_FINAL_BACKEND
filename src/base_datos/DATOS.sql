use aerolinea;

-- Insertar datos en la tabla PERSONA
INSERT INTO Persona (dni, nombre, apellido, direccion, telefono) VALUES
(34395800, 'Daniel', 'Maciel', 'Calle El Ceibo, Garupá, Misiones', '3764-211912'),
(18362894, 'María', 'González', 'Calle San Martín 567, Rosario, Santa Fe', '3424-172740'),
(25364980, 'Carlos', 'Fernández', 'Av. Libertador 890, Vicente López, Buenos Aires', '11-67891234'),
(36520785, 'Ana', 'Rodríguez', 'Calle 9 de Julio 2345, Córdoba, Córdoba', '3513-456789'),
(27910621, 'Jorge', 'López', 'Av. Rivadavia 4567, Mar del Plata, Buenos Aires', '2234-322290'),
(35621070,'Laura', 'Martínez', 'Calle Belgrano 678, Salta, Salta', '3874-804445'),
(40904372,'Lucía', 'Gómez', 'Calle Sarmiento 123, Mendoza, Mendoza', '2614-7642674'),
(38456201,'Roberto', 'Díaz', 'Av. Mitre 3456, San Miguel de Tucumán, Tucumán', '3814-081914'),
(41843083,'Sofía', 'Álvarez', 'Calle Moreno 789, Neuquén, Neuquén', '2994-360960'),
(32045961,'Martín', 'Sosa', 'Calle Lavalle 234, Ushuaia, Tierra del Fuego', '2901-561893');

-- Insertar datos en la tabla ROL
INSERT INTO Rol (nombre) VALUES
('Cliente'),
('Administrativo');

-- Insertar datos en la tabla USUARIO
INSERT INTO Usuario (id_rol, dni, email, pass) VALUES
(2, 34395800, 'danymaciel63@gmail.com', 'simplemente'),   -- Administrativo
(1, 18362894, 'maria.gonzalez@hotmail.com', 'mariaPass456'),
(1, 25364980, 'carlos.fernandez@admin.com', 'carlosfer789' ),  
(1, 36520785, 'ana.rodriguez@yahoo.com', 'anaSecret001'),
(1, 27910621, 'jorge.lopez@gmail.com', 'jorgeSafe2021'),
(1, 35621070, 'laura.martinez@outlook.com', 'lauraKey999'),
(1, 40904372, 'lucia.gomez@gmail.com', 'luciaPassword23'),
(1, 38456201, 'roberto.diaz@gmail.com', 'robertoSecure789'),
(1, 41843083, 'sofia.alvarez@yahoo.com', 'sofiaPass0909'),
(1, 32045961, 'martin.sosa@outlook.com', 'martinKey456');

-- Insertar datos en la tabla AVION
INSERT INTO Avion (modelo, capacidad, aerolinea) VALUES
('Boeing 737', 189, 'Aerolíneas Argentinas'),
('Airbus A320', 180, 'LATAM Airlines'),
('Embraer E190', 98, 'Austral Líneas Aéreas'),
('Boeing 787', 242, 'Aerolíneas Argentinas'),
('Airbus A330', 277, 'LATAM Airlines'),
('Boeing 777', 396, 'Aerolíneas Argentinas'),
('Bombardier CRJ-900', 76, 'Flybondi'),
('Airbus A321', 220, 'JetSmart Argentina'),
('Boeing 767', 216, 'Aerolíneas Argentinas'),
('Embraer E175', 88, 'Austral Líneas Aéreas');

-- Insertar datos en la tabla VUELO
INSERT INTO Vuelo (numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada) VALUES
('AR1234', 'Buenos Aires (EZE)', 'Córdoba (COR)', 1, '2024-11-01 08:00:00', '2024-11-01 09:30:00'),
('LA5678', 'Buenos Aires (AEP)', 'Mendoza (MDZ)', 2, '2024-11-02 10:00:00', '2024-11-02 11:45:00'),
('AU9101', 'Rosario (ROS)', 'Salta (SLA)', 3, '2024-11-03 14:00:00', '2024-11-03 16:30:00'),
('AR1212', 'Córdoba (COR)', 'Buenos Aires (EZE)', 4, '2024-11-04 17:00:00', '2024-11-04 18:30:00'),
('LA4545', 'Buenos Aires (EZE)', 'Ushuaia (USH)', 5, '2024-11-05 09:00:00', '2024-11-05 13:00:00'),
('AR7878', 'Mendoza (MDZ)', 'Buenos Aires (AEP)', 6, '2024-11-06 18:00:00', '2024-11-06 20:30:00'),
('FB9999', 'Buenos Aires (EZE)', 'Bariloche (BRC)', 7, '2024-11-07 12:00:00', '2024-11-07 14:45:00'),
('JA3030', 'Neuquén (NQN)', 'Buenos Aires (AEP)', 8, '2024-11-08 07:00:00', '2024-11-08 09:00:00'),
('AR6543', 'Salta (SLA)', 'Rosario (ROS)', 9, '2024-11-09 11:00:00', '2024-11-09 13:30:00'),
('AU8765', 'Buenos Aires (EZE)', 'Iguazú (IGR)', 10, '2024-11-10 16:00:00', '2024-11-10 18:30:00');

-- Insertar datos en la tabla ASIENTO
INSERT INTO Asiento (id_vuelo, numero_asiento, clase, estado) VALUES
-- Asientos para Vuelo 1 (AR1234)
(1, '1A', 'Económica', 'Disponible'),
(1, '1B', 'Económica', 'Disponible'),
(1, '2A', 'Económica', 'Reservado'),
(1, '2B', 'Económica', 'Disponible'),

-- Asientos para Vuelo 2 (LA5678)
(2, '3A', 'Económica', 'Disponible'),
(2, '3B', 'Económica', 'Reservado'),
(2, '4A', 'Económica', 'Disponible'),
(2, '4B', 'Económica', 'Disponible'),

-- Asientos para Vuelo 3 (AU9101)
(3, '5A', 'Ejecutiva', 'Disponible'),
(3, '5B', 'Ejecutiva', 'Disponible'),
(3, '6A', 'Ejecutiva', 'Reservado'),
(3, '6B', 'Ejecutiva', 'Disponible'),

-- Asientos para Vuelo 4 (AR1212)
(4, '7A', 'Económica', 'Disponible'),
(4, '7B', 'Económica', 'Disponible'),
(4, '8A', 'Económica', 'Reservado'),
(4, '8B', 'Económica', 'Disponible'),

-- Asientos para Vuelo 5 (LA4545)
(5, '9A', 'Primera_Clase', 'Disponible'),
(5, '9B', 'Primera_Clase', 'Disponible'),
(5, '10A', 'Primera_Clase', 'Reservado'),
(5, '10B', 'Primera_Clase', 'Disponible'),

-- Asientos para Vuelo 6 (AR7878)
(6, '11A', 'Económica', 'Disponible'),
(6, '11B', 'Económica', 'Reservado'),
(6, '12A', 'Económica', 'Disponible'),
(6, '12B', 'Económica', 'Disponible'),

-- Asientos para Vuelo 7 (FB9999)
(7, '13A', 'Económica', 'Disponible'),
(7, '13B', 'Económica', 'Disponible'),
(7, '14A', 'Económica', 'Reservado'),
(7, '14B', 'Económica', 'Disponible'),

-- Asientos para Vuelo 8 (JA3030)
(8, '15A', 'Económica', 'Disponible'),
(8, '15B', 'Económica', 'Reservado'),
(8, '16A', 'Económica', 'Disponible'),
(8, '16B', 'Económica', 'Disponible'),

-- Asientos para Vuelo 9 (AR6543)
(9, '17A', 'Económica', 'Disponible'),
(9, '17B', 'Económica', 'Disponible'),
(9, '18A', 'Económica', 'Reservado'),
(9, '18B', 'Económica', 'Disponible'),

-- Asientos para Vuelo 10 (AU8765)
(10, '19A', 'Ejecutiva', 'Disponible'),
(10, '19B', 'Ejecutiva', 'Disponible'),
(10, '20A', 'Ejecutiva', 'Reservado'),
(10, '20B', 'Ejecutiva', 'Disponible');

-- Insertar datos en la tabla RESERVA
INSERT INTO Reserva (id_usuario, id_vuelo, monto, metodo_pago, fecha_reserva, estado, id_asiento) VALUES
-- Reservas para Vuelo 1 (AR1234)
(11, 1, 15000.00, 'TCredito', '2024-10-10 10:30:00', 'Confirmada', 3),
(12, 1, 15000.00, 'Debito', '2024-10-11 11:00:00', 'Pendiente', 4),

-- Reservas para Vuelo 2 (LA5678)
(13, 2, 18000.00, 'Transferencia', '2024-10-12 09:45:00', 'Confirmada', 6),

-- Reservas para Vuelo 3 (AU9101)
(14, 3, 20000.00, 'Efectivo', '2024-10-13 15:00:00', 'Pendiente', 9),

-- Reservas para Vuelo 4 (AR1212)
(15, 4, 14000.00, 'TCredito', '2024-10-14 16:30:00', 'Confirmada', 12),

-- Reservas para Vuelo 5 (LA4545)
(16, 5, 25000.00, 'Debito', '2024-10-15 17:00:00', 'Confirmada', 15),

-- Reservas para Vuelo 6 (AR7878)
(17, 6, 16000.00, 'Transferencia', '2024-10-16 12:00:00', 'Pendiente', 18),

-- Reservas para Vuelo 7 (FB9999)
(18, 7, 13000.00, 'Efectivo', '2024-10-17 08:30:00', 'Confirmada', 21),

-- Reservas para Vuelo 8 (JA3030)
(19, 8, 17000.00, 'Debito', '2024-10-18 19:45:00', 'Confirmada', 24),

-- Reservas para Vuelo 9 (AR6543)
(20, 9, 18000.00, 'Transferencia', '2024-10-19 20:15:00', 'Pendiente', 27),

-- Reservas para Vuelo 10 (AU8765)
(15, 10, 19000.00, 'Efectivo', '2024-10-20 14:00:00', 'Confirmada', 30);



