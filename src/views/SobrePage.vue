<template>
  <b-container>
    <b-row class="text-center mt-2">
      <b-col>
        <h3>Saiba mais sobre nossos serviços</h3>
      </b-col>
    </b-row>
    <p class="texto-justificado">
      {{ carregarSobre }}
    </p>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      carregarSobre: [],
    };
  },

  async mounted() {
    this.$root.$emit("loadign::show");
    try {
      await this.$firebase
        .firestore()
        .collection("paginaSobre")
        .onSnapshot((snp) => {
          (this.sobre = []),
            snp.docs.forEach((doc) => {
              this.idSobre = doc.id;
              this.carregarSobre = doc.data().sobre;
            });
        });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.$root.$emit("loadign::hide");
    }
  },
};
</script>

<style scoped>
.texto-justificado {
  text-align: justify !important;
}
</style>
