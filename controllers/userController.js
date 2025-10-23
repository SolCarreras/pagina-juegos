const path = require('path');
const bcrypt = require("bcryptjs");
// si tenés modelo User, lo podrías requerir aquí

const db =  require('../database/models');

// controllers/userController.js
module.exports = {
  registerForm: (req, res) => {
    // renderiza views/users/register.ejs
    res.render('users/register', { title: 'Registro' });
  },

  registerProcess: async (req, res) => {
    try {
      const { first_name, last_name, date, sexos, email, password } = req.body;
      const image = req.file ? req.file.filename : null;

      await db.Usuario.create({
        first_name,
        last_name,
        date_of_birth: date,
        gender: sexos,
        image,
        email,
        password: bcrypt.hashSync(password, 10)
      });

      res.redirect("/user/register/success");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).send("Error al guardar el usuario en la base de datos.");
    }
  },

  registerSuccess: (req, res) => {
    res.send("✅ Usuario registrado con éxito.");
  }
};



