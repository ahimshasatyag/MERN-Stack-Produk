const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
    try{
        const existingAdmin = await User.findOne({email:"admin@gmail.com"});
        if(!existingAdmin){
            const newAdmin = new User({
                email: "admin@gmail.com",
                nama: "Admin",
                password: await bcrypt.hash("admin", 10),
                role: "admin"
            })
            await newAdmin.save();
            console.log("Admin Berhasil Dibuat");
        }else{
            console.log("Admin Sudah Ada");
        }
    }catch (error){
        console.error(error.message);
    }
}

module.exports = createAdminAccount;