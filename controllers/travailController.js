// Auteure Charlotte Richard

const db = require('../config/database');

// Opération : create -> select -> get

exports.getTravail = (req, res) => {
    db.all('SELECT * FROM travail', (err, rows) => {
        res.json(rows);
    });
};


// Opération : GET ID
exports.getTravailByID = (req, res) => {
    const id = req.params.id;
    db.all('SELECT * FROM travail WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Erreur serveur" });
        }
        res.json(row);
    });
};

// opération POST -> Ajout -> insertion
exports.addTravail = (req, res) => {
    const id_cours = req.body.id_cours;
    const {titre,description} = req.body;
    const fichier = req.body.fichier;
    const echeance = req.body.echeance;
    const statut_remise = req.body.statut_remise;

    if (!titre || !description) {
                return res.status(400).json({ message: "Champs requis manquants" });
    }
    
    db.run('INSERT INTO travail (id_cours, titre, description, fichier, echeance, statut_remise) VALUES (?, ?, ?, ?, ?, ?)', [id_cours, titre, description, fichier, echeance, statut_remise],
        function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Erreur serveur" });
            }
            
            res.json({ 
                message: "Travail ajouté", 
                id: this.lastID 
            });
    });
};

// Opération UPDATE 
exports.updateTravail = (req, res) => {
    const id = req.params.id;
    const { id_cours, titre, description, fichier, echeance, statut_remise } = req.body;

    db.run('UPDATE travail SET id_cours = ?, titre = ?, description = ?, fichier = ?, echeance = ?, statut_remise = ? WHERE id = ?', [id_cours, titre, description, fichier, echeance, statut_remise, id], 
        function(err) {
            if (err) {
                return res.status(500).json({ message: "Erreur serveur" });
            }
            res.json({ 
                message: "Travail mis à jour", 
                id: id 
            });
    });
};

// Opération DELETE
exports.deleteTravail = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run('DELETE FROM travail WHERE id = ?', [id], 
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erreur serveur" });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun travail trouvé avec cet ID" });
            }
            res.json({ 
                message: "Travail supprimé", 
                id: id
            });
    });
};