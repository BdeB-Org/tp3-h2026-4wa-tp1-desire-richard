requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerTravail() {
    try {
        const res = await apiFetch('/api/travail/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('id_cours').value = data.id_cours;
        document.getElementById('titre').value = data.titre;
        document.getElementById('description').value = data.description;
        document.getElementById('fichier').value = data.fichier;
        document.getElementById('echeance').value = data.echeance;
        document.getElementById('statut_remise').value = data.statut_remise;

    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id_cours = document.getElementById('id_cours').value.trim();
    const titre = document.getElementById('titre').value.trim();
    const description = document.getElementById('description').value.trim();
    const fichierInput = document.getElementById('fichier');
    const echeance = document.getElementById('echeance').value.trim();
    const statut_remise = document.getElementById('statut_remise').checked ? 'Remis' : 'Non remis';
    const fichier = fichierInput.files[0] ? fichierInput.files[0].name : '';


    try {
        const res = await apiFetch('/api/travail/' + id, {
            method: 'PUT',
            body: JSON.stringify({ id_cours, titre, description, fichier, echeance, statut_remise})
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeTravail.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID travail manquant', true);
} else {
    chargerTravail();
}
