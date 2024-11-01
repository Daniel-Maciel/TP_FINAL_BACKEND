const { body, validationResult } = require('express-validator');

// Definir las validaciones para cada campo
const validarpersona = () => [
  body('dni')
    .isLength({ min: 7, max: 8 })
    .withMessage('El DNI debe tener entre 7 y 8 caracteres')
    .isNumeric()
    .withMessage('El DNI solo debe contener números'),

  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),

  body('apellido')
    .notEmpty()
    .withMessage('El apellido es obligatorio')
    .isLength({ min: 4 })
    .withMessage('El apellido debe tener al menos 4 caracteres'),

    body('direccion')
    .isString()
    .withMessage('La dirección debe ser un texto válido')
    .isLength({ min: 10 })
    .withMessage('La dirección debe tener al menos 10 caracteres'),

    body('telefono')
    .isNumeric()
    .withMessage('El teléfono debe contener solo números'),
 
];

// Función para manejar los errores de validación
const validarcampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Si no hay errores, continúa con el siguiente middleware o controlador
};

module.exports = { validarpersona, validarcampos };
