// categorieMethods.js

export function getCategories() {
    return fetch(`${process.env.VUE_APP_SERVER_URL}/categorie/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
    });
}

// categorieMethods.js

export async function getCategorieById(id) {
    try {
        console.log('id:', id);
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/categorie/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_categorie: id })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de la catégorie');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getCategorieById:', error);
        throw error; // Propage l'erreur pour la gérer au niveau supérieur si nécessaire
    }
}

