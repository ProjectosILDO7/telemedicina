<template>
  <b-container>
    <b-row>
      <b-col class="text-secondary text-start">
        <h3>Conheça os nossos Profissionais</h3>
      </b-col>
    </b-row>

    <b-row>
      <b-col v-for="(p, index) in funcionarios" :key="index">
        <b-card
          :title="p.nome"
          img-src="/img/medico.jpg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2 text-center"
        >
          <div class="img2 mb-0">
            <b-img
              v-bind="mainProps"
              rounded="circle"
              alt="Circle image"
              :src="p.url_image"
            ></b-img>
          </div>

          <b-card-text>
            {{ p.breve_descricao }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      funcionarios: [],
      mainProps: {
        blank: false,
        blankColor: "#777",
        width: 100,
        height: 100,
        class: "m1",
      },
    };
  },

  created() {
    this.nossosProfissionais();
  },

  methods: {
    async nossosProfissionais() {
      this.$root.$emit("loading::show");
      try {
        await this.$firebase
          .firestore()
          .collection("funcionarios")
          .limit(6)
          .get()
          .then((snp) => {
            this.funcionarios = [];
            snp.forEach((doc) => {
              this.funcionarios.push({
                id: doc.id,
                url_image: doc.data().url_image,
                nome: doc.data().nome,
                breve_descricao: doc.data().breve_descricao,
              });
            });
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.$root.$emit("loading::hide");
      }
    },
  },
};
</script>

<style scoped>
.img2 img {
  z-index: 1;
  margin-top: -160px;
}
.img2 {
  margin-top: -30px;
}
.card-title {
  margin-top: 60px !important;
}
</style>
