<template>
  <div class="container-fluid">
    <footer
      class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
    >
      <div class="col-md-4 d-flex align-items-center">
        <a
          href="/"
          class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
        >
          <svg class="bi" width="30" height="24">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>
        <span class="mb-3 mb-md-0 text-muted"
          >© {{ anoActual }} EscolaMedicina-telemedicinaChip, Inc</span
        >
      </div>

      <ul
        class="nav col-md-4 col-sm-4 justify-content-end list-unstyled d-flex"
      >
        <!-- <svg class="bi" width="30" height="24">
            <use xlink:href="#bootstrap"></use>
          </svg>
        <li class="ms-3">
          
          <a class="text-muted" href="#"
            ><span
              ><i class="fa-brands fa-1x fa-facebook"></i
            ></span>
          </a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="#"
            ><span><i class="fa-brands fa-1x fa-youtube"></i></span
          ></a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="#"
            ><span
              ><i class="fa-brands fa-1x fa-whatsapp"></i></span
          ></a>
        </li> -->
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anoActual: "",
    };
  },

  created() {
    const ano = new Date();
    this.anoActual = ano.getFullYear();
  },
};
</script>
