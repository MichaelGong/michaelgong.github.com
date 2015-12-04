<style>
.article{
    position: absolute;
    left:0;
    top:0;
    background: #fff;
    width:100%;
}
.content{
    padding-top: 50px;
}
</style>
<template>
    <div v-show="isHTML">
        <iframe id="iframepage" :src="html" width="100%" marginheight="0" marginwidth="0" frameborder="0" scrolling="no"  v-on:load="iFrameHeight()"  ></iframe>
    </div>
    <section class="article" v-show="isMD">
        <header class="navbar navbar-inverse navbar-fixed-top">
            <section class="container">
        		<div class="navbar-header">
        			<a href="javascript:window.history.go(-1);" class="navbar-brand">Michael Gong's Blog</a>
        		</div>
        	</section>
        </header>
        <section id="content" class="content">
			<section class="container">
				<div class="row">
					<section class="col-md-9" rol="main">
                        <div id="md" class="bs-docs-section" ></div>
                    </section>
                </div>
            </section>
        </section>
    </section>
</template>
<script type="text/javascript">
var editormd = window.editormd = require('editormd');
var marked = window.marked = require('marked');
var prettifyPrint = window.prettifyPrint = require('prettifyPrint');
var $ = require('jquery');
require('../css/article.css');
export default{
    data(){
        return {
            title:'',
            isMD:false,
            isHTML:false,
            html:'',
        }
    },
    ready(){
        var me = this;
        $(window).resize(function(){
            me.iFrameHeight();
        });
    },
    methods:{
        iFrameHeight:function(){
            var ifm= document.getElementById("iframepage");
            var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;
            if(ifm != null && subWeb != null) {
                ifm.height = subWeb.body.scrollHeight;
                ifm.width = $(window).width();
            }
        },
        createIFrame:function(name){
            this.isHTML = true;
            this.html='../'+name;
        },
        createMD:function(name){
            this.$http.get('./mark/'+name+'.md',function(data){
                this.isMD = true;
                var editorMD = new editormd();
                editorMD.markdownToHTML("md", {
                    markdown        : data ,
                    path            : '../libs/',
                    htmlDecode      : "style,script,iframe",
                });
            });
        }
    },
    route:{
        activate(transition){
            var me = this;
            var name = transition.to.params.name;
            transition.next();
            name.indexOf('.html')>-1 ? this.createIFrame(name) : this.createMD(name);
        }
    }
}
</script>
