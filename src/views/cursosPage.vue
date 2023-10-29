<template>
  <b-container class="mt-4">
    <h4>Nossos cursos</h4>
    <hr class="hr hr-blurry" />
    <b-row class="mb-2">
      <b-col>
        <b-input-group class="mb-2">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <b-form-input
            id="inline-form-input-username"
            placeholder="Procurar curso"
          ></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6" class="mt-2" v-for="(c, index) in cursos" :key="index">
        <cursos-component
          :cursos_nome="c.cursos_nome"
          :url_image="c.url_image"
          :perfil_saida="c.perfil_saida"
          :nome_curso="c.nome_curso"
          :cursos="c"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CursosComponent from "../components/cursos/CursosComponent.vue";
export default {
  name: "cursos-page",
  components: { CursosComponent },
  data() {
    return {
      cursos: [],
    };
  },

  created() {
    this.carregarCursos();
  },

  methods: {
    async carregarCursos() {
      this.$root.$emit("loading:show");
      try {
        await this.$firebase
          .firestore()
          .collection("cursos")
          .get()
          .then((snap) => {
            this.cursos = [];
            snap.forEach((doc) => {
              this.cursos.push({
                id: doc.id,
                nome_curso: doc.data().nome_curso,
                perfil_saida: doc.data().perfil_saida,
                horas_de_formacao: doc.data().horas_de_formacao,
                cobranca_curso: doc.data().cobranca_curso,
                url_image: doc.data().url_image,
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
