requireAuth();

const tbody = document.getElementById('tbodyTravaux');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
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
        showMessage(err.message, true);
    }
}

async function supprimerTravail(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce Travail ?')) return;

    try {
        const res = await apiFetch('/api/travail/' + id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerTravail();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerTravail();
