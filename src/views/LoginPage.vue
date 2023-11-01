<template>
  <b-container>
    <b-card no-body class="overflow-hidden mt-4" style="max-width: 100%">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            src="/img/login-register.jpg"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col>
          <b-card-body class="text-center" title="Login">
            <b-card class="m-auto border border-white">
              <b-card-body>
                <b-row>
                  <b-col class="text-center">
                    <i class="fa-solid fa-2x text-danger fa-fire"></i>
                  </b-col>
                </b-row>
                <show-alert />
                <b-row class="mt-4">
                  <b-col>
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa-regular fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Digite seu e-mail"
                        v-model="email"
                        required
                      />
                    </div>
                  </b-col>
                </b-row>

                <b-row class="mt-2">
                  <b-col>
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa-solid fa-user-lock"></i>
                      </span>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Digite sua senha"
                        v-model="password"
                        required
                      />
                    </div>
                  </b-col>
                </b-row>

                <b-row class="mt-4">
                  <b-col md="12" class="d-grid gap-2">
                    <b-button
                      variant="outline-success"
                      @click="toLogin"
                      :disabled="loading"
                    >
                      <span v-if="loading"
                        ><i class="fa-solid fa-circle-notch fa-spin"></i> Entrar
                        ...</span
                      >
                      <span v-else
                        ><i class="fa-solid fa-right-to-bracket"></i>
                        Entrar</span
                      >
                    </b-button>
                  </b-col>
                </b-row>

                <b-row class="mt-4">
                  <b-col md="6">
                    <router-link
                      :to="{ name: 'inscricoes' }"
                      class="text-secondary text-decoration-none"
                    >
                      <i class="fa-solid fa-envelope"></i> Crie uma conta
                    </router-link>
                  </b-col>
                  <b-col md="6" class="text-center text-secondary">
                    <router-link
                      :to="{ name: 'reset-password' }"
                      class="text-decoration-none"
                      ><i class="fa-solid fa-user-lock"></i> Esqueci a
                      senha</router-link
                    >
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ShowAlert from "../components/alertas/alertComponent.vue";
export default {
  name: "login-page",
  components: { ShowAlert },
  data() {
    return {
      value: "",
      loading: false,
      email: "",
      password: "",
    };
  },

  created() {},

  methods: {
    async toLogin() {
      this.loading = true;
      const auth = getAuth();
      const { email, password } = this;
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          window.uid = user.uid;
          this.$router.push({ name: "dashboard" });
          // ...
        })
        .catch((error) => {
          console.log(error);
          let message = "";
          switch (error.code) {
            case "auth/invalid-email":
              message = "E-mail ou senha invalido";
              break;
            case "auth/user-not-found":
              message = "Utilizador nao encontrado..!";
              break;
            case "auth/wrong-password":
              message = "Palavra chave inválida..!";

              break;

            case "auth/too-many-requests":
              message =
                "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-la imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.";

              break;

            default:
              message = "Não foi possível efectuar o login";

              break;
          }
          this.$root.$emit("showAlert::show", {
            message,
            titulo: "Erro",
            type: "danger",
          });
        })
        .finally(() => {
          this.loading = false;
          (this.email = ""), (this.password = "");
        });
    },
  },
};
</script>

<style></style>
