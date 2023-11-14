<template>
  <b-container class="md-layout">
    <b-card no-body class="overflow-hidden mt-4" style="max-width: 100%">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            src="/img/estude-em-casa.jpg"
            alt="Image"
            class="rounded-0"
            style="height: 100%"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-row class="mt-2">
            <b-col class="text-center">
              <!-- <i class="fa-solid fa-2x text-danger fa-fire"></i> -->
              <img
                src="/img/icons/telemedicina.png"
                style="max-width: 18%; padding-top: 1%"
              />
            </b-col>
          </b-row>
          <b-card-body class="text-center" title="Criar conta">
            <b-card-text>
              Crie uma conta - para se beneficiar dos serviços
            </b-card-text>
            <b-row>
              <b-col>
                <label class="text-danger small" v-if="erros.url_image">{{
                  erros.url_image
                }}</label>
                <input
                  ref="myFile"
                  type="file"
                  placeholder="Selecione uma imagem de perfil"
                  class="form-control d-none"
                  accept="image/*"
                  required
                  @change="heandleFile($event)"
                />

                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="openFile"
                >
                  <i class="fa-regular fa-image"></i> Carregue / tire uma foto
                </button>
                <div class="mt-2" v-if="items.url_image">
                  {{ items.url_image.name }}
                  <button
                    class="btn badge badge-light"
                    @click="items.url_image = ''"
                  >
                    <i class="fa fa-trash text-danger"></i>
                  </button>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mt-2">
                <label class="text-danger small" v-if="erros.nome">{{
                  erros.nome
                }}</label>
                <b-form-input
                  v-model="items.nome"
                  placeholder="Nome completo"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col>
                <label class="text-danger small" v-if="erros.email">{{
                  erros.email
                }}</label>
                <b-form-input
                  v-model="items.email"
                  type="email"
                  placeholder="E-mail"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col>
                <label class="text-danger small" v-if="erros.telemovel">{{
                  erros.telemovel
                }}</label>
                <b-form-input
                  v-model="items.telemovel"
                  type="text"
                  placeholder="Telemovel"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md="12" class="mb-2">
                <label class="text-danger small" v-if="erros.instituation">{{
                  erros.instituation
                }}</label>
                <select class="form-select" v-model="items.instituacao">
                  <option selected value="">
                    Escolhe uma Instituição de saúde
                  </option>
                  <option
                    v-for="(ins, index) in instituation"
                    :key="index"
                    :value="ins.id"
                  >
                    {{ ins.intituicao }}
                  </option>
                </select>
              </b-col>
              <b-col>
                <label class="text-danger small" v-if="erros.acesso">{{
                  erros.acesso
                }}</label>
                <select
                  class="form-select"
                  @change="onChange($event)"
                  v-model="items.acesso"
                >
                  <option value="" selected>Criar conta como:</option>
                  <option value="estudante">
                    <i class="fa fa-graduation-cap"></i> Estudante
                  </option>

                  <option value="paciente">
                    <i class="fa-solid fa-wheelchair"></i> Paciente
                  </option>
                  <option value="outra">
                    <i class="fa-solid fa-wheelchair"></i> outra
                  </option>
                </select>
              </b-col>
              <b-col md="12">
                <label class="text-danger small" v-if="erros.curso">{{
                  erros.curso
                }}</label>
                <select
                  class="form-select mt-2"
                  v-model="items.curso"
                  v-show="tipoInscricao == true"
                >
                  <option value="" selected>Escolhe um curso:</option>
                  <option
                    :value="c.nome_curso"
                    v-for="(c, index) in cursos"
                    :key="index"
                  >
                    {{ c.nome_curso }}
                  </option>
                </select>
              </b-col>
              <b-col class="mt-2">
                <label class="text-danger small" v-if="erros.genero">{{
                  erros.genero
                }}</label>
                <select class="form-select" v-model="items.genero">
                  <option value="" selected>Gênero</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6" class="mt-2">
                <label class="text-danger small" v-if="erros.password">{{
                  erros.password
                }}</label>
                <b-form-input
                  v-model="password"
                  placeholder="Senha"
                  type="password"
                ></b-form-input>
              </b-col>
              <b-col md="6" class="mt-2">
                <label
                  class="text-danger small"
                  v-if="erros.confirm_password"
                  >{{ erros.confirm_password }}</label
                >
                <b-form-input
                  placeholder="Confirmar a senha"
                  type="password"
                  v-model="confirm_password"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-4">
              <b-col class="text-end">
                <b-button variant="outline-success" @click="createCount">
                  <span v-if="loading">
                    <i class="fa-solid fa-circle-notch fa-spin"></i> Criando ...
                  </span>
                  <span v-else
                    ><i class="fa-regular fa-user"></i> Criar conta</span
                  >
                </b-button>
              </b-col>
            </b-row>

            <b-row class="mt-4">
              <b-col>
                <router-link
                  :to="{ name: 'login' }"
                  class="text-secondary text-decoration-none"
                >
                  <i class="fa fa-graduation-cap"></i> Já tenho uma conta
                </router-link>
              </b-col>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
