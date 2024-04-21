import React, { useEffect, useState } from "react";
import { getUserInfo, deleteUser, updateUser } from './BackOfficeAPI';
import "./BackOffice.css"; // Assurez-vous d'avoir un fichier CSS correspondant

const BackOffice = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [userBackup, setUserBackup] = useState({});

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getUserInfo();
            setUsers(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs", error);
        }
        setLoading(false);
    };

    const handleEdit = (user) => {
        setUserBackup({ ...user });
        setEditUserId(user.id_utilisateur);
    };

    const handleCancel = (id_utilisateur) => {
        setUsers(users.map(user => user.id_utilisateur === id_utilisateur ? userBackup : user));
        setEditUserId(null);
    };

    const handleSave = async (e, user) => {
        e.preventDefault();
        try {
            await updateUser(user.id_utilisateur, user.nom, user.prenom, user.role, user.email);
            setEditUserId(null);
            loadUsers();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur", error);
        }
    };

    const handleDelete = async (id_utilisateur) => {
        try {
            await deleteUser(id_utilisateur);
            loadUsers();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
        }
    };

    const handleChange = (e, field) => {
        const { value } = e.target;
        setUsers(users.map(user => user.id_utilisateur === editUserId ? { ...user, [field]: value } : user));
    }

    return (
        <div className="user-list">
            <h2>Utilisateurs</h2>
            <div className="user-container">
                {users && users.map(user => (
                    <div key={user.id_utilisateur} className="user-card">
                        {editUserId === user.id_utilisateur ? (
                            <form onSubmit={(e) => handleSave(e, user)}>
                                <div className="user-content">
                                    <input type="text" value={user.nom} onChange={(e) => handleChange(e, 'nom')} required />
                                    <input type="text" value={user.prenom} onChange={(e) =>  handleChange(e, 'prenom') } required />
                                    <input type="email" value={user.email} onChange={(e) =>  handleChange(e, 'email') } required />
                                    <select value={user.role} onChange={(e) =>  handleChange(e, 'role') } required>
                                        <option value="admin">Admin</option>
                                        <option value="client">Client</option>
                                    </select>
                                    <button type="submit">Sauvegarder</button>
                                    <button type="button" onClick={() => handleCancel(user.id_utilisateur)}>Annuler</button>
                                </div>
                            </form>
                        ) : (
                            <div className="user-content">
                                <div>{user.nom}</div>
                                <div>{user.prenom}</div>
                                <div>{user.email}</div>
                                <div>{user.role}</div>
                                <button onClick={() => handleEdit(user)}>Modifier</button>
                                <button onClick={() => handleDelete(user.id_utilisateur)}>Supprimer</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BackOffice;
