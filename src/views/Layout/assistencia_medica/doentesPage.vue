<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Paciente para consultas</div>
      </span>
    </h5>
    <div class="container">
      <b-table responsive striped hover :items="pacientes" :fields="fields">
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>
        <template #cell(nome)="row">
          {{ row.item.paciente }}
        </template>
        <template #cell(url_image)="row">
          <a :href="row.item.url_image" target="_blank"
            ><img :src="row.item.url_image" class="rounded-circle"
          /></a>
        </template>
        <template #cell(telemovel)="row">
          {{ row.item.telemovel }}
        </template>
        <template #cell(actions)="row">
          <b-button
            size="sm"
            class="mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="enviarNotificacao(row.item.telemovel, row.item.idPaciente)"
          >
            <i class="fa-brands fa-whatsapp"></i> notificar
            <!-- :disabled="notificar == false" -->
          </b-button>
          <!--  -->
          <b-button size="sm" @click="eniciarConsulta(row.item.idPaciente)">
            <span
              v-if="
                loadingIniciarVideo && idpacienteVideo == row.item.idPaciente
              "
              ><i class="fa-solid fa-video"></i> Iniciar ...
              <i class="fa-solid fa-circle-notch fa-spin"></i
            ></span>
            <span v-else
              ><i class="fa-solid fa-video"></i> Eniciar consulta</span
            >
          </b-button>
        </template></b-table
      >

      <!-- Modal -->
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
                <i class="fa-brands fa-whatsapp"></i> Alertar o paciente no
                <strong>Whatsapp</strong> da consulta
              </h6>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">
              <alert-component-vue />
              <p><i class="fa-brands fa-whatsapp text-success fa-2x"></i></p>
              <p>{{ number }}</p>
              <input
                type="text"
                placeholder="number"
                class="form-control form-control-sm"
                disabled
                v-model="number"
              />
              <textarea
                class="form-control form-control-sm"
                cols="60"
                rows="2"
                placeholder="Envie uma mensagem"
                v-model="sendMessage"
              ></textarea>
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
                @click="sendMessageWhatsapp"
                :disabled="sendMessage == ''"
              >
                <span v-if="loading"
                  ><i class="fa-solid fa-circle-notch"></i> Enviando ...</span
                >
                <span v-else
                  ><i class="fa-solid fa-paper-plane"></i> Enviar</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import alertComponentVue from "@/components/alertas/alertComponent.vue";
export default {
  components: { alertComponentVue },
  data() {
    return {
      notificar: false,
      pacientes: [],
      idpacienteVideo: "",
      number: "",
      success: "",
      loading: false,
      loadingIniciarVideo: false,
      sendMessage: "",
      fields: [
        {
          key: "nome",
          label: "O Paciente",
          sortable: true,
        },
        {
          key: "telemovel",
          label: "Telemovel",
          sortable: true,
        },
        {
          key: "url_image",
          label: "Foto",
        },
        { key: "actions", label: "Acções" },
      ],
    };
  },
  async mounted() {
    try {
      this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("idReponsavel", "==", window.uid)
        .onSnapshot((snp) => {
          this.idConsulta = [];
          snp.forEach((doc) => {
            this.pacientes.push({
              id: doc.id,
              paciente: doc.data().nome,
              idPaciente: doc.data().idPaciente,
              telemovel: doc.data().telemovel,
              url_image: doc.data().url_image,
              hora: doc.data().hora,
            });
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  methods: {
    enviarNotificacao(telemovel, idPaciente) {
      this.idpacienteVideo = idPaciente;
      this.number = "+244" + telemovel;
    },

    async sendMessageWhatsapp() {
      try {
        this.loading = true;
        await axios.post(
          "https://cluster.apigratis.com/api/v2/whatsapp/sendText",
          {
            number: this.number,
            text: this.sendMessage,
            time_typing: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              DeviceToken: "c992a833-f2a5-43de-b87d-1a405924d6da",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3BsYXRhZm9ybWEuYXBpYnJhc2lsLmNvbS5ici9hdXRoL2xvZ2luIiwiaWF0IjoxNjg1NjMwMTgxLCJleHAiOjE3MTcxNjYxODEsIm5iZiI6MTY4NTYzMDE4MSwianRpIjoiS2s0NnYxb1dlcklmTW50dyIsInN1YiI6IjMyMzciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nJpzwzXKfiCVbkHZ1-AHZf4LT06rkG7s8_5BEEbztis",
            },
          }
        );
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "error",
          message: error.message,
          titulo: "Erro no envio",
        });
      } finally {
        this.$root.$emit("showAlert::show", {
          type: "success",
          message: "Mensagem enviada com sucesso",
          titulo: "Sucesso",
        });
        (this.success = ""), (this.loading = false);
        this.sendMessage = "";
        this.notificar = true;
      }
    },

    async eniciarConsulta(idPaciente) {
      this.idpacienteVideo = idPaciente;
      try {
        this.loadingIniciarVideo = true;
        await this.$firebase
          .firestore()
          .collection("consultas_marcadas")
          .doc(idPaciente)
          .update({ status: 1 })
          .then(() => {
            this.$router.push({ name: "auth0" });
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingIniciarVideo = false;
      }
    },
  },
};
</script>
<style scoped>
img {
  width: 2rem;
  height: 2rem;
}
</style>
