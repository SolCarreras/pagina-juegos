module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      // DATEONLY evita zona horaria y envía 'YYYY-MM-DD'
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      // created_at: dejamos que lo genere el servidor SQL con GETDATE()
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('GETDATE()')
      }
    },
    {
      tableName: "usuario",
      timestamps: false
    }
  );

  return Usuario;
};


