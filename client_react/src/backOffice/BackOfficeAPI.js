import axios from 'axios'; 
import api from '../config/axiosConfig';

export const getUserInfo = async () => {
    try {
        const response = await api.get(`http://localhost:3001/user/getAll`);
        console.log(response.data);
        return response.data;
    }catch(error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
    }
}

export const updateUser = async (id_utilisateur, nom, prenom, role, email) => {
    try{
        const body = {
            id_user: id_utilisateur,
            nom: nom,
            prenom: prenom,
            role: role,
            email: email
        }
        const response = await api.post(`http://localhost:3001/user/update`, body);
        return response.data;
    }catch(error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    
    }
}
 
export const deleteUser = async (id) => {
    try{
        const url = new URL('http://localhost:3001/user/delete');
        url.searchParams.append('id_user', id);
        const response = await api.delete(url, {
            method: 'DELETE'
        });
        
        return response.data;
    }catch(error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
    }
}