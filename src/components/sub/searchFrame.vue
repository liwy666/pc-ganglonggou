<template>
	<div>
		<div class="container">
			<i-input v-model="keyword" size="large" class="sreach" placeholder="输入你想查找的商品" @on-enter="sreach">
				<Button slot="append" icon="ios-search" @click="sreach" ></Button>
			</i-input>
			<Tag v-for="(item, index) in promotion_tags" :key="index" closable @on-close="closeTags(index)"><span
				@click="selectTags(item)">{{item}}</span></Tag>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                promotion_tags: [
                    '苹果', '平衡车', 'vivo', '华为nova4', 'mate20', 'xs'
                ],
                keyword: '',
            };
        },
        computed: {},
        created() {
            let promotion_tags = JSON.parse(localStorage.getItem('gl_pc_promotion_tags20190625'));
            if (!promotion_tags) {
                localStorage.setItem('gl_pc_promotion_tags20190625', JSON.stringify(this.promotion_tags));
            } else {
                this.promotion_tags = promotion_tags;
            }
        },
        methods: {
            sreach() {
                if (this.keyword.length > 0 && this.keyword.length < 20) {
                    //保存关键词
                    let keyword = this.keyword.toUpperCase();
                    keyword = keyword.replace(/\s*/g, "");
                    this.keyword = "";
                    let routeData = this.$router.resolve({
                        path: 'goodsList',
                        query: {type: 'search', cat_id: -1, keyword: keyword}
                    });
                    window.open(routeData.href, '_blank');
                } else {
                    this.$Notice.warning({
                        title: '无效关键词',
                        desc: '您的关键词可能太长或者太短，换一个别的吧~'
                    });
                }
            },
            closeTags(index) {
                this.promotion_tags.splice(index, 1);
                localStorage.setItem('gl_pc_promotion_tags20190625', JSON.stringify(this.promotion_tags));
            },
            selectTags(keyword_) {
                let keyword = keyword_.toUpperCase();
                keyword = keyword.replace(/\s*/g, "");
                let routeData = this.$router.resolve({
                    path: 'goodsList',
                    query: {type: 'search', cat_id: -1, keyword: keyword}
                });
                window.open(routeData.href, '_blank');
            }
        },
    };
</script>
<style lang="scss" scoped>
	.container {
		padding-top: 15px;
		margin: 0px auto;
		margin-bottom: 15px;
		width: 460px;
	}

	.sreach {
		margin: 5px 0px;
	}
</style>