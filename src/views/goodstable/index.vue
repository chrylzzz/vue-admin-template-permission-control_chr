<template>
  <div class="app-container">
    <div class="edit-div">
      <el-row>
        <!-- <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>-->
        <!-- 条件查询区域 -->
        <div class="filter-container">
          <el-input
            v-model="listQuery.goodsName"
            placeholder="商品名称"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-select
            v-model="listQuery.goodsColor"
            placeholder="颜色"
            clearable
            style="width: 90px"
            class="filter-item"
          >
            <!-- 写死下拉菜单 -->
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <!-- 查询返回的下拉菜单 -->
          <el-select
            v-model="listQuery.goodsType"
            placeholder="品牌"
            clearable
            class="filter-item"
            style="width: 130px"
          >
            <!--  label:展示内容 -->
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name+'('+item.key+')'"
              :value="item.key"
            />
          </el-select>
          <!-- <el-select
            v-model="listQuery.sort"
            style="width: 140px"
            class="filter-item"
            @change="handleFilter"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>-->
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate"
          >添加</el-button>
        </div>
        <!-- 查询 end -->
        <!-- 添加 
        ref     为form的唯一标识
        :model  为表单传递的数据,数据绑定,用来传递给客户端的
        :rules  为表单的验证规则
        -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-position="left"
            label-width="70px"
            style="width: 400px; margin-left:50px;"
          >
            <el-form-item label="品牌类型" prop="goodsType">
              <el-select v-model="temp.goodsType" class="filter-item" placeholder="请选择品牌">
                <el-option
                  v-for="item in calendarTypeOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="产品颜色" prop="goodsColor">
              <el-select v-model="temp.goodsColor" class="filter-item" placeholder="请选择颜色">
                <el-option
                  v-for="item in importanceOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="生产时间" prop="releaseDate">
              <!--
                type="datetime"
                type="date"
              -->
              <el-date-picker v-model="temp.releaseDate" type="date" placeholder="请选择上线时间" />
            </el-form-item>
            <el-form-item label="产品名称" prop="goodsName">
              <el-input v-model="temp.goodsName" />
            </el-form-item>
            <el-form-item label="产品价格" prop="goodsPrice">
              <el-input-number v-model="temp.goodsPrice" :precision="2" :step="100"></el-input-number>
            </el-form-item>
            <el-form-item label="产品状态">
              <el-select v-model="temp.goodsStatus" class="filter-item" placeholder="Please select">
                <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="产品星级">
              <el-rate
                v-model="temp.goodsImp"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                :max="3"
                style="margin-top:8px;"
              />
            </el-form-item>
            <el-form-item label="产品简介">
              <!--
                autosize: ????????
              -->
              <el-input
                v-model="temp.goodsDesc"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
                placeholder="Please input"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">提交</el-button>
          </div>
        </el-dialog>
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
        <el-table-column prop="goodsStatus" label="是否启用" width="120" align="center"></el-table-column>
        <el-table-column prop="goodsImp" label="星级" width="120" align="center"></el-table-column>
        <!-- 这里不是用 123代表的星级 -->
        <!-- <el-table-column label="星级" width="80px">
          <template slot-scope="{row}">
            <svg-icon
              v-for="n in + row.goodsImp"
              :key="n"
              icon-class="star"
              class="meta-item__icon"
            />
          </template>
        </el-table-column> -->

        <el-table-column prop="goodsId" label="编号" width="240" align="center"></el-table-column>
        <el-table-column prop="#" label="操作" width="200" align="center">
          <!-- 这里暴露 row -->
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
            <el-button
              v-if="row.status!='deleted'"
              size="mini"
              type="danger"
              @click="handleModifyStatus(row,'deleted')"
            >删除</el-button>
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
import waves from "@/directive/waves"; // waves directive,导入指令
import {
  goodsList,
  queryConditions,
  createData,
  updateData
} from "@/api/goods"; //暴露 js api
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

//如果在这里 定义了数据,那么在下方只需要 calendarTypeOptions 即可, 而没在这里定义的需要 calendarTypeOptions:[],注明数据类型
// const calendarTypeOptions = [
//   { key: "CN", display_name: "China" },
//   { key: "US", display_name: "USA" },
//   { key: "JP", display_name: "Japan" },
//   { key: "EU", display_name: "Eurozone" }
// ];

