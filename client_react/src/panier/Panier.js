import React, { useEffect, useState } from "react";
import { addProduitToPanier, deleteProduitFromPanier, getUserPanier, deleteEntieryProduitFromPanier, viderPanierUtilisateur, getPanierWithPrice } from './PanierAPI';
import "./Panier.css"; // Assurez-vous que le fichier CSS est bien lié

const Panier = () => {
    const [panier, setPanier] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        chargerPanier();
    }, []);

    const chargerPanier = async () => {
        try {
            const items = await getPanierWithPrice();
            setPanier(items);
            calculerTotal(items);
            console.log(items);
        } catch (error) {
            console.error('Erreur lors de la récupération du panier', error);
        }
    };

    const ajouterAuPanier = async (id_produit) => {
        try {
            await addProduitToPanier(id_produit);
            chargerPanier();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit au panier', error);
        }
    };

    const enleverDuPanier = async (id_produit) => {
        try {
            await deleteProduitFromPanier(id_produit);
            chargerPanier();
        } catch (error) {
            console.error('Erreur lors de la suppression du produit du panier', error);
        }
    };

    const supprimerProduitPanier = async (id_produit) => {
        try {
            await deleteEntieryProduitFromPanier(id_produit);
            chargerPanier();
        } catch (error) {
            console.error('Erreur lors de la suppression du produit du panier', error);
        }
    }

    const calculerTotal = (items) => {
        const totalCalcule = items.reduce((acc, item) => acc + item.produit.prix * item.quantite, 0);
        setTotal(totalCalcule);
    };

    const viderPanier = async () => {
        try {
            await viderPanierUtilisateur();
            chargerPanier();
        } catch (error) {
            console.error('Erreur lors de la suppression du panier', error);
        }
    }

    return (
        <div className="panier-list">
            <h2>Panier</h2>
            <div className="panier-container">
                {panier && panier.map(item => (
                    <div key={item.produit.id_produit} className="panier-card"> {/* Changez 'panier.id_produit' par 'item.produit.id_produit' */}
                        <div className="panier-content">
                            <img src={item.produit.url} alt={item.produit.label} />
                            <div>{item.produit.label}</div>
                            <div>{item.produit.prix} €</div>
                            <div>
                                <button onClick={() => ajouterAuPanier(item.produit.id_produit)}>+</button>
                                {item.quantite} {/* Modifier 'produit.quantite' par 'item.quantite' */}
                                <button onClick={() => enleverDuPanier(item.produit.id_produit)}>-</button>
                            </div>
                            <button onClick={() => supprimerProduitPanier(item.produit.id_produit)}>
                                Enlever du panier
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total">
                {panier && panier.length > 0 ? (
                    <>
                        <div>Nombre de produits: {panier.length}</div>
                        <div>Total: {total} €</div>
                        <button onClick={viderPanier}>Vider le panier</button>
                    </>
                ) : (
                    <div>Votre panier est vide</div>
                )}
            </div>
        </div>
    );
    
};

export default Panier;
