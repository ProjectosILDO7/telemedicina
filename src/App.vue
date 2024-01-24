<template>
  <div id="app">
    <preloading />
    <div v-if="isLoged">
      <router-view />
    </div>
    <div v-else>
      <nav-bar />
      <router-view />
      <footer-component />
      <!-- <seed-database-vue /> -->
    </div>
  </div>
</template>

<script>
import preloading from "./components/preloading/PreloadingComponent.vue";
import FooterComponent from "./components/footer/FooterComponent.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "./components/navBar/navBar.vue";
// import seedDatabaseVue from "./components/sementeDatabase/seedDatabase.vue";
export default {
  name: "app-home",
  components: { preloading, FooterComponent, NavBar },
  data() {
    return {
      isLoged: false,
      image_perfil_url_global: "",
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      window.uid = user ? user.uid : null;
      this.isLoged = !!user;
      this.$router
        .push({ name: window.uid ? "dashboard" : "login" })
        .catch(() => {});
      setTimeout(() => {
        this.$root.$emit("loading::hide");
      }, 300);
    });
  },
};
</script>

<style></style>
