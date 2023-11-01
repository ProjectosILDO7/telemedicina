<template>
  <b-container class="mt-4">
    <h4>Nossos profissionais de saúde</h4>
    <hr class="hr hr-blurry" />
    <b-row class="mb-2">
      <b-col>
        <b-input-group class="mb-2">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <b-form-input
            id="inline-form-input-username"
            placeholder="Procurar médico ou infermeiro"
          ></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6" class="mt-2" v-for="(m, index) in medicos" :key="index">
        <find-medico-component :m="m" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FindMedicoComponent from "../components/findMedico/FindMedicoComponent.vue";
export default {
  name: "findMedicos-page",
  components: { FindMedicoComponent },
  data() {
    return {
      medicos: [],
    };
  },

  created() {
    this.carregarMedicos();
  },

  methods: {
    async carregarMedicos() {
      this.$root.$emit("loading:show");
      try {
        await this.$firebase
          .firestore()
          .collection("users")
          .where("acesso", "==", "medico")
          .get()
          .then((snap) => {
            this.medicos = [];
            snap.forEach((doc) => {
              this.medicos.push({
                id: doc.id,
                nome_medico: doc.data().nome,
                url_image: doc.data().url_image,
                status: doc.data().status,
              });
            });
          });
      } catch (error) {
        console.log(error.message);
        this.$root.$emit("loading:hide");
      }
    },
  },
};
</script>
