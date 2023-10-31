<template>
  <div></div>
</template>
<script>
///import { getAuth } from "firebase/auth";
export default {
  data() {
    return {
      email: "ildocuema@gmail.com",
      password: "Ildo7Cuema",
    };
  },

  async created() {
    try {
      const user = await this.$firebase
        .firestore()
        .collection("users")
        .where("nome", "==", "Escola Tecnica - Consultas")
        .get();

      if (!user.empty) {
        return;
      } else {
        this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((auth) => {
            let id = auth.user.uid;
            this.$firebase.firestore().collection("users").doc(id).set({
              nome: "Escola Tecnica - Consultas",
              url_image: "",
              acesso: "SuperAdmin-dev",
              status: "activo",
            });
          });
      }
    } catch (e) {
      if (e instanceof TypeError) {
        console.log(TypeError);
      }
    }
  },
};
</script>
