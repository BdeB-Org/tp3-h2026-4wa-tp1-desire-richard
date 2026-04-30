// Auteure = Bellandrade Désiré

const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { courriel, mot_de_passe } = req.body;

    db.get(
        "SELECT * FROM utilisateur WHERE courriel = ? AND mot_de_passe = ?",
        [courriel, mot_de_passe],
        (err, utilisateur) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (!utilisateur) {
                return res.status(401).json({ message: 'Courriel ou mot de passe invalide' });
            }

            const token = jwt.sign(
                { id: utilisateur.id, courriel: utilisateur.courriel },
                'secretkey',
                { expiresIn: '2h' }
            );

            res.json({
                message: 'Connexion réussie',
                token : token,
                courriel: utilisateur.courriel
            });
        }
    );
};


// exports.pTravail = (req, res) => { 
//     const {titre, description, date, statu_remise} = req.body;
//     db.get(
//         "INSERT INTO travaux (titre, description, date, statu_remise) VALUES (?, ?, ?, ?)",
//         [titre, description, date, statu_remise],
//         (err, user) => {
//             if (err) {
//                 return res.status(500).json({ message: err.message });
//             }

//             if (!user) {
//                 return res.status(401).json({ message: 'Erreur lors de l\'ajout du travail' });
//             }

//             const token = jwt.sign(
//                 { id: user.id, courriel: user.courriel },
//                 'secretkey',
//                 { expiresIn: '2h' }
//             );

<<<<<<< HEAD
            res.json({
                message: 'Travail ajouté avec succès',
                token ,      
            });
        }
    );
};
=======
//             res.json({
//                 message: 'Travail ajouté avec succès',
//                 token,      
//             });
//         }
//     );
// };
>>>>>>> 785c1fdb7e86ba2e6b0a7aa7bd8202b5038595ea
