<template>
	<div class="one-cart-main" v-show="!is_del">
		<div class="cart-switch">
			<Checkbox :value="cart_info.selected" @on-change="onInput(cart_info.cart_is)"></Checkbox>
		</div>
		<Tag color="orange" v-if="!cart_info.cart_is">购物车已失效</Tag>
		<div class="goods-card">
			<goodsCard
				:goods_img="cart_info.goods_attribute_img"
				:goods_name="cart_info.goods_name"
				:goods_price="cart_info.goods_price"
				:goods_sku_desc="cart_info.attr_desc"
				:goods_id="cart_info.goods_id"
				:goods_stock="cart_info.goods_stock"
			/>
		</div>
		<div class="cart-number">
			<InputNumber :max="cart_info.goods_stock" :min="1" v-model="cart_info.goods_number"
				@on-change="updCartNumber"></InputNumber>
		</div>
		<div class="del-button">
			<Button type="error" size="small" @click="delCart">删除</Button>
		</div>
	</div>
</template>
<script>
    import goodsCard from '../../sub/horizontalGoodsCard'

    export default {
        data() {
            return {
                is_del: false,
            };
        },
        props: {
            cart_info: Object,
        },
        computed: {},
        created() {

        },
        methods: {
            delCart() {
                this.delete_is = true;
                this.$store.commit("delCart", this.cart_info);
            },
            updCartNumber() {
                this.$set(this.cart_info, 'goods_price', parseFloat(this.cart_info.one_goods_price * this.cart_info.goods_number).toFixed(2));
                this.$store.commit("updCartNumber", this.cart_info);
            },
            onInput(cart_is) {
                if (cart_is) {
                    this.$store.commit("updCartSelected", this.cart_info);
                }
            },
        },
        components: {
            goodsCard,
        }
    };
</script>
<style lang="scss" scoped>
	.one-cart-main {
		height: 160px;
		border-bottom: 1px #ccc dotted;
		display: flex;
		align-items: center;

		.goods-card {
			width: 70%;
			height: 100%;
		}

		.del-button {
			margin-left: 15px;
		}

		.cart-switch {
			margin-left: 10px;
		}
	}
</style>