<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="50"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="Cuidamos de ti"
        text="A melhor saúde para si e sua família."
        img-src="/img/casaco.jpg"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="/img/medico.jpg">
        <h1>Olá Doutor!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="/img/estetoscopio.jpg"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="/img/paciente.jpg"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide
        caption="A solução para sua saúde"
        img-blank
        img-alt="A solução para sua saúde"
      >
        <p>
          Encontre o melhor médico e tenha uma saúde de cualidade para si e sua
          família. E ainda serás tratado em sua propria casa.
        </p>
      </b-carousel-slide>
    </b-carousel>

    <!-- <medicos-component /> -->

    <estudos-component />

    <sobre-page-vue />

    <b-container>
      <b-row>
        <b-col>
          <cards />
        </b-col>
        <b-col>
          <cards-link-Estude />
        </b-col>
      </b-row>
    </b-container>

    <!-- <pacientes-satidfeito /> -->

    <b-container>
      <b-row class="bg-light">
        <b-col md="6" class="py-4">
          <inscrever />
        </b-col>
        <b-col md="6" class="py-4">
          <contacto-page />
        </b-col>
      </b-row>
    </b-container>

    <!-- <exemplo-estudante /> -->
  </div>
</template>

<script>
import ContactoPage from "./ContactoPage.vue";
//import LoginPageVue from "./LoginPage.vue";
import SobrePageVue from "./SobrePage.vue";
import EstudosComponent from "../components/estudos/EstudosOnline.vue";
//import MedicosComponent from "../components/medicos/MedicosEspecialistas.vue";
//import PacientesSatidfeito from "../components/pacientes/PacientesSatisfeitos.vue";
//import Tratamento from "../components/tratamentos/TratamentosAssistidos.vue";
import cards from "../components/Cards/cardsComponent.vue";
import cardsLinkEstude from "../components/Cards/estudeEmcasa.vue";
import inscrever from "../components/inscrever-se/inscrevaSe.vue";
// import ExemploEstudante from "../components/exemplo-estudante/ExemploEstudante.vue";

export default {
  name: "home-page",
  components: {
    ContactoPage,
    //LoginPageVue,
    SobrePageVue,
    EstudosComponent,
    //MedicosComponent,
    //PacientesSatidfeito,
    //Tratamento,
    cards,
    cardsLinkEstude,
    inscrever,
    // ExemploEstudante,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>
