<template>
	<div class="switch-payment-main">
		<Cascader
			:data="payment_options"
			v-model="payment_option_value"
			style="width: 400px"
			:clearable="false"></Cascader>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                payment_option_value: [5, 400],
            };
        },
        props: {
            payment_list: Array,
            dom_load: Boolean,
        },
        computed: {
            payment_options: {
                get: function () {
                    let result = [];
                    this.payment_list.forEach((item) => {
                        let pay_type = {
                            value: item.pay_id,
                            label: item.pay_name,
                            children: [],
                        };
                        item.ByStages.forEach(item2 => {
                            pay_type.children.push({
                                value: item2.bystages_id,
                                label: item2.bystages_val,
                                children: [],
                            })
                        });
                        result.push(pay_type);
                    });
                    return result;
                }
            }
        },
        created() {

        },
        mounted() {
            this.$emit('update:dom_load', false);
        },
        methods: {},
    };
</script>
<style lang="scss" scoped>
</style>