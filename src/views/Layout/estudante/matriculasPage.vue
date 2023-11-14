<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Realizar matrículas</div>
      </span>
    </h5>
    <div class="container">
      <b-table
        responsive
        :items="utilizador"
        fixed
        :fields="fields"
        stacked="md"
        show-empty
        small
        caption-top
        class="text-start"
      >
        <template #table-caption>Meus dados</template>

        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(nome)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.nome }}
          </div>
        </template>

        <template #cell(acesso)="row">
          <div class="d-flex justify-content-start">
            <span>{{ row.item.acesso }}</span>
          </div>
        </template>

        <template #cell(createdAt)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.createdAt }}
          </div>
        </template>

        <template #cell(url_image)="row">
          <a :href="row.item.url_image" target="_blank"
            ><img :src="row.item.url_image" class="rounded-circle"
          /></a>
        </template>

        <template #cell(actions)="row">
          <a class="btn btn-secondary" href="#" @click="row.toggleDetails">
            {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Ficha de
            matricula</a
          >
        </template>

        <!-- Detalhes de serviços -->
        <template #row-details="row">
          <b-card class="bg-light">
            <b-row v-if="row.item.acesso == 'estudante'">
              <alert-message />

              <b-col md="12"
                ><h6>
                  <span class="text-secondary">Eu:</span
                  ><strong class="text-danger"> {{ row.item.nome }}</strong>
                </h6></b-col
              >
              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome">{{
                  erros.nome
                }}</label>

                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite nome completo"
                  v-model="item_estudante.nome"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome_do_pai">{{
                  erros.nome_do_pai
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Pai"
                  v-model="item_estudante.nome_do_pai"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome_da_mae">{{
                  erros.nome_da_mae
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mãe"
                  v-model="item_estudante.nome_da_mae"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.num_bilhete">{{
                  erros.num_bilhete
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nº do bilhete"
                  v-model="item_estudante.num_bilhete"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.data_de_emissao">{{
                  erros.data_de_emissao
                }}</label>
                <input
                  type="text"
                  onfocus="(this.type='date')"
                  class="form-control"
                  placeholder="Data de emissão"
                  v-model="item_estudante.data_de_emissao"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label
                  class="text-danger small"
                  v-if="erros.data_de_caducidade"
                  >{{ erros.data_de_caducidade }}</label
                >
                <input
                  type="text"
                  onfocus="(this.type='date')"
                  class="form-control"
                  placeholder="data de caducidade"
                  v-model="item_estudante.data_de_caducidade"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.provincia">{{
                  erros.provincia
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Província"
                  v-model="item_estudante.provincia"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.municipio">{{
                  erros.municipio
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Município"
                  v-model="item_estudante.municipio"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.contacto">{{
                  erros.contacto
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Contacto"
                  v-model="item_estudante.contacto"
                />
              </div>
              <b-row class="text-center text-muted mb-2 mt-2">
                <b-col>Curso preferido</b-col>
              </b-row>
              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <label class="text-danger small" v-if="erros.curso">{{
                  erros.curso
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Contacto"
                  v-model="item_estudante.curso"
                  disabled
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <label class="text-danger small" v-if="erros.classe">{{
                  erros.classe
                }}</label>
                <select class="form-select" v-model="item_estudante.classe">
                  <option selected value="">Selecione uma classe</option>
                  <option v-for="(c, index) in classes" :key="index">
                    {{ c.nome_classe }}
                  </option>
                </select>
              </div>
              <!-- upload de documento -->
              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <input
                  type="file"
                  ref="fileDoc1"
                  accept="application/pdf"
                  class="form-control d-none"
                  @change="hendleFileDocPessaol($event)"
                  required
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <input
                  type="file"
                  ref="fileDoc2"
                  accept="application/pdf"
                  class="form-control d-none"
                  @change="hendleFileDocCerticate($event)"
                  required
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 d-flex flex-column align-item-center"
              >
                <b-button @click="openFileDilogDocPessoa"
                  ><i class="fa-regular fa-id-card"></i> Carregar
                  Bilhete</b-button
                >
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 d-flex flex-column align-item-center"
              >
                <b-button @click="openFileDilogCertificate"
                  ><i class="fa-solid fa-certificate"></i> Carregar
                  certificado</b-button
                >
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-cente"
                v-if="erros.url_file_bilhete"
              >
                <label class="text-danger small">{{
                  erros.url_file_bilhete
                }}</label>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="erros.url_file_certificado"
              >
                <label class="text-danger small">{{
                  erros.url_file_certificado
                }}</label>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="item_estudante.url_file_bilhete"
              >
                <span>{{ item_estudante.url_file_bilhete.name }}</span>
                <button
                  class="btn badge badge-light"
                  @click="item_estudante.url_file_bilhete = ''"
                >
                  <i class="fa fa-trash text-danger"></i>
                </button>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="item_estudante.url_file_certificado"
              >
                <span>{{ item_estudante.url_file_certificado.name }}</span>
                <button
                  class="btn badge badge-light"
                  @click="item_estudante.url_file_certificado = ''"
                >
                  <i class="fa fa-trash text-danger"></i>
                </button>
              </div>

              <!-- fim de upload de documento -->
              <div
                class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2 d-flex flex-column align-item-end mt-2"
              >
                <button
                  class="btn btn-primary"
                  @click="salvar_estudante(row.item.id, row.item.url_image)"
                  :disabled="loading"
                >
                  <span v-if="loading"
                    ><i class="fa-solid fa-circle-notch fa-spin"></i>
                    Cadastrando ...</span
                  >
                  <span v-else
                    ><i class="fa fa-graduation-cap"></i> Inscrever-se</span
                  >
                </button>
              </div>
            </b-row>

            <!-- Fim from matricula estudante -->
          </b-card>
        </template>
        <!-- Fim de detalhes de serviços -->
      </b-table>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import alertMessage from "../../../components/alertas/alertComponent.vue";
//import { getStorage, ref, deleteObject } from "firebase/storage";
export default {
  components: { alertMessage },
  data() {
    return {
      selectOption: "",
      editFormID: "",
      text: "",
      erros: [],
      cursos: [],
      classes: [],
      idEstudante: "",
      utilizador: [],
      idDelete: "",
      loading: false,
      utilizadoreID: "",
      totalRows: "",
      formEdit: false,
      url_windows: window.URL,
      path_edit_url_file_bilhete: "",
      path_edit_url_file_certificado: "",
      path_edit_url_image: "",
      item_estudante: {
        nome: "",
        nome_do_pai: "",
        nome_da_mae: "",
        num_bilhete: "",
        data_de_emissao: "",
        data_de_caducidade: "",
        provincia: "",
        municipio: "",
        contacto: "",
        idInstituation: "",
        curso: "",
        classe: "",
        file_name_bilhete: "",
        url_file_bilhete: "",
        file_name_certificado: "",
        url_file_certificado: "",
      },
      columns: [
        {
          label: "Nome",
          field: "nome",
          //dataFormat: this.priceFormat
        },
        {
          label: "Acesso",
          field: "acesso",
        },
        {
          label: "Data de criação",
          field: "createdAt",
          dataFormat: this.formatoDeData,
        },
      ],

      fields: [
        {
          key: "url_image",
          label: "Imagem do utilizadore",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nome",
          label: "Nome do utilizador",
          sortable: true,
        },
        {
          key: "acesso",
          label: "Função/Acesso",
          sortable: true,
        },
        {
          key: "createdAt",
          label: "Data de criação",
          sortable: true,
        },

        { key: "actions", label: "Acções" },
      ],
    };
  },

  computed: {
    fileNameBilhete() {
      const { url_file_bilhete } = this.item_estudante;
      if (url_file_bilhete) {
        const split = url_file_bilhete.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },

    fileNameCertificado() {
      const { url_file_certificado } = this.item_estudante;
      if (url_file_certificado) {
        const split = url_file_certificado.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },
  },

  created() {
    this.carregarEstudante();
    this.carregarCursos();
    this.carregarClasses();
  },

  methods: {
    cleanFormEstudante() {
      this.item_estudante = {
        nome: "",
        nome_do_pai: "",
        nome_da_mae: "",
        num_bilhete: "",
        data_de_emissao: "",
        data_de_caducidade: "",
        provincia: "",
        municipio: "",
        contacto: "",
        curso: "",
        file_name_bilhete: "",
        url_file_bilhete: "",
        file_name_certificado: "",
        url_file_certificado: "",
      };
    },

    openFileDilogCertificate() {
      this.$refs.fileDoc2.value = "";
      this.$refs.fileDoc2.click();
    },
    openFileDilogDocFuncionario() {
      this.$refs.fileDoc1.value = "";
      this.$refs.fileDoc1.click();
    },

    openFileDilogCertificateFuncionario() {
      this.$refs.fileDoc2.value = "";
      this.$refs.fileDoc2.click();
    },

    heandleFile({ target }) {
      this.item_utilizador.url_image = target.files[0];
      this.path_edit_img = this.item_utilizador.image_name;
    },

    hendleFileDocPessaol({ target }) {
      this.item_estudante.url_file_bilhete = target.files[0];
      this.path_edit_url_file_bilhete = this.item_estudante.file_name_bilhete;
    },
    hendleFileDocCerticate({ target }) {
      this.item_estudante.url_file_certificado = target.files[0];
      this.path_edit_url_file_certificado =
        this.item_estudante.file_name_certificado;
    },

    hendleFileDocPessaolFuncionario({ target }) {
      this.item_funcionario.url_file_bilhete = target.files[0];
      this.path_edit_url_file_bilhete = this.item_funcionario.file_name_bilhete;
    },
    hendleFileDocPessaolCertificadoFuncionario({ target }) {
      this.item_funcionario.url_file_certificado = target.files[0];
      this.path_edit_url_file_certificado =
        this.item_funcionario.file_name_certificado;
    },

    openFileDilogDocPessoa() {
      this.$refs.fileDoc1.value = "";
      this.$refs.fileDoc1.click();
    },

    async salvar_estudante(id, image) {
      this.erros = [];
      this.validarCampos();
      if (this.erros.length > 0) {
        this.validarCampos();
      } else {
        try {
          this.loading = true;
          let url2 = "";
          let url3 = "";
          // Verfica se existe uma estudante com o mesmo número de blilhete
          const verifiestudante = await this.$firebase
            .firestore()
            .collection("estudantes")
            .where("num_bilhete", "==", this.item_estudante.num_bilhete)
            .get();

          if (!verifiestudante.empty) {
            this.$root.$emit("showAlert::show", {
              type: "danger",
              message: "O estudante que pretendes cadastrar já existe...",
              titulo: "Erro",
            });
            this.loading = false;
            return;
          }

          // upload de documento bilhete

          const fileRefBilhete = await this.$firebase
            .storage()
            .ref("estudantes/doc/bilhetes")
            .child(this.fileNameBilhete)
            .put(this.item_estudante.url_file_bilhete);
          this.item_estudante.file_name_bilhete = this.fileNameBilhete;
          url2 = await fileRefBilhete.ref.getDownloadURL();

          // upload de documento Certificado

          const fileRefCertificado = await this.$firebase
            .storage()
            .ref("estudantes/doc/certificados")
            .child(this.fileNameCertificado)
            .put(this.item_estudante.url_file_certificado);
          this.item_estudante.file_name_certificado = this.fileNameCertificado;
          url3 = await fileRefCertificado.ref.getDownloadURL();

          // Cadastrar estudante
          await this.$firebase
            .firestore()
            .collection("estudantes")
            .doc(this.idEstudante)
            .set({
              ...this.item_estudante,
              url_image: image,
              data_criacao: new Date().getTime(),
              url_file_bilhete: url2,
              url_file_certificado: url3,
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Estudante cadastrado com sucesso...",
                titulo: "Sucesso",
              });
            });
        } catch (e) {
          if (e instanceof TypeError) {
            console.log(TypeError);
            switch (e.message) {
              case "Firebase: Error (auth/email-already-in-use).":
                break;

              default:
                this.$root.$emit("showAlert::show", {
                  type: "danger",
                  message: "Ocorreu um erro inesperado durante o cadastro...",
                  titulo: "Erro",
                });
                break;
            }
          }
        } finally {
          this.loading = false;
          this.cleanFormEstudante();
        }
      }
    },

    async carregarCursos() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("cursos")
        .get()
        .then((snapshot) => {
          (this.cursos = []),
            snapshot.forEach((doc) => {
              this.cursos.push({
                id: doc.id,
                url_image: doc.data().url_image,
                nome_curso: doc.data().nome_curso,
                cobranca_curso: doc.data().cobranca_curso,
                data_criacao: moment(doc.data().data_criacao).format(
                  "DD-MM-YYYY"
                ),
              });
            });
        });
      this.$root.$emit("loading::hide");
    },
    async carregarClasses() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("Classes")
        .get()
        .then((snapshot) => {
          (this.classes = []),
            snapshot.forEach((doc) => {
              this.classes.push({
                id: doc.id,
                nome_classe: doc.data().nome_classe,
              });
            });
        });
      this.$root.$emit("loading::hide");
    },

    // validar campos de estudante
    validarCampos() {
      if (this.item_estudante.nome == "") {
        this.erros.push({
          nome: "Informe o nome do(a) estudante",
        });
        this.erros.nome = "Informe o nome do(a) estudante";
      } else {
        this.erros.nome = "";
      }

      if (this.item_estudante.nome_do_pai == "") {
        this.erros.push({
          nome_do_pai: "Informe o nome do pai do(a) estudante",
        });
        this.erros.nome_do_pai = "Informe o nome do pai do(a) estudante";
      } else {
        this.erros.nome_do_pai = "";
      }

      if (this.item_estudante.nome_da_mae == "") {
        this.erros.push({
          nome_da_mae: "Informe o nome da mãe do(a) estudante",
        });
        this.erros.nome_da_mae = "Informe o nome da mãe do(a) estudante";
      } else {
        this.erros.nome_da_mae = "";
      }

      if (this.item_estudante.num_bilhete == "") {
        this.erros.push({
          num_bilhete: "Informe o nº do documento pessoal",
        });
        this.erros.num_bilhete = "Informe o nº do documento pessoal";
      } else if (this.item_estudante.num_bilhete.length != 14) {
        this.erros.push({
          num_bilhete:
            "O nº do documento pessoal deve conter no máximo 14 caracteres",
        });
        this.erros.num_bilhete =
          "O nº do documento pessoal deve conter no máximo 14 caracteres";
      } else {
        this.erros.num_bilhete = "";
      }

      if (this.item_estudante.data_de_emissao == "") {
        this.erros.push({
          data_de_emissao: "Informe a data de emissão do documento pessoal",
        });
        this.erros.data_de_emissao =
          "Informe a data de emissão do documento pessoal";
      } else {
        this.erros.data_de_emissao = "";
      }

      if (this.item_estudante.data_de_caducidade == "") {
        this.erros.push({
          data_de_caducidade:
            "Informe a data de caducidade do documento pessoal",
        });
        this.erros.data_de_caducidade =
          "Informe a data de caducidade do documento pessoal";
      } else {
        this.erros.data_de_caducidade = "";
      }

      if (this.item_estudante.provincia == "") {
        this.erros.push({
          provincia: "Informe nome da Província",
        });
        this.erros.provincia = "Informe nome da Província";
      } else {
        this.erros.provincia = "";
      }

      if (this.item_estudante.municipio == "") {
        this.erros.push({
          municipio: "Informe o nome do  Município",
        });
        this.erros.municipio = "Informe o nome do  Município";
      } else {
        this.erros.municipio = "";
      }

      if (this.item_estudante.contacto == "") {
        this.erros.push({
          contacto: "Informe o terminal de contacto",
        });
        this.erros.contacto = "Informe o terminal de contacto";
      } else if (this.item_estudante.contacto.length != 9) {
        this.erros.push({
          contacto: "O nº do terminal deve conter no máximo 9 dígitos",
        });
        this.erros.contacto =
          "O nº do terminal deve conter no máximo 9 dígitos";
      } else {
        this.erros.contacto = "";
      }

      if (this.item_estudante.curso == "") {
        this.erros.push({
          curso: "Selecione um curso",
        });
        this.erros.curso = "Selecione um curso";
      } else {
        this.erros.curso = "";
      }

      if (this.item_estudante.classe == "") {
        this.erros.push({
          classe: "Selecione uma classe",
        });
        this.erros.classe = "Selecione uma classe";
      } else {
        this.erros.classe = "";
      }

      if (this.item_estudante.url_file_bilhete == "") {
        this.erros.push({
          url_file_bilhete: "É obrigatório carregar um documento pessoal",
        });
        this.erros.url_file_bilhete =
          "É obrigatório carregar um documento pessoal";
      } else {
        this.erros.url_file_bilhete = "";
      }

      if (this.item_estudante.url_file_certificado == "") {
        this.erros.push({
          url_file_certificado:
            "É obrigatório carregar um certificado da formação anterior",
        });
        this.erros.url_file_certificado =
          "É obrigatório carregar um certificado da formação anterior";
      } else {
        this.erros.url_file_certificado = "";
      }
    },
    // fim validar campo de estudante

    async carregarEstudante() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .get()
        .then((snapshot) => {
          this.idEstudante = snapshot.id;
          this.item_estudante.idInstituation = snapshot.data().instituacao;
          this.item_estudante.curso = snapshot.data().curso;
          this.utilizador.push({
            url_image: snapshot.data().url_image,
            nome: snapshot.data().nome,
            acesso: snapshot.data().acesso,
            genero: snapshot.data().genero,
            status: snapshot.data().status,
            createdAt: moment(snapshot.data().createdAt).format("DD-MM-YYYY"),
          });
          //     this.item_estudante.url_image=snapshot.data().url_image,
          //     this.item_estudante.nome=snapshot.data().nome,
          //     this.item_estudante.acesso=snapshot.data().acesso,
          //     this.item_estudante.genero=snapshot.data().genero,
          //     this.item_estudante.status=snapshot.data().status,
          //    this.item_estudante.createdAt=moment(snapshot.data().createdAt).format("DD-MM-YYYY")
        });
      this.$root.$emit("loading::hide");
    },
  },
};
</script>
<style scoped>
img {
  width: 5rem;
  height: 5rem;
}
</style>
