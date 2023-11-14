<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Consultar</div>
      </span>
    </h5>

    <div class="container">
      <h3>Disponibilidade médica</h3>
      <hr />
      <!-- Main table element -->
      <b-table
        responsive
        :items="routinamedica"
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
      >
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(data)="row">
          {{ moment(row.item.data).format("DD-MM-YYYY") }}
        </template>

        <template #cell(actions)="row">
          <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Detalhes
          </b-button>
          <button
            class="btn btn-sm btn-primary ml-2"
            @click="
              marcarConsulta(
                row.item.data,
                row.item.horas,
                row.item.medico,
                row.item.idMedico
              )
            "
          >
            <span v-if="loadingRoutina"
              ><i class="fa-solid fa-circle-notch fa-spin"></i> Marcar</span
            >
            <span v-else><i class="fa-solid fa-check"></i> Marcar</span>
          </button>
        </template>

        <template #row-details="row">
          <b-card class="bg-white text-center">
            <ul>
              <li v-if="row.item.url_image">
                <img
                  :src="row.item.url_image"
                  class="image-stayle rounded-circle mt-4"
                />
              </li>
              <li v-else><i class="fa-regular fa-circle-user fa-4x"></i></li>
              <li>
                <strong>Especialista:</strong>
                <h6>{{ row.item.area }}</h6>
              </li>
              <li>
                <strong>Mais sobre o Médico/Infermeiro:</strong>
                <h6>{{ row.item.sobre_funcionario }}</h6>
              </li>
              <li>
                <strong>Entrar em contácto com o médico:</strong>
                <h6>{{ row.item.contacto }}</h6>
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <b-col sm="7" md="6" class="my-1 mt-2">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </div>
  </div>
</template>

<script>
//import Swal from "sweetalert2";
import moment from "moment";
export default {
  name: "consultar-page",
  data() {
    return {
      routinamedica: [],
      moment: moment,
      dataPaciente: {
        nome: "",
        telemovel: "",
        url_image: "",
      },
      loadingRoutina: false,
      fields: [
        {
          key: "nome",
          label: "O Médico/Infermeiro",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "data",
          label: "Data disponível",
          sortable: true,
        },
        { key: "horas", label: "Início da consulta", sortable: true },
        { key: "actions", label: "Acções" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
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
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.routinamedica.length;
  },

  created() {
    this.routinaMedica();
  },

  methods: {
    verificarConsultaMarcada() {},
    async marcarConsulta(data, hora, idRoutina, idMedico) {
      const mes = new Date(data).getMonth();

      this.$root.$emit("loading::show");
      try {
        const paciente = await this.$firebase
          .firestore()
          .collection("consultas_marcadas")
          .where("idPaciente", "==", window.uid)
          .where("idRoutinaMedica", "==", idRoutina)
          .get();
        if (paciente.docs.length > 0) {
          this.$swal.fire({
            title: "Atensão",
            text: "Você já solicitou uma consulta com este Médico, aguarde...",
            icon: "info",
            confirmButtonText: "Ok",
          });
          return;
        } else {
          this.$firebase
            .firestore()
            .collection("users")
            .doc(window.uid)
            .get()
            .then((snp) => {
              this.$firebase
                .firestore()
                .collection("consultas_marcadas")
                .doc(window.uid)
                .set({
                  idPaciente: window.uid,
                  idRoutinaMedica: idRoutina,
                  idReponsavel: idMedico,
                  data: data,
                  nome: snp.data().nome,
                  telemovel: snp.data().telemovel,
                  url_image: snp.data().url_image,
                  mes: mes,
                  horas: hora,
                  paciente: "Paciente-" + window.uid,
                  status: 0,
                })
                .then(() => {
                  this.$swal.fire({
                    title: "Sucesso",
                    text:
                      "Consulta marcada com sucesso para o dia " +
                      data +
                      " às " +
                      hora +
                      " em modo de conferência porfavor esteje preparado/a.",
                    icon: "success",
                    confirmButtonText: "Ok",
                  });
                });
            });
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.$root.$emit("loading::hide");
      }
    },
    async routinaMedica() {
      try {
        await this.$firebase
          .firestore()
          .collection("routina_medica")
          .get()
          .then((snapshot) => {
            this.routinamedica = [];
            snapshot.forEach((doc) => {
              this.routinamedica.push({
                data: doc.data().data,
                medico: doc.id,
                idMedico: doc.data().idResponsavel,
                nome: doc.data().nome,
                horas: doc.data().horas,
                area: doc.data().area,
                contacto: doc.data().contacto,
                sobre_funcionario: doc.data().sobre,
                url_image: doc.data().url_image,
              });
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
<style scoped>
.image-stayle {
  margin: auto;
  width: 8%;
  height: 5%;
  padding: botton 0px;
  border: 1px solid gray;
}
ul li {
  text-decoration: none;
  list-style-type: none;
}
</style>
