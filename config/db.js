const mongoose = require("mongoose");

mongoose
    .connect("mongodb://0.0.0.0:27017/Freemopay", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB reussie"))
    .catch((err) => console.log("Connexion echouee :", err));
