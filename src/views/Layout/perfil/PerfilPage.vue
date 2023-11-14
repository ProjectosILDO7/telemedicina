<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Meu Perfil</div>
      </span>
    </h5>

    <b-container>
      <b-card>
        <b-card-body>
          <!-- Show modal form edit -->
          <form>
            <alert-message />

            <b-row class="text-center">
              <b-col class="flex-column d-flex align-item-center">
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
                <div class="mt-2" v-if="item_utilizador.url_image">
                  {{ item_utilizador.url_image.name }}
                  <button
                    class="btn badge badge-light"
                    @click="item_utilizador.url_image = ''"
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
                  v-model="item_utilizador.nome"
                  placeholder="Nome completo"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col md="6">
                <select class="form-control" v-model="item_utilizador.genero">
                  <option value="" selected>Gênero:</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </b-col>
              <b-col md="6">
                <b-form-input
                  v-model="item_utilizador.telemovel"
                ></b-form-input>
              </b-col>
            </b-row>

            <div class="modal-footer mt-2">
              <button
                class="btn btn-primary btn-sm mr-2"
                @click.prevent="salvar_utilizador_alteracao(editFormID)"
                :disabled="loading"
              >
                <span v-if="loading">
                  <i class="fa-solid fa-circle-notch fa-spin"></i>
                  Salvando...
                </span>
                <span v-else>
                  <i class="fa-solid fa-floppy-disk"></i> Salvar perfil
                </span>
              </button>
            </div>
          </form>
          <!-- Fim modal -->
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>
<script>
//import moment from "moment";
import alertMessage from "../../../components/alertas/alertComponent.vue";
import { getStorage, ref, deleteObject } from "firebase/storage";
export default {
  components: { alertMessage },
  data() {
    return {
      loading: false,
      selectOption: "",
      path_edit_img: "",
      is_alterada_image: false,
      oldImage: "",
      editFormID: "",
      erros: [],
      item_utilizador: {
        nome: "",
        url_image: "",
        image_name: "",
        acesso: "",
        telemovel: "",
        data_de_criacao: "",
      },
    };
  },

  watch: {
    path_edit_img(newValue) {
      if (newValue) {
        this.is_alterada_image = true;
        this.oldImage = newValue;
        console.log(this.oldImage);
      } else {
        console.log((this.is_alterada_image = false));
      }
    },
  },

  computed: {
    fileName() {
      const { url_image } = this.item_utilizador;
      if (url_image) {
        const split = url_image.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },
  },

  created() {
    this.carregarutilizadores();
  },

  methods: {
    heandleFile({ target }) {
      this.item_utilizador.url_image = target.files[0];
      this.path_edit_img = this.item_utilizador.image_name;
    },
    validarFormUtilizador() {
      if (this.item_utilizador.nome == "") {
        this.erros.push({
          nome: "Informe o nome do(a) utilizador",
        });
        this.erros.nome = "Informe o nome do(a) utilizador";
      } else {
        this.erros.nome = "";
      }

      if (this.item_utilizador.url_image == "") {
        this.erros.push({
          url_image: "Carregue uma imagem do(a) utilizador",
        });
        this.erros.url_image = "Carregue uma imagem do(a) utilizador";
      } else {
        this.erros.url_image = "";
      }

      if (this.item_utilizador.acesso == "") {
        this.erros.push({
          acesso: "Selecione uma área de acesso do(a) utilizador",
        });
        this.erros.acesso = "Selecione uma área de acesso do(a) utilizador";
      } else {
        this.erros.acesso = "";
      }
    },

    async carregarutilizadores() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .get()
        .then((snapshot) => {
          this.editFormID = snapshot.id;
          console.log(this.editFormID);
          this.item_utilizador = snapshot.data();
        });
      this.$root.$emit("loading::hide");
    },

    openFile() {
      this.$refs.myFile.value = "";
      this.$refs.myFile.click();
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    async salvar_utilizador_alteracao(id) {
      this.loading = true;
      this.erros = [];
      this.validarFormUtilizador();
      if (this.erros.length > 0) {
        this.validarFormUtilizador();
      } else {
        try {
          if (this.is_alterada_image == false) {
            const { nome } = this.item_utilizador;
            await this.$firebase
              .firestore()
              .collection("users")
              .doc(id)
              .update({
                nome,
                data_criacao: new Date().getTime(),
                //url_image: url,
              });

            await this.$firebase
              .firestore()
              .collection("users")
              .doc(id)
              .update({
                ...this.item_utilizador,
                data_criacao: new Date().getTime(),
                // url_image: url,
              })
              .then(() => {
                this.$root.$emit("showAlert::show", {
                  type: "success",
                  message: "Actualização realizada com sucesso",
                  titulo: "Sucesso",
                });
                this.cleanFormUtilizador();
                this.carregarutilizadores();
              });
          } else {
            let url = "";
            let envio_de_imagem = "";
            await this.$firebase
              .storage()
              .ref("imagens/perfil/" + this.oldImage)
              .getDownloadURL()
              .then(() => {
                envio_de_imagem = "apagar_img_inserir_depois";
                //caso exista apaga a antiga imagem e inser um novo lick
              })
              .catch((erro) => {
                envio_de_imagem = erro.code;
              });

            switch (envio_de_imagem) {
              case "storage/object-not-found":
                // Inserir nova imagem no Storage
                var snapshot = await this.$firebase
                  .storage()
                  .ref("imagens/perfil/")
                  .child(this.fileName)
                  .put(this.item_utilizador.url_image);
                this.item_utilizador.image_name = this.fileName;
                url = await snapshot.ref.getDownloadURL();
                break;

              case "apagar_img_inserir_depois":
                //Apagar primeiro
                var storage = getStorage();
                var delRef = ref(storage, "imagens/perfil/" + this.oldImage);
                await deleteObject(delRef).then(() => {
                  console.log("Imagem atiga apagada com sucesso");
                });
                //inserir nova imagem depois
                var novaReferencia = await this.$firebase
                  .storage()
                  .ref("imagens/perfil/")
                  .child(this.fileName)
                  .put(this.item_utilizador.url_image);
                this.item_utilizador.image_name = this.fileName;
                url = await novaReferencia.ref.getDownloadURL();

                break;

              default:
                this.$root.$emit("showAlert::show", {
                  type: "danger",
                  message:
                    "Um erro inesperado aconteceu durante o carregamneto da foto de perfil",
                  titulo: "Erro",
                });
                break;
            }

            const { nome } = this.item_utilizador;

            await this.$firebase
              .firestore()
              .collection("users")
              .doc(id)
              .update({
                ...this.item_utilizador,
                createdAt: new Date().getTime(),
                url_image: url,
              })
              .then(() => {
                // Consultar se esse usuario de acesso estudante ja foi matriculado
                const doc = this.$firebase
                  .firestore()
                  .collection("estudantes")
                  .doc(id);

                if (doc.exists) {
                  this.$firebase
                    .firestore()
                    .collection("estudantes")
                    .doc(id)
                    .update({
                      nome,
                      createdAt: new Date().getTime(),
                      url_image: url,
                    })
                    .then(() => {
                      this.$root.$emit("showAlert::show", {
                        type: "success",
                        message: "Actualização realizada com sucesso",
                        titulo: "Sucesso",
                      });
                    });
                } else {
                  this.$root.$emit("showAlert::show", {
                    type: "success",
                    message: "Actualização realizada com sucesso",
                    titulo: "Sucesso",
                  });
                }
              });
          }
        } catch (e) {
          console.log(e.message);
        } finally {
          this.loading = false;
          this.carregarutilizadores();
        }
      }
    },
  },
};
</script>
