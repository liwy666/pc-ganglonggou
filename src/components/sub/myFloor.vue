<template>
	<div class="main base-middle">
		<footer>
			<div class="icon-row">
				<div class="footer-icon">
					<span class="footer-icon-text">原装正品</span>
				</div>
				<div class="footer-icon">
					<span class="footer-icon-text">电子发票</span>
				</div>
				<div class="footer-icon">
					<span class="footer-icon-text">专业服务商</span>
				</div>
				<div class="footer-icon">
					<span class="footer-icon-text">7天无理由</span>
				</div>
				<div class="footer-icon">
					<span class="footer-icon-text">全国联保</span>
				</div>
				<div class="footer-icon">
					<span class="footer-icon-text">售后无忧</span>
				</div>
			</div>
			<span>正规渠道，全新原装</span>
			<Divider type="vertical"></Divider>
			<span>根据国家政策，开具电子发票</span>
			<Divider type="vertical"></Divider>
			<span>岗隆已服务千万级客户</span>
			<Divider type="vertical"></Divider>
			<span>未激活，无人为损坏不影响二次销售</span>
			<Divider type="vertical"></Divider>
			<span>全国联保，全国三包</span>
			<Divider type="vertical"></Divider>
			<span>专业售后团队让您的数码产品用得更加舒心和顺心</span>
			<div class="friend-link">
				<div class="friend-link-item">
					<ul>
						<li>
							<a target="_Blank" class="link-item"
								href="http://design.buy.ccb.com/ccbshopservice/?shopId=080319&userid=505175168&source=b2c">建设银行专营店</a>
						</li>
						<li>
							<a target="_Blank" class="link-item"
								href="http://mall.icbc.com.cn/shop/index.jhtml?shopId=026386">工商银行专营店</a>
						</li>
						<li>
							<a target="_Blank" class="link-item"
								href="http://xpmall.soonwill.com/Product/Search?VendorNo=167&VendorName=%E6%B1%9F%E8%8B%8F%E5%B2%97%E9%9A%86%E6%95%B0%E7%A0%81%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8">浦发银行专营店</a>
						</li>
						<li>
							<a target="_Blank" class="link-item"
								href="https://mall.jd.com/index-644282.html">京东手机专营店</a>
						</li>
						<li>
							<a target="_Blank" class="link-item" href="https://glpad.jd.com/">京东数码专营店 </a>
						</li>
						<li>
							<a target="_Blank" class="link-item link-last-item"
								href="https://ganglongsm.tmall.com/?spm=a220o.1000855.1997427133.d4918061.4732a2bdymH7jX">天猫专营店</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="copyright">
				<p><a
					href="http://www.beian.miit.gov.cn" target="_Blank"><span>苏ICP备16051105号-1</span></a>
				</p>
			</div>
			<div class="copyright">
				<p>Copyright © 2019 by<a href="http://ganglonghui.com/" target="_Blank"><span>江苏岗隆数码科技有限公司</span></a></p>
			</div>
		</footer>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        computed: {},
        created() {

        },
        methods: {},
    };
</script>
<style lang="scss" scoped>
	.main {
		a:link {
			color: #666;
		}

		a:visited {
			color: #666;
		}

		a:hover {
			color: #666;
		}

		a:active {
			color: #666;
		}

		.friend-link {
			display: flex;
			align-items: center;
			width: 908px;
			height: 30px;
			margin: 0px auto;
			color: #666;
			border-top: 1px solid #b2dfdb;

			.friend-link-item {
				margin: 0px auto;

				ul {
					list-style: none;

					li {
						padding: 5px 0px;
						float: left;
					}

					.link-item {
						padding: 0px 8px;
						cursor: pointer;
						border-right: 1px solid #ccc;
					}

					.link-last-item {
						border: none;
					}
				}
			}
		}

		.icon-row {
			margin: 15px auto;
			padding-top: 8px;
			width: 1000px;
			height: 64px;

			.footer-icon {
				margin-left: 17px;
				margin-right: 17px;
				float: left;

				.footer-icon-text {
					margin-left: 45px;
					color: #444444;
					font-size: 18px;
					font-weight: bold;
					line-height: 64px;
				}
			}
		}

		.copyright {
			width: 100%;
			color: #666;
			line-height: 30px;
			text-align: center;
		}
	}
</style>