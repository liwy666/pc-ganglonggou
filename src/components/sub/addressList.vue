<template>
	<div class="address-list-main">
		<Spin v-if="address_load_flag"></Spin>
		<div v-if="!address_load_flag">
			<Button type="primary" @click="showAddAddress">新建收货地址</Button>
			<Card v-for="item in address_list" :key="item.address_id" :class="item.is_default === 1? 'red':''">
				<a href="#" slot="extra" v-if="!item.is_default"
					@click.prevent="switchAddress(item.address_id)">
					<Icon type="md-repeat"/>
					切换
				</a>
				<a href="#" slot="extra" @click.prevent="showUpdAddress(item)">
					<Icon type="ios-hammer"/>
					编辑
				</a>
				<a href="#" slot="extra" @click.prevent="delAddress(item.address_id)">
					<Icon type="ios-remove-circle-outline"/>
					删除
				</a>
				<p slot="title">
					{{item.name + ',' + item.tel}}
				</p>
				<p>{{item.province
					+item.city+
					item.county+
					item.address_detail}}
				</p>
			</Card>
		</div>
		<Modal v-model="show_edit_address" footer-hide>
			<editAddress :show_edit_address.sync="show_edit_address" :address_info="edit_address_info"
				:type="edit_address_type"></editAddress>
		</Modal>
	</div>
</template>
<script>
    import editAddress from './editAddress'

    export default {
        data() {
            return {
                address_load_flag: false,
                show_edit_address: false,
                edit_address_type: 'add',
                edit_address_info: null,
            };
        },
        props: {
            address_list: Array,
            dom_load: Boolean,
        },
        computed: {},
        created() {

        },
        mounted() {
            this.$emit('update:dom_load', false);
        },
        methods: {
            delAddress(address_id) {
                this.address_load_flag = true;
                this.$post('user_del_address', {
                    user_token: this.$store.getters.getToken,
                    address_id: address_id
                })
                    .then((msg) => {
                        if (msg) {
                            this.$store.dispatch('getAddressList', this.$store.getters.getToken)
                        }
                        this.address_load_flag = false;
                    })
            },
            switchAddress(address_id) {
                this.address_load_flag = true;
                this.$post('user_upd_default_address', {
                    user_token: this.$store.getters.getToken,
                    address_id: address_id
                })
                    .then((msg) => {
                        if (msg) {
                            this.$store.dispatch('getAddressList', this.$store.getters.getToken)
                        }
                        this.address_load_flag = false;
                    })
            },
            showAddAddress() {
                this.edit_address_type = 'add';
                this.edit_address_info = null;
                this.show_edit_address = true;
            },
            showUpdAddress(info) {
                this.edit_address_type = 'upd';
                this.show_edit_address = true;
                this.edit_address_info = info;

            },
        },
        components: {
            editAddress
        }
    };
</script>
<style lang="scss" scoped>
	.address-list-main {
		//margin-top: 50px;

		.ivu-card {
			margin-top: 15px;

		}

		.red {
			background-color: rgba(251, 0, 0, 0.1);;
		}
	}
</style>