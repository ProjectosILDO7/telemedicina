<template>
  <div class="app-dashboard">
    <side-bar/>
    <main>
      <nave-bar-admin/>
      <router-view/>
    </main>
    
  </div>
</template>

<script>
import sideBar from '../../components/sideBar/SideBar.vue'
import naveBarAdmin from '../../components/navBar/navBarAdmin.vue'
export default{
  name:'dashboard-layout',
  components:{sideBar, naveBarAdmin},
  data() {
    return {
      
    }
  },

  created() {
    this.$router.push({name:'painel-control'})
  },
}
</script>

<style lang="scss" scoped>

.app-dashboard{
  display:flex;

  main{
    flex: 1 1 0;
    padding: 0;

    @media (max-width: 768px) {
      padding-left:48px;
      padding-top: 0;

      //width:calc(100% - 30px);
    }
  }
}
</style>
