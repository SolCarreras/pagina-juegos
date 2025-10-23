

// ************ Require's ************
const express = require("express");
const path = require('path');
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');// Para poder usar los métodos PUT y DELETE
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const { userLog } =  require('./middlewares/userLog'); 



 // ************ express() - (don't touch) ************
const app = express();



// // ************ Middlewares - (don't touch) ************
 app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(cookieParser());    
app.use(session({ secret: 'Secreto!!', resave: false, saveUninitialized: true}));   //npm i express-session
//app.use(userLog); 



 // ************ Template Engine - (don't touch) ************
 app.set('view engine', 'ejs');  //motor de plantilla que estamos usando para las vistas
 app.set('views', [
 path.join(__dirname, './views'),
 path.join(__dirname, './views/partials'),
 path.join(__dirname, './views/main'),
path.join(__dirname, './views/products'),
path.join(__dirname, './views/users')
]);

 // ************ Route System require and use() ************
const mainRouter = require('./routes/mainRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');



app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use('/cart', cartRouter);


/*En tu app.js (o en un archivo de sincronización) agregá este bloque para que cree la tabla automáticamente:
const db = require('./database/models');

(async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync(); // crea la tabla si no existe
        console.log('✅ Tabla Games lista en SQL Server');
    } catch (error) {
        console.error('❌ Error creando tabla Games:', error);
    }
})();
SOLO SE EJECUTA UNA VEZ*/






// // ************ API ROUTER ************ //

// const userApiRouter = require('./routes/api/userRouter')
// const apiProducts = require('./routes/api/apiProducts');

// app.use('/api/users', userApiRouter);
// app.use('/api/products', apiProducts)

// app.use((req, res, next) => {
//     res.status(404).render("not-found")
// })

app.listen(process.env.PORT, () => { 
    console.log("Servidor escuchando en Puerto " + process.env.PORT);
});
