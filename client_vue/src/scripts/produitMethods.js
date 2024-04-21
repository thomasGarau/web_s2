export async function AddProductToPanier(id_produit, id_utilisateur, token){
    try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/panier/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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