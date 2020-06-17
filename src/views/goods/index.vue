<template>
  <div class="dashboard-editor-container">
    <!-- Form -->
    <el-button type="primary" @click="dialogFormVisible = true">文件列表上传</el-button>
    <el-dialog title="商品文件" :visible.sync="dialogFormVisible">
      <el-upload
        name="uploadFileList"
        class="upload-demo"
        ref="upload"
        action="/goods/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :file-list="uploadFileList"
        :auto-upload="false"
        multiple
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
      </el-upload>
    </el-dialog>

    <!--图片放大-->
    <el-button type="primary" @click="dialogImgVisible = true">打开IMG放大</el-button>
    <el-dialog title="商品图片" :visible.sync="dialogImgVisible" width="150px">
      <el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList"></el-image>
    </el-dialog>
    <!-- 头像上传 : 单独上传,自动上传 -->
    <el-button type="primary" @click="dialogAvatarVisible = true">头像上传</el-button>
    <el-dialog title="商品文件" :visible.sync="dialogAvatarVisible">
      <el-upload
        name="uploadFile"
        action="/goods/uploadOnly"
        list-type="picture-card"
        :file-list="uploadFile"
        auto-upload
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <!-- :src=file.url -->
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { upload } from "@/api/goods";
export default {
  data() {
    return {
      dialogFormVisible: false, //文件列表
      dialogImgVisible: false, //大图展示
      dialogAvatarVisible: false, //头像
      uploadFileList: [], //列表上传
      uploadFile: [], //单个上传
      //图片
      url: "http://localhost/goods/showimg",
      srcList: ["http://localhost/goods/showimg"],
      //头像展示
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    //上传文件列表
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
      this.uploadFileList = fileList;
      // console.log(file);
      // console.log(fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //上传前规定
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //头像展示
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(this.dialogImageUrl);
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>