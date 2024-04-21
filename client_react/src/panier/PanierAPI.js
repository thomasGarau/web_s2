import api from '../config/axiosConfig';
import { getUserId } from '../services/user-service';

export const addProduitToPanier = async (id_produit) => {
    try{
        const id_utilisateur = await getUserId();
        const body = {
            id_utilisateur: id_utilisateur,
            id_produit: id_produit
        }
        const response = await api.post(`http://localhost:3001/panier/add`, body);
        return response.data;
    }catch(err){
        console.error('Erreur lors de l\'ajout du produit au panier', err);
    }
}

export const deleteProduitFromPanier = async (id_produit) => {
    try {
        const id_utilisateur = await getUserId();
        const url = new URL('http://localhost:3001/panier/deleteProduit');
        url.searchParams.append('id_utilisateur', id_utilisateur);
        url.searchParams.append('id_produit', id_produit);

        const response = await api.delete(url, {
            method: 'DELETE'
        });
        return await response.data;
    } catch (err) {
        console.error('Erreur lors de la suppression du produit du panier', err);
        throw new Error('Failed to delete product from cart');
    }
}


export const getUserPanier = async () => {
    try{
        const id_utilisateur = await getUserId();
        const body = {
            id_utilisateur: id_utilisateur
        }
        const response = await api.post(`http://localhost:3001/panier/get`, body);
        return response.data;
    }catch(err){
        console.error('Erreur lors de la récupération du panier', err);
    }
}