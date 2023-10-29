<template>
  <b-card bg-variant="dark" text-variant="white" title="Estude connosco">
    <b-card-text>
      Garanta seus estudos com a nossa Instituição de Ensino Técnico a
      distância. Te formamos para o mercado de emprego, com os melhores
      professores de ensino técnico de saúde e com as melhores ferramentas
      tecnológica para você aprender sem se deslocar do seu local de conforto.
    </b-card-text>
    <router-link :to="{ name: 'inscricoes' }" class="btn btn-sm btn-primary"
      ><i class="fa-solid fa-graduation-cap"></i> Faça a sua
      inscrição</router-link
    >
  </b-card>
</template>
