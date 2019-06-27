<template>
	<div class="article-main">
		<div class="base-middle base">
			<img v-for="(item,i) in article_body" :key="i" v-lazy="item">
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                article_id: -1,
                article_body: [],
            };
        },
        computed: {},
        created() {
            this.article_id = this.$route.params.article_id;
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.$fetch('user_get_article', {article_id: this.article_id})
                    .then((msg) => {
                        if (msg) {
                            let imgReg = /<img.*?(?:>|\/>)/gi;
                            //匹配src属性
                            let srcReg = /src=['"]?([^'"]*)['"]?/i;
                            let arr = msg.article_body.match(imgReg);
                            for (let i = 0; i < arr.length; i++) {
                                let src = arr[i].match(srcReg);
                                //获取图片地址
                                if (src[1]) {
                                    this.article_body.push(src[1])
                                }
                            }
                        }
                    })
            }
        },
    };
</script>
<style lang="scss" scoped>
	.article-main{
		.base{
			text-align: center;
			img{
				width: 80%;
			}
		}
	}
</style>