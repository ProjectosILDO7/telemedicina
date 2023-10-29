<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Cursos</div>
      </span>
    </h5>
    <div class="container">
      <b-form-input
        v-show="cursos != ''"
        v-model="filter"
        type="search"
        placeholder="Pesquisar"
        class="mb-2"
      >
      </b-form-input>

      <div class="d-flex justify-content-between mb-2 col-12">
        <div class="from-group" v-show="cursos != ''">
          <vue-excel-xlsx
            :data="cursos"
            :columns="columns"
            :file-name="'Lista-de-cursos'"
            :file-type="'xlsx'"
            :sheet-name="'cusros'"
            class="btn btn-sm btn-outline-success"
            first-text="Primeira"
          >
            <i class="fa fa-file-excel"></i> Baixar
          </vue-excel-xlsx>
        </div>

        <div class="from-group fw-bold">Total de cursos: {{ totalCursos }}</div>

        <button
          class="btn btn-sm btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#modal-1"
          @click="formSave"
        >
          <i class="fa-solid fa-plus"></i> Cursos
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
                >
                  <i class="fa fa-graduation-cap"></i> Cadastrar novo curso
                </h6>
                <h6 class="modal-title" id="exampleModalLabel" v-else>
                  <i class="fa fa-edit"></i> Alterar informações do curso
                </h6>
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
                  <b-col
                    md="12"
                    class="mt-2 d-flex flex-column align-items-center"
                  >
                    <!-- <img
                      :src="items.url_image"
                      v-if="formEdit == true"
                      style="width: 100px; height: 100px; margin-bottom: 10px"
                    /> -->

                    <input
                      ref="myFile"
                      type="file"
                      placeholder="Selecione uma imagem"
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
                      <i class="fa-regular fa-image"></i> Adicionar imagem do
                      curso
                    </button>
                    <div class="mt-2" v-if="items.url_image">
                      {{ items.url_image.name }}
                      <button
                        class="btn badge badge-light"
                        @click="
                          (items.url_image = '') && (is_alterada_image = false)
                        "
                      >
                        <i class="fa fa-trash text-danger"></i>
                      </button>
                    </div>
                  </b-col>
                  <b-col md="12" class="mt-2">
                    <input
                      type="text"
                      placeholder="Digite o nome do curso"
                      class="form-control"
                      required
                      v-model="items.nome_curso"
                    />
                  </b-col>
                  <b-col md="12" class="mt-2">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Duração do curso"
                      required
                      v-model="items.horas_de_formacao"
                    />
                  </b-col>
                  <b-col md="12" class="mt-2">
                    <input
                      type="text"
                      placeholder="Cobrança"
                      class="form-control"
                      required
                      v-model="items.cobranca_curso"
                    />
                  </b-col>
                  <b-col md="12" class="mt-2">
                    <textarea
                      type="text"
                      placeholder="Perfil de saída"
                      class="form-control"
                      rows="4"
                      required
                      v-model="items.perfil_saida"
                    ></textarea>
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
                  @click.prevent="salvar_curso"
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
                  @click.prevent="salvar_curso_alteracao(cursoID)"
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
        :items="cursos"
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
        <template #table-caption>Tabela dos cursos.</template>

        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(nome_curso)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.nome_curso }}
          </div>
        </template>

        <template #cell(cobranca_curso)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.cobranca_curso }}
          </div>
        </template>

        <template #cell(data_criacao)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.data_criacao }}
          </div>
        </template>

        <template #cell(image)="row">
          <a :href="row.item.url_image" target="_blank"
            ><img :src="row.item.url_image"
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
            Mais detalhes do curso
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
            <strong>{{ items.nome_curso }}</strong>
          </p>
          <hr class="text-success" />
          <img :src="items.url_image" style="width: 100%; height: 50%" />

          <p class="text-secondary">
            <strong>{{ items.perfil_saida }}</strong>
          </p>

          <p class="text-secondary">
            Duração: <strong>{{ items.horas_de_formacao }}</strong>
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
              <h6 class="modal-title" id="exampleModalLabel">Apagar o curso</h6>
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
                  >Tens a certeza que pretendes apagar este curso ?
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
            :total-rows="totalCursos"
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
import { getStorage, ref, deleteObject } from "firebase/storage";

