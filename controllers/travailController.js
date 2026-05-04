// Auteure Charlotte Richard

const { json } = require('express');
const db = require('../config/database');

// Opération : create -> select -> get

exports.getTravail = (req, res) => {
    db.all('SELECT * FROM travail ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).json({message: err.message});
        res.json(rows);
    });
};


// Opération : GET ID
exports.getTravailByID = (req, res) => {
    db.all('SELECT * FROM travail WHERE id = ?', [req.params.id], 
        (err, row) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        if (!row) return res.status(404).json({message: "Travail non trouvé"});
        res.json(row);
    });
};

// opération POST -> Ajout -> insertion
exports.addTravail = (req, res) => {
    const {id_cours, titre, description, fichier, echeance, statut_remise} = req.body;

    if (!id_cours||!titre || !description || !fichier || !echeance || !statut_remise) {
                return res.status(400).json({ message: "Champs requis manquants" });
    }
    
    db.run('INSERT INTO travail (id_cours, titre, description, fichier, echeance, statut_remise) VALUES (?, ?, ?, ?, ?, ?)', 
        [id_cours, titre, description, fichier, echeance, statut_remise],
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
   
    const { id_cours, titre, description, fichier, echeance, statut_remise } = req.body;

    if (!id_cours||!titre || !description || !fichier || !echeance || !statut_remise) {
        return res.status(400).json({ message: "Champs requis manquants" });
    }

    db.run(
        'UPDATE travail SET id_cours = ?, titre = ?, description = ?, fichier = ?, echeance = ?, statut_remise = ? WHERE id = ?', 
        [id_cours, titre, description, fichier, echeance, statut_remise, req.params.id], 
        function(err) {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            if (this.changes === 0) return res.status(404).json({message: "Travail non trouvé"});
            res.json({ 
                message: "Travail mis à jour", 
                id: id 
            });
    });
};

// Opération DELETE
exports.deleteTravail = (req, res) => {
    
    if (!req.params.id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run('DELETE FROM travail WHERE id = ?', [req.params.id], 
        function(err) {
            if (err) return res.status(500).json({ message: "Erreur serveur" });
            if (this.changes === 0) return res.status(404).json({ message: "Aucun travail trouvé avec cet ID" });
            
            res.json({ 
                message: "Travail supprimé", 
                id: req.params.id
            });
    });
};