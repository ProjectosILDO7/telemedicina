<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Classes/Graduação</div>
      </span>
    </h5>
    <div class="container">
      <b-form-input
        v-show="Classes != ''"
        v-model="filter"
        type="search"
        placeholder="Pesquisar"
        class="mb-2"
      >
      </b-form-input>

      <div class="d-flex justify-content-between mb-2 col-12">
        <div class="from-group" v-show="Classes != ''">
          <vue-excel-xlsx
            :data="Classes"
            :columns="columns"
            :file-name="'Lista-de-Classes'"
            :file-type="'xlsx'"
            :sheet-name="'classes'"
            class="btn btn-sm btn-outline-success"
            first-text="Primeira"
          >
            <i class="fa fa-file-excel"></i> Baixar
          </vue-excel-xlsx>
        </div>

        <div class="from-group fw-bold">
          Total de Classes: {{ totalClasses }}
        </div>

        <button
          class="btn btn-sm btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#modal-1"
          @click="formSave"
        >
          <i class="fa-solid fa-plus"></i> Classes
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
                <h4
                  class="modal-title"
                  id="exampleModalLabel"
                  v-if="formEdit == false"
                >
                  <i class="fa fa-graduation-cap"></i> Cadastrar nova graduação
                </h4>
                <h4 class="modal-title" id="exampleModalLabel" v-else>
                  <i class="fa fa-edit"></i> Alterar informações da classe
                </h4>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <alerte-message />

                <b-row>
                  <b-col md="12" class="mt-2">
                    <input
                      type="text"
                      placeholder="Digite a classe"
                      class="form-control"
                      required
                      v-model="items.nome_classe"
                    />
                  </b-col>
                </b-row>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  <i class="fa-solid fa-xmark"></i> Fechar
                </button>
                <button
                  class="btn btn-primary btn-sm"
                  @click.prevent="salvar_classe"
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
                  class="btn btn-primary btn-sm"
                  @click.prevent="salvar_classe_alteracao(classeID)"
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
        :items="Classes"
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
        <template #table-caption>Lista de Classes.</template>

        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(nome_classe)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.nome_classe }}
          </div>
        </template>

        <template #cell(data_criacao)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.data_criacao }}
          </div>
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
              </ul>
            </div>
          </div>
        </template>
      </b-table>

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
              <h4 class="modal-title" id="exampleModalLabel">
                Apagar a classe
              </h4>
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
                  >Tens a certeza que pretendes apagar esta classe ?
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
            :total-rows="totalClasses"
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
//import { getStorage, ref, deleteObject } from "firebase/storage";

export default {
  name: "Classes-pages",
  components: { alerteMessage },
  data() {
    return {
      Classes: [],
      idDelete: "",
      classeID: "",
      totalRows: "",
      formEdit: false,
      loading: false,
      url_windows: window.URL,
      columns: [
        {
          label: "Nome da classe",
          field: "nome_classe",
          //dataFormat: this.priceFormat
        },

        {
          label: "Data de criação",
          field: "data_criacao",
          dataFormat: this.formatoDeData,
        },
      ],
      path_edit_img: "",
      is_alterada_image: false,
      oldImage: "",
      items: {
        nome_classe: "",
        data_criacao: "",
      },

      fields: [
        {
          key: "nome_classe",
          label: "Nome da classe",
          sortable: true,
        },
        {
          key: "data_criacao",
          label: "Data de criação",
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

    totalClasses() {
      return this.Classes.length;
    },
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },

  created() {
    this.carregarClasses();
  },

  methods: {
    formSave() {
      this.formEdit = false;
      this.cleanForm();
    },

    cleanForm() {
      this.items = {
        nome_classe: "",
        data_criacao: "",
      };
    },

    async salvar_classe_alteracao(id) {
      try {
        this.loading = true;
        this.$root.$emit("loading::show");
        await this.$firebase
          .firestore()
          .collection("Classes")
          .doc(id)
          .update({
            ...this.items,
            data_criacao: new Date().getTime(),
          })
          .then(() => {
            this.$root.$emit("showAlert::show", {
              type: "success",
              message: "Alteração da classe feita com sucesso",
              titulo: "Sucesso",
            });

            this.cleanForm();
            this.carregarClasses();
          });
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message: "Houve um erro na actualização das informações desta classe",
          titulo: "Erro",
        });
      } finally {
        this.loading = false;
        this.$root.$emit("loading::hide");
        this.cleanForm();
        this.carregarClasses();
      }
    },

    async salvar_classe() {
      this.loading = true;
      this.$root.$emit("loading::show");
      try {
        const verificlasse = await this.$firebase
          .firestore()
          .collection("Classes")
          .where("nome_classe", "==", this.items.nome_classe)
          .get();

        if (!verificlasse.empty) {
          this.$root.$emit("showAlert::show", {
            type: "danger",
            message: "A classe que pretendes cadastrar já existe...",
            titulo: "Erro",
          });
          this.loading = false;
          return;
        }

        await this.$firebase
          .firestore()
          .collection("Classes")
          .add({
            ...this.items,
            idUser: window.uid,
            data_criacao: new Date().getTime(),
          })
          .then(() => {
            this.$root.$emit("showAlert::show", {
              type: "success",
              message: "Classe cadastrada com sucesso...",
              titulo: "Sucesso",
            });
          });
      } catch (error) {
        console.log(error);
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message: "Houve um erro ao tentar cadastrar a classe",
          titulo: "Erro",
        });
      } finally {
        this.loading = false;
        this.$root.$emit("loading::hide");
        this.cleanForm();
        this.carregarClasses();
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    formatoDeData() {
      return moment(this.Classes.data_criacao).format("DD-MM-YYYY");
    },

    async carregarClasses() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("Classes")
        .where("idUser", "==", window.uid)
        .get()
        .then((snapshot) => {
          (this.Classes = []),
            snapshot.forEach((doc) => {
              this.Classes.push({
                id: doc.id,
                url_image: doc.data().url_image,
                nome_classe: doc.data().nome_classe,
                cobranca_classe: doc.data().cobranca_classe,
                data_criacao: moment(doc.data().data_criacao).format(
                  "DD-MM-YYYY"
                ),
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
      this.Classes = [];

      if (this.idDelete) {
        try {
          this.$firebase
            .firestore()
            .collection("Classes")
            .doc(this.idDelete)
            .delete()
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message:
                  "A classe foi apagada com sucesso",
                titulo: "Sucesso",
              });
            });
        } catch (error) {
          this.$root.$emit("showAlert::show", {
            type: "danger",
            message:
              "Houve um erro ao carregar as informações da classe, verifica sua conexão com a internet",
            titulo: "Erro",
          });
        } finally {
          this.loading = false;
          this.$root.$emit("loading::hide");
          this.carregarClasses();
        }
      }
    },

    async editForm(id) {
      this.classeID = id;
      this.formEdit = true;

      try {
        this.$root.$emit("loading::show");
        const valorclasse = await this.$firebase
          .firestore()
          .collection("Classes")
          .doc(id)
          .get();
        this.items = valorclasse.data();
        this.oldImage = valorclasse.data().image_name;
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message:
            "Houve um erro ao carregar as informações do classe, verifica sua conexão com a internet",
          titulo: "Erro",
        });
      } finally {
        this.$root.$emit("loading::hide");
      }
    },

  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 5rem;
}

b-button .bt-detalhes {
  background-color: white !important;
  border: none !important;
}
</style>
