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
                      <b-button variant="outline-success">
                        <i class="fa-solid fa-paper-plane"></i> Enviar
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
      items: {
        nome: "",
        email: "",
        senha: "",
        confirm_senha: "",
      },
    };
  },

  created() {},

  methods: {},
};
</script>

<style></style>
