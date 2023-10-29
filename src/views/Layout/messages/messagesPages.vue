<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Messages</div>
      </span>
    </h5>
    <hr />
    <div
      class="container bg-white border border-0 border-start py-2"
      v-if="totalMessage != 0"
    >
      <ul>
        <li v-for="(m, index) in mensagens" :key="index" class="bg-light">
          <strong>Nome: </strong> <span class="text-danger">{{ m.nome }}</span>
          <h6><strong>Contacto: </strong> {{ m.contacto }}</h6>
          <h6>
            <strong>Mensagem: </strong> {{ m.mensagem }}
            <button
              class="badge badge-pill badge-danger"
              @click="apagarSms(m.id)"
              title="Apagar"
            >
              <i class="fa fa-trash text-danger"></i>
            </button>
          </h6>
        </li>
      </ul>
    </div>
    <b-row v-else>
      <b-col class="text-danger text-center">
        De momento não tens nenhuma mensagem na sua caixa
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      totalMessage: "",
      moment: moment,
      mensagens: [],
    };
  },

  async mounted() {
    try {
      this.$firebase
        .firestore()
        .collection("mensagens")
        .onSnapshot((snp) => {
          snp.docs.forEach((doc) => {
            this.mensagens.push({
              id: doc.id,
              mensagem: doc.data().mensagem,
              nome: doc.data().nome,
              contacto: doc.data().contacto,
              data: moment(doc.data().createdAt).format("DD-MM-YYYY"),
            });
          });
        });
    } catch (error) {
      console.log(error.message);
    }

    try {
      this.$firebase
        .firestore()
        .collection("mensagens")
        .onSnapshot((snp) => {
          this.totalMessage = snp.docs.length;
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  methods: {
    async apagarSms(id) {
      this.mensagens = [];
      try {
        await this.$firebase
          .firestore()
          .collection("mensagens")
          .doc(id)
          .delete();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul li {
  list-style: none;
}
</style>
