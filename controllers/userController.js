const path = require('path');
const bcrypt = require("bcryptjs");
const db = require('../database/models');

module.exports = {
  registerForm: (req, res) => {
    res.render('users/register', { title: 'Registro' });
  },

 registerProcess: async (req, res) => {
  try {
    const { first_name, last_name, date, sexos, email, password } = req.body;
    const image = req.file ? req.file.filename : null;

    const dateObj = new Date(date);
    if (isNaN(dateObj)) {
      throw new Error("Fecha de nacimiento inválida");
    }

    // YYYY-MM-DD
    const dateFormatted = dateObj.toISOString().slice(0, 10);

    await db.Usuario.create({
      first_name,
      last_name,
      date_of_birth: dateFormatted, // DATEONLY esperado
      gender: sexos,
      image,
      email,
      password: bcrypt.hashSync(password, 10),
      // NO pasar created_at aquí — lo genera el servidor SQL con GETDATE()
    });

    res.render("users/success", { message: "¡Registrado con éxito! Redirigiendo a la tienda..." });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al guardar el usuario en la base de datos.");
  }
}

};