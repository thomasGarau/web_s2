import axios from 'axios';
import api from '../config/axiosConfig';

export const getProduitsForCategori = async (id) => {
    try{
        const body = {
            id_categorie: id
        }
        const response = await axios.post(`http://localhost:3001/product/all`, body);
        return response.data;
    }catch(err){
        console.error('Erreur lors de la récupération des produits de la catégorie', err);
    }
};

export const deleteProduit = async (id_produit) => {
    try {
        const url = new URL('http://localhost:3001/product/delete');
        url.searchParams.append('id_produit', id_produit);
        const response = await api.delete(url, {
            method: 'DELETE'
        });
        return response.data;
    } catch (err) {
        console.error('Erreur lors de la suppression du produit', err);
    }
}

export const updateProduit = async (id_produit, label, prix, stock, url) => {
    try {
        const body = {
            id_produit: id_produit,
            label: label,
            prix: prix,
            stock: stock,
            url : url
        }
        const response = await api.put(`http://localhost:3001/product/update`, body);
        return response.data;
    } catch (err) {
        console.error('Erreur lors de la mise à jour du produit', err);
    }
};

export const addProduit = async (FormData) => {
    try {
        const headers =  {
            'Content-Type': 'multipart/form-data'
        }
        
        const response = await api.post(`http://localhost:3001/product/add`, FormData, {headers});
        return response.data;
    } catch (err) {
        console.error('Erreur lors de l\'ajout du produit', err);
    }
};