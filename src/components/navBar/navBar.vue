<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand href="#"
          ><i class="fa-solid fa-2x text-danger fa-fire"></i
        ></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="m-auto">
            <b-nav-item :to="{ name: 'home' }"
              ><i class="fa-solid fa-house"></i>
              <strong class="text-light font-weight-bold">
                Home</strong
              ></b-nav-item
            >
            <b-nav-item :to="{ name: 'inscricoes' }"
              ><i class="fa-solid fa-user-graduate"></i>
              <strong class="text-light font-weight-bold">
                Inscrições</strong
              ></b-nav-item
            >
            <b-nav-item :to="{ name: 'cursos' }"
              ><i class="fa-solid fa-graduation-cap"></i>
              <strong class="text-light font-weight-bold">
                Cursos</strong
              ></b-nav-item
            >
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'login' }"
              ><i class="fa-solid fa-right-to-bracket"></i>
              <strong class="text-light font-weight-bold">
                Entrar</strong
              ></b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>
