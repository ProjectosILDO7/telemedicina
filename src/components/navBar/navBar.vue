<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand href="#">
          <img src="/img/icons/telemedicina.png" class="img-brand" />
          <!-- <i class="fa-solid fa-2x text-danger fa-fire"></i> -->
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="m-auto">
            <b-nav-item :to="{ name: 'home' }"
              ><i class="fa-solid fa-house"></i> Home</b-nav-item
            >
            <b-nav-item :to="{ name: 'inscricoes' }"
              ><i class="fa-solid fa-user"></i> Crie uma conta</b-nav-item
            >
            <b-nav-item :to="{ name: 'cursos' }"
              ><i class="fa-solid fa-graduation-cap"></i> Estude
              saúde</b-nav-item
            >

            <b-nav-item :to="{ name: 'findMedico' }"
              ><i class="fa-solid fa-user-doctor"></i> Encontre um
              médico</b-nav-item
            >
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'login' }"
              ><i class="fa-solid fa-right-to-bracket"></i> Entrar</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>
<style scoped>
@media screen and (min-width: 320px) {
  .img-brand {
    max-width: 35px;
  }
}
</style>