//import { getAuth } from "firebase/auth";
export default {
  data() {
    return {
      value: "",
      erros: [],
      cursos: [],
      tipoInscricao: false,
      instituation: [],
      loading: false,
      path_edit_img: "",
      items: {
        url_image: "",
        image_name: "",
        telemovel: "",
        instituacao: "",
        acesso: "",
        curso: "",
        genero: "",
        nome: "",
        email: "",
      },
      password: "",
      confirm_password: "",
    };
  },

  mounted() {},

  async created() {
    await this.$firebase
      .firestore()
      .collection("users")
      .where("acesso", "==", "SuperAdmin-dev")
      .get()
      .then((snp) => {
        (this.instituation = []),
          snp.forEach((doc) => {
            this.instituation.push({
              id: doc.id,
              intituicao: doc.data().nome,
            });
          });
      });
  },

  computed: {
    fileName() {
      const { url_image } = this.items;
      if (url_image) {
        const split = url_image.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },
  },

  methods: {
    async onChange(event) {
      if (event.target.value == "estudante") {
        this.tipoInscricao = true;
        this.$root.$emit("loading::show");
        await this.$firebase
          .firestore()
          .collection("cursos")
          .get()
          .then((snp) => {
            this.cursos = [];
            snp.forEach((doc) => {
              this.cursos.push({
                id: doc.id,
                nome_curso: doc.data().nome_curso,
              });
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.$root.$emit("loading::hide");
          });
      } else {
        this.tipoInscricao = false;
        this.erros.curso = "";
      }
    },
    cleanForm() {
      this.items = {
        url_image: "",
        image_name: "",
        telemovel: "",
        acesso: "",
        genero: "",
        nome: "",
        email: "",
      };
      this.password = "";
      this.confirm_password = "";
    },

    validarCampos() {
      if (this.tipoInscricao != "") {
        if (this.items.curso == "") {
          this.erros.push({
            curso: "Escolhe o curso de sua preferência",
          });
          this.erros.curso = "Escolhe o curso de sua preferência";
        } else {
          this.erros.curso = "";
        }
      }
      if (this.items.nome == "") {
        this.erros.push({
          nome: "Inferme-nos o seu nome completo",
        });
        this.erros.nome = "Inferme-nos o seu nome completo";
      } else {
        this.erros.nome = "";
      }
      if (this.items.telemovel == "") {
        this.erros.push({
          telemovel: "Inferme-nos o seu contacto",
        });
        this.erros.telemovel = "Inferme-nos o seu contacto";
      } else {
        this.erros.telemovel = "";
      }

      if (this.items.url_image == "") {
        this.erros.push({
          url_image: "Carregue uma foto de perfil",
        });
        this.erros.url_image = "Carregue uma foto de perfil";
      } else {
        this.erros.url_image = "";
      }

      if (this.items.instituacao == "") {
        this.erros.push({
          instituation: "Seleciona a sua Instituição",
        });
        this.erros.instituation = "Seleciona a sua Instituição";
      } else {
        this.erros.instituation = "";
      }

      if (this.items.email == "") {
        this.erros.push({
          email: "E-mail inválido",
        });
        this.erros.email = "E-mail inválido";
      } else {
        this.erros.email = "";
      }

      if (this.items.acesso == "") {
        this.erros.push({
          acesso: "Selecione uma conta de acesso",
        });
        this.erros.acesso = "Selecione uma conta de acesso";
      } else {
        this.erros.acesso = "";
      }

      if (this.items.genero == "") {
        this.erros.push({
          acesso: "Selecione o gênero",
        });
        this.erros.genero = "Selecione o gênero";
      } else {
        this.erros.genero = "";
      }

      if (this.password == "") {
        this.erros.push({
          password: "Informe a sua senha",
        });
        this.erros.password = "Informe a sua senha";
      } else if (this.password.length <= 5) {
        this.erros.push({
          password:
            "A senha deve ter no minimo 6 caracteres, entre maiusculas e menusculas com caracteres especiais",
        });
        this.erros.password =
          "A senha deve ter no minimo 6 caracteres, entre maiusculas e menusculas com caracteres especiais";
      } else {
        this.erros.password = "";
      }

      if (this.confirm_password == "") {
        this.erros.push({
          confirm_password: "Confirme a sua senha",
        });
        this.erros.confirm_password = "Confirme a sua senha";
      } else if (this.password !== this.confirm_password) {
        this.erros.push({
          confirm_password: "Confirme a sua senha",
        });
        this.erros.confirm_password =
          "Esta senha não corresponde com a anterior";
      } else {
        this.erros.confirm_password = "";
      }
    },

    heandleFile({ target }) {
      this.items.url_image = target.files[0];
      this.path_edit_img = this.items.image_name;
    },

    openFile() {
      this.$refs.myFile.value = "";
      this.$refs.myFile.click();
    },

    async createCount() {
      this.erros = [];
      this.validarCampos();
      if (this.erros.length > 0) {
        this.validarCampos();
      } else {
        this.loading = true;
        let url = "";
        try {
          const user = await this.$firebase
            .auth()
            .createUserWithEmailAndPassword(this.items.email, this.password);

          if (this.items.url_image) {
            // Inserir nova imagem no Storage
            const snapshot = await this.$firebase
              .storage()
              .ref("imagens/perfil")
              .child(this.fileName)
              .put(this.items.url_image);
            this.items.image_name = this.fileName;
            url = await snapshot.ref.getDownloadURL();
          }

          await this.$firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .set({
              ...this.items,
              url_image: url,
              status: "activo",
              createdAt: new Date().getTime(),
            });
        } catch (error) {
          console.log(error.message);
        } finally {
          this.loading = false;
          this.cleanForm();
        }
      }
    },
  },
};
</script>

<style></style>
