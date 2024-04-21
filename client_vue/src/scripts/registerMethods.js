// scripts/registerMethods.js
export const data = () => ({
    credentials: {
      email: '',
      password: '',
      name: '',
      firstname: ''
    },
    passwordConfirm: '',
    errorMessage: ''
  });

  export const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
  
  export const isValidName = (name) => {
    return /^[A-Za-z ']+$/.test(name);
  };

  export const isPasswordValid = (password) => {
      if (password.length < 12) {
          return false;
      }
  
      const containsUpperCase = /[A-Z]/.test(password);
      const containsLowerCase = /[a-z]/.test(password);
      const containsNumber = /[0-9]/.test(password);
      const containsSpecialChar = /[^A-Za-z0-9]/.test(password);
  
      return containsUpperCase && containsLowerCase && containsNumber && containsSpecialChar;
  };
  
  
  
  export function register() {
    if (!isValidEmail(this.credentials.email)) {
      this.errorMessage = "L'adresse email n'est pas valide.";
      return;
    }
    if (!isValidName(this.credentials.name) || !isValidName(this.credentials.firstname)) {
      this.errorMessage = "Les noms doivent contenir uniquement des lettres et avoir une longueur maximale de 255 caractères.";
      return;
    }
    if (!isPasswordValid(this.credentials.password)) {
      this.errorMessage = "Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
      return;
    }
    if (this.credentials.password !== this.passwordConfirm) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }
    this.errorMessage = ''; 
    this.submitRegistration(this.credentials);
  }
  
  
  export function submitRegistration(credentials) {
      fetch(`${process.env.VUE_APP_SERVER_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
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
        this.errorMessage = "Une erreur s'est produite lors de l'inscription.";
      });
  }
  