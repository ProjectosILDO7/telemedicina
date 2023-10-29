<template>
  <b-container>
    <b-row class="py-4">
      <b-col md="12" class="text-secondary text-center">
        <strong>Fale connosco</strong>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label>Nome</label>
      </b-col>
      <span class="text-danger small" v-if="erros.nome">{{ erros.nome }}</span>
      <b-col sm="10">
        <b-form-input
          type="text"
          placeholder="Digite seu nome"
          v-model="item.nome"
          required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label>E-mail</label>
      </b-col>
      <span class="text-danger small" v-if="erros.email">{{
        erros.email
      }}</span>
      <b-col sm="10">
        <b-form-input
          type="email"
          placeholder="Digite seu e-mail"
          v-model="item.email"
          required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label>Telemóvel</label>
      </b-col>
      <span class="text-danger small" v-if="erros.contacto">{{
        erros.contacto
      }}</span>
      <b-col sm="10">
        <b-form-input
          type="email"
          placeholder="Digite seu telemóvel"
          v-model="item.contacto"
          required
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label>Mensagem</label>
      </b-col>
      <span class="text-danger small" v-if="erros.mensagem">{{
        erros.mensagem
      }}</span>
      <b-col sm="10">
        <b-form-textarea
          id="textarea-small"
          size="sm"
          placeholder="Comentário"
          rows="3"
          v-model="item.mensagem"
        ></b-form-textarea>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"> </b-col>
      <b-col sm="10" class="text-end mt-2">
        <b-button
          squared
          variant="outline-success"
          @click="enviarSms"
          :disabled="loading"
        >
          <span v-if="loading"
            ><i class="fa-solid fa-circle-notch fa-spin"></i> Enviando ...</span
          >
          <span v-else><i class="fa-solid fa-paper-plane"></i> Enviar</span>
        </b-button>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col class="text-center text-secondary">
        <strong>Conheça as nossas redes sociais</strong>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col class="social mt-2 d-flex justify-content-between">
        <a href=""><i class="fa-brands fa-facebook"></i></a>
        <a href=""><i class="fa-brands fa-whatsapp"></i></a>
        <a href=""><i class="fa-brands fa-youtube"></i></a>
        <a href=""><i class="fa-brands fa-instagram"></i></a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      erros: [],
      loading: false,
      item: {
        nome: "",
        email: "",
        contacto: "",
        mensagem: "",
      },
    };
  },

  methods: {
    cleanForm() {
      this.item = {
        nome: "",
        email: "",
        contacto: "",
        mensagem: "",
      };
    },
    validarCampos() {
      if (this.item.nome == "") {
        this.erros.push({
          nome: "Inferme-nos seu nome",
        }),
          (this.erros.nome = "inoforme-nos seu nome");
      } else {
        this.erros.nome = "";
      }
      if (this.item.contacto == "") {
        this.erros.push({
          contacto: "Inferme-nos seu contacto",
        }),
          (this.erros.contacto = "inoforme-nos seu contacto");
      } else {
        this.erros.contacto = "";
      }
      if (this.item.email == "") {
        this.erros.push({
          email: "Inferme-nos seu e-mail",
        }),
          (this.erros.email = "inoforme-nos seu e-mail");
      } else {
        this.erros.email = "";
      }
      if (this.item.mensagem == "") {
        this.erros.push({
          mensagem: "Envie-nos uma mensagem",
        }),
          (this.erros.mensagem = "Envie-nos uma mensagem");
      } else {
        this.erros.mensagem = "";
      }
    },

    async enviarSms() {
      this.erros = [];
      this.validarCampos();
      if (this.erros.length > 0) {
        this.validarCampos();
      } else {
        try {
          this.loading = true;
          await this.$firebase
            .firestore()
            .collection("mensagens")
            .add({
              ...this.item,
              createdAt: new Date().getTime(),
            })
            .then(() => {
              this.$swal.fire({
                title: "Sucesso",
                text: "Mensagem enviada com sucesso, aguarde pelo returno, brevemente entraremos em contacto contigo",
                icon: "success",
                confirmButtonText: "OK",
              });
            });
        } catch (error) {
          console.log(error.message);
        } finally {
          this.loading = false;
          this.cleanForm();
          this.erros = [];
        }
      }
    },
  },
};
</script>

<style>
.social a {
  color: #a2a2a2;
  transition: 0.3s;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bbbbbb;
}
.social a:hover {
  color: #5a7ff7;
  transition: 0.3s;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5a7ff7;
}
</style>
