<template>
  <div></div>
</template>
<script>
///import { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";
export default {
  data() {
    return {
      email: "ildocuema@gmail.com",
      password: "Ildo7Cuema",
    };
  },

  async created() {
    this.$firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((auth) => {
        let id = auth.user.uid;
        this.$firebase.firestore().collection("users").doc(id).set({
          nome: "Escola Tecnica de Saúde-Consultas",
          url_image: "",
          acesso: "SuperAdmin-dev",
          status: "activo",
        });
      });
    try {
      const user = getAuth();
      if (user.currentUser.email === "ildocuema@gmail.com") {
        return;
      } else {
        this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((auth) => {
            let id = auth.user.uid;
            this.$firebase.firestore().collection("users").doc(id).set({
              nome: "Escola Tecnica de Saúde-Consultas",
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
