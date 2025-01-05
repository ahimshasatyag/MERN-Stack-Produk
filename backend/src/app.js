const express = require("express");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const createAdminAccount = require("./scripts/admin");
const produk = require("./routes/produk");
const customer = require("./routes/customer");
const purchase = require("./routes/purchase");
const history = require("./routes/history");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", loginRoute);
app.use("/auth", registerRoute);
app.use("/api", userRoute);
app.use("/apiproduk", produk);
app.use("/apicustomer", customer);
app.use("/apipurchase", purchase);
app.use("/apihistory", history);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})