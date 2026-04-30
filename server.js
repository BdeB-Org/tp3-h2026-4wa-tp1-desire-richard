// VAR : Auteures = Bellandrade Désiré & Charlotte Richard
const express = require("express");

const path = require('path');

// VAR APP : Auteures = Bellandrade Désiré & Charlotte Richard
const app = express();
require('./config/database');

app.use(express.json());
app.use(express.static('public'));

// VAR : Auteure = Bellandrade Désiré
const utilisateurRoutes = require("./routes/utilisateurRoutes");
const authRoutes = require('./routes/authRoutes');



// APP.USE : Auteures = Bellandrade Désiré & Charlotte Richard

// APP.USE : Auteure = Bellandrade Désiré
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/auth', authRoutes);

// VAR : Auteure = Charlotte Richard
const travailRoutes = require("./routes/travailRoutes");

// APP.USE : Auteure = Charlotte Richard
// app.use('/api/travaux', travailRoutes);

// APP.GET : Auteure = Bellandrade Désiré
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// APP.LISTEN : Auteures = Bellandrade Désiré & Charlotte Richard
app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});


