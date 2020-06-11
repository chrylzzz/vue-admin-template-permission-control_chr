<template>
  <div class="app-container">
    <div class="edit-div">
      <el-row>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-row>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        fit
        style="width: 100%"
        @selection-change="handleSelectionChange"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed prop="releaseDate" label="日期" width="150" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="产品名称" width="120" align="center"></el-table-column>
        <el-table-column prop="goodsColor" label="颜色" width="120" align="center"></el-table-column>
        <el-table-column prop="goodsPrice" label="价格" width="120" align="center"></el-table-column>
        <el-table-column prop="goodsId" label="编号" width="240" align="center"></el-table-column>
        <el-table-column prop="#" label="操作" width="200" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">Edit</el-button>
            <el-button
              v-if="row.status!='deleted'"
              size="mini"
              type="danger"
              @click="handleModifyStatus(row,'deleted')"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { goodsList } from "@/api/goods";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  components: { Pagination }, //引入组件
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentRow: null,
      //分页
      total: 0,
      listQuery: {
        //作为分页的初始化参数
        page: 1,
        limit: 10,
        //作为条件查询的参数
        title: undefined,
        type: undefined
        // sort: "+id"
      }
    };
  },
  created() {
    this.getList(); //table数据初始化就加载
  },
  methods: {
    //选择方框触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //选择当前行触发
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getList() {
      goodsList(this.listQuery).then(response => {
        this.tableData = response.data.data;
        this.total = response.data.count;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
