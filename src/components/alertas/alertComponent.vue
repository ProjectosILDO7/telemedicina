<template>
  <div 
    :class="`alert-${type}`"
    class="alert alert-dismissible fade show" role="alert" v-if="showAlert">
    <strong>{{ titulo }} - </strong> {{ message }}.
    <button type="button" class="btn-close" @click="fechar"></button>
  </div>
</template>


<script>
export default {
  name: 'app-alert',
  data() {
    return {
      showAlert: false,
      type:'danger',
      message:'',
      titulo:'Erro'
    }
  },
  created() {
    this.$root.$on('showAlert::show', (payload)=>{
      this.showAlert=true
      this.type=payload.type
      this.message=payload.message
      this.titulo=payload.titulo
      setTimeout(() => { this.fechar() }, payload.timeout || 8000);
    })
    
  },

  methods: {
    fechar(){
      this.showAlert=false,
      this.message='',
      this.type='danger',
      this.titulo='Erro'
    }
  },

};
</script>

<style lang="scss" scoped>

</style>
