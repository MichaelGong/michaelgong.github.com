<template>
<div class="wh-100">
    <section id="content">
        <section id="victor">
            <div id="output"></div>
            <section class="container text-center">
                <img src="images/finger.png" class="finger bounceInDown ani-delay-2"/>
                <div class="myname zoomInDown ani-delay-10">Michael Gong</div>
                <p class="mydesc fadeInDown ani-delay-20">热爱前端，喜欢css，乐于钻研，<br>对新兴事物感兴趣，喜欢捣鼓HTML5新技术</p>
            </section>
        </section>
        <section class="container projects">
            <div class="projects-header page-header">
                <h2>Html5知识总结</h2>
                <p>这些都是对html5中比较有意思的知识点的总结</p>
            </div>
            <div class="row">
                <section id="proList" >
                    <div class="col-sm-6 col-md-4 col-lg-3" v-for="item in list">
                        <div v-if="item.link.indexOf('http')>=0" >
                            <div class="thumbnail" >
                                <a href="{{item.link}}" title="{{item.title}}" target="_blank">
                                    <img class="" width="300" height="150" :src="item.imgsrc" >
                                </a>
                                <div class="caption">
                                    <h3>
                                        <a href="{{item.link}}" title="{{item.title}}" target="_blank">{{item.content}}<br>
                                            <small>{{item.desc}}</small>
                                        </a>
                                    </h3>
                                    <p>{{item.detail}}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else >
                            <div class="thumbnail"><!--shake shake-slow-->
                                <a v-link="{name:'article',params:{name:item.link}}" title="{{item.title}}" >
                                    <img class="" width="300" height="150" :src="item.imgsrc" >
                                </a>

                                <div class="caption">
                                    <h3>
                                        <a v-link="{name:'article',params:{name:item.link}}" title="{{item.title}}" >  
                                            {{item.content}}<br>
                                            <small>{{item.desc}}</small>
                                        </a>
                                    </h3>
                                    <p>{{item.detail}}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </section>
    </section>
</div>
</template>
<script>
module.exports = {
    data:function(){
        return {
            list:proList.data.prolist
        }
    }
}
</script>
