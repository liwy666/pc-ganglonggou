<template>
	<Affix @on-change="affixWatch">
		<div class="website-hat-main">
			<div class="base-middle base">
				<div class="logo-box" @click="toFirst">
					<img :src="$store.state.img_url+'gl_horizontal_logo.png'" alt="">
				</div>
				<div class="button-box">
					<span v-if="!path_first" @click="toFirst">首页</span>
					<span @click="showServer">客服</span>
					<span v-if="!path_first" @click="showClassify">更多分类</span>
					<span v-if="!path_carts" @click="toCarts">购物车</span>
					<span v-if="!path_article" @click="toArticle">关于我们</span>
				</div>
				<div class="login-box">
					<Avatar icon="ios-person" size="large" v-if="!login_flag"/>
					<Button type="primary" @click="toLogin" v-if="!login_flag">登录</Button>
					<div class="user-img" @click="toHome" v-if="login_flag"><img :src="user_info.user_img" alt=""></div>
					<div class="user-name" @click="toHome" v-if="login_flag">{{this.user_info.user_name}}</div>
					<Icon type="ios-log-out" v-if="login_flag" size="16" @click="dialog_flag = true"/>
				</div>
			</div>
		</div>
		<Drawer title="" :mask-closable="false" v-model="show_classify_flag" placement="left" width="80">
			<div class="nav-side" ref="navSide">
				<ul>
					<li @mouseenter="showDetail(i)" @mouseleave="hideDetail(i)" v-for="(item,i) in classify_list"
						:key="i">
						<span class="nav-side-item">{{item.classify_name}}</span>
					</li>
				</ul>
			</div>
			<transition-group tag="div" name="fade">
				<div class="detail-item-panel" v-show="panel[i]"
					@mouseenter="showDetail(i)" ref="itemPanel1" @mouseleave="hideDetail(i)"
					v-for="(item,i) in classify_list" :key="i">
					<div class="one-classify" v-for="(item3) in item.children" :key="item3.id" @click="toSearch(item3)">
						<div class="img"><img :src="item3.img_url" alt=""></div>
						<div class="name">{{item3.classify_name}}</div>
					</div>
				</div>
			</transition-group>
		</Drawer>
		<Modal
			v-model="dialog_flag"
			title="确认注销？"
			@on-ok="outLogin"
			@on-cancel="dialog_flag =false">
			<p>您确认要注销登录吗？</p>
		</Modal>
	</Affix>
</template>
<script>
    export default {
        data() {
            return {
                path_first: false,
                path_carts: false,
                path_article: false,
                show_classify_flag: false,
                login_flag: false,
                dialog_flag: false,
            };
        },
        watch: {
            '$route.path': {
                handler: function (val) {
                    this.path_first = val.indexOf('first') > 0 ? true : false;
                    this.path_carts = val.indexOf('carts') > 0 ? true : false;
                    this.path_article = val.indexOf('article') > 0 ? true : false;
                },
                immediate: true,
            },
            '$store.state.user_token': {
                handler: function (val) {
                    if (val) {
                        let key = 'gl_user_info_' + this.$MyCommon.dateFtt('yyyy_MM_dd', new Date());
                        let user_info = JSON.parse(localStorage.getItem(key) || 'null');
                        if (user_info) {
                            this.$set(this.$store.state, 'user_info', user_info);
                            this.login_flag = true;
                        } else {
                            this.$store.dispatch('getUserInfo', this.$store.state.user_token)
                                .then((msg) => {
                                    this.login_flag = true;
                                    localStorage.setItem(key, JSON.stringify(msg));
                                });
                        }
                    }
                },
                immediate: true,
            }
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
            },
            user_info: {
                get: function () {
                    return this.$store.state.user_info;
                }
            }
        },
        created() {

        },
        methods: {
            toFirst() {
                let data = this.$router.resolve({
                    path: "/first"
                });
                window.open(data.href, '_blank')
            },
            showClassify() {
                this.show_classify_flag = !this.show_classify_flag;
            },
            showServer() {
                window.open('https://p.qiao.baidu.com/cps2/mobileChat?siteId=11040705&userId=24298402&type=1&reqParam=&appId=&referer=', '_blank', 'width=800,height=800')
            },
            toCarts() {
                let data = this.$router.resolve({
                    path: "/carts"
                });
                window.open(data.href, '_blank')
            },
            affixWatch() {

            },
            toArticle() {
                let data = this.$router.resolve({
                    path: "/article/1"
                });
                window.open(data.href, '_blank')
            },
            toLogin() {
                localStorage.setItem('beforeLoginUrl', this.$route.path);// 保存用户进入的url
                this.$router.push('/login');
            },
            toHome() {
                let data = this.$router.resolve({
                    path: "/home"
                });
                window.open(data.href, '_blank')
            },
            outLogin() {
                let key = 'gl_user_info_' + this.$MyCommon.dateFtt('yyyy_MM_dd', new Date());
                localStorage.setItem(key, 'null');
                localStorage.setItem('user_token_obj', 'null');
                this.$set(this.$store.state, 'user_info', null);
                this.$set(this.$store.state, 'user_token', null);
                this.login_flag = false;
                this.$Notice.success({
                    title: '注销成功！',
                    desc: ''
                });
            },

            toSearch(info) {
                let key_word = '';
                if (info.key_word !== '' && info.key_word != null) {
                    key_word = info.key_word;
                } else {
                    key_word = info.classify_name;
                }
                key_word = key_word.toUpperCase();
                key_word = key_word.replace(/\s*/g, "");
                let data =  this.$router.resolve({
                    path: 'goodsList', query: {
                        type: 'search',
                        cat_id: -1,
                        keyword: key_word,
                        back_number: -1,
                    }
                });
                window.open(data.href,'_blank');
            },

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
	.website-hat-main {
		background-color: white;
		border-bottom: 2px solid rgb(204, 0, 1);
		box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, .1);
		z-index: 999 !important;
		.base {
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			z-index: 99999;

			.logo-box {
				height: 60px;
				cursor: pointer;
				img {
					height: 100%;
				}
			}

			.login-box {
				display: flex;
				align-items: center;
				cursor: pointer;

				button {
					margin-left: 15px;
				}

				.user-img {
					width: 60px;
					height: 60px;
					border-radius: 50%;
					overflow: hidden;

					img {
						width: 100%;
					}
				}

				.user-name {
					margin-left: 10px;
					color: rgb(238, 175, 61);
					font-size: 12px;
					margin-right: 10px;
				}
			}

			.button-box {
				margin-left: 200px;

				span {
					cursor: pointer;
					transition: all .2s ease;
					font-size: 14px;
					margin-left: 10px;
					margin-right: 10px;
				}

				span:hover {
					color: rgb(204, 0, 1);
				}
			}
		}
	}
</style>
<style lang="scss">
	.ivu-drawer {
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

		.detail-item-panel {
			width: 80%;
			height: 90%;
			background-color: white;
			position: absolute;
			z-index: 999;
			display: flex;
			flex-wrap: wrap;
			padding: 10px;
			left: 210px;
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
</style>