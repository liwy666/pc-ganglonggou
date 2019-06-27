<template>
	<div>
		<searchFrame></searchFrame>
		<div class="goods-list-main">
			<div class="random-goods-list">
				<verticalRecommendGoods></verticalRecommendGoods>
			</div>
			<div class="base">
				<goodsList :goods_list=goods_list></goodsList>
			</div>
		</div>
	</div>
</template>
<script>
    import goodsList from '../sub/subGoodsList'
    import searchFrame from '../sub/searchFrame'
	import verticalRecommendGoods from '../sub/verticalRecommendGoods'

    export default {
        data() {
            return {
                type: '',
                cat_id: -1,
                keyword: "",
                notice_count: 0,
            };
        },
        computed: {
            goods_list: {
                get: function () {
                    let result = [];
                    if (this.type === 'cat') {
                        if (this.$store.state.goods_list) {
                            this.$store.state.goods_list.forEach(item => {
                                if (parseInt(item.cat_id) === parseInt(this.cat_id)) {
                                    result.push(item)
                                }
                            })
                        }
                    } else if (this.type === 'search') {
                        let goods_id_array = [];
                        this.$store.state.goods_list.forEach(item => {
                            /*名称*/
                            let goods_name = item.goods_name.toUpperCase();
                            goods_name = goods_name.replace(/\s*/g, "");
                            if (goods_name.indexOf(this.keyword) !== -1) {
                                goods_id_array.push(item.goods_id)
                            }
                            /*分类名称*/
                            let cat_name = item.cat_name.toUpperCase();
                            cat_name = cat_name.replace(/\s*/g, "");
                            if (cat_name.indexOf(this.keyword) !== -1) {
                                goods_id_array.push(item.goods_id)
                            }
                            /*关键词*/
                            let keywords = item.keywords.toUpperCase();
                            keywords = keywords.replace(/\s*/g, "");
                            if (keywords.indexOf(this.keyword) !== -1) {
                                goods_id_array.push(item.goods_id)
                            }
                        });
                        if (goods_id_array.length > 0) {
                            goods_id_array = this.$MyCommon.unique1(goods_id_array);
                            goods_id_array.forEach(item => {
                                this.$store.state.goods_list.forEach(item2 => {
                                    if (item === item2.goods_id) {
                                        result.push(item2)
                                    }
                                })
                            })
                        }
                        if (result.length < 1) {
                            if (this.notice_count < 1) {
                                this.$Notice.warning({
                                    title: '~没找到相关的商品哦',
                                    desc: '别担心，看看这些商品吧，肯定有您喜欢的'
                                });
                                this.notice_count++;
                            }

                            result = this.$store.state.goods_list;
                        }
                    } else {
                        result = this.$store.state.goods_list;
                    }
                    return result;
                }
            },
        },
        created() {
            /*获取url参数*/
            this.type = this.$route.query.type;
            this.cat_id = this.$route.query.cat_id;
            this.keyword = this.$route.query.keyword;
        },
        methods: {},
        components: {
            goodsList,
            searchFrame,
            verticalRecommendGoods,
        }
    };
</script>
<style lang="scss" scoped>
	.goods-list-main {
		display: flex;
		justify-content: center;

		.random-goods-list {
			width: 200px;
			background-color: white;
			margin-right: 10px;
		}

		.base {
			width: 1015px;
		}
	}
</style>