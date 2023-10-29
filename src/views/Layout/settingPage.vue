<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Sobre</div>
      </span>
    </h5>
    <div class="container text-justify">
      <p>
        Olá, Esta página é de inteira responsabilidade do Administrador. Aqui,
        inofrme as acções que sua instituição terá que fazer
      </p>
      <h6>Informe sobre sua Instituição</h6>
      <span v-if="erros.sobre" class="text-danger small">{{
        erros.sobre
      }}</span>
      <textarea
        class="form-control"
        cols="12"
        rows="4"
        v-model="sobre"
      ></textarea>
      <b-row>
        <b-col class="d-flex align-item-end justify-content-end">
          <button
            class="btn btn-success mt-2"
            @click="saveSobre"
            :disabled="loading"
            v-if="editButton == false"
          >
            <span v-if="loading"
              ><i class="fa-solid fa-circle-notch"></i> Salvando ...</span
            >
            <span v-else><i class="fa fa-save"></i> Salvar</span>
          </button>
          <button
            class="btn btn-success mt-2"
            @click="saveSobreEdit(idSobre)"
            :disabled="loading"
            v-else
          >
            <span v-if="loading"
              ><i class="fa-solid fa-circle-notch"></i> Salvando ...</span
            >
            <span v-else><i class="fa-solid fa-pen-to-square"></i> Salvar</span>
          </button>
        </b-col>
      </b-row>
      <p>
        {{ carregarSobre }}
        <button class="btn badge badge-success" @click="editSobre(idSobre)">
          <i class="fa-regular fa-pen-to-square text-success"></i>
        </button>
        <button
          class="btn badge badge-danger ml-2"
          @click="apagarSobre(idSobre)"
          v-show="editButton"
        >
          <i class="fa-solid fa-trash text-danger"></i>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      erros: [],
      sobre: [],
      carregarSobre: "",
      idSobre: "",
      editButton: false,
    };
  },

  created() {
    this.editButton = false;
  },

  async mounted() {
    this.$root.$emit("loadign::show");
    try {
      await this.$firebase
        .firestore()
        .collection("paginaSobre")
        .onSnapshot((snp) => {
          (this.sobre = []),
            snp.docs.forEach((doc) => {
              this.idSobre = doc.id;
              this.carregarSobre = doc.data().sobre;
            });
        });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.$root.$emit("loadign::hide");
    }
  },

  methods: {
    validarCampo() {
      if (this.sobre == "") {
        this.erros.push({
          sobre: "Informe o conteudo",
        });
        this.erros.sobre = "Informe o conteudo";
      } else {
        this.erros.sobre = "";
      }
    },

    async editSobre(id) {
      this.$root.$emit("loadign::show");
      await this.$firebase
        .firestore()
        .collection("paginaSobre")
        .doc(id)
        .get()
        .then((doc) => {
          console.log(doc.data());
          this.sobre = doc.data().sobre;
          this.editButton = true;
        })
        .finally(() => {
          this.$root.$emit("loadign::hide");
        });
    },
    async saveSobreEdit(id) {
      const sobre = this.sobre;
      await this.$firebase
        .firestore()
        .collection("paginaSobre")
        .doc(id)
        .update({
          sobre,
        })
        .then(() => {
          this.editButton = false;
        });
    },
    async apagarSobre(id) {
      await this.$firebase
        .firestore()
        .collection("paginaSobre")
        .doc(id)
        .delete();
    },
    async saveSobre() {
      this.erros = [];
      this.validarCampo();
      if (this.erros.length > 0) {
        this.validarCampo();
      } else {
        this.loading = true;
        try {
          const s = await this.$firebase
            .firestore()
            .collection("paginaSobre")
            .get();
          if (s.docs.length > 0) {
            return;
          } else {
            const sobre = this.sobre;
            await this.$firebase
              .firestore()
              .collection("paginaSobre")
              .add({ sobre })
              .then(() => {
                this.$swal.fire({
                  title: "Sucesso",
                  text: "Conteudo sobre salvo com sucesso",
                  confirmButtonText: "Ok",
                });
              });
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          this.loading = false;
          this.sobre = [];
        }
      }
    },
  },
};
</script>
