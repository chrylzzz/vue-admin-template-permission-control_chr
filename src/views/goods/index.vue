<template>
  <div>
    <!-- Form -->
    <el-button type="primary" @click="dialogFormVisible = true">打开上传 Dialog</el-button>

    <el-dialog title="商品文件" :visible.sync="dialogFormVisible">
      <el-upload
        name="fileList"
        class="upload-demo"
        ref="upload"
        action="/goods/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :multiple="true"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>

    <!--图片-->
    <el-button type="primary" @click="dialogImgVisible = true">打开IMG</el-button>
    <el-dialog title="商品图片" :visible.sync="dialogImgVisible">
        <el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList"></el-image>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogImgVisible:false,
      fileList: [],
      //图片
      url: 'http://localhost/goods/showimg',
        srcList: [
          'http://localhost/goods/showimg',
        ]
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>