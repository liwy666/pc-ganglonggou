<template>
	<div class="order-card-main" @click="toSeeOrder">
		<p class="order-sn">订单号：{{this.order_info.order_sn}}</p>
		<p class="order-state">{{this.order_info.order_state_name}}</p>
		<goodsCard
			v-for="(item,i) in order_info.mid_order" :key="i"
			:goods_name="item.goods_name"
			:goods_id="item.goods_id"
			:goods_sku_desc="item.sku_desc"
			:goods_price="item.mid_order_price"
			:goods_img="item.img_url"
			:to_goods="false"
			:goods_number="item.goods_number">
		</goodsCard>
	</div>
</template>
<script>
    import goodsCard from '../../../sub/horizontalGoodsCard'

    export default {
        data() {
            return {};
        },
        props: {
            order_info: Object,
        },
        computed: {},
        created() {

        },
        methods: {
            toSeeOrder() {
                let data = this.$router.resolve({
                    path: '/seeOrder/' + this.order_info.order_sn,
                });
                window.open(data.href,'_blank');
            }
        },
        components: {
            goodsCard,
        }
    };
</script>
<style lang="scss" scoped>
	.order-card-main {
		margin-top: 20px;
		background-color: white;
		width: 96%;
		margin-left: 2%;
		border-radius: 5px;
		overflow: hidden;
		border: 1px solid rgba(0, 0, 0, .1);

		.order-sn {
			padding-left: 20px;
			height: 30px;
			line-height: 30px;
			font-size: 10px;
			color: rgb(100, 100, 100);
			/*	font-weight: bold;*/
		}

		.order-state {
			padding-left: 5px;
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			font-weight: bold;
			text-align: center;
			background-color: #cc0001;
			color: white;
		}
	}
</style>