const db = require("../database/models")
const router = require("../routes/mainRoutes");
module.exports = {
    home: async (req, res) => {
        try {   
            res.render("index")
        } catch (error) {
            console.log(error);
        }
    },
   
    
}