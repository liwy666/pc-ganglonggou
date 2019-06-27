<template>
	<div class="goods-gallery-main">
		<div class="goods-img">
			<img-zoom :src="goods_img_url" width="350" height="350" :bigsrc="goods_img_url"
				:configs="img_zoom_config"></img-zoom>
		</div>
		<div class="goods-gallery">
			<Button shape="circle" icon="ios-arrow-up" @click="mySwiperLeft.slidePrev()"></Button>
			<swiper :options="swiper_option" ref="mySwiperLeft" class="swiper-option-left">
				<swiper-slide v-for="(item,i) in goods_gallery" :key="i">
					<Button>
						<img :src="item" alt="" @mouseenter="updImgUrl(item)">
					</Button>
				</swiper-slide>
			</swiper>
			<Button shape="circle" icon="ios-arrow-down" @click="mySwiperLeft.slideNext()"></Button>
		</div>
	</div>
</template>
<script>
    // require styles
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import imgZoom from 'vue2.0-zoom'

    export default {
        data() {
            return {
                swiper_option: {
                    direction: 'vertical',
                    slidesPerView: 4,
                    on: {
                        touchStart: event => {
                            this.swIndex = event.path[1].getAttribute("swIndex");
                            this.img_url = event.path[1].getAttribute("img_url");
                        },
                    },
                },
                img_zoom_config: {
                    width: 350,
                    height: 350,
                    maskWidth: 100,
                    maskHeight: 100,
                    maskColor: 'red',
                    maskOpacity: 0.2
                }
            };
        },
        props: {
            goods_img_url: String,
            goods_gallery: Array,
            goods_info: Object,
        },
        watch: {
            'goods_info': {
                'handler': function (val) {
                    this.$emit('update:goods_img_url', val.goods_attribute_img);
                },
                deep: true,
            }
        },
        computed: {
            mySwiperLeft() {
                return this.$refs.mySwiperLeft.swiper
            },
        },
        created() {
        },
        methods: {
            updImgUrl(img_url) {
                this.$emit('update:goods_img_url', img_url);
            }

        },
        components: {
            swiper,
            swiperSlide,
            imgZoom,
        }
    };
</script>
<style lang="scss" scoped>
	.goods-gallery-main {
		display: flex;
		align-items: center;

		.goods-img {
			width: 350px;
			height: 350px;

			img {
				width: 100%;
				transition: all 1s ease;
			}
		}

		.goods-gallery {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			width: 100px;
			margin-left: 5px;

			.swiper-option-left {
				width: 100px;
				height: 400px;
				margin-top: 5px;
				margin-bottom: 5px;

				.swiper-slide {
					width: 100px;
					height: 100px;
					box-sizing: border-box;
					text-align: center;

					img {
						width: 100%;
					}
				}

				.active {
					border: red solid 2px;
				}
			}
		}
	}
</style>