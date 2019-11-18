import * as type from './mutations_type.js'

function canInjectAd(state, index) {
  if (state.adConfig.usingAd === false) return false;

  let start = state.adConfig.injectRule.startIndex;
  let step = state.adConfig.injectRule.step;
  if(index === start || (index > start && (index - start) % step === 0)) {
    return true;
  }
  else {
    return false;
  }
}

function randGetOnAd(state) {
  let count = state.adConfig.materials.length;

  // 随机获取一个素材
  let randIdx = Math.floor(Math.random()*(count-1));
  let adImagePath = state.adConfig.materials[randIdx].path;
  return {
    path: adImagePath,
    href: state.adConfig.hrefOne
  }
}

export default {

// 获取新闻
  [type.GET_NEWSLIST] (state, payload) {
    let type = payload.type;
    for (let item of payload.data) {
      let repin_count = 6+Math.floor(Math.random()*200);

      // 评论数，点赞数
      item['repin_count'] = repin_count;
      item['comment_count'] = Math.floor(repin_count / (1+Math.random()*3)+Math.random()*50);

      // 媒体来源
      if (item.media_name === undefined){
        let media_name =  (item.author.length === 0) ? item.source : item.author;
        item['media_name'] = media_name;
      }

      // 插入广告
      let index = state.list[type].length;
      if (canInjectAd(state, index)) {
        item ['ad'] = randGetOnAd(state);
      }

      state.list[type].push(item);
    }
  },

  // 获取新闻 for kaiyao
  [type.GET_NEWSLIST_KAIYAO] (state, payload) {
    let type = payload.type;
    for (let item of payload.data) {
      let repin_count = 6+Math.floor(Math.random()*200);

      // 评论数，点赞数
      item['repin_count'] = repin_count;
      item['comment_count'] = Math.floor(repin_count / (1+Math.random()*3)+Math.random()*50);

      // 媒体来源
      if (item.media_name === undefined){
        let media_name =  (item.author.length === 0) ? item.source : item.author;
        item['media_name'] = media_name;
      }

      // 插入广告
      let index = state.kaiyaoList[type].length;
      if (canInjectAd(state, index)) {
        item ['ad'] = randGetOnAd(state);
      }

      state.kaiyaoList[type].push(item);
    }
  },

  // 获取文章
  [type.GET_ARTICLE] (state, payload) {
    for (let key in payload) {
      state.article[key] = payload[key]
    }
  },
  // 获取段子
  [type.GET_SESSION] (state, payload) {
    payload.data.forEach(item => {
      state.session.push(item)
    })
  },
  // 获取收藏
  [type.GET_COLLECTION] (state, data) {
    state.collection = data
  },
  // 搜索
  [type.GET_SEARCH] (state, { data, keyword }) {
    for (let item of data) {
      if (item.title && item.title.includes(keyword)) {
        item.title = item.title.replace(new RegExp(keyword, 'g'), `<b style="color: red">${keyword}</b>`)
      }
      state.search.push(item)
    }
  },
  // 是否返回搜索
  [type.RETURN_SEARCH] (state, boolean) {
    state.ifReturnSearch = boolean
  },
  // 是否在加载中
  [type.IF_LOADING] (state, boolean) {
    state.loading = boolean
  },
  // 添加历史
  [type.ADD_HISTORY] (state, content) {
    const item = {
      id: state.history.count++,
      content
    }
    state.history.items.unshift(item);
    localStorage.setItem('chan_history', JSON.stringify(state.history))
  },
  // 删除历史
  [type.REMOVE_HISTORY] (state, id) {
    let index = state.history.items.findIndex(item => {
      return item.id === id
    })
    state.history.items.splice(index, 1);
    localStorage.setItem('chan_history', JSON.stringify(state.history))
  },
  // 清空历史
  [type.CLEAR_HISTORY] (state) {
    state.history.items = []
    localStorage.setItem('chan_history', JSON.stringify(state.history))
  },
  // 是否加载更多搜索
  [type.LOADMORE_SEARCH] (state, boolean) {
    state.loadmoreSearch = boolean
  },
  // 是否返回更多搜索
  [type.RETURN_MORE_SEATCH] (state, boolean) {
    state.ifReturnMoreSearch = boolean
  },
  // 添加收藏
  [type.ADD_COLLECTION] (state, data) {
    state.localCollection.unshift(data);
    localStorage.setItem('chan_collection', JSON.stringify(state.localCollection))
  },
  // 删除收藏
  [type.REMOVE_COLLECTION] (state, id) {
    const index = state.localCollection.findIndex(item => {
      return item.id === id
    })
    state.localCollection.splice(index, 1);
    localStorage.setItem('chan_collection', JSON.stringify(state.localCollection))
  },
  // 刷新消息
  [type.REFRESH_NEWS] (state, payload) {
    let type = payload.type
    for (let item of payload.data) {
      state.list[type].unshift(item)
    }
  },
  // 刷新消息的数量
  [type.REFRESH_LENGTH] (state, length) {
    state.newsLength = length
    state.ifReturnRefresh = true
  },
  // 记录从主页离开时的新闻类型
  [type.LOG_TYPE] (state, type) {
    state.type = type
  },
  // 保存网页离开时的位置
  [type.SAVE_POSITION] (state, {name, position}) {
    state.positions[name] = position
  },
  [type.ISNEWESTCONTLOADED](state, flag){
    state.isNewestContLoaded = flag;
  },
  [type.HASPARAGRAPH](state, flag){
    state.hasParagraph = flag;
  }
}
