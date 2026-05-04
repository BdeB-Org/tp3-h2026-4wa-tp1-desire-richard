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
const travailRoutes = require("./routes/travailRoutes");
const authRoutes = require('./routes/authRoutes');

// APP.USE : Auteures = Bellandrade Désiré & Charlotte Richard

// APP.USE : Auteure = Bellandrade Désiré et Charlotte Richard
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/travail', travailRoutes);
app.use('/api/auth', authRoutes);


// VAR : Auteure = 


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


