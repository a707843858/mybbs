<template>  
<el-container>  
    <!--主体-->
        <el-main class="home_page"> 
        <!--主页顶部图片-->
            <div class="header_bg">
                <el-row class="search" justify="center" type="flex">
                    <el-col class="item" :lg="7" :md="9" :sm="11" :xs="20">
                        <div class="hd">
                            <span v-text="label.header_logo"></span>
                        </div>
                        <div class="bd">
                            <input :placeholder="label.header_placeholder" ><span class="search_btn"><i class="iconfont icon-sousuo"></i></span></input>
                        </div>                            
                    </el-col>                  
                </el-row>
            </div>
        <!--主页简介-->      
            <div class="home_introduce">
                <el-row class="f-wrap mx-auto container bbs-max-wrap" type="flex">
                    <el-col :lg="4" :md="4" :sm="4"  :xs="8" v-for="item in guide" :key="item.tit" class="item">
                        <div class="hd">
                            <!-- <img :src="`/static/img/other/${item.src}`" alt=""> -->
                            <i class="iconfont" :class="item.icon"></i>
                        </div>
                        <div class="bd">
                            <h2 class="tit" v-text="item.tit"></h2>
                            <p class="subtit" v-text="item.subtit"></p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        <!--轮播图&右侧展示-->
            <div class="home_slide bg-white">
                <div class="hd  bbs-max-wrap">
                    <p class="tit"><span v-text="label.home_slide_tit"></span></p>
                    <p class="subtit hidden-xs-only" v-text="label.home_slide_sbutit"></p>
                </div>
                <el-row type="flex" class="f-wrap bd bbs-max-wrap">
                    <!--轮播图-->
                        <el-col :lg="12" :md="12" :sm="12" class="carousel">
                            <el-carousel tigger="click">
                                <el-carousel-item v-for="item in carousel_options" :key="item.id">
                                    <router-link :to="item.link">
                                        <img :src="item.url" class="img">
                                        <h3 class="tit hidden-xs-only" v-text="item.title"></h3>                                        
                                    </router-link>
                                </el-carousel-item>
                            </el-carousel>  
                        </el-col>
                    <!--右侧展示-->
                        <el-col :lg="12" :md="12" :sm="12" class="exhibition">
                            <el-col :lg="12" :md="12" :sm="12" :xs="12" class="item" v-for="item in homeAside" :key="item.link">
                                <router-link :to="item.link" class="container">
                                    <img :src="`${item.url}`" alt="item.title" class="img">
                                    <div class="tit hidden-xs-only" v-text="item.title"></div>                                    
                                </router-link>
                            </el-col>
                        </el-col>
                </el-row>
            </div>
        <!--帖子层-->
            <div class="home_post">
                <div class="hd bbs-max-wrap">
                    <p class="tit"><span v-text="label.home_post_tit"></span></p>
                    <p class="subtit hidden-xs-only" v-text="label.home_post_subtit"></p>
                </div>
                <div class="bd bbs-max-wrap mx-auto">
                    <post_sm :postData="postData"></post_sm>
                </div>
            </div>
        <!--引导注册-->
            <div class="btm_guide">
                <div class="hd bbs-max-wrap">
                    <p class="tit">
                        <span><i class="iconfont icon-yundongzuqiu"></i></span>           
                    </p>
                </div>
                <el-row class="bd bbs-max-wrap mx-auto" type="flex" justify="center">
                    <el-col :lg="3" :md="3" :sm="3" :xs="8" ><router-link :to="{name:'login'}" class="el-button register" v-text="label.register_now"></router-link></el-col>
                    <el-col :lg="3" :md="3" :sm="3" :xs="5"></el-col>
                    <el-col :lg="3" :md="3" :sm="3" :xs="8"><router-link :to="{name:'category',params:{tab:'all'}}" class="el-button more">{{label.more}}</router-link></el-col>
                </el-row>
            </div>    
        </el-main>
</el-container>  
</template>


<script>
export default {
  name: 'home',
  data(){
    return {
      label : {
          register_now:'立即注册',
          more:'发现更多',
          read_more : '阅读更多',
          fans : '粉丝',
          dynamic : '动态',
          click_to_sign : '点击签到',
          signed : '已签到',
          login:'登录',
          register:'注册',
          header_placeholder:'搜索你喜欢的',
          header_logo:'创设，陪你做与众不同的设计师',
          home_slide_tit:'与众不同的交流社区',
          home_slide_sbutit:'让我们因设计成为朋友',
          home_post_tit:'独具匠心的设计理念',
          home_post_subtit:'让我们因交流愈加精致',
      },          
      guide:[
          {tit:'分享作品',subtit:'炫出自己的优秀作品',src:'share.svg',icon:'icon-cooperation'},
          {tit:'海量灵感',subtit:'追求完美的解决方案',src:'icon-xiaba.svg',icon:'icon-chuangzuozhongxin'},
          {tit:'细节头条',subtit:'发现独特的用户体验',src:'find.svg',icon:'icon-sousuo'},
          {tit:'精彩讲座',subtit:'提升自己的设计理念',src:'prize-line.svg',icon:'icon-ziliaoshouquanguanli-'},
          {tit:'素材社区',subtit:'快速找到的合适素材',src:'icon_500px.svg',icon:'icon-sheying_1'},
      ],
      homeAside:[],
      postData:[],
      value : {     
          nameCard_bg:'',
          user_status:false,
      },    
      blogInfo:[],
      carousel_options : [],
      userInfo:[],
      session:{uid:0},
    }
  },    
   created() {
        var self = this ;
        this.get_session().then((res)=>{this.session = res.data;});
        this.get_post({start:0,limit:10,sort:'desc',sortBy:'publishTime'}).then((res)=>{this.postData = res.data});
        //获取轮播图数据
        this.get_carousel({type:'home'}).then((res)=>{this.carousel_options = res.data});
        //获取侧边栏文章自定义
        this.get_carousel({type:'home_aside'}).then((res)=>{this.homeAside = res.data});
  },
};
</script>