export default {
  name: "cursos-pages",
  components: { alerteMessage },
  data() {
    return {
      cursos: [],
      idDelete: "",
      cursoID: "",
      totalRows: "",
      formEdit: false,
      loading: false,
      url_windows: window.URL,
      columns: [
        {
          label: "Nome do curso",
          field: "nome_curso",
          //dataFormat: this.priceFormat
        },
        {
          label: "Cobrança do curso",
          field: "cobranca_curso",
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
        url_image: "",
        image_name: "",
        nome_curso: "",
        horas_de_formacao: "",
        cobranca_curso: "",
        data_criacao: "",
        perfil_saida: "",
      },

      fields: [
        {
          key: "image",
          label: "Imagem do curso",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nome_curso",
          label: "Nome do curso",
          sortable: true,
        },
        {
          key: "cobranca_curso",
          label: "Cobrança",
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

    fileName() {
      const { url_image } = this.items;
      if (url_image) {
        const split = url_image.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },

    totalCursos() {
      return this.cursos.length;
    },
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },

  created() {
    this.carregarCursos();
  },

  methods: {
    heandleFile({ target }) {
      this.items.url_image = target.files[0];
      this.path_edit_img = this.items.image_name;
    },

    formSave() {
      this.formEdit = false;
      this.cleanForm();
    },

    cleanForm() {
      this.items = {
        url_image: "",
        nome_curso: "",
        horas_de_formacao: "",
        cobranca_curso: "",
        data_criacao: "",
        perfil_saida: "",
      };
    },

    openFile() {
      this.$refs.myFile.value = "";
      this.$refs.myFile.click();
    },

    async salvar_curso_alteracao(id) {
      try {
        this.loading = true;
        this.$root.$emit("loading::show");

        if (this.is_alterada_image == false) {
          await this.$firebase
            .firestore()
            .collection("cursos")
            .doc(id)
            .update({
              ...this.items,
              data_criacao: new Date().getTime(),
              // url_image: url,
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Alteração do curso feita com sucesso",
                titulo: "Sucesso",
              });
              this.cleanForm();
              this.carregarCursos();
            });
        } else {
          let url = "";
          // Apaga a antiga imagem no Storage
          const storage = getStorage();
          const delRef = ref(storage, "cursos/" + this.oldImage);
          await deleteObject(delRef).then(() => {
            console.log("Imagem antiga apagada com sucesso");
          });
          // Inserir nova imagem no Storage
          const snapshot = await this.$firebase
            .storage()
            .ref("cursos")
            .child(this.fileName)
            .put(this.items.url_image);
          this.items.image_name = this.fileName;
          url = await snapshot.ref.getDownloadURL();
          // Actualiza os campos no Firestore

          await this.$firebase
            .firestore()
            .collection("cursos")
            .doc(id)
            .update({
              ...this.items,
              data_criacao: new Date().getTime(),
              url_image: url,
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Alteração do curso feita com sucesso",
                titulo: "Sucesso",
              });

              this.cleanForm();
              this.carregarCursos();
            });
        }
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message: "Houve um erro na actualização das informações deste curso",
          titulo: "Erro",
        });
      } finally {
        this.loading = false;
        this.$root.$emit("loading::hide");
        this.cleanForm();
        this.carregarCursos();
      }
    },

    async salvar_curso() {
      this.loading = true;
      this.$root.$emit("loading::show");
      try {
        const verifiCurso = await this.$firebase
          .firestore()
          .collection("cursos")
          .where("nome_curso", "==", this.items.nome_curso)
          .get();

        if (!verifiCurso.empty) {
          this.$root.$emit("showAlert::show", {
            type: "danger",
            message: "O Curso que pretendes cadastrar já existe...",
            titulo: "Erro",
          });
          this.loading = false;
          return;
        }
        let url = "";

        if (this.items.url_image) {
          const snapshot = await this.$firebase
            .storage()
            .ref("cursos")
            .child(this.fileName)
            .put(this.items.url_image);
          this.items.image_name = this.fileName;
          url = await snapshot.ref.getDownloadURL();
        }

        await this.$firebase
          .firestore()
          .collection("cursos")
          .add({
            ...this.items,
            idUser: window.uid,
            data_criacao: new Date().getTime(),
            url_image: url,
          })
          .then(() => {
            this.$root.$emit("showAlert::show", {
              type: "success",
              message: "Curso cadastrado com sucesso...",
              titulo: "Sucesso",
            });
          });
      } catch (error) {
        console.log(error);
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message: "Houve um erro ao tentar cadastrar o curso",
          titulo: "Erro",
        });
      } finally {
        this.loading = false;
        this.$root.$emit("loading::hide");
        this.cleanForm();
        this.carregarCursos();
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    formatoDeData() {
      return moment(this.cursos.data_criacao).format("DD-MM-YYYY");
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

    confirmDilog(id) {
      this.idDelete = id;
    },

    async apagar() {
      this.loading = true;
      this.$root.$emit("loading::show");
      this.cursos = [];
      if (this.idDelete) {
        await this.$firebase
          .firestore()
          .collection("cursos")
          .doc(this.idDelete)
          .get()
          .then((snapshot) => {
            this.oldImage = snapshot.data().image_name;
            try {
              // Apaga a antiga imagem no Storage
              const storage = getStorage();
              const delRef = ref(storage, "cursos/" + this.oldImage);
              deleteObject(delRef).then(() => {
                console.log("Imagem apagada");
              });

              this.$firebase
                .firestore()
                .collection("cursos")
                .doc(this.idDelete)
                .delete();
            } catch (error) {
              this.$root.$emit("showAlert::show", {
                type: "danger",
                message:
                  "Houve um erro ao carregar as informações do curso, verifica sua conexão com a internet",
                titulo: "Erro",
              });
            } finally {
              this.loading = false;
              this.$root.$emit("loading::hide");
              this.carregarCursos();
            }
          });
      }
    },

    async editForm(id) {
      this.cursoID = id;
      this.formEdit = true;

      try {
        this.$root.$emit("loading::show");
        const valorCurso = await this.$firebase
          .firestore()
          .collection("cursos")
          .doc(id)
          .get();
        this.items = valorCurso.data();
        this.oldImage = valorCurso.data().image_name;
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message:
            "Houve um erro ao carregar as informações do curso, verifica sua conexão com a internet",
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
        .collection("cursos")
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
              "Houve um erro ao carregar as informações do curso, verifica sua conexão com a internet",
            titulo: "Erro",
          });
        })
        .finally(() => {
          this.$root.$emit("loading::hide");
        });
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
