<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">
          <span v-if="status != 'paciente' && status != 'estudante'"
            >Painel de controle</span
          ><span v-else>Home</span>
        </div>
      </span>
    </h5>

    <b-row
      v-if="status != 'paciente' && status != 'estudante' && status != 'outra'"
    >
      <b-col md="12">
        <column-chart
          :library="{ backgroundColor: '#000' }"
          legend="bottom"
          :colors="['#4ff37b', '#66f']"
          :stacked="true"
          loading="Carregando..."
          :download="true"
          :responsive="true"
          color="#00524"
          label="Consultas mensais"
          width="100%"
          height="280px"
          :data="[
            ['Jan', jan],
            ['Fev', fev],
            ['Mar', mar],
            ['Abr', abr],
            ['Mai', mai],
            ['Jun', jun],
            ['Jul', jul],
            ['Ago', ago],
            ['Set', set],
            ['Out', out],
            ['Nov', nov],
            ['Dez', dez],
          ]"
          class="container"
        ></column-chart>
      </b-col>

      <b-col md="6">
        <pie-chart
          :download="true"
          :donut="true"
          loading="Carregando..."
          :data="[
            ['Medicos', totalMedico],
            ['Enfermeiros', totalEnfermeiro],
            ['Professores', totalProfessor],
            ['Estudante', totalEstudante],
            ['pacientes', totalPaciente],
          ]"
        ></pie-chart>
      </b-col>
      <b-col md="6">
        <pie-chart
          :download="true"
          loading="Carregando..."
          :data="[
            ['pacientes', totalPaciente],
            ['consultas', totalConsulta],
          ]"
        ></pie-chart>
      </b-col>
    </b-row>

    <b-container v-else>
      <b-col md="12" v-if="status == 'outra'" class="text-center text-danger">
        Se estás a ver esta página, isso significa que és um
        <strong>Professor</strong> ou <strong>médico.</strong> Portanto precisas
        de autorização para usufluir dos teus serviços.
      </b-col>
      <b-col class="d-flex justify-content-center">
        <img
          src="/img/icons/telemedicina.png"
          style="max-width: 280px; padding-top: 200px"
        />
      </b-col>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      status: "",
      moment: moment,
      totalPaciente: 0,
      totalMedico: 0,
      totalEnfermeiro: 0,
      totalProfessor: 0,
      totalEstudante: 0,
      totalConsulta: 0,
      data: [
        {
          name: "Workout",
          data: {
            "2017-01-01 00:00:00 -0800": 3,
            "2017-01-02 00:00:00 -0800": 4,
          },
        },
        {
          name: "Call parents",
          data: {
            "2017-01-01 00:00:00 -0800": 5,
            "2017-01-02 00:00:00 -0800": 3,
          },
        },
      ],

      jan: 0,
      fev: 0,
      mar: 0,
      abr: 0,
      mai: 0,
      jun: 0,
      jul: 0,
      ago: 0,
      set: 0,
      out: 0,
      nov: 0,
      dez: 0,
    };
  },

  methods: {},

  async mounted() {
    if (!window.uid) {
      this.$router.push({ name: "login" });
    }
    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .get()
        .then((snp) => {
          this.status = snp.data()?.acesso;
        });
    } catch (error) {
      console.log(error.message);
    }
    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .where("acesso", "==", "paciente")
        .onSnapshot((snp) => {
          this.totalPaciente = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .where("acesso", "==", "medico")
        .onSnapshot((snp) => {
          this.totalMedico = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .where("acesso", "==", "professor")
        .onSnapshot((snp) => {
          this.totalProfessor = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .where("acesso", "==", "estudante")
        .onSnapshot((snp) => {
          this.totalEstudante = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .where("acesso", "==", "enfermeiro")
        .onSnapshot((snp) => {
          this.totalEnfermeiro = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .onSnapshot((snp) => {
          this.totalConsulta = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 1)
        .onSnapshot((snp) => {
          this.jan = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 2)
        .onSnapshot((snp) => {
          this.fev = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 3)
        .onSnapshot((snp) => {
          this.mar = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 4)
        .onSnapshot((snp) => {
          this.abr = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 5)
        .onSnapshot((snp) => {
          this.mai = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 6)
        .onSnapshot((snp) => {
          this.jun = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 7)
        .onSnapshot((snp) => {
          this.jul = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 8)
        .onSnapshot((snp) => {
          this.ago = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 9)
        .onSnapshot((snp) => {
          this.set = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 10)
        .onSnapshot((snp) => {
          this.out = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 11)
        .onSnapshot((snp) => {
          this.nov = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.$firebase
        .firestore()
        .collection("consultas_marcadas")
        .where("mes", "==", 12)
        .onSnapshot((snp) => {
          this.dez = snp.docs.length;
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
