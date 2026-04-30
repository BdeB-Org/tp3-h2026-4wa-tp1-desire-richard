// Auteure = Bellandrade Désiré
const db = require('../config/database');

// Opération : create -> select -> get
// Auteure = Bellandrade Désiré
exports.getUtilisateur = (req,res)=>{
    db.all('SELECT * FROM utilisateur',(err,rows)=>{
        res.json(rows);
    });
};

// Opération : GET ID
// Auteure = Bellandrade Désiré
exports.getUtilisateurID = (req, res)=>{
    const id = req.params.id;
    db.all('SELECT * FROM Utilisateur WHERE id = ?', [id], (err, rows)=>{
        if(err){
                return res.status(500).json({ erreur: err.message });
            }
        
        res.json(rows);
    } )
}

// opération POST -> Ajout -> insertion
// Auteure = Bellandrade Désiré
exports.addUtilisateur = (req,res)=>{
    const type_utilisateur = req.body.type_utilisateur;
    const prenom = req.body.prenom;
    const nom = req.body.nom;
    const courriel = req.body.courriel;
    const mot_de_passe = req.body.mot_de_passe;
    console.log("Insertion:",type_utilisateur, prenom, nom, courriel, mot_de_passe);

        db.run(
            "INSERT INTO utilisateur(type_utilisateur, prenom, nom, courriel, mot_de_passe) VALUES (?,?,?,?,?)", [type_utilisateur, prenom, nom, courriel, mot_de_passe],
            function(err){
                if(err){
                    console.log(err);
                    return res.status(500).json({erreur:err.message});
                }
                res.json({
                    message:"Utilisateur ajouté",
                    id:this.lastID
                });
            }
        );
    };

// Opération UPDATE
// Auteure = Bellandrade Désiré
exports.updateUtilisateur = (req, res) => {
    const id = req.params.id;
    const { type_utilisateur, prenom, nom, courriel, mot_de_passe } = req.body;
    db.run(
        'UPDATE utilisateur SET type_utilisateur=?, prenom=?, nom=?, courriel=?, mot_de_passe=? WHERE id=?', [type_utilisateur, prenom, nom, courriel, mot_de_passe, id],
        function(err){
            if(err){
                return res.status(500).json({ erreur: err.message });
            }
            res.json({
                message: "Utilisateur modifié",
                id: id
            });
        }
    );
};

// Opération DELETE
// Auteure = Bellandrade Désiré
exports.deleteUtilisateur = (req, res) => {
    const id = req.params.id;
    // Vérifier que l'id est fourni
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    // Exécuter la requête SQL avec callback
    db.run(
        'DELETE FROM utilisateur WHERE id = ?', [id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            // Vérifier si une ligne a été supprimée
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet ID" });
            }
            res.json({ message: "Utilisateur supprimé", id: id });
        }
    );
};