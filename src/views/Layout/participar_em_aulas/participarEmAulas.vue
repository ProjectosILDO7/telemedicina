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
              <div
                class="d-flex justify-content-start"
                v-if="
                  (row.item.status == '0' && acesso == 'SuperAdmin-dev') ||
                  acesso == 'professor'
                "
              >
                <button
                  @click="eniciarTeleaula(row.item.id)"
                  v-if="row.item.status != 1"
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
                  @click="statusOn()"
                  class="btn btn-sm btn-secondary"
                >
                  <i class="fa-solid fa-video-slash"></i>
                </button>
              </div>

              <div
                class="d-flex justify-content-start"
                v-if="row.item.status == '1' && acesso == 'estudante'"
              >
                <button
                  @click="eniciarTeleaulaAluno()"
                  v-if="row.item.status != 0"
                  class="btn btn-sm btn-primary"
                >
                  <span v-if="loadingTeleAula"
                    ><i class="fa-solid fa-circle-notch"></i> Iniciar ...</span
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
            <div class="card-header">Cria horário de actividade</div>
            <div class="card-body">
              <alert-message></alert-message>
              <b-row>
                <b-col md="12" class="mb-2">
                  <span class="text-danger small" v-if="erros.dia_semanal">{{
                    erros.dia_semanal
                  }}</span>
                  <select
                    type="text"
                    placeholder="Deia um nome da turma"
                    v-model="items.dia_semanal"
                    class="form-select"
                  >
                    <option selected value="">Selecione um dia semanal</option>
                    <option value="Segunda-feira">Segunda-feira</option>
                    <option value="Terça-feira">Terça-feira</option>
                    <option value="Quarta-feira">Quarta-feira</option>
                    <option value="Quinta-feira">Quinta-feira</option>
                    <option value="Sexta-feira">Sexta-feira</option>
                  </select>
                </b-col>

                <b-col md="12" class="mb-2">
                  <span class="text-danger small" v-if="erros.periodo">{{
                    erros.periodo
                  }}</span>
                  <select class="form-select" v-model="items.periodo">
                    <option value="" selected>Selecione um período</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                  </select>
                </b-col>

                <b-col md="6" class="mb-2">
                  <span class="text-danger small" v-if="erros.horario">{{
                    erros.horario
                  }}</span>
                  <input
                    type="text"
                    onfocus="(this.type='time')"
                    placeholder="Horário"
                    v-model="items.horario"
                    class="form-control"
                  />
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

                <b-col md="12" class="mb-2">
                  <span class="text-danger small" v-if="erros.curso">{{
                    erros.curso
                  }}</span>
                  <select class="form-select" v-model="items.curso">
                    <option value="" selected>Selecione um curso</option>
                    <option
                      :value="c.curso"
                      v-for="(c, index) in cursos"
                      :key="index"
                    >
                      {{ c.curso }}
                    </option>
                  </select>
                </b-col>

                <b-col md="12" class="mb-2">
                  <span class="text-danger small" v-if="erros.classe">{{
                    erros.classe
                  }}</span>
                  <select class="form-select" v-model="items.classe">
                    <option value="" selected>Selecione um classe</option>
                    <option
                      :value="cls.classe"
                      v-for="(cls, index) in classes"
                      :key="index"
                    >
                      {{ cls.classe }}
                    </option>
                  </select>
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
                        <i class="fa-solid fa-chalkboard-user"></i> Criar
                        horário para tele-aulas</span
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
    this.carregarUserActual();
    this.carregarTeleAulas();
  },

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    statusOn() {
      this.$swal.fire({
        title: "Oops..",
        text: "Ola! professor, você já ministrou essa aula datada neste dia",
        icon: "info",
        confirmationButtonText: "Ok",
      });
    },

    statusOnEstudante() {
      this.$swal.fire({
        title: "Oops..",
        text: "Ola! estudante, esta aula já foi ministrada pelo professor",
        icon: "info",
        confirmationButtonText: "Ok",
      });
    },

    async eniciarTeleaula(id) {
      this.loadingTeleAula = true;
      try {
        this.loadingIniciarVideo = true;
        await this.$firebase
          .firestore()
          .collection("tele-aulas")
          .doc(id)
          .update({ status: 1 })
          .then(() => {
            this.$router.push({ name: "auth0" });
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingTeleAula = false;
        this.carregarTeleAulas();
      }
    },

    eniciarTeleaulaAluno() {
      this.$router.push({ name: "auth0" });
    },
    // formatoDeData() {
    //   return moment(this.Classes.data_criacao).format("DD-MM-YYYY");
    // },

    cleanForm() {
      this.items = {
        dia_semanal: "",
        horario: "",
        perirodo: "",
        data: "",
        curso: "",
        classe: "",
      };
    },

    async carregarTeleAulas() {
      try {
        await this.$firebase
          .firestore()
          .collection("tele-aulas")
          .where("idProfessor", "==", window.uid)
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

    async carregarUserActual() {
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .get()
        .then((snp) => {
          this.carregarClasses(snp.data().instituacao);
          this.carregarCursos(snp.data().instituacao);
        });
    },

    async carregarClasses(idInstituicao) {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("Classes")
        .where("idUser", "==", idInstituicao)
        .get()
        .then((snapshot) => {
          (this.classes = []),
            snapshot.forEach((doc) => {
              this.classes.push({
                id: doc.id,
                classe: doc.data().nome_classe,
              });
            });
        });
      this.$root.$emit("loading::hide");
    },

    async carregarCursos(idInstituicao) {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("cursos")
        .where("idUser", "==", idInstituicao)
        .get()
        .then((snapshot) => {
          (this.cursos = []),
            snapshot.forEach((doc) => {
              this.cursos.push({
                id: doc.id,
                curso: doc.data().nome_curso,
              });
            });
        });
      this.$root.$emit("loading::hide");
    },

    validaCampo() {
      if (this.items.dia_semanal == "") {
        this.erros.push({
          dia_semanal: "Informe o dia da semana",
        });
        this.erros.dia_semanal = "Informe o dia da semana";
      }
      if (this.items.horario == "") {
        this.erros.push({
          horario: "Informe o horário do inicio da aula",
        });
        this.erros.horario = "Informe o horário do inicio da aula";
      }
      if (this.items.periodo == "") {
        this.erros.push({
          periodo: "Informe o período da aula",
        });
        this.erros.periodo = "Informe o período da aula";
      }

      if (this.items.data == "") {
        this.erros.push({
          data: "Selecione um curso",
        });
        this.erros.data = "Selecione um curso";
      }

      if (this.items.classe == "") {
        this.erros.push({
          classe: "Selecione uma classe",
        });
        this.erros.classe = "Selecione uma classe";
      }
      if (this.items.curso == "") {
        this.erros.push({
          curso: "Selecione um curso",
        });
        this.erros.curso = "Selecione um curso";
      }
    },

    async criarTurma() {
      this.erros = [];
      this.validaCampo();
      if (this.erros.length > 0) {
        this.validaCampo();
      } else {
        this.loading = true;
        try {
          await this.$firebase
            .firestore()
            .collection("tele-aulas")
            .add({ ...this.items, idProfessor: window.uid, status: 0 })
            .then(() => {
              this.$swal.fire({
                title: "Sucesso",
                icon: "success",
                text: "O seu horário de trabalho foi adicionado com sucesso",
                confirmationButtonText: "Ok",
              });
            });
        } catch (error) {
          this.$swal.fire({
            title: "Erro",
            icon: "danger",
            text: error.message,
            confirmationButtonText: "Ok",
          });
        } finally {
          this.loading = false;
          this.cleanForm();
          this.carregarTeleAulas();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
