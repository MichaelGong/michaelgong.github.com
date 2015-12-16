<style type="text/css">
	.loading-pop{
		background: rgba(0,0,0,.4);
		width:100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		text-align: center;
		z-index: 1500
	}
	.loading-cont{
		width:120px;
		height:120px;
		line-height: 120px;
		text-align: center;
		position: absolute;
		top:50%;
		left:50%;
		margin: -60px 0 0 -60px;
		background: #fff;
		border-radius: 8px;
	}
</style>
<template>	
	<div class="loading-pop" v-show="show">
		<div class="loading-cont">
			<img src="../images/loading.gif" />
		</div>
		
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		replace:true,
		props:['show']
	}
</script>