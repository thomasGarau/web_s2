import api from '../config/axiosConfig';

export const getAllCategori = async () => {
    const response = await api.get('/categorie/all');
    return response.data;
}

export const saveCategori = async (formData) => {
    const response = await api.post('/categorie/add', formData);
    return response.data;
}

export const updateCategori = async (formData) => {
    const response = await api.put('/categorie/update', formData);
    return response.data;
}

export const deleteCategori = async (id) => {
    const body = { id_categorie: id };
    const response = await api.delete(`/categorie/delete?id_categorie=${id}`);
    return response.data;
}
