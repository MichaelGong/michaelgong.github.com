<style>
.article {
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    width: 100%;
}
.content {
    padding-top: 50px;
    font-family: "Courier New", Consolas, Menlo, Monaco, monospace;
}

/*
Monokai style - ported by Luigi Maselli - http://grigio.org
*/

.hljs,pre {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #272822;
    color: #ddd;
    font-size: 16px;
    font-family: 'courier new', Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;
}

code,code * {
    font-family: 'courier new', Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;
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
    <cp-loading :show="show" ></cp-loading>
    <div v-show="isHTML" transition="zoomIn" transition-mode="in-out">
        <iframe id="iframepage" :src="html" width="100%" marginheight="0" marginwidth="0" frameborder="0" scrolling="no"  v-on:load="iFrameHeight()"  ></iframe>
    </div>
    <section class="article" v-show="isMD" transition="zoomIn" transition-mode="in-out">
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
require('../css/article.css');
module.exports = {
    data:function() {
        return {
            title: '', 
            isMD: false, 
            isHTML: false, 
            html: '',
            show:true,
        }
    },
    methods: {
        iFrameHeight:function() {
            var ifm=document.getElementById("iframepage");
            var subWeb=document.frames ? document.frames["iframepage"].document: ifm.contentDocument;
            if(ifm !=null && subWeb !=null) {
                ifm.height=subWeb.body.scrollHeight;
                ifm.width=document.body.offsetWidth;
            }
        },
        createIFrame:function(name) {
            this.isHTML=true;
            this.html='../'+name;
            this.show = false;
            var me=this;
            window.onresize=function() {
                console.log('resize');
                me.iFrameHeight();
            };
        },
        createMD:function(name) {
            var me = this;
            require.ensure(['marked','highlight.js'],function(require){
                var marked = require('marked');
                var renderer = new marked.Renderer();
                marked.setOptions({
                    gfm: true, 
                    tables: true, 
                    breaks: false, 
                    pedantic: false, 
                    sanitize: true, 
                    smartLists: true, 
                    smartypants: false, 
                    linksInNewTab: true,
                    highlight: function (code) {
                        return require('highlight.js').highlightAuto(code).value;
                    }
                });
                renderer.link = function( href, title, text ) {
                    return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';
                }
                me.$http.get('./mark/'+name+'.md', function(data) {
                    me.isMD=true;
                    document.getElementById('md').innerHTML=marked(data,{renderer:renderer});
                    me.show = false;
                });
            });
        }
    },
    route: {
        activate(transition) {
            var me=this;
            var name=transition.to.params.name;
            transition.next();
            name.indexOf('.html')>-1 ? this.createIFrame(name): this.createMD(name);
        }
    },
    components:{
        'cpLoading':require('./loading.vue')
    }
}

</script>
