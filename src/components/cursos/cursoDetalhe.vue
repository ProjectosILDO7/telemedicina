<template>
  <div>
    <b-row class="ml-auto mt-2">
      <b-col md="4"> </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="m-auto mt-4">
        <b-col md="12" class="d-flex justify-content-end">
          <router-link
            :to="{ name: 'inscricoes' }"
            class="btn btn-sm btn-info mb-2"
            ><i class="fa-solid fa-graduation-cap"></i> Inscrever-se neste
            curso</router-link
          >
        </b-col>
        <b-card
          :title="cursos.nome_curso"
          :img-src="cursos.url_image"
          img-alt="Image"
          img-top
        >
          <b-card-text>
            {{ cursos.perfil_saida }}
          </b-card-text>
          <b-card-text class="small text-muted"
            ><strong>Última actualização: </strong
            >{{ moment(cursos.data_criacao).format("DD-MM-YYYY") }}</b-card-text
          >

          <b-card-text class="small text-muted">
            <strong>Cobrança: </strong>{{ cursos.cobranca_curso }}
          </b-card-text>

          <b-card-text class="small text-muted">
            <strong>Tempo de formação: </strong>{{ cursos.horas_de_formacao }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["cursos"],
  data() {
    return {
      moment: moment,
    };
  },
};
</script>
