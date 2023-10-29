<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img src="../../../public/img/icons/flames.png" alt="fire" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <i class="fa-solid fa-angles-right"></i>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link class="button" :to="{ name: 'painel-control' }">
        <i class="fa fa-home"></i><span class="text">Home</span>
      </router-link>
      <!-- <router-link class="button" :to="{ name: 'cursos-page' }">
        <i class="fa fa-graduation-cap"></i> <span class="text">Cursos</span>
      </router-link> -->
      <!-- <router-link class="button" :to="{ name: 'medicos-pages' }">
        <i class="fa-solid fa-user-doctor"></i>
        <span class="text">Médicos && Enfermeiros</span>
      </router-link> -->
      <router-link
        class="button"
        :to="{ name: 'utilizadores-page' }"
        v-if="acesso == 'SuperAdmin-dev'"
      >
        <i class="fa-solid fa-user-tie"></i
        ><span class="text">Utilizadores</span>
      </router-link>

      <router-link
        class="button"
        :to="{ name: 'classe-page' }"
        v-if="acesso == 'SuperAdmin-dev'"
      >
        <i class="fa-solid fa-chalkboard-user"></i>
        <span class="text">Classes/Graduação</span>
      </router-link>

      <router-link
        class="button"
        :to="{ name: 'matricula' }"
        v-else-if="acesso == 'estudante' && status == 'activo'"
      >
        <i class="fa-solid fa-graduation-cap"></i>
        <span class="text">Matricular-se</span>
      </router-link>

      <router-link
        class="button"
        :to="{ name: 'participar_em_aulas_estudante_paciente' }"
        v-if="acesso == 'estudante' && status == 'activo'"
      >
        <i class="fa-solid fa-chalkboard-user"></i>
        <span class="text">Participar em aulas</span>
      </router-link>

      <router-link
        class="button"
        :to="{ name: 'participar_em_aulas' }"
        v-else-if="acesso == 'professor' && status == 'activo'"
      >
        <i class="fa-solid fa-chalkboard-user"></i>
        <span class="text">Criar actividade</span>
      </router-link>

      <router-link
        class="button"
        :to="{ name: 'assistencia_medica' }"
        v-if="
          (acesso == 'medico' && status == 'activo') || acesso == 'paciente'
        "
      >
        <i class="fa-solid fa-stethoscope"></i>
        <span class="text">Assistência médica</span>
      </router-link>

      <router-link
        class="button"
        :to="{ name: 'setting-page' }"
        v-if="acesso == 'SuperAdmin-dev'"
      >
        <i class="fa-solid fa-circle-info"></i> <span class="text">Sobre</span>
      </router-link>
    </div>

    <!-- <h3>Definições do site principal</h3> -->
    <div class="menu"></div>

    <div class="flex"></div>
    <hr class="hr" />
    <div class="menu">
      <router-link class="button" to="#" @click="logout">
        <i class="fa-solid fa-power-off"></i>
        <span class="text">Terminar sessão</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "sidebar-menu",
  components: {},
  data() {
    return {
      is_expanded: localStorage.getItem("is_expanded") === "true",
      acesso: "",
      status: "",
    };
  },

  async mounted() {
    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .onSnapshot((snapshot) => {
          this.acesso = snapshot.data()?.acesso;
          this.status = snapshot.data()?.status;
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  methods: {
    ToggleMenu() {
      this.is_expanded = !this.is_expanded;
      localStorage.setItem("is_expanded", this.is_expanded);
    },

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
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
aside {
  display: flex;
  flex-direction: column;
  width: calc(1rem + 30px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);
  transition: 0.2s ease-out;

  .flex {
    flex: 1 1 0;
  }
  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;
      i {
        font-size: 1rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        i {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.3rem 1rem;
      transition: 0.2s ease-out;

      i {
        font-size: 1rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-out;
        margin-left: 1rem;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: var(--dark-alt);

        i,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--primary);
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    button .text {
      opacity: 1;
    }

    .button {
      i {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>
