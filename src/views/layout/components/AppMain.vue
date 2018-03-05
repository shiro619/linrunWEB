<template>
  <section class="app-main" style="height: 100%;position: relative;padding: 32px 25px 0 25px;">
    <transition name="fade" mode="out-in">
      <!--<keep-alive :include="cachedViews">-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      // console.log(this.$store.state.tagsView.cachedViews)
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
