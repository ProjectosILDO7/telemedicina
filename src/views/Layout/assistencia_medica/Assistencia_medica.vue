<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Assistencia médica - Routina de trabalho</div>
      </span>
    </h5>

    <div class="container mt-2">
      <b-row v-if="acesso != 'paciente'">
        <b-col class="d-flex justify-content-end mb-2">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Cadastrar dias para consultas
          </button>
        </b-col>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="exampleModalLabel">
                  Criar disponibilidade
                </h6>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <b-row>
                  <alert-message />

                  <b-col>
                    <span class="text-danger small" v-if="erros.data">{{
                      erros.data
                    }}</span>
                    <input
                      v-model="items_routine.data"
                      class="form-control"
                      type="text"
                      onfocus="(this.type='date')"
                      placeholder="Marcar data de atendimento"
                    />
                  </b-col>
                  <b-col>
                    <span class="text-danger small" v-if="erros.horas">{{
                      erros.horas
                    }}</span>
                    <input
                      v-model="items_routine.horas"
                      class="form-control"
                      type="text"
                      onfocus="(this.type='time')"
                      placeholder="Hora de atendimento"
                    />
                  </b-col>
                </b-row>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="cleanFormModal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="criarActividade"
                  :disabled="loading"
                >
                  <span v-if="loading"
                    ><i class="fa-solid fa-circle-notch"></i> Salvando...</span
                  >
                  <span v-else
                    ><i class="fa-solid fa-floppy-disk"></i> Salvar</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-row>

      <b-table
        responsive
        striped
        hover
        :items="items"
        :fields="fields"
        v-if="items != '' && acesso == 'medico'"
        small
        caption-top
      >
        <template #table-caption
          ><strong v-if="acesso == 'medico'"
            >Dias de consultas.</strong
          ></template
        >
        <template #cell(actions)="row">
          <button
            class="btn btn-sm"
            @click="ApagarRoutine(row.item.id)"
            v-if="acesso != 'paciente'"
          >
            <i class="fa-solid fa-trash text-danger"></i>
          </button>
        </template>
      </b-table>

      <b-table
        responsive
        striped
        hover
        :items="itemsPaciente"
        :fields="fields"
        v-if="itemsPaciente != '' && acesso == 'paciente'"
        small
        caption-top
      >
        <template #table-caption
          ><strong>
            Consultas marcadas - aguardando para interagir com o médico
          </strong></template
        >
        <template #cell(actions)="row">
          <div v-if="acesso == 'paciente' && row.item.status != 0">
            <router-link :to="{ name: 'auth0' }"
              ><i class="fa-solid fa-video text-success"></i
            ></router-link>
          </div>
          <div v-else>
            <a href="#"><i class="fa-solid fa-video-slash text-danger"></i></a>
          </div>
        </template>
      </b-table>
      <b-table v-else>
        <template>
          <span class="text-danger"
            ><strong>De momento não existem consultas marcadas</strong></span
          >
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import alertMessage from "../../../components/alertas/alertComponent.vue";
// import { where, or } from "firebase/firestore";
export default {
  components: { alertMessage },
  name: "routina_medica",
  data() {
    return {
      acesso: "",
      loading: false,
      erros: [],
      item_funcionario: [],
      items_routine: {
        data: "",
        horas: "",
      },
      items: [],
      itemsPaciente: [],
      fields: [
        {
          key: "data",
          sortable: true,
        },
        {
          key: "horas",
          sortable: true,
        },
        { key: "actions", label: "Status" },
      ],
    };
  },

  created() {
    this.userAuth();
    this.carregarFucnionario();
    this.carregarRoutinaMedica();
    this.carregarRoutina();
  },

  methods: {
    iniciarConsulta(id) {
      this.$root.$emit("loading::show");
      try {
        this.$firebase
          .firestore()
          .collection("consultas_marcadas")
          .doc(id)
          .update({
            status: 1,
            paciente: "Paciente-" + id,
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.$root.$emit("loading::hide");
        this.carregarRoutinaMedica();
      }
    },
    async userAuth() {
      try {
        await this.$firebase
          .firestore()
          .collection("users")
          .doc(window.uid)
          .get()
          .then((snap) => {
            this.acesso = snap.data().acesso;
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    cleanForm() {
      this.erros = [];
      this.items_routine = {
        data: "",
        horas: "",
      };
    },

    cleanFormModal() {
      this.cleanForm();
    },

    validarCampos() {
      if (this.items_routine.data == "") {
        this.erros.push({
          data: "Precisas inserir a data de atendimento",
        });
        this.erros.data = "Precisas inserir a data de atendimento";
      } else {
        this.erros.data = "";
      }
      if (this.items_routine.horas == "") {
        this.erros.push({
          horas: "Precisas inserir a hora de atendimento",
        });
        this.erros.horas = "Precisas inserir a hora do atendimento";
      } else {
        this.erros.horas = "";
      }
    },
    async carregarRoutina() {
      var userAcess = "";
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .get()
        .then((snap) => {
          userAcess = snap.data()?.acesso;
        });
      console.log(userAcess);
      if (userAcess == "paciente") {
        try {
          await this.$firebase
            .firestore()
            .collection("consultas_marcadas")
            .where("idPaciente", "==", window.uid)
            .get()
            .then((snapshot) => {
              (this.itemsPaciente = []),
                snapshot.forEach((doc) => {
                  this.itemsPaciente.push({
                    id: doc.id,
                    dia: new Date(doc.data().data).getDay(),
                    data: doc.data().data,
                    horas: doc.data().horas,
                    status: doc.data().status,
                    paciente: doc.data().paciente,
                  });
                });
            });
        } catch (error) {
          console.log(error.message);
        } finally {
          this.$root.$emit("loading::hide");
        }
      } else {
        try {
          await this.$firebase
            .firestore()
            .collection("consultas_marcadas")
            .where("idResponsavel", "==", window.uid)
            .get()
            .then((snapshot) => {
              (this.itemsPaciente = []),
                snapshot.forEach((doc) => {
                  this.itemsPaciente.push({
                    id: doc.id,
                    dia: new Date(doc.data().data).getDay(),
                    data: doc.data().data,
                    horas: doc.data().horas,
                    status: doc.data().status,
                    paciente: doc.data().paciente,
                  });
                });
            });
        } catch (error) {
          console.log(error.message);
        } finally {
          this.$root.$emit("loading::hide");
        }
      }
    },

    async carregarRoutinaMedica() {
      this.$root.$emit("loading::show");
      try {
        await this.$firebase
          .firestore()
          .collection("routina_medica")
          .where("idResponsavel", "==", window.uid)
          .get()
          .then((snapshot) => {
            (this.items = []),
              snapshot.forEach((doc) => {
                this.items.push({
                  id: doc.id,
                  dia: new Date(doc.data().data).getDay(),
                  data: doc.data().data,
                  horas: doc.data().horas,
                  status: doc.data().status,
                  paciente: doc.data().paciente,
                });
              });
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.$root.$emit("loading::hide");
      }
    },
    async carregarFucnionario() {
      try {
        await this.$firebase
          .firestore()
          .collection("funcionarios")
          .doc(window.uid)
          .get()
          .then((snapshot) => {
            this.item_funcionario = snapshot.data();
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    async criarActividade() {
      this.$root.$emit("loading::show");
      this.erros = [];
      this.validarCampos();
      if (this.erros.length > 0) {
        this.validarCampos();
      } else {
        this.loading = true;
        const { data } = this.items_routine;
        const dia = new Date(data).getDay();

        const nome = this.item_funcionario.nome;
        const contacto = this.item_funcionario.contacto;
        const sobre = this.item_funcionario.breve_descricao;
        const area = this.item_funcionario.area_de_formacao;
        const url_image = this.item_funcionario.url_image;

        await this.$firebase
          .firestore()
          .collection("routina_medica")
          .add({
            ...this.items_routine,
            nome,
            url_image,
            contacto,
            sobre,
            area,
            idResponsavel: window.uid,
            dia: dia,
          })
          .then(() => {
            this.$root.$emit("showAlert::show", {
              type: "success",
              message: "Routina criada com sucesso",
              titulo: "Sucesso",
            });
            this.carregarRoutina();
            this.cleanForm();
          })
          .finally(() => {
            this.loading = false;
            this.carregarRoutina();
            this.$root.$emit("loading::hide");
            this.carregarRoutinaMedica();
          });
      }
    },

    async ApagarRoutine(id) {
      console.log(id);
      await this.$firebase
        .firestore()
        .collection("routina_medica")
        .doc(id)
        .delete()
        .then(() => {
          this.$swal.fire({
            title: "Sucesso",
            text: "Routina médica apagada com sucesso",
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.carregarRoutinaMedica();
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
