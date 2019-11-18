<template>
  <div style="width: 100%; height: 100%; background-color: #f0f0f0; padding:40px;">
  <div class="detail">
<!--    <c-back class="header"></c-back>-->
    <c-loading v-show="loading" class="loading"></c-loading>
    <c-warning v-show="!loading && !ifReturnMsg" class="warning" @reload="getDetail()"></c-warning>
    <div v-show="!loading && ifReturnMsg">
    <div class="container">
      <h2 class="detail-title">{{detail.title}}</h2>
      <div class="media_name">
        <span v-html="media_name"></span>
        <span>{{datetime|dateFormat}}</span>
      </div>

            <!-- <div class="contentNews" id="contFromParas">
              <div v-if="contentformat!==null" v-html="contentFormat"></div>
              <div v-else>  </div>
            </div> -->

      <div class="http://5b0988e595225.cdn.sohucs.com/images/20191114/1c74a7d976d949319855467afa1dcaa5.png" id="contFromParas">
        <img v-for="(img, imgIdx) in image_list" src="require(img.url)"
             style="width: 80vw; object-fit: cover"
             v-if="image_list[imgIdx].mapping === -1">
        <div v-for="(para,paraIdx) in paras">
          <div v-html="para.para"></div>
          <img v-for="(img, imgIdx) in image_list" src="require(img.url)"
               style="width: 80vw; object-fit: cover"
               v-if="image_list[imgIdx].mapping === paraIdx">
        </div>
      </div>

      <div class="ann">
        <br>
        <p>版权与免责声明：</p>
        <p>本文内容转载自其他媒体，目的在于传递更多信息，并不代表本网赞同其观点或证实其内容的真实性。不承担此类作品侵权行为的直接责任及连带责任；</p>
      </div>

      <div class="zan">
        <Button type="ghost" size="large" icon="thumbsup" shape="circle" class="likeButton" @click="like()">{{repin_count}}</Button>
        <Button type="ghost" size="large" icon="trash-a" shape="circle" class="unlikeButton">不喜欢</Button>
      </div>

      <span v-if="this.adConfig.usingAd">
        <img src="/static/image/tuiya_ad01.gif" style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill" v-on:click="openAd">
      </span>

    </div>
    </div>

  </div>
  </div>
</template>
<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CBack from '../components/Back.vue'
import CComment from '../components/Comment.vue'
import moment from 'moment'
import VueBetterScroll from '../components/BScroll'
import 'moment/locale/zh-cn'

export default {
  data () {
    return {
      ifModal: false,
      listenScrollObj: true,
      detail: null
    }
  },
  created() {
    this.getDetail();
  },
  mounted() {
    // let _html;
    // this.$nextTick(()=>{
    //   debugger;
    //   let html = document.getElementById('ylcont');
    //   let _html = html.innerHTML;
    //   debugger;
    //   console.log(_html)    //第一个
    // });
    // debugger;
    // console.log(_html)    //第二个
  },
  components: {
    CLoading,
    CWarning,
    CBack,
    CComment,
    VueBetterScroll
  },

  methods: {
    ...mapMutations([
      'ADD_COLLECTION',
      'REMOVE_COLLECTION'
    ]),
    ...mapActions([
      'getOneNews'
    ]),
    getDetail:function() {
      let param = this.$route.params.id;
      let idText = param.replace(/[^0-9]/ig,"");
      let type = param.replace(idText,"");
      let id = idText.slice(6);
      this.getOneNews({
        type: type,
        start: id,
        end: (parseInt(id) + 1).toString()
      })
        .then(res => {
          this.detail = res[0];
          setTimeout(() => {
            let html = document.getElementById('contFromParas');
            console.log(html.innerHTML);
            debugger;
          }, 1500);
        });
    },
    openAd () {
      window.open("https://engine.lvehaisen.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=315106");
    },
    like () {
      debugger;
      let html = document.getElementById('ylcont');
    }
  },
  computed: {
    ...mapState([
      'article',
      'ifReturnMsg',
      'loading',
      'hasParagraph',
      'contentType',
      'localCollection',
      'adConfig'
    ]),
    media_name:function(){
      return (this.detail.author.length === 0) ? this.detail.source :this. detail.author;
    },
    datetime:function(){
      return  this.detail.datetime;
    },
    image_list:function(){
      return this.detail.image_list;
    },
    paras:function(){
      return this.detail.paras;
    }
  },
  filters: {
    dateFormat (time) {
      return moment(time).startOf('mimute').fromNow()
    }
  }
}
</script>

<style lang="less">
  @import "../assets/style/border.less";

.detail{
  .container {
    padding: 20px;
    background-color: white;
    width: 100%;
    .detail-title {
      color: #000;
      font-size: 0.45rem;
      font-weight: bold;
    }
    .media_name {
      position: relative;
      margin-top: 0.4rem;
      color: #777777;
      .avatar_url {
        height: 1.1rem;
        width: 1.1rem;
        border-radius: 50%;
      }
      .name {
        position: absolute;
        font-size: 0.4rem;
        font-weight: bold;
        left: 1.3rem;
        top: 0.1rem;
      }
      .date {
        position: absolute;
        left: 1.3rem;
        top: 0.6rem;
      }
    }
    .contentNews {
      margin-top: 0.5rem;
      font-size: 0.4rem;
      color: #000;
      line-height: .7rem;
      img {
        text-align: center;
        display: block;
        width: 70%;
        margin: 0.2rem auto;
      }
    }
    .main_content {
      clear: both;
      font-size: 0.4rem;
      p {
        padding: 0.3rem 0;
      }
    }
    .keywords {
      margin-top: 0.5rem;
      line-height: 0.6rem;
      span {
        margin-bottom: 0.3rem;
        text-align: center;
        margin-right: 0.1rem;
        display: inline-block;
        border: 1px solid #f0f0f0;
        background: #f6f6f6;
        padding: 0 0.2rem;
        border-radius: 0.1rem;
      }
    }
    .ann {
      color: #aaaaaa;
    }
    .zan{
      margin-top: .5rem;
      margin-bottom: .5rem;
      text-align: center;
      botton{
        color: #ffffff;
        padding-right: 1rem;
      }
    }
    .likeButton{
      font-size: 0.4rem;
      margin-right: 2rem;
    }
    .unlikeButton {
      font-size: 0.4rem;
    }
  }
}
</style>

