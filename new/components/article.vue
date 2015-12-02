<style>
.article{
    position: absolute;
    left:0;
    top:0;
    background: #fff;
    width:100%;
}
</style>
<template>
    <section class="article">
        <header class="navbar navbar-inverse navbar-fixed-top">
            <section class="container">
        		<div class="navbar-header">
        			<a href="#" class="navbar-brand">Michael Gong's Blog</a>
        		</div>
        	</section>
        </header>
        <section id="content">
			<section class="container">
				<div class="row">
					<section class="col-md-9" rol="main">
                        <div class="bs-docs-section">
                        	<h1 class="page-header">概览标题1</h1>
                        	<p class="lead">这是标题下面的说明内容</p>
                        	<h3>标题3</h3>
                        	<p>标题3下面的说明内容</p>
                        	<div id="md">
                                {{str}}
                        	</div>
                    </section>
                </div>
            </section>
        </section>

    </section>
</template>
<script type="text/javascript">
require('../libs/jquery.min.js');
require('../libs/marked.min.js');
require('../libs/prettify.min.js');
require('../libs/underscore.min.js');
require('../libs/editormd.min.js');
require('../css/article.css');
export default{
    data(){
        return {
            text:'123',
            str:''
        }
    },
    ready(){

    },
    route:{
        activate(transition){
            var me = this;
            console.log('activate');
            this.$http.get('./mark/ApplicationCache.md',function(data){
                console.log(data);
                transition.next({str: data});

                editormd.markdownToHTML("md", {
                       markdown        : data ,//+ "\r\n" + $("#append-test").text(),
                       //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
                       htmlDecode      : "style,script,iframe",  // you can filter tags decode
                       //toc             : false,
                       tocm            : false,    // Using [TOCM]
                       //gfm             : false,
                       //tocDropdown     : true,
                       // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
                       emoji           : false,
                       taskList        : false,
                    //    tex             : true,  // 默认不解析
                    //    flowChart       : true,  // 默认不解析
                    //    sequenceDiagram : true,  // 默认不解析
                   });
                me.str = data;
            });
        }
    }
}
</script>
