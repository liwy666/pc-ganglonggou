<template>
	<div class="goods-detailed-main">
		<div class="base-middle">
			<div class="head-box">
				<div class="head-l">
					<!--商品相册-->
					<goodsGallery :goods_img_url.sync="goods_img_url"
						:goods_gallery="goods_info.goods_gallery" :goods_info="goods_info"></goodsGallery>
				</div>
				<div class="head-r">
					<p class="goods-name">{{this.goods_info.goods_name}}</p>
					<p class="goods-price">价格：<i>￥</i><span>{{this.goods_info.goods_price}}</span></p>
					<!--sku选项-->
					<goodsSku></goodsSku>
				</div>
			</div>
			<div class="base">
				<!--左侧供应商-->
				<div class="supplier-box">
					<goodsSupplier :supplier_preview_info="supplier_preview_info"></goodsSupplier>
				</div>
				<!--商品详情-->
				<div class="goods-desc-box">
					<Tabs type="card" :animated="false">
						<TabPane label="商品详情">
							<div class="goods-desc">
								<img v-for="(item,i) in goods_desc" :key="i" v-lazy="item" :alt="item">
							</div>
						</TabPane>
						<TabPane :label="'商品评价( '+evaluate_count+')'">
							<goodsEvaluateList :evaluate_count="evaluate_count"
								:goods_id="goods_info.goods_id"></goodsEvaluateList>
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import goodsGallery from './sub/goodsGallery'
    import goodsSku from './sub/goodsSku'
    import goodsEvaluateList from './sub/goodsEvaluateList'
    import goodsSupplier from './sub/goodsSupplier'

    export default {
        data() {
            return {
                msg: "",
                goods_id: "",
                show_sku: false,
                load_extra_goods: false,
                supplier_preview_info: {},
                goods_img_url: '',
            };
        },
        computed: {
            /*商品详情*/
            goods_info: {
                get: function () {
                    if (this.msg !== "") {
                        return this.$store.getters.getGoodsInfo;
                    } else {
                        return {};
                    }
                }
            },
            /*预览图片*/
            head_imgPreview: {
                get: function () {
                    let result = [];
                    if (typeof (this.goods_info.goods_gallery) !== 'undefined') {
                        if (this.goods_info.goods_gallery.length > 0) {
                            this.goods_info.goods_gallery.forEach(item => {
                                result.push(item)
                            });
                        }
                    }
                    return result;
                }
            }
            /*商品销量*/
            , sales_volume: {
                get: function () {
                    let result = 0;
                    if (this.msg !== "") {
                        result = this.msg.goods_sales_volume
                    }
                    return result;
                }
            }
            /*评价总数*/
            , evaluate_count: {
                get: function () {
                    let result = 0;
                    if (this.msg !== "") {
                        result = this.msg.evaluate_count
                    }
                    return result;
                }
            }
            /*优惠券列表*/
            , coupon_list: {
                get: function () {
                    let result = [];
                    if (typeof (this.msg.coupon_list) !== "undefined") {
                        result = this.msg.coupon_list;
                    }
                    return result;
                }
            }
            /*商品详情图*/
            , goods_desc: {
                get: function () {
                    let reslut = [];
                    if (this.msg !== "" && this.msg.goods_desc !== "") {
                        let imgReg = /<img.*?(?:>|\/>)/gi;
                        //匹配src属性
                        let srcReg = /src=['"]?([^'"]*)['"]?/i;
                        let arr = this.msg.goods_desc.match(imgReg);
                        for (let i = 0; i < arr.length; i++) {
                            let src = arr[i].match(srcReg);
                            //获取图片地址
                            if (src[1]) {
                                reslut.push(src[1])
                            }
                        }
                    }
                    return reslut;
                }


            }
        },
        created() {
            this.goods_id = this.$route.params.goods_id;
            if (typeof (this.$route.query.goods_info) != 'undefined') {
                this.msg = JSON.parse(this.$route.query.goods_info);
                //初始化商品信息
                this.$store.commit("initGoodsInfo", this.msg);
                //初始化商品sku
                this.$store.commit("initGoodsSkuOptions", this.msg);
                //获取额外商品信息
                this.getExtraGoodsInfo();
            } else {
                this.getGoodsInfo();
            }
        },
        methods: {
            getGoodsInfo() {
                //先判断有米有商品列表
                if (this.$store.state.goods_list.length < 1) {
                    this.$fetch('get_goods_info', {goods_id: this.goods_id})
                        .then((msg) => {
                            this.msg = msg;
                            this.goods_img_url = msg.goods_img;
                            //初始化商品信息
                            this.$store.commit("initGoodsInfo", this.msg);
                            //初始化商品sku
                            this.$store.commit("initGoodsSkuOptions", this.msg);
                            //获取额外商品信息
                            this.getExtraGoodsInfo();
                        })
                } else {
                    //就去商品列表里面找这个商品
                    this.$store.state.goods_list.some(item => {
                        if (item.goods_id === parseInt(this.goods_id)) {
                            this.msg = item;
                            this.goods_img_url = item.goods_img;
                            //初始化商品信息
                            this.$store.commit("initGoodsInfo", this.msg);
                            //初始化商品sku
                            this.$store.commit("initGoodsSkuOptions", this.msg);
                            //获取额外商品信息
                            this.getExtraGoodsInfo();
                            return true;
                        }
                    })
                }
            }
            /*获取额外商品信息*/
            , getExtraGoodsInfo() {
                this.$fetch('get_extra_goods_info', {
                    goods_id: this.goods_id,
                    into_type: this.$store.state.into_type
                })
                    .then((msg) => {
                        msg.goods_gallery.forEach(item => {
                            this.$store.state.goods_info.goods_gallery.push(item.img_url);
                        });
                        this.$set(this.$store.state.goods_info, 'goods_sku_list', msg.goods_sku);
                        this.$set(this.msg, 'coupon_list', msg.coupon_list);
                        this.$set(this, 'supplier_preview_info', msg.supplier_preview_info);
                        this.$store.dispatch("updGoodsInfo");
                        this.load_extra_goods = true;
                    })
            }

        },
        components: {
            goodsGallery,
            goodsSku,
            goodsEvaluateList,
            goodsSupplier,
        }
    };
</script>
<style lang="scss" scoped>
	.goods-detailed-main {
		.base-middle {
			.head-box {
				display: flex;
				justify-content: space-around;

				.head-r {
					background-color: white;
					padding: 15px;
					width: 500px;

					.goods-name {
						font: 700 16px Arial, "microsoft yahei";
						color: #666;
						padding-top: 10px;
						line-height: 28px;
						margin-bottom: 5px;
					}

					.goods-price {
						font-size: 14px;
						color: #444444;

						span {
							font-size: 24px;
							color: red;
						}

						i {
							font-style: normal;
							color: red;
						}
					}
				}
			}
			.base{
				display: flex;
				justify-content: center;
				.goods-desc-box{
					width: 750px;
					.goods-desc {
						width: 100%;
						img {
							width: 100%;
							margin: 0 auto;
							display: block;
						}
					}
				}
				.supplier-box{
					width: 250px;
					margin-right: 15px;
				}
			}

		}
	}
</style>