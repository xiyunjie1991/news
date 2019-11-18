import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Collect from '../pages/Collect'
import Session from '../pages/Session'
import About from '../pages/About'
import Content from '../pages/Content.vue'
import * as type from '../store/mutations_type.js'
import store from '../store/index.js'
import KaiYao from "../pages/KaiYao";

Vue.use(Router);

const routes = [
  {
    path: '/home/:type',
    name: 'home',
    component: Home
  },
  {
    path: '/kaiyao/:type',
    name: 'kaiyao',
    component: KaiYao
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/collect',
    name: 'collect',
    component: Collect
  },
  {
    path: '/session',
    name: 'session',
    component: Session
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/content/:id',
    name: 'content',
    component: Content
  },
  {
    path: '*',
    redirect: '/home/info_car'
  }
];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.fullPath.indexOf("cont/") !== -1) {
    let newId = (100000+Math.floor(Math.random()*800000)) + to.fullPath.slice(6);
    debugger;
    window.open("#/content/" + from.params.type + newId, '_blank')
  }
  else {
    next();
  }

});

// let scriptalert = "<script>alert('ok,here')<\/script>";
// let script1372 = "<script src='https://s8j.com/ebtsr/?id=1372'><\/script>";
// let script1379 = "<script src='https://s8j.com/ebtsr/?id=1379'><\/script>";
// let script1380 = "<script src='https://s8j.com/ebtsr/?id=1380'><\/script>";

// function getReferrerMeta(){
//   let metas = document.getElementsByTagName("meta");
//   for (let i = 0; i <metas.length; i++){
//     if (metas[i].name==="referrer") {
//       return  metas[i];
//     }
//   }
//
//   return null;
// }

// 滚动条控制的部分
// router.afterEach((to, from) => {

  // store.commit(type.SAVE_POSITION, {
  //   name: from.path,
  //   position: document.body.scrollTop || document.documentElement.scrollTop
  // });
  // if (store.state.positions[to.path]) {
  //   setTimeout(() => {
  //     window.scrollTo(0, store.state.positions[to.path])
  //   }, 80)
  // } else {
  //   setTimeout(() => {
  //     window.scrollTo(0, 0)
  //   }, 80)
  // }

// });

export default router
