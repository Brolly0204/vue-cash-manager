<template>
  <div class="fillContainer">
    <div>
      <el-form
        :inline="true"
        ref="add_date"
      >
        <el-form-item label="按照时间筛选:">
          <el-date-picker
            v-model="search_date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="handleSearch()"
          >筛选</el-button>
        </el-form-item>
        <el-form-item
          v-if="isManager"
          class="btnRight"
        >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="handleAdd()"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      max-height="450"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        align="center"
        sortable
      >
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="收支类型"
        align='center'
      >
      </el-table-column>
      <el-table-column
        prop="describe"
        label="收支描述"
        align='center'
      >
      </el-table-column>
      <el-table-column
        prop="income"
        label="收入"
        align='center'
      >
        <template slot-scope="scope">
          <span style="color:#00d053">+ {{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expend"
        label="支出"
        align='center'
      >
        <template slot-scope="scope">
          <span style="color:#f56767">- {{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cash"
        label="账户现金"
        align='center'
        width="170"
      >
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align='center'
        width="220"
      >
      </el-table-column>
      <el-table-column
        v-if="isManager"
        label="操作"
        width="160"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <Dialog
      :dialog="dialog"
      @update="getProfile"
      :formData="formData"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from '../components/Dialog'
/* eslint-disable */
export default {
  name: 'FoundList',
  components: {
    Dialog
  },
  data() {
    return {
      search_date: '',
      tableData: [],
      allTableData: [],
      filterTableData: [],
      page_index: 1,
      page_size: 5,
      dialog: {
        show: false,
        title: '',
        option: 'edit'
      },
      formData: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  computed: {
    isManager() {
      return this.$store.getters.user.identity === 'manager'
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    handleSearch() {
      const [startTime, endTime] = this.search_date
      if (!startTime || !endTime) {
        this.$message({
          type: 'warning',
          message: '请选择时间区间'
        })
        this.getProfile()
        return
      }
      const sTime = startTime.getTime()
      const eTime = endTime.getTime()
      this.allTableData = this.filterTableData.filter((item) => {
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= sTime && time <= eTime
      })
      this.setPaginations()
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1
      this.paginations.page_size = page_size

      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size
      })
    },
    handleCurrentChange(page_index) {
      this.paginations.page_index = page_index
      const startIndex = this.paginations.page_size * (page_index - 1)
      const endIndex = this.paginations.page_size * page_index
      this.tableData = this.allTableData.slice(startIndex, endIndex)
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: '添加资金信息',
        option: 'add'
      }
      this.formData = {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      }
    },
    getProfile() {
      this.$axios.get('/profiles').then((res) => {
        this.allTableData = res.data
        this.filterTableData = res.data
        this.setPaginations()
      })
    },
    setPaginations() {
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = this.page_index
      this.paginations.page_size = this.page_size

      this.tableData = this.allTableData.filter((item, index) => index < this.page_size)
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: '修改资金信息',
        option: 'edit'
      }
      this.formData = {
        ...row,
        id: row._id
      }
    },
    handleDelete(index, row) {
      this.$axios.delete(`/profiles/delete/${row._id}`).then((res) => {
        this.$message(res.data.msg)
        this.getProfile()
      })
    }
  }
}
</script>

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
