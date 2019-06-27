<template>
	<div class="main">
		<div class="nav-body">
			<div class="nav-side" ref="navSide">
				<ul>
					<li @mouseenter="showDetail(i)" @mouseleave="hideDetail(i)" v-for="(item,i) in classify_list"
						:key="i">
						<span class="nav-side-item">{{item.classify_name}}</span>
					</li>
				</ul>
			</div>
			<div class="swipe-box">
				<div class="swipe">
					<Carousel autoplay v-model="swipe_number" loop>
						<CarouselItem   v-for="(item) in swipe_list" :key="item.id">
							<div class="on-swipe">
								<img :src="item.ad_img" alt="">
							</div>
						</CarouselItem>
					</Carousel>
				</div>
				<div class="coupon-box">
					<img :src="banner_info.ad_img" alt="">
<!--					<div class="coupon"><img :src="coupon_info.ad_img" alt=""></div>-->
<!--					<div class="coupon"><img :src="banner_info.ad_img" alt=""></div>-->
				</div>
			</div>
			<transition-group tag="div" name="fade">
				<div class="detail-item-panel" v-show="panel[i]"
					@mouseenter="showDetail(i)" ref="itemPanel1" @mouseleave="hideDetail(i)"
					v-for="(item,i) in classify_list" :key="i">
					<div class="one-classify" v-for="(item3) in item.children" :key="item3.id">
						<div class="img"><img :src="item3.img_url" alt=""></div>
						<div class="name">{{item3.classify_name}}</div>
					</div>
				</div>
			</transition-group>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                swipe_number: 0,
            };
        },
        props: {
            swipe_list: Array,
			coupon_info:Object,
            banner_info:Object,
        },
        computed: {
            classify_list: {
                get: function () {
                    let result = [];
                    let classify_list = this.$store.state.classify_list;
                    if (classify_list) {
                        result = this.getTrees(classify_list, 0);
                    }
                    return result;
                }
            },
            panel: {
                get: function () {
                    let result = [];
                    let classify_list = this.$store.state.classify_list;
                    if (classify_list) {
                        classify_list = this.getTrees(classify_list, 0);
                        classify_list.forEach((item, i) => {
                            result[i] = false;
                        });
                    }
                    return result;
                }
            }
        },
        created() {

        },
        methods: {
            showDetail(index) {
                this.panel.forEach((item, i) => {
                    this.$set(this.panel, i, false);
                    this.panel[i] = false;
                });
                this.$set(this.panel, index, true);
                this.$forceUpdate();
            },
            hideDetail(index) {
                this.$set(this.panel, index, false);
                this.$forceUpdate();
            },
            /*树状的算法*/
            getTrees(list, parentId) {
                let items = {};
                // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
                for (let i = 0; i < list.length; i++) {
                    let key = list[i].parent_id;
                    if (items[key]) {
                        items[key].push(list[i]);
                    } else {
                        items[key] = [];
                        items[key].push(list[i]);
                    }
                }
                return this.formatTree(items, parentId);
            },

            /*利用递归格式化每个节点*/
            formatTree(items, parentId) {
                let result = [];
                if (!items[parentId]) {
                    return result;
                }
                for (let t of items[parentId]) {
                    t.children = this.formatTree(items, t.id);
                    result.push(t);
                }
                return result;
            }

            , arrayGroup(arr) {
                let newArr = [],
                    types = {},
                    i, j, cur;
                for (i = 0, j = arr.length; i < j; i++) {
                    cur = arr[i];
                    if (!(cur.group_name in types)) {
                        types[cur.group_name] = {group_name: cur.group_name, children: []};
                        newArr.push(types[cur.group_name]);
                    }
                    types[cur.group_name].children.push(cur);
                }
                return newArr;
            }
        },
    };
</script>
<style lang="scss" scoped>
	.main {
		.nav-body {
			height: 485px;
			display: flex;
			position: relative;
			.nav-side {
				width: 200px;
				height: 100%;
				padding: 0px;
				color: #fff;
				float: left;
				background-color: #6e6568;

				ul {
					width: 100%;
					padding: 0px;
					padding-top: 15px;
					list-style: none;

					li {
						padding: 7.5px;
						padding-left: 15px;
						font-size: 14px;
						line-height: 18px;
						transition: all .3s ease;
						cursor: pointer;
					}

					li:hover {
						background: #999395;
					}
				}
			}
			.swipe-box{
				width: 815px;
				height: 485px;
				overflow: hidden;
				.swipe{
					width: 750px;
					height: 366px;
					margin: 0 auto;
				}
				.coupon-box{
					width: 815px;
					height: 119px;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
					.coupon{
						width: 50%;
						img{
							width: 100%;
						}
					}

				}
			}
			.detail-item-panel {
				width: 815px;
				height: 485px;
				background-color: white;
				position: absolute;
				z-index: 999;
				display: flex;
				flex-wrap: wrap;
				padding: 10px;
				left: 200px;
				overflow: hidden;
				.one-classify {
					width: 85px;
					margin-bottom: 10px;
					cursor: pointer;
					.img {
						width: 100%;
						text-align: center;
						margin-bottom: 5px;

						img {
							width: 75%;
						}
					}

					.name {
						text-align: center;
						font-size: 10px;
					}
				}
			}

		}
	}

	/** 插入过程 **/
	.fade-enter-active {
		transition: all 1s;
	}

	/** 移除过程 **/
	.fade-leave-active {
		transition: all 1s;
	}

	/*** 开始插入、移除结束的位置变化 ***/
	.fade-enter, .fade-leave-to {
		//transform: translateX(-100px);
	}
</style>