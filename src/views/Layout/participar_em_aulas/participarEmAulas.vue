<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div
          class="container"
          v-if="
            acesso == 'SuperAdmin-dev' ||
            acesso == 'professor' ||
            acesso == 'medico' ||
            acesso == 'enfermeiro'
          "
        >
          Criar actividade
        </div>
        <div class="container" v-else-if="acesso == 'paciente'">
          Participar na consultoria
        </div>
        <div class="container" v-else>Participar na aula</div>
      </span>
    </h5>
    <!-- <iframe
      :src="`https://meet.jit.si/${turma}`"
      allow="camera; microphone"
      allowfullscreen
    ></iframe> -->
    <div class="container">
      <b-row>
        <b-col class="m-auto text-danger text-center">
          <span v-if="!conferencia"
            ><h3>De momento não existe actividade marcada</h3></span
          >

          <b-table
            v-else
            responsive
            :items="conferencia"
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
            <template #table-caption>Lista de actividades.</template>

            <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #cell(curso)="row">
              <div class="d-flex justify-content-start">
                {{ row.item.curso }}
              </div>
            </template>

            <template #cell(turma)="row">
              <div class="d-flex justify-content-start">
                {{ row.item.turma }}
              </div>
            </template>

            <template #cell(data)="row">
              <div class="d-flex justify-content-start">
                {{ new Date(row.item.data).toLocaleDateString("pt-BR") }}
              </div>
            </template>

            <template #cell(time)="row">
              <div class="d-flex justify-content-start">
                {{ row.item.inicio }}
              </div>
            </template>

            <template #cell(actions)="row">
              <div
                class="d-flex justify-content-start"
                v-if="
                  (row.item.status == '0' && acesso == 'SuperAdmin-dev') ||
                  acesso == 'professor' ||
                  acesso == 'medico' ||
                  acesso == 'enfermeiro'
                "
              >
                <a
                  @click="iniciarConferencia(row.item.id)"
                  :href="`https://meet.jit.si/${row.item.turma}`"
                  class="btn btn-sm btn-primary"
                  target="_blank"
                  start="fullscreen"
                  ><i class="fa-solid fa-chalkboard-user"></i> Iniciar
                  conferência</a
                >
              </div>

              <div
                class="d-flex justify-content-start text-danger"
                v-else-if="
                  (row.item.status == '1' && acesso == 'SuperAdmin-dev') ||
                  acesso == 'professor' ||
                  acesso == 'medico' ||
                  acesso == 'enfermeiro'
                "
              >
                <span
                  ><i class="fa-solid fa-chalkboard-user"></i> Você já deu
                  início a esta conferência</span
                >
              </div>

              <div
                class="d-flex justify-content-start"
                v-if="
                  (row.item.status == '1' && acesso == 'estudante') ||
                  acesso == 'paciente'
                "
              >
                <a
                  :href="`https://meet.jit.si/${row.item.turma}`"
                  class="btn btn-sm btn-primary"
                  target="_blank"
                  start="fullscreen"
                  ><i class="fa-solid fa-chalkboard-user"></i> Participar</a
                >
              </div>

              <div
                class="d-flex justify-content-start"
                v-if="
                  (row.item.status == '0' && acesso == 'estudante') ||
                  acesso == 'paciente'
                "
              >
                <span
                  ><i class="fa-solid fa-chalkboard-user"></i> Aguarde o inicio
                  pelo responsável</span
                >
              </div>
            </template>
          </b-table>

          <div class="overflow-auto">
            <div class="mt-0">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalConferencia"
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
        </b-col>

        <b-col
          md="4"
          v-if="
            acesso == 'professor' ||
            acesso == 'SuperAdmin-dev' ||
            acesso == 'medico'
          "
        >
          <div class="card">
            <div class="card-header">Cria sua turma de aulas</div>
            <div class="card-body">
              <alert-message></alert-message>
              <b-row>
                <b-col md="12" class="mb-2">
                  <span class="text-danger small" v-if="erros.turma">{{
                    erros.turma
                  }}</span>
                  <input
                    type="text"
                    placeholder="Deia um nome da turma"
                    v-model="items.turma"
                    class="form-control"
                  />
                </b-col>

                <b-col md="6" class="mb-2">
                  <span class="text-danger small" v-if="erros.curso">{{
                    erros.curso
                  }}</span>
                  <select class="form-select" v-model="items.curso">
                    <option selected>Selecione um curso</option>
                    <option v-for="(c, index) in cursos" :key="index">
                      {{ c.nome_curso }}
                    </option>
                  </select>
                </b-col>

                <b-col md="6" class="mb-2">
                  <span class="text-danger small" v-if="erros.classe">{{
                    erros.classe
                  }}</span>
                  <select class="form-select" v-model="items.classe">
                    <option selected>Selecione uma classe</option>
                    <option v-for="(c, index) in classes" :key="index">
                      {{ c.nome_classe }}
                    </option>
                  </select>
                </b-col>

                <b-col md="6" class="mb-2">
                  <span class="text-danger small" v-if="erros.data">{{
                    erros.data
                  }}</span>
                  <input
                    type="text"
                    onfocus="(this.type='date')"
                    placeholder="Dia de aulas"
                    v-model="items.data"
                    class="form-control"
                  />
                </b-col>

                <b-col md="6" class="mb-2">
                  <span class="text-danger small" v-if="erros.time">{{
                    erros.time
                  }}</span>
                  <input
                    type="text"
                    onfocus="(this.type='time')"
                    placeholder="Início"
                    v-model="items.time"
                    class="form-control"
                  />
                </b-col>

                <b-col md="12 mt-4">
                  <div class="d-grid gap-2">
                    <button
                      class="btn btn-primary"
                      type="button"
                      @click="criarTurma"
                    >
                      <span v-if="loading"
                        ><i class="fa-solid fa-circle-notch fa-spin"></i>
                        Aguarde ...</span
                      >
                      <span v-else>
                        <i class="fa-solid fa-chalkboard-user"></i> Criar turma
                        de conferência</span
                      >
                    </button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
