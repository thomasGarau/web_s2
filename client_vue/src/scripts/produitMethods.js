export async function AddProductToPanier(id_produit, id_utilisateur, token){
    try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/panier/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_produit: id_produit, id_utilisateur: id_utilisateur })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout du produit au panier');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in AddProductToPanier:', error);
        throw error;
    }
}

export async function RemoveProductFromPanier(id_produit, id_utilisateur, token) {
    try {
        // Construct the URL with query parameters
        const url = new URL(`${process.env.VUE_APP_SERVER_URL}/panier/deleteProduit`);
        url.searchParams.append('id_produit', id_produit);
        url.searchParams.append('id_utilisateur', id_utilisateur);

        const response = await fetch(url, {  // Use the constructed URL
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // No body needed as parameters are in the URL
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du produit du panier');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in RemoveProductFromPanier:', error);
        throw error;
    }
}


export async function getPanierByUser(id_utilisateur, token) {
    try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/panier/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_utilisateur: id_utilisateur })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du panier');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getPanierByUser:', error);
        throw error;
    }
}

export async function getProduitPanier (id_utilisateur, token) {
    try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/panier/getPanierPrice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_utilisateur: id_utilisateur })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des produits du panier');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getProduitPanier:', error);
        throw error;
    }
}

export async function RemoveProduct(id_produit, id_utilisateur, token) {
    try {
        const url = new URL(`${process.env.VUE_APP_SERVER_URL}/panier/RemoveFromPanier`);
        url.searchParams.append('id_produit', id_produit);
        url.searchParams.append('id_utilisateur', id_utilisateur);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du produit du panier');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in RemoveProduct:', error);
        throw error;
    }
}

export async function ClearPanier(id_utilisateur, token) {
    try {

        const url = new URL(`${process.env.VUE_APP_SERVER_URL}/panier/delete`);
        url.searchParams.append('id_utilisateur', id_utilisateur);


        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_utilisateur: id_utilisateur })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du panier');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in ClearPanier:', error);
        throw error;
    }
}