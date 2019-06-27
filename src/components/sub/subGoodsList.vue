<template>
	<div class="main">
		<Tabs v-model="tab_pane_name" @on-click="switchPriceFlag()">
			<TabPane label="综合排序" name="default_goods_list" icon="md-calculator"></TabPane>
			<TabPane label="价格排序" name="price_goods_list"
				:icon="price_flag? 'md-arrow-round-up':'md-arrow-round-down'"></TabPane>
			<TabPane label="销量排序" name="sales_volume_goods_list" icon="md-checkmark"></TabPane>
		</Tabs>
		<div class="goods-list-box">
			<div class="goods-card" v-for="item in screen_goods_list" :key="item.goods_id">
				<goodsCard :goods_info="item" not_show_supplier></goodsCard>
			</div>
		</div>
		<p class="page-box">
			<Page :total="total" :current.sync="current" :page-size="page_size"/>
		</p>
	</div>
</template>
<script>
    import goodsCard from './verticalGoodsCard'

    export default {
        data() {
            return {
                tab_pane_name: 'default_goods_list',
                cat_id: 0,
                screen_goods_list: [],
                price_flag: false,
                total: 0,
                current: 1,
                page_size: 16
            };
        },
        props: {
            goods_list: Array,
            not_show_supplier: Boolean,
        },
        computed: {
            default_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if ((result[j].goods_sales_volume + result[j].evaluate_count) < (result[j + 1].goods_sales_volume + result[j + 1].evaluate_count)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }
                    return result;
                }
            },
            price_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        if (this.price_flag) {
                            for (let i = 0; i < result.length - 1; i++) {
                                for (let j = 0; j < result.length - i - 1; j++) {
                                    if (parseFloat(result[j].shop_price) < parseFloat(result[j + 1].shop_price)) {
                                        let max = result[j];
                                        result[j] = result[j + 1];
                                        result[j + 1] = max;
                                    }
                                }
                            }
                        } else {
                            for (let i = 0; i < result.length - 1; i++) {
                                for (let j = 0; j < result.length - i - 1; j++) {
                                    if (parseFloat(result[j].shop_price) > parseFloat(result[j + 1].shop_price)) {
                                        let max = result[j];
                                        result[j] = result[j + 1];
                                        result[j + 1] = max;
                                    }
                                }
                            }
                        }

                    }
                    return result;
                }
            },
            sales_volume_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if (parseInt(result[j].goods_sales_volume) < parseInt(result[j + 1].goods_sales_volume)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }
                    return result;
                }
            },
            new_goods_list: {
                get: function () {
                    let result2 = JSON.parse(JSON.stringify(this.goods_list));
                    let result = [];
                    if (result2.length > 0) {
                        //先筛选
                        result2.forEach(item => {
                            if (item.is_new === 1) {
                                result.push(item);
                            }
                        });
                        if (result.length > 0) {
                            //冒泡排序
                            for (let i = 0; i < result.length - 1; i++) {
                                for (let j = 0; j < result.length - i - 1; j++) {
                                    if ((result[j].goods_sales_volume + result[j].evaluate_count) < (result[j + 1].goods_sales_volume + result[j + 1].evaluate_count)) {
                                        let max = result[j];
                                        result[j] = result[j + 1];
                                        result[j + 1] = max;
                                    }
                                }
                            }
                        }

                    }
                    return result;
                }
            }
        },
        watch: {
            'tab_pane_name': {
                'handler': function (new_val) {
                    switch (new_val) {
                        case 'default_goods_list':
                            this.$set(this, 'screen_goods_list', this.default_goods_list);

                            break;
                        case 'price_goods_list':
                            this.$set(this, 'screen_goods_list', this.price_goods_list);
                            break;
                        case 'sales_volume_goods_list':
                            this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);

                            break;
                    }
                    this.total = this.screen_goods_list.length;
                    this.screen_goods_list = this.screen_goods_list.slice(((this.current * this.page_size) - this.page_size), (this.current * this.page_size))
                },
                immediate: true,
            },
            'current': {
                'handler': function () {
                    switch (this.tab_pane_name) {
                        case 'default_goods_list':
                            this.$set(this, 'screen_goods_list', this.default_goods_list);

                            break;
                        case 'price_goods_list':
                            this.$set(this, 'screen_goods_list', this.price_goods_list);

                            break;
                        case 'sales_volume_goods_list':
                            this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);

                            break;
                    }
                    this.total = this.screen_goods_list.length;
                    this.screen_goods_list = this.screen_goods_list.slice(((this.current * this.page_size) - this.page_size), (this.current * this.page_size));
                },
                immediate: true,
            },
            'price_flag': {
                'handler': function () {
                    switch (this.tab_pane_name) {
                        case 'default_goods_list':
                            this.$set(this, 'screen_goods_list', this.default_goods_list);

                            break;
                        case 'price_goods_list':
                            this.$set(this, 'screen_goods_list', this.price_goods_list);
                            break;
                        case 'sales_volume_goods_list':
                            this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);

                            break;
                    }
                    this.total = this.screen_goods_list.length;
                    this.screen_goods_list = this.screen_goods_list.slice(((this.current * this.page_size) - this.page_size), (this.current * this.page_size));
                },
                immediate: true,
            },
        },
        created() {

        },
        methods: {
            switchPriceFlag() {
                if (this.tab_pane_name === 'price_goods_list') {
                    this.price_flag = !this.price_flag;
                }
            }
        },
        components: {
            goodsCard
        }
    };
</script>
<style lang="scss" scoped>
	.main {
		width: 100%;

		.goods-list-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			height: 1360px;
			overflow: hidden;

			.goods-card {
				width: 24%;
				height: 330px;
				margin-left: 1%;
				background-color: white;
				margin-top: 10px;
				border-radius: 5px;
				overflow: hidden;
				transition: all 0.3s ease;
			}

			.goods-card:hover {
				box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, .1);
				transform: translateY(-20px);
			}
		}

		.page-box {
			width: 100%;
			margin-top: 50px;
			text-align: center;
		}
	}
</style>