//import moment from "moment";
import alertMessage from "../../../components/alertas/alertComponent.vue";
export default {
  components: {
    alertMessage,
  },
  data() {
    return {
      erros: [],
      cursoEstudante: "",
      conferencia: [],
      cursos: [],
      classes: [],
      loading: false,
      conferenciaEstudante: [],
      items: {
        data: "",
        time: "",
        turma: "",
        curso: "",
        classe: "",
      },
      acesso: "",
      is_turma: null,
      columns: [
        {
          label: "Conferência de:",
          field: "curso",
          //dataFormat: this.priceFormat
        },

        {
          label: "Sala",
          field: "turma",
        },
        {
          label: "Data",
          field: "data",
        },
        {
          label: "Início",
          field: "time",
        },
      ],

      fields: [
        {
          key: "curso",
          label: "Conferência de:",
          sortable: true,
        },
        {
          key: "turma",
          label: "Sala",
          sortable: true,
        },
        {
          key: "data",
          label: "Data",
          sortable: true,
        },
        {
          key: "time",
          label: "Início",
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

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    totalConferencia() {
      return this.conferencia.length;
    },
  },

  async mounted() {
    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .onSnapshot((snapshot) => {
          this.acesso = snapshot.data()?.acesso;
        });

      await this.$firebase
        .firestore()
        .collection("videoconferencia")
        .where("responsavelID", "==", window.uid)
        .get()
        .then((snp) => {
          snp.forEach((doc) => {
            if (doc.data().data < new Date().getTime()) {
              var videoKill_query = this.$firebase
                .firestore()
                .collection("videoconferencia")
                .where("horaRegisto", "<", new Date().getHours());

              videoKill_query.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.delete();
                });
              });
            } else {
              console.log("nao faca nada");
            }
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  created() {
    this.is_turma = false;
    this.carregarCursos();
    this.carregarClasses();
    this.carregarConferencia();
    this.carregarConferenciaEstudante();
  },

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    // formatoDeData() {
    //   return moment(this.Classes.data_criacao).format("DD-MM-YYYY");
    // },

    cleanForm() {
      this.items = {
        data: "",
        time: "",
        turma: "",
        curso: "",
        classe: "",
      };
    },

    async carregarConferencia() {
      try {
        await this.$firebase
          .firestore()
          .collection("videoconferencia")
          .where("responsavelID", "==", window.uid)
          .get()
          .then((snapshot) => {
            (this.conferencia = []),
              snapshot.forEach((doc) => {
                this.conferencia.push({
                  id: doc.id,
                  curso: doc.data().curso,
                  inicio: doc.data().time,
                  turma: doc.data().turma,
                  data: doc.data().data,
                  status: doc.data().status,
                });
              });
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    async carregarConferenciaEstudante() {
      try {
        await this.$firebase
          .firestore()
          .collection("videoconferencia")
          .where("curso", "==", this.cursoEstudante)
          .get()
          .then((snapshot) => {
            (this.conferenciaEstudante = []),
              snapshot.forEach((doc) => {
                this.conferenciaEstudante.push({
                  id: doc.id,
                  curso: doc.data().curso,
                  inicio: doc.data().time,
                  turma: doc.data().turma,
                  data: doc.data().data,
                  status: doc.data().status,
                });
              });
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    async carregarEstudanteAuth() {
      try {
        this.$firebase
          .firestore()
          .collection("estudantes")
          .doc(window.uid)
          .then((doc) => {
            this.cursoEstudante = doc.data().curso;
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    async carregarClasses() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("Classes")
        .where("idUser", "==", window.uid)
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

    validaCampo() {
      if (this.items.turma == "") {
        this.erros.push({
          turma: "Informe o nome da turma",
        });
        this.erros.turma = "Informe o nome da turma";
      }
      if (this.items.data == "") {
        this.erros.push({
          data: "Informe a data do inicio das aulas",
        });
        this.erros.data = "Informe a data do inicio das aulas";
      }
      if (this.items.time == "") {
        this.erros.push({
          time: "Informe a hora do inicio das aulas",
        });
        this.erros.time = "Informe a hora do inicio das aulas";
      }

      if (this.items.curso == "") {
        this.erros.push({
          curso: "Selecione um curso",
        });
        this.erros.curso = "Selecione um curso";
      }

      if (this.items.classe == "") {
        this.erros.push({
          classe: "Selecione uma classe",
        });
        this.erros.classe = "Selecione uma classe";
      }
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
                nome_curso: doc.data().nome_curso,
              });
            });
        });
      this.$root.$emit("loading::hide");
    },

    async criarTurma() {
      this.erros = [];
      this.validaCampo();
      if (this.erros.length > 0) {
        this.validaCampo();
      } else {
        try {
          this.loading = true;
          let milisegundos = this.items.data;
          const a = await this.$firebase
            .firestore()
            .collection("users")
            .doc(window.uid)
            .get();
          const len = 10;
          const arr = "abcde";
          let ans = "";
          for (var i = len; i > 0; i--) {
            ans += arr[Math.floor(Math.random() * arr.length)];
          }
          const { turma } = this.items;
          console.log(turma + ans);
          const turmaRandom = turma + " - " + ans;
          await this.$firebase
            .firestore()
            .collection("videoconferencia")
            .add({
              ...this.items,
              turma: turmaRandom,
              data: new Date(milisegundos).getTime(),
              horaRegisto: new Date().getHours(),
              responsavel: a.data().nome,
              responsavelID: window.uid,
              createdAt: new Date().getTime(),
              area: a.data().acesso,
              status: "0",
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "A sua turma foi criada com sucesso",
                titulo: "Sucesso",
              });
              this.carregarConferencia();
            });
        } catch (error) {
          this.$root.$emit("showAlert::show", {
            type: "danger",
            message: error.code,
            titulo: "Erro",
          });
        } finally {
          this.loading = false;
          this.cleanForm();
        }
      }
    },

    async iniciarConferencia(id) {
      try {
        await this.$firebase
          .firestore()
          .collection("videoconferencia")
          .doc(id)
          .update({
            status: "1",
          })
          .then(() => {
            this.carregarConferencia();
          });
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message: error.code,
          titulo: "Erro",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
