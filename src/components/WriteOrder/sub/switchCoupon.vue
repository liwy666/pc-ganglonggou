<template>
	<div class="switch-coupon-main">
		<Button type="primary" @click="coupon_id=0">不使用优惠券</Button>
		<div class="coupon-card" v-for="item in allow_coupons_list" :key="item.coupon_id">
			<Radio :value="coupon_id === item.coupon_id" @on-change="switchCoupon(item.coupon_id)"></Radio>
			<couponCard :view_number="false" :allow_get="false"
				:coupon_info="item"></couponCard>
		</div>
	</div>
</template>
<script>
    import couponCard from '../../sub/couponCard'

    export default {
        data() {
            return {
                coupon_id: 0,
                allow_coupons_list: [],
                goods_list: this.$store.getters.getCartsSelected,
            };
        },
        props: {
            coupon_list: Array,
            dom_load: Boolean,
        },
        computed: {},
        created() {
			this.screenCouponList();
        },
        mounted() {
            this.$emit('update:dom_load', false);
        },
        methods: {
            switchCoupon(id) {
                this.coupon_id = id;
            },
            screenCouponList() {
                if (this.coupon_list.length < 1) {
                    return false
                }
                //1.检查是否符合优惠券使用金额
                let carts_selected_price = parseFloat(this.$store.getters.getCartsSelectedPrice);
                let coupons_id_array = {
                    legal: []//合法的
                    , insufficient_amount: []//金额不满足
                    , insufficient_goods: []//商品类型不满足
                };

                //检查订单金额
                this.coupon_list.forEach(item => {
                    if (parseFloat(item.found_sum) > carts_selected_price) {
                        coupons_id_array.insufficient_amount.push(item.coupon_id)
                    }
                    coupons_id_array.legal.push(item.coupon_id)
                });
                coupons_id_array.legal = this.getArrDifference1D(coupons_id_array.legal, coupons_id_array.insufficient_amount);
                //格式化
                let coupons_array = this.formatCoupon(coupons_id_array);
                //检查类型
                let idl_legal = [];
                this.goods_list.forEach((goods_item) => {
                    coupons_array.legal.forEach(legal_item => {
                        if (legal_item.grant_type === 'all') {
                            idl_legal.push(legal_item.coupon_id);
                        } else if (legal_item.grant_type === 'classify' && legal_item.classify.indexOf(parseInt(goods_item.cat_id)) >= 0) {
                            idl_legal.push(legal_item.coupon_id);
                        } else if (legal_item.grant_type === 'solo' && legal_item.solo.indexOf(parseInt(goods_item.goods_id)) >= 0) {
                            idl_legal.push(legal_item.coupon_id);
                        }
                    })
                });
                idl_legal = this.getArrRepeated1D(idl_legal, this.goods_list.length);
                let insufficient_goods = this.getArrDifference1D(coupons_id_array.legal, idl_legal); //筛选出来商品类型不满足的
                idl_legal = this.getArrEqual1D(coupons_id_array.legal, idl_legal);//筛选出最终符合要求的优惠券
                coupons_id_array.legal = idl_legal;
                coupons_id_array.insufficient_goods = insufficient_goods;
                coupons_array = this.formatCoupon(coupons_id_array);//格式化优惠券
                this.$set(this, 'allow_coupons_list', coupons_array.legal);
            },
            /**
             * 1维数组筛选不重复
             * @param arr1
             * @param arr2
             * @returns {Uint8Array | T[] | *}
             */
            getArrDifference1D(arr1, arr2) {
                return arr1.concat(arr2).filter(function (v, i, arr) {
                    return arr.indexOf(v) === arr.lastIndexOf(v);
                });
            },

            /*取出两个数组的相同元素*/
            getArrEqual1D(arr1, arr2) {
                let newArr = [];
                for (let i = 0; i < arr2.length; i++) {
                    for (let j = 0; j < arr1.length; j++) {
                        if (arr1[j] === arr2[i]) {
                            newArr.push(arr1[j]);
                        }
                    }
                }
                return newArr;
            }

            /*获取重复次数*/
            , getArrRepeated1D(arr, number) {
                function arrValnumber(val_name) {
                    let count = 0;
                    for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < arr.length; j++) {
                            if (arr[j] == val_name) {
                                count++;
                                arr[j] = -1;
                            }
                        }
                    }
                    return count
                }

                let result = [];
                arr.forEach(item => {
                    if (arrValnumber(item) === number) {
                        result.push(item)
                    }
                });
                return result;
            }
            /**
             * 格式化优惠券
             * @param obj
             */
            , formatCoupon(obj) {
                let resutl = {
                    legal: []//合法的
                };
                obj.legal.forEach(item => {
                    this.coupon_list.forEach(coupon_itme => {
                        if (item === coupon_itme.coupon_id) {
                            resutl.legal.push(coupon_itme)
                        }
                    });

                });
                return resutl;
            }
        },
        components: {
            couponCard
        }
    };
</script>
<style lang="scss" scoped>
	.switch-coupon-main {
		width: 600px;

		.coupon-card {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	}
</style>