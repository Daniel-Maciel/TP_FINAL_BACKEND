const { body, validationResult } = require('express-validator');

const actualizarusuariovalidado = () => [
  // Validación para DNI
  body('dni')
    .isNumeric()
    .withMessage('El DNI debe estar en la base de datos y contener solo números')
    .isLength({ min: 7, max: 8 })
    .withMessage('El DNI debe tener entre 7 y 8 dígitos'),

  // Validación para Email
  body('email')
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .matches(/@/)
    .withMessage('El correo debe contener un "@"')
    .matches(/\.com$/)
    .withMessage('El correo debe terminar en ".com"'),

  // Validación para Contraseña
  body('pass')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número')
    .matches(/[A-Z]/)
    .withMessage('La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/)
    .withMessage('La contraseña debe contener al menos una letra minúscula')
    
];

function validarusuarioactualizado(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { actualizarusuariovalidado, validarusuarioactualizado };
