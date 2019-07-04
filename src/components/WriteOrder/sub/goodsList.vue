<template>
	<div class="write-order-goods-list-main">
		<div class="goods-card" v-for="(item,i) in goods_list" :key="i">
			<goodsCard
				:goods_img="item.goods_attribute_img"
				:goods_name="item.goods_name"
				:goods_number="item.goods_number"
				:goods_price="item.goods_price"
				:goods_sku_desc="item.attr_desc"
				:goods_id="item.goods_id"
				:goods_stock="item.goods_stock"
			/>
		</div>
	</div>
</template>
<script>
	import goodsCard from '../../sub/horizontalGoodsCard'
    export default {
        data() {
            return {};
        },
		props:{
          goods_list:Array,
		},
        computed: {
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
	.write-order-goods-list-main{

	}
</style>