<template>
  <div class="dashboard-container">
    <!--<component :is="currentRole"></component>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import store from '@/store'

export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
//    ...mapGetters([
//      'roles'
//    ])
  },
  created() {
//    if (!this.roles.includes('admin')) {
//      this.currentRole = 'editorDashboard'
//    }
    this.jump()
  },
  methods: {
    jump(){
      var thisrouters = store.getters.addRouters
      var jumprouter
      for(var i in thisrouters){
        if(thisrouters[i].hasOwnProperty('children') && thisrouters[i].children.length > 0){
            for(var j in thisrouters[i].children){
                if(thisrouters[i].children[j].id != "#"){
                  jumprouter = thisrouters[i].path + '/' + thisrouters[i].children[j].path
                  this.$router.push({ path: jumprouter })
                  return
                }
            }
        }
      }

    }
  }
}
</script>
