export async function getUsers() {
    try {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': `Bearer ${token}`
        });

        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/user/getAll`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getUsers:', error);
        throw error;
    }
}

export async function updateUser(user) {
    try {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        const body = JSON.stringify({
            id_user: user.id_utilisateur, // Assurez-vous que le nom de cette propriété correspond à ce que votre API attend
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            role: user.role
        });

        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/user/update`, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in updateUser:', error);
        throw error;
    }
}

export async function deleteUser(id_user) {
    try {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        const params = new URLSearchParams({id_user : id_user});
        const url = `${process.env.VUE_APP_SERVER_URL}/user/delete?${params}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error in deleteUser:', error);
        throw error;
    }
}