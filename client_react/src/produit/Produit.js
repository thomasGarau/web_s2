import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getProduitsForCategori, deleteProduit, updateProduit, addProduit } from "./ProduitAPI";
import {addProduitToPanier, deleteProduitFromPanier, getUserPanier} from "../panier/PanierAPI";
import { AuthContext } from '../context/AuthProvider';
import "./Produit.css";

const Produit = () => {
    const { isAdmin } = useContext(AuthContext);
    const [categoryId, setCategoryId] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduit, setNewProduit] = useState({ label: "", prix: 0, stock: 0, id_categorie: categoryId, file: null });
    const [cart, setCart] = useState({});
    const location = useLocation();
    const fileInputRef = useRef();


    useEffect(() => {
        const id = location.state?.id_categorie
        if (id) {
            setCategoryId(id);
            loadProducts(id);
        }
    }, [location.state]);

    async function loadProducts(categoryId) {
        setLoading(true);
        setCart({});
        getProduitsForCategori(categoryId)
        .then(setProducts)
        .catch(console.error)
        .finally(() => {
            getUserPanier()
                .then((data) => {
                    data.forEach((produit) => {
                        setCart((prevCart) => ({
                            ...prevCart,
                            [produit.id_produit]: produit.quantite
                        }));
                    });
                })
                .catch(console.error);
            setLoading(false);
        });
    }

    const handleEditStart = (product) => {
        setEditingProduct({ ...product });
    };

    const handleEditChange = (event, field) => {
        setEditingProduct(prev => ({ ...prev, [field]: event.target.value }));
    };

    const handleNewChange = (event, field) => {
        setNewProduit(prevState => ({
            ...prevState,
            [field]: event.target.value
        }));
    };
    
    const handleNewFileChange = (event) => {
        setNewProduit(prevState => ({
            ...prevState,
            file: event.target.files[0]
        }));
    };

    const handleEditSave = async (event) => {
        event.preventDefault();
        setLoading(true);
        await updateProduit(editingProduct.id_produit, editingProduct.label, editingProduct.prix, editingProduct.stock, editingProduct.url);
        await loadProducts(categoryId);
        setEditingProduct(null);
        setLoading(false);
    };

    const handleEditCancel = () => {
        setEditingProduct(null);
    };

    const handleAddToCart = (product) => {
        const newCart = { ...cart, [product.id_produit]: (cart[product.id_produit] || 0) + 1 };
        setCart(newCart);
        addProduitToPanier(product.id_produit)
    };

    const handleRemoveFromCart = (product) => {
        const newCart = { ...cart };
        if (newCart[product.id_produit] > 0) {
            newCart[product.id_produit]--;
            setCart(newCart);
            deleteProduitFromPanier(product.id_produit)
        }
    };

    const handleDeleteProduct = (product) => {
        deleteProduit(product.id_produit)
            .then(() => {
                setProducts(products.filter((p) => p.id_produit !== product.id_produit));
            })
            .catch(console.error);
    };

    const handleAddProduit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        const formData = new FormData();
        formData.append('label', newProduit.label);
        formData.append('prix', newProduit.prix);
        formData.append('id_categorie', categoryId);
        formData.append('stock', newProduit.stock);
        if (newProduit.file) {
            formData.append('url', newProduit.file, newProduit.file.name);
        }

        try {
            await addProduit(formData);
            await loadProducts(categoryId);
            setNewProduit({ label: "", prix: 0, stock: 0, id_categorie: categoryId, file: null});
            fileInputRef.current.value = "";
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
        }
    
        setLoading(false);
    };
    

    return (
        <div className="produits-main">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <h1>{isAdmin ? "Back Office Produits" : "Front Office Produits"}</h1>
            <div className="produits-liste">
                <div className="produits-container">
                    {isAdmin && (
                        <div className="category-card">
                            <h3>Ajouter une nouvelle catégorie</h3>
                            <form onSubmit={handleAddProduit}>
                                <div className="produit-content">
                                    <input type="text" value={newProduit.label} onChange={(e) => handleNewChange(e, "label")} placeholder="Nom du produit" required />
                                    <input type="number" value={newProduit.prix} onChange={(e) => handleNewChange(e, "prix")} placeholder="Prix" required />
                                    <input type="number" value={newProduit.stock} onChange={(e) => handleNewChange(e, "stock")} placeholder="Stock" required />
                                    <input type="file" ref={fileInputRef} onChange={(e) => handleNewFileChange(e)} required />
                                    <button type="submit">Ajouter</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {products.map((product) => (
                        <div key={product.id_produit} className="category-card">
                            {editingProduct && editingProduct.id_produit === product.id_produit ? (
                                <form onSubmit={handleEditSave} className="category-content">
                                    <input type="text" value={editingProduct.label} onChange={(e) => handleEditChange(e, 'label')} required />
                                    <input type="number" value={editingProduct.prix} onChange={(e) => handleEditChange(e, 'prix')} required />
                                    <input type="number" value={editingProduct.stock} onChange={(e) => handleEditChange(e, 'stock')} required />
                                    <div className="form-buttons">
                                        <button type="submit">Save</button>
                                        <button type="button" onClick={handleEditCancel}>Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <div className="category-content">
                                    <img src={product.url} alt={product.label} />
                                    <div>{product.label}</div>
                                    <div>{product.prix}</div>
                                    <div>{product.stock}</div>
                                    {isAdmin ? (
                                        <>
                                            <button onClick={() => handleEditStart(product)}>Edit</button>
                                            <button onClick={() => handleDeleteProduct(product)}>Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleAddToCart(product)}>+</button>
                                            {cart[product.id_produit] > 0 && (
                                                <>
                                                    <div>{cart[product.id_produit]}</div>
                                                    <button onClick={() => handleRemoveFromCart(product)}>-</button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Produit;
