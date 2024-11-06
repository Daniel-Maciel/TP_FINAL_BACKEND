const { body, validationResult } = require('express-validator');

const actualizarpersonavalidada = () => [
  body('nombre')
    .optional()
    .isString()
    .withMessage('El nombre debe existir en la base de datos')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),

  body('apellido')
    .optional()
    .isString()
    .withMessage('El apellido debe existir en la base de datos')
    .isLength({ min: 4 })
    .withMessage('El apellido debe tener al menos 4 caracteres'),

  body('direccion')
    .optional()
    .isString()
    .withMessage('La dirección debe ser un texto válido')
    .isLength({ min: 10 })
    .withMessage('La dirección debe tener al menos 10 caracteres'),

  body('telefono')
    .optional()
    .isNumeric()
    .withMessage('El teléfono debe contener solo números'),

];

function validaractualizacionpersona(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { actualizarpersonavalidada, validaractualizacionpersona };
