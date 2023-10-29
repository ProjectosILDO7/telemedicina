<template>
  <div>
    <div class="preloading" v-if="visivel">
      <b-spinner variant="primary"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visivel: true,
      variants: ["primary"],
    };
  },
  created() {
    this.$root.$on("loading::show", () => {
      this.visivel = true;
    });
    this.$root.$on("loading::hide", () => {
      this.visivel = false;
    });
  },
};
</script>

<style scoped>
.preloading {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  z-index: 10000000;
  opacity: 0.4;
}
</style>
