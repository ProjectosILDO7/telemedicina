<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">ASS-MÉDICA</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon text-light"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link active text-link-color"
              aria-current="page"
              :to="{ name: 'painel-control' }"
              ><i class="fa fa-home"></i> Home</router-link
            >
          </li>

          <li class="nav-item">
            <router-link
              v-if="acesso == 'SuperAdmin-dev' || acesso == 'admin-medicina'"
              class="nav-link text-link-color"
              :to="{ name: 'cursos-page' }"
              ><i class="fa fa-graduation-cap"></i> Cursos</router-link
            >
            <router-link
              v-else-if="acesso == 'estudante'"
              class="nav-link text-link-color"
              to="#"
              ><i class="fa fa-graduation-cap"></i> Meus cursos</router-link
            >
            <router-link
              v-else-if="acesso == 'paciente'"
              class="nav-link text-link-color"
              :to="{ name: 'consulta-page' }"
              ><i class="fa-solid fa-heart"></i> Marcar consulta</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              v-if="acesso == 'SuperAdmin-dev' || acesso == 'admin-medicina'"
              class="nav-link text-link-color"
              :to="{ name: 'estudantes' }"
              ><i class="fa-solid fa-chalkboard-user"></i>
              Estudantes</router-link
            >
          </li>
        </ul>

        <ul class="navbar-nav m-auto">
          <li class="nav-item" v-if="acesso == 'SuperAdmin-dev'">
            <router-link
              class="nav-link text-link-color"
              :to="{ name: 'messages-page' }"
              ><i class="fa-solid fa-envelope"></i>
              <sup
                ><span
                  class="rounded-pill py-1 px-1 bg-success text-light small"
                >
                  <strong>{{ totalMessage }}</strong>
                </span></sup
              ></router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="acesso == 'medico' || acesso == 'enfermeiro'"
          >
            <router-link
              class="nav-link text-link-color"
              :to="{ name: 'doentes' }"
              ><i class="fa-solid fa-bell"></i
              ><sup>
                <span
                  class="rounded-pill py-1 px-1 bg-success text-light small"
                >
                  <strong>{{ totalNotify }}</strong>
                </span>
              </sup></router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link text-link-color"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span v-if="url_image">
                <img :src="url_image" class="rounded-circle" />
              </span>
              <span v-else>
                <i class="fa-solid fa-circle-user"></i>
              </span>
              Ola! <strong>{{ nome }}</strong>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'perfil-page' }"
                  ><i class="fa-solid fa-user"></i> Meu perfil</router-link
                >
              </li>
              <li>
                <router-link
                  v-if="acesso == 'estudante'"
                  class="dropdown-item"
                  :to="{ name: 'meuCurso-page' }"
                  ><i class="fa-solid fa-graduation-cap"></i> Meu
                  cursos</router-link
                >
                <router-link
                  v-else-if="acesso == 'professor'"
                  class="dropdown-item"
                  :to="{ name: 'participar_em_aulas' }"
                  ><i class="fa-solid fa-chart-line"></i> Criar
                  actividade</router-link
                >
                <router-link
                  v-if="acesso == 'SuperAdmin-dev'"
                  class="dropdown-item"
                  :to="{ name: 'utilizadores-page' }"
                  ><i class="fa-solid fa-user-group"></i> Gerir
                  Utilizadores</router-link
                >
              </li>

              <li>
                <router-link
                  v-if="acesso == 'SuperAdmin-dev'"
                  class="dropdown-item"
                  :to="{ name: 'setting-page' }"
                  ><i class="fa-solid fa-circle-info"></i> Sobre</router-link
                >
              </li>
              <li>
                <router-link
                  v-if="acesso == 'paciente'"
                  class="dropdown-item"
                  :to="{ name: 'consulta-page' }"
                  ><i class="fa-solid fa-stethoscope"></i> Marcar
                  consulta</router-link
                >
              </li>
              <hr class="hr" />
              <li>
                <a class="dropdown-item" href="#" @click="logout"
                  ><i class="fa-solid fa-power-off"></i> Terminar Sessão</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  data() {
    return {
      totalNotify: "",
      totalMessage: "",
      nome: "",
      url_image: "",
      acesso: "",
    };
  },

  async mounted() {
    if (window.uid == "") {
      this.$router.push({ name: "login" });
    }
    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .onSnapshot((snapshot) => {
          this.nome = snapshot.data()?.nome;
          this.url_image = snapshot.data()?.url_image;
          this.acesso = snapshot.data()?.acesso;
        });
    } catch (error) {
      console.log(error.message);
    }

    try {
      this.$firebase
        .firestore()
        .collection("mensagens")
        .onSnapshot((snp) => {
          this.totalMessage = snp.docs.length;
        });
    } catch (error) {
      console.log(error.message);
    }

    try {
      this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("idReponsavel", "==", window.uid)
        .onSnapshot((snp) => {
          this.totalNotify = snp.docs.length;
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  methods: {
    async logout() {
      this.$root.$emit("loading::show");
      const auth = getAuth();
      await signOut(auth, () => {
        this.$router.push({ name: "home" });
        this.$root.$emit("loading::hide");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-light {
  background-color: var(--primary) !important;
}

div a {
  color: var(--light) !important;
}

ul li .text-link-color {
  color: var(--light) !important;
}

ul li a {
  color: var(--dark) !important;
}

img {
  width: 2rem;
  height: 2rem;
}
</style>