export default {
  components: { Pagination }, //引入组件
  directives: { waves }, // 引入指令
  data() {
    return {
      tableData: [], //表单数据
      multipleSelection: [],
      currentRow: null,
      //分页
      total: 0,
      //作为分页的初始化参数
      listQuery: {
        page: 1, //当前页
        limit: 10, //每页记录数
        //条件查询的参数
        goodsName: undefined,
        goodsColor: undefined,
        goodsType: undefined
        // sort: "+id" //排序
      },
      //手机颜色,直接使用v-for
      importanceOptions: ["blue", "white", "yellow", "black", "red"],
      //手机品牌
      calendarTypeOptions: [],
      ////////////添加
      dialogFormVisible: false, //true表单显示和隐藏
      dialogStatus: "", //表单create或update
      textMap: {
        //表单显示名称:是执行create还是update
        update: "编辑",
        create: "添加"
      },
      statusOptions: ["published", "shelves"], //产品状态
      // switchStatus: "",//开关的产品状态
      //表单验证规则
      rules: {
        goodsType: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        releaseDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        goodsName: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      //表单内容,用来操作create和update
      temp: {
        goodsId: undefined,
        importance: 1,
        goodsDesc: "",
        goodsName: "", //名称
        goodsImp: "", //星级
        releaseDate: new Date(), //日期
        goodsColor: "", //颜色
        goodsType: "", //品牌
        goodsStatus: "published", //状态
        goodsPrice: ""
      }
    };
  },
  created() {
    this.queryConditions(); //初始化加载 查询条件列表
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
        this.tableData = response.data.data; //表格数据
        this.total = response.data.count; //条数
      });
    },
    //查询后将起始页置为1,并且把查询条件传递到后台
    handleFilter() {
      this.listQuery.page = 1;
      //这里点击input框里的x来清空数据时,没有删除干净,会留下''传到后台,记得前端处理或者后端处理一下
      this.getList();
    },
    queryConditions() {
      queryConditions().then(res => {
        // debugger
        this.calendarTypeOptions = res.data;
      });
    },
    //表单相关
    handleCreate() {
      //显示创建表单
      //创建
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    resetTemp() {
      //重置表单项
      this.temp = {
        goodsId: undefined,
        goodsImp: 1,
        releaseDate: new Date(),
        goodsName: "",
        goodsColor: "",
        goodsStatus: "published",
        goodsType: "",
        goodsDesc: "",
        goodsPrice: ""
      };
    },
    createData() {
      //创建
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          console.log(this.temp);
          createData(this.temp).then(res => {
            if (res.data == "OK") {
              //这里可以判断返回信息进行提示操作
            }
            // this.total = this.tableData.unshift(this.temp); //向数组的开头添加一个或更多元素，并返回新的长度,这种直接返回的方式未成功,还是手动重新查询一下列表把
            this.tableData.unshift(this.temp); //向数组的开头添加一个或更多元素，并返回新的长度
            this.dialogFormVisible = false;
            this.$notify({
              title: "提示 : Success",
              message: "添加成功 ~ ",
              type: "success",
              duration: 2000
            });
            this.getList(); //刷新数据表
          });
        }
      });
    },
    handleUpdate(row) {
      //编辑窗口的显示
      this.temp = Object.assign({}, row); // copy obj , 将这一行复制到 temp上
      this.temp.releaseDate = new Date(this.temp.releaseDate);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      //修改
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          // tempData.releaseDate = +new Date(tempData.releaseDate); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateData(tempData).then(res => {
            debugger;
            // ?????????
            // for (const v of this.list) {
            //   if (v.id === this.temp.id) {
            //     const index = this.list.indexOf(v);
            //     this.list.splice(index, 1, this.temp);
            //     break;
            //   }
            // }
            if (res.data == "OK") {
              //这里可以判断返回信息进行提示操作
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: "提示",
              message: "修改成功 ~ ",
              type: "success",
              duration: 2000
            });
            this.getList(); //刷新数据表
          });
        }
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
