<template>
    <NavBar />
    <div class="user-list">
      <h2>Utilisateurs</h2>
      <div class="user-container">
        <div v-for="user in utilisateurs" :key="user.id" class="user-card">
          <template v-if="user.enEdition">
            <form @submit.prevent="saveUser(user)">
              <div class="user-content">
                <input type="text" v-model="user.nom" name="nom" placeholder="Nom" required>
                <input type="text" v-model="user.prenom" name="prenom" placeholder="Prénom" required>
                <input type="email" v-model="user.email" name="email" placeholder="Email" required>
                <select v-model="user.role" name="role" required>
                  <option value="admin">Admin</option>
                  <option value="client">Client</option>
                </select>
                <button type="submit">Sauvegarder</button>
                <button type="button" @click="annulerEdition(user)">Annuler</button>
              </div>
            </form>
          </template>
          <div v-else class="user-container">
            <div class="user-content">
              <div>{{ user.nom }}</div>
              <div>{{ user.prenom }}</div>
              <div>{{ user.email }}</div>
              <div>{{ user.role }}</div>
              <button @click="modifierUtilisateur(user)">Modifier</button>
              <button @click="supprimerUtilisateur(user)">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import NavBar from '../components/NavBar.vue';
  import { getUsers, updateUser, deleteUser } from '../scripts/userMethods';
  
  export default {
    setup() {
      const utilisateurs = ref([]);

      const fetchUsers = async () => {
        utilisateurs.value = await getUsers();
        console.log(utilisateurs.value);
      };

      onMounted(() => {
        fetchUsers();
      });
  
      return {
        utilisateurs,
        fetchUsers
      };
    },
    data() {
      return {
        loading: false
      };
    },
    methods: {
      saveUser(user) {
        this.loading = true;
        updateUser(user)
          .then(() => {
            user.enEdition = false;
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.loading = false;
            this.fetchUsers();
          });

      },
        annulerEdition(user) {
            user.enEdition = false;
        },
        modifierUtilisateur(user) {
            user.enEdition = true;
        },
        supprimerUtilisateur(user) {
            deleteUser(user.id_utilisateur)
                .then(() => {
                    this.fetchUsers();
                })
                .catch((error) => {
                    console.error(error);
                });

        }

    },
    components: {
      NavBar
    }
  };
  </script>
  
  <style>

:root {
    --primary-color: #BAF6E8; 
    --secondary-color: #68c4af; 
    --dark-primary-color: #55a190;
  } 

  .user-list {
  padding: 20px;
  margin-top: 150px;
}

.user-list h2 {
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 40px;
  margin-bottom: 20px;
}

.user-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.user-card {
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  width: 250px;
  height: 250px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-card:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.user-content {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 10px;
}

input[type="text"], input[type="number"], input[type="file"] {
  width: 90%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;
}

button, input[type="file"]::file-selector-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: var(--secondary-color);
  color: white;
  cursor: pointer;
}

button:hover, input[type="file"]::file-selector-button:hover {
  background-color: var(--dark-primary-color);
}

input[type="file"] {
  color: #222245;
  background-color: #fff;
}

input[type="file"]::file-selector-button {
  background-color: var(--secondary-color)
}

  </style>
  