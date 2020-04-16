import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import("@/views/Home.vue"),
    meta: {
      title: ''
    }
  }
]

const router = new VueRouter({
  routes
})



router.beforeEach((to, from, next) => {

  if (to.meta.index != undefined) {
    store.state.tabActiveIndex = to.meta.index
  }
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      next({
        path: "/login"
      });
      // router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(route => {

  // console.log(route)
  // console.log("跳转")
})


export default router