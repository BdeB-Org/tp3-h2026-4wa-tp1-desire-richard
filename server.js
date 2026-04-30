// VAR : Auteures = Bellandrade Désiré & Charlotte Richard
const express = require("express");

// VAR APP : Auteures = Bellandrade Désiré & Charlotte Richard
const app = express();

// VAR : Auteure = Bellandrade Désiré
const utilisateurRoutes = require("./routes/utilisateurRoutes");

// APP.USE : Auteures = Bellandrade Désiré & Charlotte Richard
app.use(express.json());

// APP.USE : Auteure = Bellandrade Désiré
app.use("/", utilisateurRoutes);

// VAR : Auteure = Charlotte Richard
const travailRoutes = require("./routes/travailRoutes");

// APP.USE : Auteure = Charlotte Richard
app.use("/", travailRoutes);

// APP.LISTEN : Auteures = Bellandrade Désiré & Charlotte Richard
app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
