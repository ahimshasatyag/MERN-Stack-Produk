const authService = require("../services/register");

async function register(req, res) {
    try{
        const {email, password} = req.body;
        const token = await authService.register(email, password);
        res.json({token: token});
    } catch (error){
        res.status(401).json({message: "Kredensial Gagal"});
    }
}

module.exports = {
    register
};