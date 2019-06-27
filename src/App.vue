<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        created() {
            //this.loginCount();
            this.getInfo();
        },
        methods: {
            loginCount() {
                let user_token = this.$store.getters.getUserToken;
                if (user_token) {
                    this.$post('user_login_count', {user_token: user_token});
                }
            }
            , getInfo() {
                let info = JSON.parse(localStorage.getItem('gl_info') || '[]');
                //获取当前时间时间戳
                let now_time = (new Date()).getTime();
                let over_time = info.over_time;
                if ((parseInt(now_time) >= parseInt(over_time)) || !(parseInt(over_time))) {
                    let get_info = new Object();
                    this.$Spin.show();
                    this.$fetch('get_index_info', {
                        into_type: this.$store.state.into_type
                    })
                        .then((msg) => {
                            if (msg) {
                                get_info.goods_list = msg.goods_list;
                                get_info.cat_list = msg.cat_list;
                                get_info.ad_list = msg.ad_list;
                                this.$fetch('user_get_classify_ad_list', {
                                    into_type: this.$store.state.into_type
                                })
                                    .then((msg) => {
                                        if (msg) {
                                            get_info.classify_list = msg;
                                            /*保存信息，保存12小时43200000*/
                                            get_info.over_time = parseInt(now_time) + 43200000;
                                            localStorage.setItem('gl_info', JSON.stringify(get_info));
                                            this.$store.state.goods_list = get_info.goods_list;
                                            this.$store.state.cat_list = get_info.cat_list;
                                            this.$store.state.ad_list = get_info.ad_list;
                                            this.$store.state.classify_list = get_info.classify_list;
                                        }
                                        this.$Spin.hide();
                                    });
                            }
                            this.$Spin.hide();
                        });

                } else {
                    this.$store.state.goods_list = info.goods_list;
                    this.$store.state.cat_list = info.cat_list;
                    this.$store.state.ad_list = info.ad_list;
                    this.$store.state.classify_list = info.classify_list;
                }
            }
        },
    };
</script>
<style lang="scss">
	#app{
		background-color: rgb(244,248,251);
	}
</style>
