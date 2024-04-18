<!-- CategoryPage.vue -->

<template>
    <div>
        <h2 v-if="categorie">{{ categorie.label }}</h2>
    </div>
</template>

  
  <script>
  import { ref, onMounted } from 'vue';
  import { getCategorieById } from '../scripts/categorieMethods';
  
  export default {
    props: ['id_categorie'],
    setup(props) {
        console.log('props' , props);
      const categorie = ref(null);
  
      onMounted(async () => {
        categorie.value = await getCategorieById(props.id_categorie);
        console.log('cat' , categorie);
      });
  
      return { categorie };
    }
  };
  </script>
  