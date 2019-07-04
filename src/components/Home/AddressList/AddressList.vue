<template>
	<div class="user-address-list-main">
		<addressList v-if="!load_flag" :address_list="address_list"></addressList>
	</div>
</template>
<script>
    import addressList from '../../sub/addressList';

    export default {
        data() {
            return {
				load_flag:true,
            };
        },
        computed: {
            address_list: {
                get: function () {
                    return this.$store.getters.getAddressList;
                }
            },
		},
        created() {
			this.getAddress();
        },
        methods: {
            getAddress() {
                this.$store.dispatch('getAddressList', this.$store.getters.getToken)
                    .then(() => {
                        this.load_flag = false;
                    })
            }
        },
		components:{
            addressList
		}
    };
</script>
<style lang="scss" scoped>
	.user-address-list-main {
		min-height:400px;
		background-color: white;
		padding: 15px;
	}
</style>