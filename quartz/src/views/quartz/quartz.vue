<template>
  <div>
    <div style="margin-bottom:10px">
      <el-button
        @click="addData"
        size="mini"
        type="primary"
        v-hasPermission="'gdzcMgr_add'"
      >
        <svg-icon icon-class="svg-btn-add" /> 新增入库
      </el-button>
    </div>

    <div>
      <el-table
        :data="tableData"
        border
        tooltip-effect='light'
        style="width: 100%; margin-top: 10px"
        v-loading="tableLoading"
      >
        <el-table-column
          prop="rwmc"
          label="任务名称"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="KSSJ"
          label="任务分组"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="JSSJ"
          label="Cron表达式"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="PDBM"
          label="执行状态"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="PDR"
          label="备注"
          width="120"
        ></el-table-column>

        <el-table-column
          label="操作"
          width="120"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-hasPermission="'pdgl_checkZC'"
              :disabled="scope.row.ISSJ === '0'"
              @click="checkPDZC(scope.$index, scope.row)"
            >
              查看盘点资产
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination
        v-if="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15,20 ]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {}
  },
  methods: {
    // 初始化表格数据
    getTableData(flag, validateFLag) {
      if (!validateFLag) {
        this.$refs['term'].validate(vaild => {
          if (vaild) {
            if (flag) {
              this.currentPage = 1
            }
            this.getTableDataFlag()
          }
        })
      } else {
        this.getTableDataFlag()
      }
    }
  }
}
</script>

<style>
</style>
