import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Création de l'application Vue
const app = createApp(App);

// Utilisation du routeur avec l'application Vue
app.use(router);

// Montage de l'application Vue dans l'élément HTML avec l'id 'app'
app.mount('#app');
