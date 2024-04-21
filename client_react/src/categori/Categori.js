import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { getAllCategori, saveCategori, updateCategori, deleteCategori } from "./categoriAPI";
import "./Categori.css";

const Categori = () => {
    const { isAdmin } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategory, setNewCategory] = useState({ label: "", file: null });

    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getAllCategori();
            setCategories(data.sort((a, b) => a.id_categorie - b.id_categorie));
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories', error);
        }
    };

    const handleFileSelected = (event, category) => {
        category.file = event.target.files[0];
    };

    const addNewCategory = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('label', newCategory.label);
            if (newCategory.file) {
                formData.append('url', newCategory.file);
            }
            const data = await saveCategori(formData);
            setCategories([...categories, data]);
            setNewCategory({ label: "", file: null });
        } catch (error) {
            console.error("Erreur lors de l'ajout de la nouvelle catégorie", error);
        }
        setLoading(false);
    };

    const saveCategoryChanges = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('label', editingCategory.label);
            formData.append('id_categorie', editingCategory.id_categorie);
            if (editingCategory.file) {
                formData.append('url', editingCategory.file);
            }
            await updateCategori(formData);
            loadCategories();
            setEditingCategory(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la catégorie', error);
        }
        setLoading(false);
    };

    const startEditing = (category) => {
        setEditingCategory({ ...category });
    };

    const cancelEditing = () => {
        setEditingCategory(null);
    };

    const removeCategory = async (id) => {
        try {
            
            await deleteCategori(id);
            loadCategories();
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie', error);
        }
    };

    const handleProduct = (id) => {
        console.log(id);    
        navigate('/produit', { state: { id_categorie: id }});
    }

    return (
        <div className="Categori">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <h1>{isAdmin ? "Back Office Categories" : "Front Office Categories"}</h1>
            <h2>Liste des Catégories</h2>
            <div className="categories-container">
                {isAdmin && (
                    <div className="category-card">
                        <h3>Ajouter une nouvelle catégorie</h3>
                        <form onSubmit={addNewCategory}>
                            <div className="category-content">
                                <input type="text" value={newCategory.label} onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })} placeholder="Nom de la catégorie" required />
                                <input type="file" onChange={(e) => handleFileSelected(e, newCategory)} accept="image/*" required />
                                <button type="submit">Créer Catégorie</button>
                            </div>
                        </form>
                    </div>
                )}
                {categories.map((category) => (
                    <div key={category.id_categorie} className="category-card">
                        <div className="category-content">
                            {editingCategory && editingCategory.id_categorie === category.id_categorie ? (
                                <form onSubmit={(e) => saveCategoryChanges(e)}>
                                    <input type="text" value={editingCategory.label} onChange={(e) => setEditingCategory({ ...editingCategory, label: e.target.value })} />
                                    <input type="file" onChange={(e) => handleFileSelected(e, editingCategory)} accept="image/*" />
                                    <div className="update-button">
                                        <button type="submit">Sauvegarder</button>
                                        <button type="button" onClick={cancelEditing}>Annuler</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div onClick={() => handleProduct(category.id_categorie)}>
                                        <img src={category.url} alt={category.label} />
                                        <div className="category-label">{category.label}</div>
                                        {isAdmin && (
                                            <>
                                                <button onClick={() => startEditing(category)}>Modifier</button>
                                                <button onClick={() => removeCategory(category.id_categorie)}>Supprimer</button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}      
            </div>
        </div>
    );
};

export default Categori;
