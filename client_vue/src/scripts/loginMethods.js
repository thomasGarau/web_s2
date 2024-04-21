export const data = () => ({
    credentials: {
      email: '',
      password: ''
    },
    errorMessage: ''
  });


  export function login() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.credentials)
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('id', data.id_utilisateur);
        this.$router.push('/menu');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  export function isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }