<template>
  <div>
    <b-col>
      <b-link
        :to="{
          name: 'medico-detalhe',
          params: { m: m },
        }"
        class="text-decoration-non animate__animated animate__backInUp linkStyle"
      >
        <b-card no-body class="overflow-hidden" style="max-width: 540px">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="m.url_image"
                alt="Image"
                class="rounded-0"
                style="max-width: 540px"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="m.nome_medico">
                <b-card-text
                  style="
                    max-width: 60ch;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  Médico: <strong>{{ m.status }}</strong>
                  <p class="text-start small">vêr mais sobre o médico</p>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-link>
    </b-col>
  </div>
</template>

<script>
export default {
  props: ["m"],
  data() {
    return {};
  },
};
</script>
<style scoped>
.linkStyle {
  text-decoration: none;
}
</style>
