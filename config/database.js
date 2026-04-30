// Auteures = Bellandrade Désiré & Charlotte Richard
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erreur SQLite :', err.message);
    } else {
        console.log('Connecté à SQLite');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS utilisateur (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type_utilisateur TEXT,
            prenom TEXT,
            nom TEXT,
            courriel TEXT UNIQUE,
            mot_de_passe TEXT
        )
    `);

    db.run(
        "INSERT OR IGNORE INTO utilisateur (courriel, mot_de_passe) VALUES (?, ?)",
        ['belldesire@bdeb.qc.ca', 'admin']
    );
});

module.exports = db;