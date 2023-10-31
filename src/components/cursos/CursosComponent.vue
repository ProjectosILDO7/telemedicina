<template>
  <div>
    <b-col>
      <b-link
        :to="{
          name: 'curso-detalhe',
          params: { cursos: cursos },
        }"
        class="text-decoration-non animate__animated animate__backInUp linkStyle"
      >
        <b-card no-body class="overflow-hidden" style="max-width: 540px">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="url_image"
                alt="Image"
                class="rounded-0"
                style="max-width: 540px"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="nome_curso">
                <b-card-text
                  style="
                    max-width: 60ch;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ perfil_saida }}
                  <p class="text-center align-item-center small">vêr mais</p>
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
  props: [
    "url_image",
    "perfil_saida",
    "nome_curso",
    "horas_de_formacao",
    "cobranca_curso",
    "cursos",
  ],
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
