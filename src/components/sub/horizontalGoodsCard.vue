<template>
	<div class="horizontal-goods-main">
		<div class="goods-img">
			<img :src="goods_img" alt="">
		</div>
		<div class="goods-name" @click="toGoods">
			{{this.goods_name}}
		</div>
		<div class="goods-sku-desc">
			{{this.goods_sku_desc}}
		</div>
		<div class="goods-sku-desc" v-if="goods_number">
			数量：{{this.goods_number}}
		</div>
		<div class="goods-price">
			￥{{this.goods_price}}
		</div>
		<div class="goods-stock" v-if="goods_stock">
			<Tag color="magenta" v-if="goods_stock<20">库存紧张</Tag>
			<Tag color="magenta" v-if="goods_stock>=20">库存充足,尽快购买</Tag>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            goods_id: Number,
            goods_name: String,
            goods_price: String,
            goods_stock: Number,
            goods_sku_desc: String,
            goods_img: String,
            goods_number: Number,
            to_goods: {
                type: Boolean,
                default: true,
            },
        },
        computed: {},
        created() {

        },
        methods: {
            toGoods() {
                if (this.to_goods) {
                    let data = this.$router.resolve({
                        path: '/goods/' + this.goods_id,
                    });
                    window.open(data.href, '_blank')
                }

            }
        },
    };
</script>
<style lang="scss" scoped>
	.horizontal-goods-main {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 15px;
		justify-content: space-around;
		align-items: center;

		.goods-img {
			width: 100px;
			height: 100px;

			img {
				width: 100%;
			}
		}

		.goods-name {
			width: 200px;
			cursor: pointer;
		}

		.goods-name:hover {
			color: #3388bb;
		}

		.goods-price {
			color: red;
			font-weight: bold;
		}

		.goods-sku-desc {
			width: 100px;
		}
	}
</style>