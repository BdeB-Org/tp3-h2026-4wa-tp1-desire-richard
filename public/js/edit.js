// Auteure = Bellandrade Désiré


requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerUtilisateur() {
    try {
        const res = await apiFetch('/api/utilisateur/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        const utilisateur = data[0];

        document.getElementById('type_utilisateur').value = utilisateur.type_utilisateur;
        document.getElementById('prenom').value = utilisateur.prenom;
        document.getElementById('nom').value = utilisateur.nom;
        document.getElementById('courriel').value = utilisateur.courriel;
        document.getElementById('mot_de_passe').value = utilisateur.mot_de_passe;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const type_utilisateur = document.getElementById('type_utilisateur').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const courriel = document.getElementById('courriel').value.trim();
    const mot_de_passe = document.getElementById('mot_de_passe').value.trim();
    

    try {
        const res = await apiFetch('/api/utilisateur/' + id, {
            method: 'PUT',
            body: JSON.stringify({ type_utilisateur, prenom, nom, courriel, mot_de_passe })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/liste.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});


// Auteure : Charlotte Richard

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const type_utilisateur = document.getElementById('type_utilisateur').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const courriel = document.getElementById('courriel').value.trim();
    const mot_de_passe = document.getElementById('mot_de_passe').value.trim();

    try {
        const res = await apiFetch('/api/utilisateur/' + id, {
            method: 'PUT',
            body: JSON.stringify({ type_utilisateur, prenom, nom, courriel, mot_de_passe })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

// Auteure = Bellandrade Désiré

if (!id) {
    showMessage('ID utilisateur manquant', true);
} else {
    chargerUtilisateur();
}
