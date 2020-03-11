<template>
  <!-- 批量导入 -->
  <div>
    <!-- <div class="llcb-btn" style="position: relative" >批量导入</div> -->
    <button class="btn whiteBtn" @click="openSubmitFile">批量导入</button>
    <!-- 批量导入 -->
    <div class="dia-loading" v-show="diaLoading">
      <div class="dia-loading-p">导入时间较长，请耐心等待...</div>
    </div>
    <el-dialog :visible.sync="dialogBatch" title="批量导入" :show-close="false" width="690px">
      <div>
        <div class="dia-content">
          <div class="dia-clist">
            <div class="dia-citem clearfix">
              <div class="dia-citem-label">下载模板：</div>
              <div class="dia-citem-ib">
                <a class="dia-download-link" href="https://iot.gidomino.com/elevator/template/batch-import-template-property.xlsx" target="_blank">《电梯管理批量导入-模板.excel》</a>
              </div>
            </div>
            <div class="dia-citem clearfix" style="margin-top: 10px;">
              <div class="dia-citem-label">上传文件：</div>
              <div class="dia-citem-ib">
                <div class="dia-upload-icon">
                  <div class="dia-upload-icon-p1">点击上传文件</div>
                  <div class="dia-upload-icon-p2">请按模板填写</div>
                  <input id="liftInputFile" name="file" class="dia-upfile" @change="changeUpfile" type="file" value="">
                </div>
              </div>
            </div>
            <div class="dia-citem clearfix" style="margin-top: 20px;">
              <div class="dia-citem-label">已上传：</div>
              <div class="dia-citem-ib">
                <div class="dia-upload-list clearfix" v-if="upfile !== ''">
                  <div class="dia-upload-list-icon" :class="upFileForwardFlag == 'error' ? 'upFileForwardError' : ''"></div>
                  <div class="dia-upload-list-p">
                    <div class="dia-upload-list-p-name" :class="upFileForwardFlag == 'error' ? 'upFileForwardError' : ''">{{this.upfile.name}}</div>
                    <div class="dia-upload-list-p-error" v-if="upFileForwardFlag == 'error'">上传失败，请检查文件有效性后重新上传</div>
                  </div>
                  <div class="dia-upload-list-del" @click="deleteUpfileForward"></div>
                </div>
 
              </div>
            </div>
        
          </div>

        </div>

        <div class="dia-btn-con" style="margin-top: 30px">
          <input class="dia-btn dia-btn-cancel" type="button" value="取消" @click="dialogBatch = false">
          <input class="dia-btn dia-btn-submit" @click="submitFile" type="button" value="确认">
        </div>

      </div>

    </el-dialog>

    <!-- 导入结果 -->
    <el-dialog :visible.sync="dialogBatchResult" title="提示" :show-close="false" width="690px">
      <div>
        <div class="dia-content">
          <div class="batch-result">
            <div class="batch-result-item">
              <div class="batch-result-item-title success">导入成功</div>
              <div class="batch-result-item-p">
                成功导入<span class="batch-result-p-info">{{batchRes.successCnt}}部</span>电梯！其中，存在<span class="batch-result-p-error">{{batchRes.paramIncompleteCnt}}部</span>电梯需要补充材料；存在<span class="batch-result-p-error">{{batchRes.otherBrandCnt}}部</span>电梯品牌未匹配，暂定电梯品牌为「其他」
              </div>
            </div>
            <div class="batch-result-item" style="margin-top: 36px;">
              <div class="batch-result-item-title">导入失败</div>
              <div class="batch-result-item-p">
                导入失败{{batchRes.failCnt}}部电梯，可下载错误日志，查看失败原因。
              </div>
            </div>
          </div>
        </div>

        <div class="diaN-btn-con clearfix" style="margin-top: 30px;">
          <div class="diaN-btn diaN-btn-cancel" @click="dialogBatchResult=false">好的</div>
          <div class="diaN-btn diaN-btn-red" @click="downloadError">下载错误日志</div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import pcas from '../utils/citySelector/pcas-code.json'
import api from './../api'
export default {
  // props: ['selectCity'],
  data() {
    return {
      // 批量录入电梯
      dialogBatch: false,
      upfile: '',
      upFileForwardFlag: '',
      diaLoading: false,
      batchRes: {},
      // 录入结果
      dialogBatchResult: false,
    }
  },
  mounted() {

  },
  methods: {
    // 打开批量录入弹窗
    openSubmitFile() {
      // reset TODO
      this.diaLoading = false
      this.upfile = ''
      this.upFileForwardFlag = ''
      this.dialogBatch = true
      setTimeout(() => {
        let fileBtn = document.getElementById('liftInputFile')
        fileBtn.value = ''
      }, 200)
    },

    // 删除前端上传文件
    deleteUpfileForward() {
      this.upfile = ''
      this.upFileForwardFlag = ''
      setTimeout(() => {
        let fileBtn = document.getElementById('liftInputFile')
        fileBtn.value = ''
      }, 200)
    },

    // 上传文件变化
    changeUpfile() {
      let fileBtn = document.getElementById('liftInputFile')
      console.log('监听', fileBtn.files[0])
      let name = fileBtn.files[0].name
      var suffix = name.substr(name.lastIndexOf("."));
      if(suffix == ".xls" || suffix == ".xlsx" ){
        this.upfile = fileBtn.files[0]
        this.upFileForwardFlag = 'success'
      } else {
        this.upfile = fileBtn.files[0]
        this.upFileForwardFlag = 'error'
      }
    },

    // 提交批量录入
    submitFile() {
      // 如果不是excel，则不允许上传
      if (this.upFileForwardFlag === '' || this.upFileForwardFlag == 'error') {
        return this.$message.error('请上传Excel文件')
      }
      let fileBtn = document.getElementById('liftInputFile')
      let formData = new FormData();
      console.log('uploadFile', fileBtn.files[0])
      formData.append('file', fileBtn.files[0])
      // console.log('formData', formData)

      // 请求
      this.diaLoading = true
      api.log.batchAddLift(formData).then(res => {
        console.log('录入', res)
        this.diaLoading = false
        this.batchRes = res.data.data

        // 展示出结果框
        this.dialogBatch = false
        this.dialogBatchResult = true

      }).catch(error => {
        // 超时
        this.diaLoading = false

      })
    },

    // 下载错误日志
    downloadError() {
      if (this.batchRes.failCnt !== 0) {
        let url = `${http.localURL}/arctic/download/file?fileName=` + this.batchRes.fileName
        window.open(url);
      } else {
        return this.$message.info('无错误日志')
      }

    },

  },
 
}
</script>

<style lang="stylus" scoped>

</style>
