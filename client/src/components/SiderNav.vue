<template>
  <el-row
    class="menu-page"
    type="flex"
    justify="center"
  >
    <el-col>
      <el-menu
        class="menu-list"
        router
        background-color="#324057"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu
          v-for="item in items"
          :key="item.path"
          :index="item.path"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :index="child.path"
            :key="child.path"
          >
            {{child.name}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SideNav',
  data() {
    return {
      items: [
        {
          icon: 'el-icon-s-cooperation',
          name: '资金管理',
          path: 'fund',
          children: [
            {
              path: 'fundlist',
              name: '资金流水'
            }
          ]
        },
        {
          icon: 'el-icon-s-custom',
          name: '信息管理',
          path: 'info',
          children: [
            {
              path: 'profile',
              name: '个人信息'
            }
          ]
        }
      ]
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.menu-page
  height 100%

  .menu-list
    width 100%
    height 100%
    overflow hidden
    border none
</style>
