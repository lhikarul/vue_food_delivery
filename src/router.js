import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Goods from 'components/goods/Goods'
import Ratings from 'components/ratings/Ratings'
import Seller from 'components/seller/Seller'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/goods',
      children: [
        {
          path: '/goods',
          name: 'Goods',
          component: Goods
        },
        {
          path: '/ratings',
          name: 'ratingss',
          component: Ratings
        },
        {
          path: '/seller',
          name: 'seller',
          component: Seller
        }
      ]
    }
  ]
})
