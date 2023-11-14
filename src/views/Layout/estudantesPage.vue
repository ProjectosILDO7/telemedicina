<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Estudantes</div>
      </span>
    </h5>
    <div class="container">
      <b-form-input
        v-show="estudantes != ''"
        v-model="filter"
        type="search"
        placeholder="Pesquisar"
        class="mb-2"
      >
      </b-form-input>

      <div class="d-flex justify-content-between mb-2 col-12">
        <div class="from-group" v-show="estudantes != ''">
          <vue-excel-xlsx
            :data="estudantes"
            :columns="columns"
            :file-name="'Lista-de-estudantes'"
            :file-type="'xlsx'"
            :sheet-name="'cusros'"
            class="btn btn-sm btn-outline-success"
            first-text="Primeira"
          >
            <i class="fa fa-file-excel"></i> Baixar lista
          </vue-excel-xlsx>
        </div>

        <div class="from-group fw-bold">
          Total de estudantes: {{ totalestudantes }}
        </div>

        <button
          class="btn btn-sm btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#modal-1"
          @click="formSave"
        >
          <i class="fa-solid fa-plus"></i> estudantes
        </button>
      </div>

      <!-- Modal -->
      <form>
        <div
          class="modal fade"
          id="modal-1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h6
                  class="modal-title"
                  id="exampleModalLabel"
                  v-if="formEdit == false"
                  @click="btnAdd"
                >
                  <i class="fa fa-graduation-cap"></i> Cadastrar novo estudante
                </h6>
                <h6 class="modal-title" id="exampleModalLabel" v-else>
                  <i class="fa fa-edit"></i> Alterar informações do(a) estudante
                </h6>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="btnClose"
                ></button>
              </div>
              <div class="modal-body">
                <alerte-message />

                <b-row>
                  <b-col
                    md="12"
                    class="mt-2 d-flex flex-column align-items-center"
                  >
                    <!-- <img
                        :src="items.url_image"
                        v-if="formEdit == true"
                        style="width: 100px; height: 100px; margin-bottom: 10px"
                      /> -->
                  </b-col>
                  <b-col md="12" class="mt-2">
                    <label
                      class="text-danger small"
                      v-if="erros.nome_estudante"
                      >{{ erros.nome_estudante }}</label
                    >
                    <input
                      type="text"
                      placeholder="Digite o nome do(a) estudante"
                      class="form-control"
                      required
                      v-model="items.nome"
                    />
                  </b-col>
                  <b-col md="12" class="mt-2">
                    <label class="text-danger small" v-if="erros.num_bilhete">{{
                      erros.num_bilhete
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Nº do Bilhete"
                      required
                      v-model="items.num_bilhete"
                    />
                  </b-col>
                  <b-col md="12" class="mt-2">
                    <label
                      class="text-danger small"
                      v-if="erros.data_emissao"
                      >{{ erros.data_emissao }}</label
                    >
                    <input
                      type="date"
                      onFocus=""
                      placeholder="Data de emissão"
                      class="form-control"
                      required
                      v-model="items.data_de_emissao"
                    />
                  </b-col>

                  <b-col md="12" class="mt-2">
                    <label class="text-danger small" v-if="erros.contacto">{{
                      erros.contacto
                    }}</label>
                    <input
                      type="text"
                      placeholder="Contacto"
                      class="form-control"
                      required
                      v-model="items.contacto"
                    />
                  </b-col>

                  <b-col md="12" class="mt-2">
                    <label class="text-danger small" v-if="erros.nome_do_pai">{{
                      erros.nome_do_pai
                    }}</label>
                    <input
                      type="text"
                      placeholder="Nome do Pai"
                      class="form-control"
                      required
                      v-model="items.nome_do_pai"
                    />
                  </b-col>

                  <b-col md="12" class="mt-2">
                    <label class="text-danger small" v-if="erros.nome_da_mae">{{
                      erros.nome_da_mae
                    }}</label>
                    <input
                      type="text"
                      placeholder="Nome da Maê"
                      class="form-control"
                      required
                      v-model="items.nome_da_mae"
                    />
                  </b-col>

                  <b-col md="12" class="mt-2">
                    <label class="text-danger small" v-if="erros.provincia">{{
                      erros.provincia
                    }}</label>
                    <input
                      type="text"
                      placeholder="Provincia"
                      class="form-control"
                      required
                      v-model="items.provincia"
                    />
                  </b-col>

                  <b-col md="12" class="mt-2">
                    <label class="text-danger small" v-if="erros.municipio">{{
                      erros.municipio
                    }}</label>
                    <input
                      type="text"
                      placeholder="Município"
                      class="form-control"
                      required
                      v-model="items.municipio"
                    />
                  </b-col>
                </b-row>

                <!-- input file -->
                <b-row>
                  <b-col>
                    <b-col md="12" class="mt-2">
                      <input
                        type="file"
                        ref="fileDoc1"
                        accept="application/pdf"
                        class="form-control d-none"
                        @change="hendleFileDocPessaol($event)"
                        required
                      />
                    </b-col>
                    <b-col md="12" class="mt-2">
                      <input
                        type="file"
                        ref="fileDoc2"
                        accept="application/pdf"
                        class="form-control d-none"
                        @change="hendleFileDocCerticate($event)"
                        required
                      />
                    </b-col>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="6" class="text-center mt-4">
                    <b-button @click="openFileDilogDocPessoa"
                      ><i class="fa-regular fa-id-card"></i> Carregar
                      Bilhete</b-button
                    >
                  </b-col>
                  <b-col md="6" class="text-center mt-4">
                    <b-button @click="openFileDilogCertificate"
                      ><i class="fa-solid fa-certificate"></i> Carregar
                      certificado</b-button
                    >
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="6" v-if="erros.url_file_bilhete">
                    <label class="text-danger small">{{
                      erros.url_file_bilhete
                    }}</label>
                  </b-col>

                  <b-col
                    md="6"
                    class="text-center mt-4"
                    v-if="items.url_file_bilhete"
                  >
                    <span>{{ items.url_file_bilhete.name }}</span>
                    <button
                      class="btn badge badge-light"
                      @click="items.url_file_bilhete = ''"
                    >
                      <i class="fa fa-trash text-danger"></i>
                    </button>
                  </b-col>

                  <b-col
                    md="6"
                    class="text-center mt-4"
                    v-if="items.url_file_certificado"
                  >
                    <span>{{ items.url_file_certificado.name }}</span>
                    <button
                      class="btn badge badge-light"
                      @click="items.url_file_certificado = ''"
                    >
                      <i class="fa fa-trash text-danger"></i>
                    </button>
                  </b-col>

                  <b-col md="6" v-if="erros.url_file_certificado">
                    <label class="text-danger small">{{
                      erros.url_file_certificado
                    }}</label>
                  </b-col>
                </b-row>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                  @click="btnClose"
                >
                  <i class="fa-solid fa-xmark"></i> Fechar
                </button>
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  @click.prevent="salvar_estudante"
                  v-if="formEdit == false"
                >
                  <span v-if="loading">
                    <i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...
                  </span>
                  <span v-else>
                    <i class="fa-solid fa-floppy-disk"></i> Salvar
                  </span>
                </button>
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  @click.prevent="salvar_estudante_alteracao(estudanteID)"
                  v-else
                >
                  <span v-if="loading">
                    <i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...
                  </span>
                  <span v-else>
                    <i class="fa-solid fa-floppy-disk"></i> Salvar alteração
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- Fim modal -->

      <b-table
        responsive
        :items="estudantes"
        fixed
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
        caption-top
        class="text-start"
      >
        <template #table-caption>Tabela de estudantes.</template>

        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(nome)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.nome }}
          </div>
        </template>

        <template #cell(contacto)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.contacto }}
          </div>
        </template>

        <template #cell(data_criacao)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.data_criacao }}
          </div>
        </template>

        <template #cell(image)="row">
          <a
            :href="row.item.url_image"
            target="_blank"
            v-if="row.item.url_image != ''"
            ><img :src="row.item.url_image" class="rounded-circle"
          /></a>
          <a href="#" v-else
            ><img src="/public/img/no-Image.jpg" class="rounded-circle"
          /></a>
        </template>

        <template #cell(actions)="row">
          <div class="d-flex justify-content-start">
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-sm btn-primary"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-list"></i>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-1"
                    @click="editForm(row.item.id)"
                  >
                    <i class="fa-solid fa-pen-to-square"></i> Editar
                  </button>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="confirmDilog(row.item.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i class="fa-solid fa-trash-can"></i> Apagar</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasScrolling"
                    aria-controls="offcanvasScrolling"
                    @click="maisDetalhes(row.item.id)"
                  >
                    <i class="fa-solid fa-plus"></i> Detalhes</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </template>
      </b-table>

      <!-- Detalhes -->
      <div
        class="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header">
          <h6 class="offcanvas-title" id="offcanvasScrollingLabel">
            Mais detalhes do(a) estudante
          </h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <alerte-message />
          <p class="text-danger">
            <strong>{{ items.nome }}</strong>
          </p>
          <hr class="text-success" />
          <img :src="items.url_image" style="width: 100%; height: 50%" />

          <p class="text-secondary">
            Curso a que se candidatou: <strong>{{ items.curso }}</strong>
          </p>
          <p class="text-secondary">
            Classe: <strong>{{ items.classe }}</strong>
          </p>
          <p class="text-secondary">
            Contacto: <strong>{{ items.contacto }}</strong>
          </p>
          <br />
          <p class="small text-muted text-center">Última actualização</p>
          <p class="text-center">
            <strong>{{ items.data_criacao }}</strong>
          </p>
        </div>
      </div>

      <!-- Modal Apagar -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="exampleModalLabel">
                Apagar o(a) estudante
              </h6>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <span class="text-danger"
                ><strong
                  >Tens a certeza que pretendes apagar este estudante ?
                </strong></span
              >
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <i class="fa-solid fa-xmark"></i> Fechar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="apagar(idDelete)"
              >
                <span v-if="loading">
                  <i class="fa-solid fa-circle-notch fa-spin"></i> Apagar
                  ...</span
                >
                <span v-else>
                  <i class="fa-solid fa-trash-can"></i> Sim apagar</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-auto">
        <div class="mt-0">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalestudantes"
            :per-page="perPage"
            align="right"
            size="sm"
            class="my-0"
            first-text="Primeira"
            prev-text="Anterior"
            next-text="Próxima"
            last-text="Última"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import alerteMessage from "../../components/alertas/alertComponent.vue";
