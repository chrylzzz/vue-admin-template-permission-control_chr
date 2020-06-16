<template>
  <div class="app-container">
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
        <el-table-column fixed prop="releaseDate" label="日期" width="120" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="产品名称" width="100" align="center"></el-table-column>
        <el-table-column prop="goodsType" label="品牌" width="100" align="center"></el-table-column>
        <el-table-column prop="goodsColor" label="颜色" width="100" align="center"></el-table-column>
        <el-table-column prop="goodsPrice" label="价格" width="100" align="center"></el-table-column>
        <el-table-column prop="goodsStatus" label="是否启用" width="100" align="center">
          <!-- 判断使用 标签显示 -->
          <template slot-scope="{row}">
            <el-tag :type="row.goodsStatus | statusFilter" disable-transitions>{{row.goodsStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="星级" width="100px">
          <!--  直接用disable禁用可编辑 -->
          <template slot-scope="{row}">
            <el-rate
              v-model="row.goodsImp"
              icon-class="star"
              :max="3"
              style="margin-top:8px;"
              disabled
            />
          </template>
        </el-table-column>
        <!--------------------------------------------------------------------------------------------->
        <el-table-column min-width="300px" label="描述" align="center">
          <template slot-scope="{row}">
            <!-- v-if="row.edit"  这里表示 编辑该行 ,与@click=row.edit  判断是否相等,等于则显示input输入框和button按钮 -->
            <template v-if="row.edit">
              <el-input v-model="row.goodsDesc" class="edit-input" size="small" />
              <!-- 显示取消 放弃行内编辑 -->
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >取消</el-button>
            </template>
            <span v-else>{{ row.goodsDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="#" label="操作" width="200" align="center">
          <template slot-scope="{row}">
            <!-- 这里点击编辑按钮 之后,就显示确认按钮 -->
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >确认</el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.edit=!row.edit"
            >编辑</el-button>
          </template>
        </el-table-column>
        <!--------------------------------------------------------------------------------------------->
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
import waves from "@/directive/waves"; // waves directive,导入指令
import { goodsList, updateData } from "@/api/goods"; //暴露 js api
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import service from "../../utils/request";

export default {
  components: { Pagination }, //引入组件
  directives: { waves }, // 引入指令
  // 自定义过滤器 ,用来判断 标签的不同状态,可以定义多个状态
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        shelves: "danger"
        // draft: 'info',
        // deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      vvv: 3,
      tableData: [], //表单数据
      multipleSelection: [],
      currentRow: null,
      //分页
      total: 0,
      //作为分页的初始化参数
      listQuery: {
        page: 1, //当前页
        limit: 10 //每页记录数
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
    async getList() {
      this.listLoading = true;
      goodsList(this.listQuery).then(response => {
        this.tableData = response.data.data; //表格数据
        this.total = response.data.count; //条数
        const items = this.tableData; // 表格数据,遍历进行edit
        this.list = items.map(v => {
          // ?????????????????????????
          this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
          // originalTitle 为 临时的对象的参数,作为编辑之前的内容进行存储
          v.originalTitle = v.goodsDesc; //  will be used when user click the cancel botton
          return v;
        });
        this.listLoading = false;
      });
    },
    //查询后将起始页置为1,并且把查询条件传递到后台
    handleFilter() {
      this.listQuery.page = 1;
      //这里点击input框里的x来清空数据时,没有删除干净,会留下''传到后台,记得前端处理或者后端处理一下
      this.getList();
    },
    cancelEdit(row) {
      row.goodsDesc = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "已恢复到原来的内容 ~ ",
        type: "warning"
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.goodsDesc;
      updateData(row).then(res => {
        this.getList();
      });
      this.$message({
        message: "编辑成功 ~ ",
        type: "success"
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
.table-operator {
  margin-bottom: 8px;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
