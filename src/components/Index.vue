<template>
	<div class="main">
		<websiteHat></websiteHat>
		<router-view/>
		<myFloor></myFloor>
	</div>
</template>
<script>
    import myFloor from './sub/myFloor'
    import websiteHat from './sub/websiteHat'
    export default {
        data() {
            return {};
        },
        computed: {},
        created() {

        },
        methods: {},
		components:{
            myFloor,
            websiteHat,
		}
    };
</script>
<style lang="scss" scoped>
</style>