//import { getDownloadURL } from "firebase/storage";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default {
  name: "estudantes-pages",
  components: { alerteMessage },
  data() {
    return {
      cursos: [],
      estudantes: [],
      min: 202300,
      max: 302300,
      idDelete: "",
      estudanteID: "",
      totalRows: "",
      formEdit: false,
      loading: false,
      url_windows: window.URL,
      columns: [
        {
          label: "Nome do estudante",
          field: "nome_estudante",
          //dataFormat: this.priceFormat
        },
        {
          label: "Nº de estudante",
          field: "num_estudante",
        },
        {
          label: "Data de inscrição",
          field: "data_criacao",
          dataFormat: this.formatoDeData,
        },
      ],
      path_edit_img: "",
      is_alterada_image: false,

      path_edit_bilhete_img: "",
      is_alterada_file_bilhete: false,

      path_edit_certificado_img: "",
      is_alterada_file_certificado: false,

      oldImage: "",
      oldImage_bilhete: "",
      oldImage_certificado: "",

      items: {
        idInstituicao: "",
        url_image: "",
        nome_image_perfil: "",
        nome: "",
        num_bilhete: "",
        data_emissao: "",
        data_criacao: "",
        num_estudante: "",
        curso: "",
        email: "",
        provimvia: "",
        municipio: "",
        contacto: "",
        url_file_bilhete: "",
        url_file_certificado: "",
        file_name_bilhete: "",
        file_name_certificado: "",
      },
      erros: {},

      fields: [
        {
          key: "image",
          label: "Imagem do estudante",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nome",
          label: "Nome do estudante",
          sortable: true,
        },
        {
          key: "contacto",
          label: "Nº de contacto",
          sortable: true,
        },
        {
          key: "data_criacao",
          label: "Data de inscrição",
          sortable: true,
        },

        { key: "actions", label: "Acções" },
      ],
      currentPage: 1,
      perPage: 3,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },

  watch: {
    path_edit_img(newValue) {
      if (newValue) {
        this.is_alterada_image = true;
        this.oldImage = newValue;
      } else {
        console.log((this.is_alterada_image = false));
      }
    },

    path_edit_bilhete_img(newValue) {
      if (newValue) {
        this.is_alterada_file_bilhete = true;
        this.oldImage_bilhete = newValue;
      } else {
        console.log((this.is_alterada_file_bilhete = false));
      }
    },

    path_edit_certificado_img(newValue) {
      if (newValue) {
        this.is_alterada_file_certificado = true;
        this.oldImage_certificado = newValue;
      } else {
        console.log((this.is_alterada_file_certificado = false));
      }
    },
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },

    totalestudantes() {
      return this.estudantes.length;
    },
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },

  created() {
    this.carregarestudantes();
    this.carregarCursos();
  },

  methods: {
    validarCampos() {
      if (this.items.nome_estudante == "") {
        this.erros.push({
          nome_estudante: "Informe o nome do(a) estudante",
        });
        this.erros.nome_estudante = "Informe o nome do(a) estudante";
      } else {
        this.erros.nome_estudante = "";
      }

      if (this.items.num_bilhete == "") {
        this.erros.push({
          num_bilhete: "Informe o nº do documento pessoal",
        });
        this.erros.num_bilhete = "Informe o nº do documento pessoal";
      } else {
        this.erros.num_bilhete = "";
      }

      if (this.items.data_emissao == "") {
        this.erros.push({
          data_emissao: "Informe a data de emissão do documento pessoal",
        });
        this.erros.data_emissao =
          "Informe a data de emissão do documento pessoal";
      } else {
        this.erros.data_emissao = "";
      }

      if (this.items.contacto == "") {
        this.erros.push({
          contacto: "Informe o contacto",
        });
        this.erros.contacto = "Informe o contacto";
      } else {
        this.erros.contacto = "";
      }

      if (this.items.url_file_bilhete == "") {
        this.erros.push({
          url_file_bilhete: "Faça o carregamento do documento pessoal",
        });
        this.erros.url_file_bilhete =
          "Faça o carregamento do documento pessoal";
      } else {
        this.erros.url_file_bilhete = "";
      }

      if (this.items.url_file_certificado == "") {
        this.erros.push({
          url_file_certificado:
            "Faça o carregamento do certificado de habilitação da classe anterior",
        });
        this.erros.url_file_certificado =
          "Faça o carregamento do certificado de habilitação da classe anterior";
      } else {
        this.erros.url_file_certificado = "";
      }

      /* num_bilhete: "",
        data_emissao: "",
        curso: "",
        email: "",
        contacto: "",
        url_file_bilhete: "",
        url_file_certificado: "",*/
    },

    openFileDilogDocPessoa() {
      this.$refs.fileDoc1.value = "";
      this.$refs.fileDoc1.click();
    },

    openFileDilogCertificate() {
      this.$refs.fileDoc2.value = "";
      this.$refs.fileDoc2.click();
    },

    hendleFileDocPessaol({ target }) {
      this.items.url_file_bilhete = target.files[0];
      this.path_edit_url_file_bilhete = this.items.file_name_bilhete;
    },
    hendleFileDocCerticate({ target }) {
      this.items.url_file_certificado = target.files[0];
      this.path_edit_url_file_bilhete = this.items.file_name_certificado;
    },

    formSave() {
      this.formEdit = false;
      this.cleanForm();
    },

    cleanForm() {
      this.items = {
        idInstituation: "",
        url_image: "",
        nome_image_perfil: "",
        nome: "",
        num_bilhete: "",
        data_emissao: "",
        num_estudante: "",
        curso: "",
        email: "",
        contacto: "",
        url_file_bilhete: "",
        url_file_certificado: "",
      };
    },

    async salvar_estudante_alteracao(id) {
      try {
        this.loading = true;
        this.$root.$emit("loading::show");

        if (this.is_alterada_image == false) {
          await this.$firebase
            .firestore()
            .collection("estudantes")
            .doc(id)
            .update({
              ...this.items,
              data_criacao: new Date().getTime(),
              // url_image: url,
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Alteração do(a) estudante feita com sucesso",
                titulo: "Sucesso",
              });
              this.cleanForm();
              this.carregarestudantes();
            });
        } else {
          let url = "";
          // Apaga a antiga imagem no Storage
          const storage = getStorage();
          const delRef = ref(storage, "estudantes/" + this.oldImage);
          await deleteObject(delRef).then(() => {
            console.log("Imagem antiga apagada com sucesso");
          });
          // Inserir nova imagem no Storage
          const snapshot = await this.$firebase
            .storage()
            .ref("estudantes")
            .child(this.fileName)
            .put(this.items.url_image);
          this.items.image_name = this.fileName;
          url = await snapshot.ref.getDownloadURL();
          // Actualiza os campos no Firestore

          await this.$firebase
            .firestore()
            .collection("estudantes")
            .doc(id)
            .update({
              ...this.items,
              data_criacao: new Date().getTime(),
              url_image: url,
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Alteração do(a) estudante feita com sucesso",
                titulo: "Sucesso",
              });

              this.cleanForm();
              this.carregarestudantes();
            });
        }
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message:
            "Houve um erro na actualização das informações deste estudante",
          titulo: "Erro",
        });
      } finally {
        this.loading = false;
        this.$root.$emit("loading::hide");
        this.cleanForm();
        this.carregarestudantes();
      }
    },

    async salvar_estudante() {
      if (this.erros.length > 0) {
        this.erros = [];
        this.validarCampos();
      } else {
        try {
          this.loading = true;
          this.$root.$emit("loading::show");
          const instituationID = window.uid;
          let url = "";
          let url2 = "";
          let url3 = "";
          // Verfica se existe uma estudante com o mesmo número de blilhete
          const verifiestudante = await this.$firebase
            .firestore()
            .collection("estudantes")
            .where("num_bilhete", "==", this.items.num_bilhete)
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

          // upload de imagem perfil
          const imageRefPerfil = await this.$firebase
            .storage()
            .ref("estudantes/image/perfil")
            .child(this.fileName)
            .put(this.items.url_image);
          this.items.nome_image_perfil = this.fileName;
          url = await imageRefPerfil.ref.getDownloadURL();
          console.log(url);

          // upload de documento bilhete

          const fileRefBilhete = await this.$firebase
            .storage()
            .ref("estudantes/doc/bilhetes")
            .child(this.fileNameBilhete)
            .put(this.items.url_file_bilhete);
          this.items.file_name_bilhete = this.fileNameBilhete;
          url2 = await fileRefBilhete.ref.getDownloadURL();

          // upload de documento Certificado

          const fileRefCertificado = await this.$firebase
            .storage()
            .ref("estudantes/doc/certificados")
            .child(this.fileNameCertificado)
            .put(this.items.url_file_certificado);
          this.items.file_name_certificado = this.fileNameCertificado;
          url3 = await fileRefCertificado.ref.getDownloadURL();

          // Cria uma senha aleatoria
          const password =
            Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;

          //cria uma conta
          const createUser = await this.$firebase
            .auth()
            .createUserWithEmailAndPassword(this.items.email, password);

          //cria a permissao no user
          this.$firebase
            .firestore()
            .collection("users")
            .doc(createUser.user.uid)
            .set({
              url_image: url,
              nome: this.items.nome_estudante,
              acesso: "estudante",
            });
          // Cadastrar estudante
          await this.$firebase
            .firestore()
            .collection("estudantes")
            .doc(createUser.user.uid)
            .set({
              ...this.items,
              idInstituation: instituationID,
              data_criacao: new Date().getTime(),
              url_image: url,
              url_file_bilhete: url2,
              url_file_certificado: url3,
              num_estudante: password,
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Estudante cadastrado com sucesso...",
                titulo: "Sucesso",
              });
            });
        } catch (error) {
          console.log(error.message);
          switch (error.message) {
            case "Firebase: Error (auth/email-already-in-use).":
              this.$root.$emit("showAlert::show", {
                type: "danger",
                message: "O E-mail informado já existe...!",
                titulo: "Erro",
              });
              break;

            default:
              this.$root.$emit("showAlert::show", {
                type: "danger",
                message: "Ocorreu um erro inesperado durante o cadastro...",
                titulo: "Erro",
              });
              break;
          }
        } finally {
          this.loading = false;
          this.$root.$emit("loading::hide");
          this.cleanForm();
          this.carregarestudantes();
        }
      }
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    formatoDeData() {
      return moment(this.estudantes.data_criacao).format("DD-MM-YYYY");
    },

    async carregarestudantes() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("estudantes")
        .where("idInstituicao", "==", window.uid)
        .get()
        .then((snapshot) => {
          (this.estudantes = []),
            snapshot.forEach((doc) => {
              this.estudantes.push({
                id: doc.id,
                url_image: doc.data().url_image,
                nome: doc.data().nome,
                contacto: doc.data().contacto,
                num_bilhete: doc.data().num_bilhete,
                data_de_emissao: moment(doc.data().data_de_emissao).format(
                  "DD-MM-YYYY"
                ),
                data_de_caducidade: moment(
                  doc.data().data_de_caducidade
                ).format("DD-MM-YYYY"),
                data_criacao: moment(doc.data().data_criacao).format(
                  "DD-MM-YYYY"
                ),
                nome_do_pai: doc.data().nome_do_pai,
                nome_da_mae: doc.data().nome_da_mae,
                curso: doc.data().curso,
                file_name_bilhete: doc.data().file_name_bilhete,
                file_name_certificado: doc.data().file_name_certificado,
                provincia: doc.data().provincia,
                municipio: doc.data().municipio,
                url_file_bilhete: doc.data().url_file_bilhete,
                url_file_certificado: doc.data().url_file_certificado,
              });
            });
        });
      this.$root.$emit("loading::hide");
    },

    confirmDilog(id) {
      this.idDelete = id;
    },

    async apagar() {
      this.loading = true;
      this.$root.$emit("loading::show");
      this.estudantes = [];
      if (this.idDelete) {
        await this.$firebase
          .firestore()
          .collection("estudantes")
          .doc(this.idDelete)
          .get()
          .then((snapshot) => {
            this.oldImage = snapshot.data().image_name;
            try {
              // Apaga a antiga imagem no Storage
              const storage = getStorage();
              const delRef = ref(storage, "estudantes/" + this.oldImage);
              deleteObject(delRef).then(() => {
                console.log("Imagem apagada");
              });

              this.$firebase
                .firestore()
                .collection("estudantes")
                .doc(this.idDelete)
                .delete();
            } catch (error) {
              this.$root.$emit("showAlert::show", {
                type: "danger",
                message:
                  "Houve um erro ao carregar as informações do(a) estudante, verifica sua conexão com a internet",
                titulo: "Erro",
              });
            } finally {
              this.loading = false;
              this.$root.$emit("loading::hide");
              this.carregarestudantes();
            }
          });
      }
    },

    async editForm(id) {
      this.estudanteID = id;
      this.formEdit = true;

      try {
        this.$root.$emit("loading::show");
        const valorestudante = await this.$firebase
          .firestore()
          .collection("estudantes")
          .doc(id)
          .get();
        this.items = valorestudante.data();
        this.oldImage = valorestudante.data().image_name;
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message:
            "Houve um erro ao carregar as informações do(a) estudante, verifica sua conexão com a internet",
          titulo: "Erro",
        });
      } finally {
        this.$root.$emit("loading::hide");
      }
    },

    async maisDetalhes(id) {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("estudantes")
        .doc(id)
        .get()
        .then((snapshot) => {
          (this.items = ""),
            ((this.items = snapshot.data()),
            (this.items.data_criacao = moment(
              snapshot.data().data_criacao
            ).format("DD-MM-YYYY")));
        })
        .catch(() => {
          this.$root.$emit("showAlert::show", {
            type: "danger",
            message:
              "Houve um erro ao carregar as informações do(a) estudante, verifica sua conexão com a internet",
            titulo: "Erro",
          });
        })
        .finally(() => {
          this.$root.$emit("loading::hide");
        });
    },

    async carregarCursos() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("cursos")
        .where("idUser", "==", window.uid)
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

    btnAdd() {
      this.cleanForm();
      this.erros = {
        url_image: "",
        nome_estudante: "",
        num_bilhete: "",
        data_emissao: "",
        data_criacao: "",
        curso: "",
        email: "",
        contacto: "",
        url_file_bilhete: "",
        url_file_certificado: "",
      };
    },

    btnClose() {
      this.cleanForm();
      this.erros = {
        url_image: "",
        nome_estudante: "",
        num_bilhete: "",
        data_emissao: "",
        data_criacao: "",
        curso: "",
        email: "",
        contacto: "",
        url_file_bilhete: "",
        url_file_certificado: "",
      };
    },
  },
};
</script>

<style scoped>
img {
  width: 5rem;
  height: 5rem;
}

b-button .bt-detalhes {
  background-color: white !important;
  border: none !important;
}
</style>
