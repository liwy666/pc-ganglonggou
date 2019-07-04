<template>
	<div class="use-integral-main">
		<p>使用数量:</p>
		<InputNumber :max="can_integral" :min="0" v-model="use_integral_number"></InputNumber>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                integral_name: this.$store.state.integral_name,
                can_integral: 0,
                use_integral_number: 0,
            };
        },
        props: {
            goods_list: Array,
			title:String,
            dom_load: Boolean,
        },
        computed: {
            user_integral: {
                get: function () {
                    return parseInt(this.$store.state.user_info.integral);
                }
            },
            goods_can_integral: {
                get: function () {
                    let result = 0;
                    this.goods_list.forEach(item => {
                        result += parseInt(item.integral);
                    });
                    return result;
                }
            },
        },
        created() {
            this.iniCanIntegral();
            this.$emit('update:title',  '您现有' + this.user_integral + this.integral_name + ' 本单可使用' + this.can_integral + this.integral_name);
        },
        mounted() {
            this.$emit('update:dom_load', false);
        },
        methods: {
            iniCanIntegral() {
                if (this.user_integral === 0 || this.goods_can_integral === 0) {
                    this.can_integral = 0;
                } else if (this.user_integral <= this.goods_can_integral) {
                    this.can_integral = this.user_integral;
                } else (
                    this.can_integral = this.goods_can_integral
                );
            },
        },
    };
</script>
<style lang="scss" scoped>
	.use-integral-main {
		display: flex;
		align-items: center;
		p{
			margin-right: 15px;
		}
	}
</style>