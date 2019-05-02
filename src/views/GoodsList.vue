<template>
  <div>
    这是商品列表页面
    <router-link :to="{name:'Cart',params:{cartId:123}}">跳转到购物车页面</router-link>
  </div>
</template>
<script>
export default {
    components: {},
    data () {
        return {};
    },
    methods: {}
};
</script>
<style scoped>
</style>
