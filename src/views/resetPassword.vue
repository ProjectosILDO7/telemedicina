<template>
  <b-container>
    <b-card no-body class="overflow-hidden mt-4" style="max-width: 100%">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            src="/img/Reset-img.jpg"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col>
          <b-card-body class="text-center" title="Esqueci a senha">
            <b-card-text class="text-center">
              Esqueceu sua senha? sem problemas, vamos resolver, informe seu
              e-mail na caixa baixo e de seguida enviarémos um link de
              redefinição de senha no seu e-mail
            </b-card-text>
            <b-card class="m-auto border border-white">
              <b-card-body>
                <b-row>
                  <b-col class="text-center">
                    <i class="fa-solid fa-2x text-danger fa-fire"></i>
                  </b-col>
                </b-row>

                <b-row class="mt-4">
                  <b-col>
                    <span v-if="erro.email" class="text-danger small">{{
                      erro.email
                    }}</span>
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa-regular fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Digite seu e-mail"
                        v-model="items.email"
                        required
                      />
                    </div>
                  </b-col>
                </b-row>

                <b-row class="mt-4">
                  <b-col md="12" class="d-grid gap-2">
                    <b-button
                      variant="outline-success"
                      @click="sendPassword"
                      :disabled="loading"
                    >
                      <span v-if="loading"
                        ><i class="fa-solid fa-circle-notch"></i
                      ></span>
                      <span v-else
                        ><i class="fa-solid fa-paper-plane"></i> Enviar</span
                      >
                    </b-button>
                  </b-col>
                </b-row>

                <b-row class="mt-4">
                  <b-col md="12" class="text-center text-secondary">
                    <router-link
                      :to="{ name: 'login' }"
                      class="text-decoration-none"
                      >Já tenho uma conta</router-link
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
export default {
  data() {
    return {
      value: "",
      loading: false,
      erro: [],
      items: {
        email: "",
      },
    };
  },

  created() {},

  methods: {
    validarCampo() {
      if (this.items.email == "") {
        this.erro.push({
          email: "Informe seu e-mail",
        });
        this.erro.email = "Informe seu e-mail";
      } else {
        this.erro.email = "";
      }
    },
    async sendPassword() {
      this.erro = [];
      this.validarCampo();
      if (this.erro.length > 0) {
        this.validarCampo();
      } else {
        this.loading = true;
        try {
          await this.$firebase
            .auth()
            .sendPasswordResetEmail(this.items.email)
            .then(() => {
              this.$swal.fire({
                title: "Sucesso",
                text: "Enviamos um link de redefinição da senha no seu E-mail",
                icon: "success",
                confirmButtonText: "ok",
              });
            })
            .catch(() => {
              this.$swal.fire({
                title: "Email inválido",
                text: "O e-mail informado não existe",
                icon: "error",
                confirmButtonText: "ok",
              });
            });
        } catch (error) {
          console.log(error.message);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style></style>
