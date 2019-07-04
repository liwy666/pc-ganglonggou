<template>
	<div class="add-address-main">
		<Input placeholder="收件人姓名" v-model="name" style="width: 300px"/>
		<Input placeholder="收件人手机号" v-model="tel" style="width: 300px"/>
		<Cascader :data="address_options" v-model="address_option_value" :clearable="false"></Cascader>
		<Input placeholder="详细地址" v-model="address_detail" style="width: 400px"/>
		<div>
			<Button type="primary" @click="onSave">确认保存</Button>
		</div>
	</div>
</template>
<script>
    import address_options_json from './addressOptions'
    import areaList from './area'


    export default {
        data() {
            return {
                address_options: JSON.parse(address_options_json.address_options),//地址数据库
                areaList,//地址数据库
                name: '',
                tel: '',
                province: '',
                city: '',
                county: '',
                area_code: 0,
                address_detail: '',
                address_option_value: [],
            };
        },
        props: {
            show_edit_address: Boolean,
            type: String,
            address_info: Object,
        },
        computed: {
            /*   /!**
				* 通过area.js算出addressOption.js
				*!/
			   address_options: {
				   get: function () {
					   let result = [];
					   for (let province_key in this.areaList.province_list) {
						   let province = {
							   value: province_key,
							   label: this.areaList.province_list[province_key],
							   children: [],
						   };
						   for (let city_key in this.areaList.city_list) {
							   if (city_key.substr(0, 2) ==
								   province.value.substr(0, 2)) {
								   let city = {
									   value: city_key,
									   label: this.areaList.city_list[city_key],
									   children: [],
								   };
								   province.children.push(city);
								   for (let county_key in this.areaList.county_list) {
									   if (county_key.substr(0, 4) ==
										   city.value.substr(0, 4)) {
										   let county = {
											   value: county_key,
											   label: this.areaList.county_list[county_key],
											   children: [],
										   };
										   city.children.push(county);
									   }
								   }
							   }
						   }
						   result.push(province);
					   }
					   console.log(JSON.stringify(result));
					   return result;
				   },
			   }*/
        },
        watch: {
            'address_option_value': function (val) {
                this.province = this.areaList.province_list[val[0]];
                this.city = this.areaList.city_list[val[1]];
                this.county = this.areaList.county_list[val[2]];
                this.area_code = val[2];
            },
            'address_info': {
                handler: function () {
                    switch (this.type) {
                        case 'add':
                            this.name = '';
                            this.tel = '';
                            this.province = '';
                            this.city = '';
                            this.county = '';
                            this.area_code = 0;
                            this.address_detail = '';
                            this.address_option_value = [];
                            break;
                        case 'upd':
                            this.name = this.address_info.name;
                            this.tel = this.address_info.tel;
                            this.province = this.address_info.province;
                            this.city = this.address_info.city;
                            this.county = this.address_info.county;
                            this.area_code = this.address_info.area_code;
                            this.address_detail = this.address_info.address_detail;
                            this.address_option_value = this.getAddressOptionValueByAreaCode(this.area_code);
                            break;
                    }
                },
                immediate: true,
            },
        },
        created() {

        },
        methods: {
            onSave() {
                let mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                if (this.name.length < 2 ||
                    this.name.length > 10 ||
                    !mobileRegex.test(this.tel) ||
                    !this.province ||
                    !this.city ||
                    !this.county ||
                    !this.area_code ||
                    this.address_detail.length < 5 ||
                    this.address_detail.length > 70
                ) {
                    this.$Notice.error({
                        title: '地址信息填写不符合规范',
                    });
                    return false;
                }
                this.$Spin.show();
                let post_info = new Object();
                let url = '';
                if (this.type === 'add') {
                    post_info = {
                        user_token: this.$store.getters.getToken,
                        name: this.name,
                        tel: this.tel,
                        province: this.province,
                        city: this.city,
                        county: this.county,
                        address_detail: this.address_detail,
                        area_code: this.area_code
                    };
                    url = "user_add_address";
                } else if (this.type === 'upd') {
                    post_info = {
                        user_token: this.$store.getters.getToken,
                        address_id: this.address_info.address_id,
                        name: this.name,
                        tel: this.tel,
                        province: this.province,
                        city: this.city,
                        county: this.county,
                        address_detail: this.address_detail,
                        area_code: this.area_code
                    };
                    url = "user_upd_address";
                }

                this.$post(url, post_info)
                    .then((msg) => {
                        if (msg) {
                            this.$store.dispatch('getAddressList', this.$store.getters.getToken)
                                .then(() => {
                                    this.$emit('update:show_edit_address', false);
                                    this.$Notice.success({
                                        title: '编辑收货地址成功！'
                                    });
                                });
                        }
                        this.$Spin.hide();
                    })

            },
            getAddressOptionValueByAreaCode(area_code) {
                let area_code_ = area_code.toString();
                return [
                    area_code_.substr(0, 2) + '0000',
                    area_code_.substr(0, 4) + '00',
                    area_code_
                ]
            }
        },
    };
</script>
<style lang="scss" scoped>
	.add-address-main {
		margin-top: 50px;

		div {
			margin-top: 15px;
		}
	}
</style>