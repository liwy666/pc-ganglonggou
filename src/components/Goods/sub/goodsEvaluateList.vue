<template>
	<div class="evaluate-box">
		<div class="remarks-box" v-for="(item) in evaluate_list" :key="item.id">
			<div class="remarks-user">
				<div class="user-img"><img :src="item.user_img" alt=""></div>
				<span class="remarks-user-name">{{item.user_name}}</span>
			</div>
			<div class="remarks-content-box">
				<p class="remarks-content">{{item.evaluate_text}}</p>
				<p class="remarks-sub">
					<span class="remarks-item">{{item.sku_desc}}</span>
					<span class="remarks-time">{{item.create_time}}</span>
					<Rate disabled :value="item.rate" allow-half class="remarks-star"></Rate>
				</p>
			</div>
		</div>
		<p class="not-evaluate" v-if="evaluate_count<=0">
			没有相应的评价,看看其他的
			<Icon type="ios-plane-outline" :size="60"/>
		</p>
		<p style="height: 60px"></p>
		<div class="page-box" v-if="evaluate_count>0">
			<Page :total="evaluate_count" :current.sync="page" :page-size="limit"/>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                page: 1,
                limit: 5,
                evaluate_list: [],
            };
        },
        watch: {
            'page': function () {
                this.getEvaluate();
            }
        },
        props: {
            evaluate_count: Number,
            goods_id: Number,
        },
        computed: {},
        created() {
            this.getEvaluate();
        },
        methods: {
            getEvaluate() {
                this.$fetch('user_get_evaluate_by_goods_id_and_page'
                    , {
                        goods_id: this.goods_id
                        , page: this.page
                        , limit: this.limit
                    })
                    .then((msg) => {
                        if (msg) {
                            this.evaluate_list = msg;
                        }
                    })
            }
        },
    };
</script>
<style lang="scss" scoped>
	.evaluate-box {
		min-height: 800px;
		background-color: white;
		padding-top: 20px;
		position: relative;

		.not-evaluate {
			height: 800px;
			line-height: 800px;
			text-align: center;
			font-size: 24px;
		}

		.page-box {
			position: absolute;
			bottom: 5px;
		}

		.remarks-box {
			padding: 15px;
			flex-direction: row;
			border-bottom: 1px #ccc dotted;

			.remarks-user {
				display: flex;
				align-items: center;
			}

			.user-img {
				width: 60px;
				height: 60px;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.remarks-user-name {
				padding-left: 15px;
			}

			.remarks-content-box {
				width: calc(100% - 180px);
			}

			.remarks-star {
				background-color: #fff;
			}

			.remarks-content {
				font-size: 14px;
				color: #232323;
				line-height: 28px;
			}

			.remarks-sub {
				margin-top: 15px;
				color: #ccc;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}

			.remarks-time {
				margin-left: 15px;
				margin-right: 35px;
			}

			.remarks-page {
				margin: 15px;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>