<template>
  <b-row>
    <b-col md="6" class="m-auto mt-4">
      <b-card
        :title="medico.nome"
        :img-src="medico.url_image"
        img-alt="Image"
        img-top
      >
        <b-card-text>
          <strong>Formado na área de:</strong> {{ medico.area_de_formacao }}
        </b-card-text>
        <b-card-text>
          <strong>Formação especifica:</strong>
          {{ medico.area_de_especializacao }}
        </b-card-text>

        <b-card-text>
          <strong>Contácto:</strong> {{ medico.contacto }}
        </b-card-text>

        <b-card-text>
          <strong>Descrição:</strong> {{ medico.breve_descricao }}
        </b-card-text>

        <b-card-text class="small text-muted"
          ><strong>Última actualização: </strong
          >{{ moment(medico.data_criacao).format("DD-MM-YYYY") }}</b-card-text
        >
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import moment from "moment";
export default {
  props: ["m"],
  data() {
    return {
      moment: moment,
      medico: [],
    };
  },

  async mounted() {
    try {
      await this.$firebase
        .firestore()
        .collection("funcionarios")
        .doc(this.m.id)
        .onSnapshot((snp) => {
          this.medico = snp.data();
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>
