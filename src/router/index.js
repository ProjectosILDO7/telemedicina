import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'home',
    meta:{
      icon:'home', title:'home'
    },
    component:()=>import('../views/HomePage.vue')
  },
  {
    path:'/login',
    name:'login',
    meta:{
      icon:'login', title:'Login'
    },
    component:()=>import('../views/LoginPage.vue')
  },
  {
    path:'/reset-password',
    name:'reset-password',
    meta:{
      icon:'reset', title:'Redefinir-senha'
    },
    component:()=>import('../views/resetPassword.vue')
  },
  {
    path:'/inscricoes',
    name:'inscricoes',
    meta:{
      icon:'register', title:'Inscrições'
    },
    component:()=>import('../views/inscEstudante.vue')
  },
  {
    path:'/encontre-medico',
    name:'findMedico',
    meta:{
      icon:'user-doctor', title:'Encontre-médico'
    },
    component:()=>import('../views/findMedico.vue')
  },
  {
    path:'/cursos/',
    name:'cursos',
    meta:{
      icon:'graduation-cap', title:'Cursos'
    },
    component:()=>import('../views/cursosPage.vue'),
    children:[
      {
        path:'/cursos-component',
        name:'cursos-componente',
        component:()=>import('../components/cursos/CursosComponent.vue')
      },
      
    ]
  },
  {
    path:'/curso-detalhe/:cursos',
    name:'curso-detalhe',
    props:true,
    meta:{
      icon:'info', title:'Detalhes-curso'
    },
    component:()=>import('../components/cursos/cursoDetalhe.vue')
  },
  {
    path:'/medico-detalhe/:m',
    name:'medico-detalhe',
    props:true,
    meta:{
      icon:'info', title:'Detalhes-curso'
    },
    component:()=>import('../components/findMedico/medicoDetalhe.vue')
  },
  {
    path:'/admin',
    name:'dashboard',
    meta:{
      icon:'Dashboard', title:'Dashboard'
    },
    component:()=>import('../views/Layout/DashboardLayout.vue'),
    children:[
      {
        path:'/painel_de_control',
        name:'painel-control',
        meta:{icon:'dashboard', title:'Painel de controle'},
        component:()=>import('../views/Layout/PainelDeControl.vue')
      },
      {
        path:'/medicos',
        name:'medicos-pages',
        meta:{icon:'user-doctor', title:'Médicos'},
        component:()=>import('../views/Layout/MedicosPages.vue')
      },
      {
        path:'/estudantes',
        name:'estudantes',
        meta:{icon:'chalkboard-user', title:'Estudantes'},
        component:()=>import('../views/Layout/estudantesPage.vue')
      },
      {
        path:'/utlizadores',
        name:'utilizadores-page',
        meta:{icon:'user-circle', title:'Utilizadores'},
        component:()=>import('../views/Layout/utilizadores/UtilizadoresPage.vue')
      },
      {
        path:'/matricula',
        name:'matricula',
        meta:{icon:'graduation-cap', title:'Matricula'},
        component:()=>import('../views/Layout/estudante/matriculasPage.vue')
      },
      {
        path:'/cursos',
        name:'cursos-page',
        meta:{icon:'graduation-cap', title:'cursos-page'},
        component:()=>import('../views/Layout/CursosPages.vue')
      },
      {
        path:'/setting',
        name:'setting-page',
        meta:{icon:'gear', title:'Definições'},
        component:()=>import('../views/Layout/settingPage.vue')
      },
      {
        path:'/perfil',
        name:'perfil-page',
        meta:{icon:'user', title:'Perfil'},
        component:()=>import('../views/Layout/perfil/PerfilPage.vue')
      },
      {
        path:'/consulta',
        name:'consulta-page',
        meta:{icon:'stethoscope', title:'Minhas-consultas'},
        component:()=>import('../views/Layout/minha_consulta/ConsultaPage.vue')
      },
      {
        path:'/meu_curso',
        name:'meuCurso-page',
        meta:{icon:'stethoscope', title:'Minhas-consultas'},
        component:()=>import('../views/Layout/meu_curso/MeuCursoPage.vue')
      },
      {
        path:'/classes',
        name:'classe-page',
        meta:{icon:'stethoscope', title:'Minhas-classes'},
        component:()=>import('../views/Layout/classesPage.vue')
      },
      {
        path:'/notify',
        name:'notify-page',
        meta:{icon:'bell', title:'Notificações'},
        component:()=>import('../views/Layout/messages/notifyPage.vue')
      },
      {
        path:'/messages',
        name:'messages-page',
        meta:{icon:'envelope', title:'Mensagens'},
        component:()=>import('../views/Layout/messages/messagesPages.vue')
      },
      {
        path:'/turmas',
        name:'participar_em_aulas',
        meta:{icon:'chalkboard-user', title:'Turmas'},
        component:()=>import('../views/Layout/participar_em_aulas/participarEmAulas.vue')
      },
      {
        path:'/turmas2',
        name:'participar_em_aulas_estudante_paciente',
        meta:{icon:'chalkboard-user', title:'Turmas'},
        component:()=>import('../views/Layout/participar_em_aulas/participarEmAulasEstudante.vue')
      },
      {
        path:'/assistencia-medica',
        name:'assistencia_medica',
        meta:{icon:'stethoscope', title:'Assistencia-médica'},
        component:()=>import('../views/Layout/assistencia_medica/Assistencia_medica.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  document.title=`${to.meta.title} - TelemedicinaChip`
  if(!window.uid && to.name !=='login' && to.name !=='home' && to.name !=='paciente' && to.name !=='curso-detalhe' && to.name !=='curso-componente' && to.name !=='cursos' && to.name !=='inscricoes' && to.name !=='reset-password' && to.name !=="findMedico" && to.name !=="medico-detalhe"){
    next({name:'home'})
  }else{
    next()
  }
})

export default router
