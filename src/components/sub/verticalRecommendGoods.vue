<template>
	<div class="vertical-rec-main">
		<p class="title">为您推荐</p>
		<div class="goods-card" v-for="item in random_goods_list" :key="item.goods_id">
			<goodsCard :goods_info="item"></goodsCard>
		</div>
	</div>
</template>
<script>
	import goodsCard from './verticalGoodsCard'
    export default {
        data() {
            return {};
        },
        computed: {
            random_goods_list: {
                get: function () {
                    let goods_list = JSON.parse(JSON.stringify(this.$store.state.goods_list));
                    return this.$MyCommon.getRandomArrayElements(goods_list, 5);
                }
            },
        },
        created() {

        },
        methods: {},
		components:{
            goodsCard
		}
    };
</script>
<style lang="scss" scoped>
	.vertical-rec-main {
		width: 100%;
		.goods-card {
			width: 200px;
		}
		.title {
			padding: 15px;
			font-size: 18px;
			color: #cc0001;
		}
	}
</style>