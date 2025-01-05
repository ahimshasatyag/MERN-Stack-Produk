const bcrypt = require("bcrypt");
const User = require("../models/user");
const {generateToken} = require("../utils/jwtutils");

async function register(email, password) {
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw new Error("User tidak ditemukan");
        }
        const isPasswordValid = bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid){
            throw new Error("Password salah");
        }
        const token = generateToken(existingUser);
        return token;
    } catch (error){
        console.log("Login error:", error.message);
        throw new Error("Kredensial Gagal");
    }
}

module.exports = {
    register
}