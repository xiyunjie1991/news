<template>
  <div class="newsList">
    <ul>
      <router-link
        v-for="(item, index) in listCon"
        :key="index"
        :to="{
        path: '/cont/' + index,
        name:'cont',
        params:
            {   id:index,
                title:item.title,
                author:item.author,
                source:item.source,
                datetime:item.datatime,
                brief:item.brief,
                media_name:item.media_name,
                image_list:item.image_list,
                repin_count: item.repin_count,
                comment_count:item.comment_count,
                keywords:item.keywords,
                paras:item.paras
            }
        }"
        tag="li"
        class="news_box"
        v-show="item.title"
      >
        <div >
          <div class="news_title" v-html="item.title"></div>
                  <!--一张张以上图片-->
          <div class="news_ontImg" style="text-align: center;" v-if="item.image_list.length===1">
            <img
              v-for="(img, imgIdx) in item.image_list"
              v-lazy="img.url"
              style="margin-top: 15px; width: 100%; height: 360px; object-fit: cover"
              :key="imgIdx"
            />
          </div>
                  <!--我图或两张以上图片-->
          <div class="news_imgs" v-else-if="item.image_list.length > 0 && item.image_list.length < 4">
            <img
              v-for="(img, imgIdx) in item.image_list"
              v-lazy="img.url"
              style="width: 30%; object-fit: cover"
              :key="imgIdx"
            />
          </div>
          <div class="news_info">
            <span class="media_name" v-html="item.media_name"></span>
            <span class="comment_count">评论 {{item.comment_count}}</span>
            <span class="datetime">{{item.datatime|dateFormat}}</span>
          </div>

          <div v-if="item.ad !== undefined">
            <span v-on:click.prevent="openAd">
              <img
                v-lazy="item.ad.path"
                style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
              />
            </span>
          </div>
        </div>
       
      </router-link>
    </ul>
    <!--    <c-loadmore :flag="flag" :ifFlag="ifFlag" @event="$emit('event')" v-if="ifLoadmore"></c-loadmore>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import CLoadmore from "./Loadmore.vue";
import moment from "moment";

export default {
  props: {
    // 新闻列表
    listCon: {
      require: true
    },
    // 是否可以请求更多
    ifLoadmore: {
      default: true
    },
    // 是否请求
    flag: {
      require: true
    },
    // 请求是否成功
    ifFlag: {
      require: true
    }
  },
  computed: {
    ...mapState(["loadmore", "ifReturnMore", "adConfig"])
  },
  methods: {
    openAd() {
      window.open(
        "https://engine.lvehaisen.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=315106"
      );
    }
  },

  components: {
    // CLoadmore
  },
  filters: {
    dateFormat(time) {
      return moment(time)
        .startOf("mimute")
        .fromNow();
    }
  }
};
</script>
