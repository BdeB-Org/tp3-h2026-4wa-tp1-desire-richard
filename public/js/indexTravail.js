requireAuth();

const form = document.getElementById('formTravail');
const tbody = document.getElementById('tbodyTravaux');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

async function chargerTravail() {
    try {
        const res = await apiFetch('/api/travail');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(travail => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${travail.id}</td>
                <td>${escapeHtml(travail.id_cours)}</td>
                <td>${escapeHtml(travail.titre)}</td>
                <td>${escapeHtml(travail.description)}</td>
                <td>${escapeHtml(travail.fichier)}</td>
                <td>${escapeHtml(travail.echeance)}</td>
                <td>${escapeHtml(travail.statut_remise)}</td>
                <td>
                    <a class="btn-link" href="/editTravail.html?id=${travail.id}">Modifier</a>
                    <button class="danger" onclick="supprimerTravail(${travail.id})">Supprimer</button>
                </td>
            
                `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true)
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
        const response = await apiFetch('/api/travail', {
            method: 'POST',
            body: JSON.stringify({id_cours, titre, description, fichier, echeance, statut_remise })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erreur lors de la création du travail.');
        }

        form.reset();
        showMessage("Travail créé avec succès !");
        chargerTravail();
    } catch (error) {
        showMessage(err.message, true);
    }
});

async function deleteTravail(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce travail ?')) {
        return;
    }
    try {
        const response = await apiFetch('/api/travail/' + id, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            
            throw new Error(data.message || 'Erreur lors de la suppression du travail.');
        }

        showMessage("Travail supprimé avec succès !");
        chargerTravail();
    } catch (error) {
        showMessage(error.message, true);
    }
}

chargerTravail();