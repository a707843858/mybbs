<template>
<el-container>        
    <!--主体-->
        <el-main class="editor_page mx-auto bg-white position-relative mb-5"> 
                <!--标题-->
                    <div class="input input-line-animation title" id="postTitle">
                        <el-input class=""  v-model="postData.title" :placeholder="label.title_tip" @focus="addInputAnimation('postTitle')" @blur="removeInputAnimation('postTitle')"></el-input>                
                    </div>
                <!--文章内容-->
                    <editor v-model="postData.content" :init="init"></editor>
                <!--图片区-->
                    <div class="imgBox  bg-white">
                        <div class="title">{{label.img_list}}</div>
                        <div class="body text-center">
                            <img :src="postData.thumb" alt="" style="width:80%;"> 
                            <el-upload
                            class="text-center imgUpload" action="/profile" ><i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>                            
                        </div>
                    </div>
                <!--分类区-->
                    <div class="categoryBox bg-white">
                        <div class="title">{{label.select_category}}</div>
                        <div class="body">
                            <el-radio-group v-model="postData.category">
                                <el-radio v-for="item in category_options" :label="item.id" :key="item.id">{{item.title}}</el-radio>
                            </el-radio-group>   
                        </div>
                    </div>
                <!--底部扩展区-->
                    <div class="editorExtend">
                        <!---->
                            <div class="el-input el-input--small mb-3">
                                <div class="el-input-group__prepend">{{label.summary}}:</div>
                                <el-input v-model="postData.summary" size="small" :placeholder="label.summary_tip"></el-input>
                            </div>
                        <!--文章类型-->
                            <div class="el-input el-input--small mb-3">
                                <div class="el-input-group__prepend">{{label.post_form}}:</div>
                                <el-radio-group v-model="postData.model">
                                    <el-radio label="normal" size="small">{{label.normal}}</el-radio>
                                    <el-radio label="gallery" size="small">{{label.gallery}}</el-radio>
                                    <el-radio label="video" size="small">{{label.video}}</el-radio>
                                    <!-- <el-radio label="music" size="small">{{label.music}}</el-radio> -->
                                </el-radio-group>
                            </div>
                        <!--文章权限-->
                            <div class="el-input el-input--small mb-3">
                                <div class="el-input-group__prepend">{{label.post_option}}:</div>
                                <el-radio-group v-model="postData.status">
                                    <el-radio  label="publish" size="small">{{label.publish}}</el-radio>
                                    <el-radio  label="privacy" size="small">{{label.privacy}}</el-radio>
                                    <el-radio  label="charge" size="small">{{label.charge}}</el-radio>
                                    <el-radio label="password" size="small">{{label.password}}</el-radio>
                                    <el-radio label="viper" size="small">{{label.viper}}</el-radio>
                                </el-radio-group>
                            </div>
                        <!--评论权限-->
                            <div class="el-input el-input--small mb-3">
                                <div class="el-input-group__prepend">{{label.comment_status}}: </div>
                                <el-switch class="comment" v-model="postData.comment_status" active-color="#13ce66" inactive-color="#ff4949" active-value="open" inactive-value="close"></el-switch>
                                <small class="comment_tip">{{label.comment_tip}}</small>
                            </div>
                        <!--发布按钮-->
                            <el-button type="success" size="small" class="float-right" @click="update_post(postData)">{{label.update}}</el-button>
                        <!-- <el-button type="success" size="small" class="float-right" @click="showContent()">{{label.update}}</el-button> -->
                            <div class="clearfix"></div>
                    </div>
        </el-main>
</el-container>
</template>


<script>
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import editor from '@tinymce/tinymce-vue';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/print';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/autoresize';
export default {
    name:'post_editor',
    data(){
        return {
            label:{
                title_tip:'请输入文章标题',
                img_list:'图片列表',
                select_category:'选择分类',
                post_option:'文章权限',
                publish:'公开',
                privacy:'隐私',
                charge:'付费',
                comment_status:'评论权限',
                comment_tip:'关闭后,任何人都不能评论这篇文章',
                update:'发布',
                password:'密码',
                viper:'会员可见',
                post_form:'文章形式',
                normal:'标准',
                gallery:'相册',
                video:'视频',
                music:'音乐',
                summary:'文章简介',
                summary_tip:'最多可输入150字符，留空则截取文章开始部分字符。'

            },
            value:{
                user_status:false,
                uid:0,
            },
            category_options:[],
            user_session:[],
            postData:{
                comment_status:'open',
                status:'publish',
                category:1, 
                model:'normal',         
            },
            img:[],
            init:{
                language_url: '/static/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/static/tinymce/skins/lightgray',
                images_upload_url: 'postAcceptor.php',
                resize:false,
                codesample_dialog_width: 600,
                codesample_dialog_height: 425,
                template_popup_width: 600,
                template_popup_height: 450,
                height: 500,
                powerpaste_allow_local_images: true,
                // menubar:false,
                statusbar: false,
                plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table contextmenu paste imagetools wordcount hr toc charmap emoticons autoresize codesample"
                    ],
                toolbar: "undo redo | bold italic underline strikethrough removeformat | fontsizeselect fontselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent toc ", 
                setup: function (editor) {
                    editor.addButton('mybutton', {
                    text: 'My button',
                    icon: false,
                    onclick: function () {
                        editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
                    }
                    });
                }
            },
        }
    },
    beforeCreate(){
        var self = this ;
        //Get Session
        // this.axios.get('/api/user/get_session').then(function(res){
        //     if(res.data != false){
        //         self.user_session = res.data;
        //         self.value.user_status = res.data.isLogin;
        //         self.value.uid = res.data.uid;
        //     }else{
        //         self.$router.push('/login');
        //     }
        // });
    },
    created(){
        this.get_category().then(res=>{this.category_options = res.data});
        if(this.$route.params.id > 0){
            this.get_post({pid:this.$route.params.id}).then(res=>{this.postData = res.data[0]});
        };
    },
    methods:{
    },
    components:{
        editor,
    },
    mounted(){
        tinymce.init({});
    }
}
</script>



