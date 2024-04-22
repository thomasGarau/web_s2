// categorieMethods.js

export async function getCategories() {
    try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/categorie/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// categorieMethods.js

export async function getCategorieById(id) {
    try {
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


export async function getProduitsByCategorie(id) {
    try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/product/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_categorie: id })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des produits de la catégorie');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getProduitParCategorie:', error);
        throw error;
    }
}


export async function updateCategorie(formData) {
    const token = localStorage.getItem('token');
    const headers = new Headers({
        'Authorization': `Bearer ${token}`
    });

    try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/categorie/update`, {
            method: 'PUT',
            body: formData,
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response from server:', data);
        return data;
    } catch (error) {
        console.error('Error updating category:');
        throw error;
    }
}

export async function deleteCategorie(id) {
    const token = localStorage.getItem('token');
    const headers = new Headers({
        'Authorization': `Bearer ${token}`
    });

    // Using URLSearchParams to handle query parameters.
    const params = new URLSearchParams({ id_categorie: id.toString() });
    const url = `${process.env.VUE_APP_SERVER_URL}/categorie/delete?${params}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response from server:', data);
        return data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

export async function addCategorie(formData) {
    const token = localStorage.getItem('token');
    const headers = new Headers({
        'Authorization': `Bearer ${token}`
    });

    try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/categorie/add`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response from server:', data);
        return data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
}





