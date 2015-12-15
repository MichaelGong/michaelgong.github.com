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
    font-family: "Courier New",Consolas,Menlo,Monaco,monospace;
}
/*
Monokai style - ported by Luigi Maselli - http://grigio.org
*/
.hljs,pre {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #272822; color: #ddd;
  font-size:16px;
  font-family: 'courier new';
}
code{
    font-family: 'courier new';
}
.hljs-tag,
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-strong,
.hljs-name {
  color: #f92672;
}

.hljs-code {
  color: #66d9ef;
}

.hljs-class .hljs-title {
  color: white;
}

.hljs-attribute,
.hljs-symbol,
.hljs-regexp,
.hljs-link {
  color: #bf79db;
}

.hljs-string,
.hljs-bullet,
.hljs-subst,
.hljs-title,
.hljs-section,
.hljs-emphasis,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #a6e22e;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion,
.hljs-meta {
  color: #75715e;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-doctag,
.hljs-title,
.hljs-section,
.hljs-type,
.hljs-selector-id {
  font-weight: bold;
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
var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});


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
        window.onresize = function(){
            console.log('resize');
            me.iFrameHeight();
        };
    },
    methods:{
        iFrameHeight:function(){
            var ifm= document.getElementById("iframepage");
            var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;
            if(ifm != null && subWeb != null) {
                ifm.height = subWeb.body.scrollHeight;
                ifm.width = document.body.offsetWidth;
            }
        },
        createIFrame:function(name){
            this.isHTML = true;
            this.html='../'+name;
        },
        createMD:function(name){
            this.$http.get('./mark/'+name+'.md',function(data){
                this.isMD = true;
                document.getElementById('md').innerHTML = marked(data);
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
