import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);
const state = {
  loading: false,                 // loading图片的切换
  ifReturnMsg: '',               // 是否返回数据
  loadmore: false,               // 是否加载更多新闻
  ifReturnMore: true,            // 是否返回更多新闻
  hasParagraph:false,           //是否有段落
  isNewestContLoaded:false,

  list: {                        // 新闻
        info_humor: [],
        info_entertainment: [],
        info_sports: [],
        info_cate: [],
        info_society: [],
        info_health: [],
        info_constellation: [],
        info_car: [],
        info_education: [],
        info_game: [],
        info_finance: []
    },

  // 凯耀渠道数据
  kaiyaoList: {
      info_humor: [],
      info_entertainment: [],
      info_sports: [],
      info_cate: [],
      info_society: [],
      info_health: [],
      info_constellation: [],
      info_car: [],
      info_education: [],
      info_game: [],
      info_finance: []
  },

  // 广告配置
  adConfig: {
      // 标识是否使用广告
      usingAd: true,

      // 广告素材
      hrefOne: "https://engine.lvehaisen.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=315106",
      materials: [
        {
            path: "/static/image/tuiya/tuiya_ad01.gif",
            width: 700,
            height: 280,
            href: ""
        },
        {
            path: "/static/image/tuiya/tuiya_ad02.png",
            width: 700,
            height: 280,
            href: ""
        },
        {
            path: "/static/image/tuiya/tuiya_ad03.jpg",
            width: 700,
            height: 280,
            href: ""
        },
        {
            path: "/static/image/tuiya/tuiya_ad04.jpg",
            width: 700,
            height: 280,
            href: ""
        },
        {
            path: "/static/image/tuiya/tuiya_ad05.png",
            width: 700,
            height: 280,
            href: ""
        },
        {
            path: "/static/image/tuiya/tuiya_ad06.png",
            width: 700,
            height: 280,
            href: ""
        },
        {
            path: "/static/image/tuiya/tuiya_ad07.gif",
            width: 700,
            height: 280,
            href: ""
        },
        {
            path: "/static/image/tuiya/tuiya_ad08.png",
            width: 700,
            height: 280,
            href: ""
        }
      ],

      // 列表页
      injectRule: {
        startIndex: 1,
        step: 3
      }
  },

    article: {                      // 文章
        title: '',
        detail_source: '',
        content: ''
    },
    session: [],                    // 段子
    loadmoreSession: false,         // 是否加载更多段子
    ifReturnSession: true,          // 是否有段子返回
    collection: [],                 // 收藏
    search: [],                     // 搜索
    loadmoreSearch: false,          // 加载更多搜索
    ifReturnMoreSearch: true,       // 是否返回更多搜索
    ifReturnSearch: true,           // 是否返回搜索
    history: localStorage.getItem('chan_history')
                ? JSON.parse(localStorage.getItem('chan_history'))
                : { count: 0, items: [] },
    localCollection: localStorage.getItem('chan_collection')
                ? JSON.parse(localStorage.getItem('chan_collection'))
                : [],
    newsLength: 0,                  // 刷新返回的新闻数量
    ifReturnRefresh: false,         // 是否刷新成功
    type: '',                       // 记录从主页离开时的新闻类型
    positions: {}
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
