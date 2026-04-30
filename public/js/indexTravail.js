requireAuth();

const form = document.getElementById('formTravail');
const tbody = document.getElementById('tbodyTravaux');
const message = document.getElementById('message');

function displayMessage(text, isError = false) {
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

async function loadTravaux() {
    try {
        const response = await apiFetch('/api/travaux');
        const dataTravaux = await response.json();

        tbody.innerHTML = '';
        dataTravaux.forEach(travail => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${escapeHtml(travail.titre)}</td>
                <td>${escapeHtml(travail.description)}</td>
                <td>${escapeHtml(travail.fichier)}</td>
                <td>${escapeHtml(travail.date)}</td>
                <td>${escapeHtml(travail.statu_remise)}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        displayMessage('Erreur lors du chargement des travaux.', true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titre = document.getElementById('titre').value.trim();
    const description = document.getElementById('description').value.trim();
    const fichierInput = document.getElementById('fichier');
    const echance = document.getElementById('echance').value.trim();
    const statu_remise = document.getElementById('statu_remise').checked ? 'Remis' : 'Non remis';
    const fichier = fichierInput.files[0] ? fichierInput.files[0].name : '';

    try {
        const response = await apiFetch('/api/travaux', {
            method: 'POST',
            body: JSON.stringify({ titre, description, fichier, date: echance, statu_remise })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erreur lors de la création du travail.');
        }

        form.reset();
        displayMessage("Travail créé avec succès !");
        loadTravaux();
    } catch (error) {
        displayMessage(error.message, true);
    }
});

async function deleteTravail(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce travail ?')) {
        return;
    }
    try {
        const response = await apiFetch(`/api/travaux/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            
            throw new Error(data.message || 'Erreur lors de la suppression du travail.');
        }

        displayMessage("Travail supprimé avec succès !");
        loadTravaux();
    } catch (error) {
        displayMessage(error.message, true);
    }
}

loadTravaux();