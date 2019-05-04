<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot name="bread"></slot>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {};
    },
    computed: {},
    methods: {}
};
</script>
<style scoped>
</style>
