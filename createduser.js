const db = require("./database/models");

(async () => {
  try {
    // Verificamos si ya existe un usuario con id = 1
    const existingUser = await db.Usuario.findByPk(1);

    if (existingUser) {
      console.log("✅ El usuario con id = 1 ya existe:");
      console.log(existingUser.toJSON());
    } else {
      // Creamos un nuevo usuario de prueba
      const newUser = await db.Usuario.create({
        first_name: "Antonela",
        last_name: "Carreras",
        date_of_birth: "1995-01-01",
        gender: "Femenino",
        image: "default.jpg",
        email: "antonela@test.com",
        password: "123456" // (solo para pruebas)
      });

      console.log("✅ Usuario de prueba creado correctamente:");
      console.log(newUser.toJSON());
    }
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
  } finally {
    process.exit();
  }
})();
