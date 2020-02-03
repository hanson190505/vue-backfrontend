import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    children: [{
        path: '/orders',
        name: 'orders',
        component: () => import('../components/order/orderlist.vue'),
      },
      {
        path: '/orders/:pk',
        name: 'ordersDetail',
        component: () => import('../components/order/orderdetail.vue'),
      },
      {
        path: '/suborders',
        name: 'suborders',
        component: () => import('../components/order/suborderdetail.vue'),
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import('../components/customers/customerlist.vue'),
      },
      {
        path: '/purchases',
        name: 'purchases',
        component: () => import('../components/purchase/purchase.vue'),
      },
      {
        path: '/purchasedetails',
        name: 'purchasedetails',
        component: () => import('../components/purchase/purchaseDetail.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,代表放行
  if (to.path === '/login') {
    return next()
  }
  let tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  return next()
})

export default router