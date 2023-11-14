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
    <div class="container-fluid">
      <b-row>
        <b-col class="m-auto text-danger text-center">
          <span v-if="!conferencia"
            ><h3>De momento não existe actividade marcada</h3></span
          >

          <b-table
            v-else
            responsive
            :items="teleaulas"
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
            <template #table-caption>Lista de actividades semanais.</template>

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
              <div class="d-flex justify-content-start">
                <button
                  @click="eniciarTeleaulaAluno()"
                  v-if="row.item.status != 0"
                  class="btn btn-sm btn-primary"
                >
                  <span v-if="loadingTeleAula"
                    ><i class="fa-solid fa-circle-notch fa-spin"></i> Iniciar
                    ...</span
                  >
                  <span v-else></span><i class="fa-solid fa-video"></i>
                </button>

                <button
                  v-else
                  @click="statusOnEstudante()"
                  class="btn btn-sm btn-secondary"
                >
                  <i class="fa-solid fa-video-slash"></i>
                </button>
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
      </b-row>
    </div>
  </div>
</template>

<script>
//import moment from "moment";
//import alertMessage from "../../../components/alertas/alertComponent.vue";
export default {
  components: {},
  data() {
    return {
      erros: [],
      idInstiuicao: "",
      cursoEstudante: "",
      conferencia: [],
      cursos: [],
      classes: [],
      teleaulas: [],
      loading: false,
      loadingTeleAula: false,
      conferenciaEstudante: [],
      items: {
        dia_semanal: "",
        periodo: "",
        horario: "",
        Data: "",
        curso: "",
        classe: "",
      },
      acesso: "",
      is_turma: null,
      columns: [
        {
          label: "Dia semanal",
          field: "dia_semanal",
          //dataFormat: this.priceFormat
        },

        {
          label: "Período",
          field: "periodo",
        },
        {
          label: "Horário",
          field: "horario",
        },
        {
          label: "Data",
          field: "data",
        },
        {
          label: "Curso",
          field: "curso",
        },
        {
          label: "Classe",
          field: "classe",
        },
      ],

      fields: [
        {
          key: "dia_semanal",
          label: "Dia Semanal:",
          sortable: true,
        },
        {
          key: "periodo",
          label: "Período",
          sortable: true,
        },
        {
          key: "horario",
          label: "Horário",
          sortable: true,
        },
        {
          key: "data",
          label: "Data",
          sortable: true,
        },
        {
          key: "curso",
          label: "Curso",
          sortable: true,
        },
        {
          key: "classe",
          label: "Classe",
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

  created() {
    this.is_turma = false;
    this.carregarUserActual();
  },

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    statusOnEstudante() {
      this.$swal.fire({
        title: "Oops..",
        text: "Ola! estudante, esta aula já foi ministrada pelo professor, ou aguarde por uma nova sessão",
        icon: "info",
        confirmationButtonText: "Ok",
      });
    },

    eniciarTeleaulaAluno() {
      this.$router.push({ name: "auth0" });
    },
    // formatoDeData() {
    //   return moment(this.Classes.data_criacao).format("DD-MM-YYYY");
    // },

    async carregarTeleAulas(curso) {
      try {
        await this.$firebase
          .firestore()
          .collection("tele-aulas")
          .where("curso", "==", curso)
          .get()
          .then((snapshot) => {
            (this.teleaulas = []),
              snapshot.forEach((doc) => {
                this.teleaulas.push({
                  id: doc.id,
                  dia_semanal: doc.data().dia_semanal,
                  horario: doc.data().horario,
                  periodo: doc.data().periodo,
                  data: doc.data().data,
                  curso: doc.data().curso,
                  classe: doc.data().classe,
                  status: doc.data().status,
                });
              });
          });
      } catch (error) {
        console.log(error.message);
      }
    },

    async carregarUserActual() {
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .get()
        .then((snp) => {
          console.log(snp.data().curso);
          this.carregarTeleAulas(snp.data().curso);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
