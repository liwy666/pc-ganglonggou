<template>
	<div class="main">
		<searchFrame></searchFrame>
		<div class="base-middle">
			<!--轮播以及侧分类-->
			<firstNav :swipe_list="index_ad_list.swipe_img" :coupon_info="index_ad_list.coupon"
				:banner_info="index_ad_list.banner"></firstNav>
			<!--4件商品区-->
			<div class="four-goods-box" v-for="(item) in index_ad_list.four_goods" :key="item.id">
				<div class="banner-box">
					<img :src="item.banner.ad_img" alt="" @click="toControl(item.banner)">
				</div>
				<div class="four-goods-base">
					<div v-for="(item2 ,i2) in item.goods" :key="i2"><img :src="item2.ad_img" alt=""
						@click="toControl(item2)"></div>
				</div>
			</div>
			<div class="banner-box">
				<img :src="index_ad_list.coupon.ad_img" alt="">
			</div>
			<!--8件商品区-->
			<div class="eight-goods-box" v-for="(item) in index_ad_list.eight_goods" :key="item.id">
				<div class="banner-box">
					<img :src="item.banner.ad_img" alt="" @click="toControl(item.banner)">
				</div>
				<div class="eight-goods-base">
					<div v-for="(item2 ,i2) in item.goods" :key="i2"><img :src="item2.ad_img" alt=""
						@click="toControl(item2)"></div>
				</div>
			</div>
			<!--6件商品区-->
			<div class="six-goods-box" v-for="(item) in index_ad_list.six_goods" :key="item.id">
				<div class="banner-box">
					<img :src="item.banner.ad_img" alt="" @click="toControl(item.banner)">
				</div>
				<div class="six-goods-base">
					<div v-for="(item2 ,i2) in item.goods" :key="i2"><img :src="item2.ad_img" alt=""
						@click="toControl(item2)"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import firstNav from './sub/firstNav'
    import searchFrame from '../sub/searchFrame'

    export default {
        data() {
            return {};
        },
        computed: {
            index_ad_list: {
                get: function () {
                    let result = {
                        swipe_img: [],
                        notice_text: {},
                        pop_img_url: '',
                        coupon: {},
                        four_goods_banner: [],
                        four_goods_base: [],
                        four_goods: [],
                        eight_goods_banner: [],
                        eight_goods_base: [],
                        eight_goods: [],
                        six_goods_banner: [],
                        six_goods_base: [],
                        six_goods: [],
                    };
                    let ad_list = this.$store.state.ad_list;
                    ad_list.forEach(item => {
                        if (item.position_type === '顶部轮播') {
                            result.swipe_img.push(item);
                        } else if (item.position_type === '压屏广告') {
                            result.pop_img_url = item.ad_img;
                        } else if (item.position_type === '公告') {
                            result.notice_text = item;
                        } else if (item.position_type === '孤立通栏') {
                            result.banner = item;
                        } else if (item.position_type === '合作伙伴') {
                            result.align.push(item);
                        } else if (item.position_type === '优惠券区域') {
                            result.coupon = item;
                        } else if (item.position_type === '4件商品通栏') {
                            result.four_goods_banner.push(item);
                        } else if (item.position_type === '4件商品内容') {
                            result.four_goods_base.push(item);
                        } else if (item.position_type === '8件商品通栏') {
                            result.eight_goods_banner.push(item);
                        } else if (item.position_type === '8件商品内容') {
                            result.eight_goods_base.push(item);
                        } else if (item.position_type === '6件商品通栏') {
                            result.six_goods_banner.push(item);
                        } else if (item.position_type === '6件商品内容') {
                            result.six_goods_base.push(item);
                        }
                    });
                    result.four_goods_banner.forEach(item => {
                        let goods = [];
                        result.four_goods_base.forEach(item2 => {
                            if (item.position_type_name === item2.position_type_name) {
                                goods.push(item2);
                            }
                        });
                        result.four_goods.push({banner: item, goods: goods})
                    });
                    result.eight_goods_banner.forEach(item => {
                        let goods = [];
                        result.eight_goods_base.forEach(item2 => {
                            if (item.position_type_name === item2.position_type_name) {
                                goods.push(item2);
                            }
                        });
                        result.eight_goods.push({banner: item, goods: goods})
                    });
                    result.six_goods_banner.forEach(item => {
                        let goods = [];
                        result.six_goods_base.forEach(item2 => {
                            if (item.position_type_name === item2.position_type_name) {
                                goods.push(item2);
                            }
                        });
                        result.six_goods.push({banner: item, goods: goods})
                    });
                    return result;
                }
            },
        },
        created() {

        },
        methods: {
            toControl() {
            }
        },
        components: {
            firstNav,//首页导航
            searchFrame,
        }
    };
</script>
<style lang="scss" scoped>
	.main {
		.banner-box {
			width: 100%;

			img {
				width: 100%;
			}
		}

		.four-goods-box {
			.four-goods-base {
				display: flex;
				flex-wrap: wrap;

				div {
					width: 25%;

					img {
						width: 100%;
					}
				}
			}
		}

		.eight-goods-box {
			.eight-goods-base {
				display: flex;
				flex-wrap: wrap;

				div {
					width: 20%;

					img {
						width: 100%;
					}
				}
			}
		}

		.six-goods-box {
			.six-goods-base {
				display: flex;
				flex-wrap: wrap;

				div {
					width: 16%;

					img {
						width: 100%;
					}
				}
			}
		}
	}
</style>