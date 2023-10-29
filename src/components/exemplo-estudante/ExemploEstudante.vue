<template>
  <b-container>
    <section id="team" class="team mt-2">
      <div class="container aos-init aos-animate" data-aos="fade-up">
        <div class="section-header">
          <h2>Pessoas que já esperimentara a nossa aplicação</h2>
          <p>
            Entre encontacto com usuários e receba as nossas experiencias em
            nosssa Instituição. Sobre tudo como Estudar ou marcar consultas
            médicas com os nossos profisssionais
          </p>
        </div>

        <b-row class="gy-4">
          <b-col
            md="3"
            class="d-flex aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="100"
            v-for="(p, index) in funcionarios"
            :key="index"
          >
            <div class="member">
              <img :src="p.url_image" class="img-fluid" alt="" />
              <h4>{{ p.nome }}</h4>
              <span>{{ p.acesso }}</span>
              <div class="social">
                <a href=""><i class="fa-brands fa-twitter"></i></a>
                <a href=""><i class="fa-brands fa-facebook"></i></a>
                <a href=""><i class="fa-brands fa-instagram"></i></a>
                <a href=""><i class="fa-brands fa-linkedin"></i></a>
              </div>
            </div>
          </b-col>
          <!-- End Team Member -->
        </b-row>
      </div>
    </section>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      funcionarios: [],
    };
  },
  created() {
    document.querySelector("#team > div > div.row.gy-4 > div:nth-child(1)");
    this.nossosProfissionais();
  },

  methods: {
    async nossosProfissionais() {
      this.$root.$emit("loading::show");
      try {
        await this.$firebase
          .firestore()
          .collection("users")
          .limit(4)
          .get()
          .then((snp) => {
            this.funcionarios = [];
            snp.forEach((doc) => {
              this.funcionarios.push({
                id: doc.id,
                url_image: doc.data().url_image,
                nome: doc.data().nome,
                breve_descricao: doc.data().breve_descricao,
              });
            });
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.$root.$emit("loading::hide");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.team .member {
  text-align: center;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  overflow: hidden;
  box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.1);
}

*,
::after,
::before {
  box-sizing: border-box;
}

body,
html {
  height: 100%;
}

body {
  margin: 0;
  overflow: hidden;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 32px;
  background: #023b6d;
  display: flex;
  align-items: center;
}

.logo {
  padding-left: 10px;
}

.logo img {
  height: 25px;
}

.logo a {
  display: flex;
}

.logo strong {
  margin-left: 6px;
  text-transform: uppercase;
}

.logo strong span {
  color: #00a6eb;
}

@media (max-width: 768px) {
  .logo {
    display: none;
  }
}

.preview-devices {
  margin-top: 2px;
}

.preview-devices ul {
  margin: 0 0 0 20px;
  padding: 0;
  list-style: none;
  list-style-type: none;
  display: flex;
  align-items: center;
}

.preview-devices a {
  transition: 0.3s;
  color: rgba(255, 255, 255, 0.5);
  display: inline-block;
  padding: 5px 5px;
}

.preview-devices a .icon {
  width: 22px;
  height: 22px;
}

.preview-devices a:hover {
  color: #fff;
}

.preview-devices .preview-devices-active a {
  color: #fff;
}

@media (max-width: 1024px) {
  .preview-devices {
    display: none;
  }
}

.navigate {
  display: flex;
  margin-left: auto;
  align-items: center;
}

.navigate .icon {
  width: 22px;
  height: 22px;
}

.navigate a {
  transition: 0.3s;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.navigate a:hover {
  color: #fff;
}

.navigate .download {
  background: #00a6eb;
  color: #fff;
  font-size: 13px;
  padding: 0 16px;
  height: 32px;
  font-weight: 700;
  text-transform: uppercase;
  margin-left: 15px;
  white-space: nowrap;
}

.navigate .download .icon {
  width: 20px;
  height: 20px;
}

.navigate .download span {
  padding-left: 6px;
}

.navigate .download:hover {
  background: #00b4ff;
}

@media (max-width: 768px) {
  .navigate .download {
    padding: 0 10px;
    font-size: 12px;
    margin-left: 10px;
  }

  .navigate .download .icon {
    display: none;
  }
}

.current-template {
  margin-top: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
}

@media (min-width: 768px) {
  .current-template {
    padding-left: 0;
    margin-left: auto;
  }
}

.current-template .icon {
  width: 24px;
  height: 24px;
}

.current-template a {
  transition: 0.3s;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.current-template a:hover {
  color: #fff;
}

.current-template .template-home {
  font-size: 16px;
  padding: 0;
  font-weight: 700;
  color: #fff;
  margin: -2px 10px 0 10px;
  line-height: 0;
  text-decoration: none;
}

#preview {
  position: absolute;
  left: 0;
  right: 0;
  top: 32px;
  bottom: 0;
  transition: all 0.2s;
}

#preview-frame {
  border: 0;
  position: absolute;
}

.preview-desktop {
  left: 0;
  width: 100%;
  height: 100%;
}

.preview-tablet {
  width: 768px;
  height: 100%;
  left: calc(50% - 384px);
}

.preview-mobile {
  width: 380px;
  height: 680px;
  left: calc(50% - 190px);
  top: 0;
  margin-top: 20px;
}
.team .member .social {
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.team .member .social a {
  color: #a2a2a2;
  transition: 0.3s;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bbbbbb;
}
.team .member .social a:hover {
  color: #5a7ff7;
  transition: 0.3s;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5a7ff7;
}
.section-header h2 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
}
.section-header {
  text-align: center;
  padding-bottom: 60px;
}
*,
::after,
::before {
  box-sizing: border-box;
}

[data-aos].aos-animate {
  pointer-events: auto;
}

.section-header h2:after {
  content: "";
  position: absolute;
  display: block;
  width: 50px;
  height: 3px;
  background: var(--color-primary);
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
*,
::after,
::before {
  box-sizing: border-box;
}
.section-header h2 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
}
</style>
