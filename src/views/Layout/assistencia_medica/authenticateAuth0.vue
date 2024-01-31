<template>
  <div class="ratio ratio-16x9">
    <!-- Tele consulta -->
    <div class="row align-items-center">
      <div class="col d-flex justify-content-center">
        <a
          href="https://telechip2.invc.vc/65ba26583ca174b3e8f73434?projectId=654b5879564f69294c2a452a&uid=dGVsZW1lZGljaW5hY2hpcEBnbWFpbC5jb20="
          class="ml-2"
          v-if="acesso == 'medico'"
        >
          <h1><i class="fa fa-television" aria-hidden="true"></i></h1
        ></a>

        <a
          href="https://telechip2.invc.vc/65ba26583ca174b3e8f73434?projectId=654b5879564f69294c2a452a&uid=UGFydGljaXBhbnRz"
          v-if="acesso == 'paciente'"
        >
          <h1><i class="fa fa-television" aria-hidden="true"></i></h1
        ></a>

        <a
          href="https://telechip2.invc.vc/65ba26e93ca174b3e8f7343c?projectId=654b5879564f69294c2a452a&uid=dGVsZW1lZGljaW5hY2hpcEBnbWFpbC5jb20="
          v-if="acesso == 'professor'"
        >
          <h1><i class="fa fa-television" aria-hidden="true"></i></h1
        ></a>

        <a
          href="https://telechip2.invc.vc/65ba26e93ca174b3e8f7343c?projectId=654b5879564f69294c2a452a&uid=UGFydGljaXBhbnRz"
          v-if="acesso == 'estudante'"
        >
          <h1><i class="fa fa-television" aria-hidden="true"></i></h1
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
//import { JitsiMeet } from "@mycure/vue-jitsi-meet";
//import Editor from "@tinymce/tinymce-vue";
//import axios from "axios";
export default {
  data() {
    return {
      acesso: "",
      data: "",
      // dataMeet: {
      //   projectId: "654a8e5812f2e452e1400368",
      //   sessionName: "TelemedicinaChip",
      //   token: "",
      //   meetingDetails: {
      //     meetingName: "Telemedicina-consulta",
      //     meetingId: window.uid,
      //     hostUid: "ildocuema@gmail.com",
      //   },
      //   entryTime: new Date().valueOf(), // 1674814970560
      //   expirationTime:  // 1674815538286
      // },
      urlModerador: "",
      auth_token: "",
      projectId: "",
      hostUid: "telemedicinachip@gmail.com",
      token: "",
      item: {
        nome: "",
        email: "",
        type: "",
      },
    };
  },
  components: {
    //VueJitsiMeet: JitsiMeet,
    //Editor,
  },
  async mounted() {
    try {
      await this.$firebase
        .firestore()
        .collection("users")
        .doc(window.uid)
        .get()
        .then((snp) => {
          this.item.nome = snp.data().nome;
          this.item.email = snp.data().email;
          this.acesso = snp.data().acesso;
          this.item.type = "Consultas";
        });
    } catch (error) {
      console.log(error.message);
    }

    //this.urlModerador = `https://telechip.invc.vc/${this.token}?displayName=${this.item.nome}&projectId=${this.projectId}&uid=${this.hostuid}`;
  },

  computed: {
    // jitsiOptions() {
    //   return {
    //     roomName: "Telemedicina-" + this.item.type,
    //     noSSL: false,
    //     jwt: this.auth_token,
    //     userInfo: {
    //       email: "ildocuema@gmail.com",
    //       displayName: this.item.nome,
    //     },
    //     configOverwrite: {
    //       enableNoisyMicDetection: false,
    //       disableSimulcast: false,
    //     },
    //     interfaceConfigOverwrite: {
    //       SHOW_JITSI_WATERMARK: false,
    //       SHOW_BRAND_WATERMARK: false,
    //       HIDE_DEEP_LINKING_LOGO: false,
    //       SHOW_WATERMARK_FOR_GUESTS: false,
    //       SHOW_CHROME_EXTENSION_BANNER: false,
    //       DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
    //     },
    //     onload: this.onIFrameLoad,
    //   };
    // },
  },
  methods: {
    onIFrameLoad() {},
  },

  onParticipantJoined() {
    // do stuff
  },
};
</script>
<style scoped></style>
