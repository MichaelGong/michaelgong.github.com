<template>
    <div>
        {{str}}
        {{text}}
        {{$route.path}}
        {{$route.params  | json}}
    </div>
</template>
<script type="text/javascript">

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
                // me.str = data;
            });
        }
    }
}
</script>
