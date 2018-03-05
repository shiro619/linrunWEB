<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll" style="" >
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <!--头像姓名信息-->
      <div style="width: 100%;overflow: hidden">
        <div style="width: 260px;height: 50px;position:relative;font-size: 23px;padding: 14px 0px 14px 40px;background-color: #ffffff;box-shadow: 0 10px #edf2f9">林润审批管理后台</div>
        <div class="sidebar-head" style="width: 260px;height: 120px;position:relative;background-color: #ffffff">
          <div style="position: relative;width: 100%;height: 120px;">
            <div style="width: 50px;height: 50px;position: absolute;left: 46px;top: 44px;">
              <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'" style="width: 100%;height: 100%;border-radius: 25px">
              <span style="font-size: 16px;position: absolute;left: 62px;top: 15px;width: 150px">{{name}}</span>
              <span style="display: inline-block;width: 5px;height: 5px;background-color: lightgreen;border-radius: 2.5px;position: absolute;left: 62px;top: 38px;"></span>
              <span style="font-size: 10px;position: absolute;left: 70px;top: 35px;width: 60px">online</span>
            </div>
          </div>
        </div>
      </div>
      <!---->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { getToken, getAdminToken, setToken, removeToken, removeAdminToken, setAdminToken, getThisToken, setThisToken } from '@/utils/auth'
const delta = 15

export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0,
      'avatar':getThisToken('adminAvatar'),
      'name':getThisToken('adminName')
    }
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    position: absolute;
     width: 100%!important;
  }
}
</style>
