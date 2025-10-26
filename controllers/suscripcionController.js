const db = require("../database/models");

module.exports = {
  guardarSuscripcion: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).send("Por favor ingresa un email válido.");
      }

      await db.Suscripcion.create({ email });
      console.log("✅ Nuevo suscriptor:", email);

      res.render("users/success", { message: "¡✅ Nuevo suscriptor!" }); // o a donde quieras redirigir después
    } catch (error) {
      console.error("Error al guardar suscripción:", error);
      res.status(500).send("Error al guardar la suscripción.");
    }
  },
};
