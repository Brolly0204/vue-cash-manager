<template>
  <div class="index">
    <HeadNav />
    <el-row class="index-container" type="flex" justify="center">
      <el-col :span="4">
        <SiderNav />
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav'
import SiderNav from '../components/SiderNav'

export default {
  name: 'Index',
  components: {
    HeadNav,
    SiderNav
  }
}
</script>

<style scoped>
  .index {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .index-container {
    height: 100%;
  }
</style>
