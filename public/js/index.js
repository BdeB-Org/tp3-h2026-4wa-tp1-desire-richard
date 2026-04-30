requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyEtudiants');
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

async function chargerUtilisateurs() {
    try {
        const res = await apiFetch('/api/utilisateur');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(utilisateur => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${utilisateur.id}</td>
                <td>${escapeHtml(utilisateur.nom)}</td>
                <td>${escapeHtml(utilisateur.programme)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${utilisateur.id}">Modifier</a>
                    <button class="danger" onclick="supprimerUtilisateur(${utilisateur.id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
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
        const res = await apiFetch('/api/utilisateur', {
            method: 'POST',
            body: JSON.stringify({ type_utilisateur, prenom, nom, courriel, mot_de_passe })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Utilisateur ajouté avec succès');
        chargerEtudiants();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerEtudiant(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    try {
        const res = await apiFetch('/api/utilisateur/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerUtilisateurs();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerUtilisateurs();