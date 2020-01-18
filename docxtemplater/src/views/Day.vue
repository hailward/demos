<template>
  <div class="threeLevelMain">
    <!-- 底部按钮容器 -->
    <div class="botmBtnContainer">
      <el-button @click="exportWord" size="small" type="primary">导出word</el-button>
      <!-- <el-button @click="exportExcelClick" size="small" type="primary">导出excel</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      
    };
  },
  methods: {
    // 点击导出word
    exportWord: function() {
      let _this = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent("日通报报告.docx", function(error, content) {
        // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error;
        }
        
        // 创建一个JSZip实例，内容为模板的内容
        let zip = new JSZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new window.docxtemplater().loadZip(zip);
        // 设置模板变量的值
        let date = new Date();
        doc.setData({
          phase: '1',
          date: {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate(),
          },
          now: {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate(),
            hour: date.getHours(),
          },
        });
        
        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }
        
        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "报价单.docx");
      });
    }
  }
};
</script>
<style lang="scss">
* {
	margin: 0;
	padding: 0;
	font-size: 12px;
	font-family: "微软雅黑", "宋体";
	list-style: none;
	box-sizing: border-box;
}
// 清除浮动
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}

.clearfix {
  zoom: 1;
}
.quoteContainer {
  .quote_info {
    width: 800px;
    margin: 0 auto;
    .h3_title {
      float: left;
      width: 100%;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      margin-bottom: 30px;
    }
    .quote_itemBox {
      float: left;
      width: 100%;
      margin-bottom: 20px;
      .quote_item {
        float: left;
        width: 50%;
        display: flex;
        .quote_label {
          width: 100px;
          text-align: right;
          line-height: 32px;
        }
        .quote_p {
          flex: 1;
          line-height: 32px;
        }
      }
    }
  }
  .quote_table {
    padding: 0 20px;
    .table_domQuote {
      .quoteTable {
        font-size: 14px;
        padding-left: 30px;
        border-top: 1px solid #ebeef5;
        .quoteTable_sp1 {
          display: inline-block;
          line-height: 50px;
        }
      }
    }
  }
}
.reasonBox {
  padding: 0 20px 20px 20px;
  .title_checkReason {
    line-height: 50px;
  }
  .checkReasonMain {
    .p_box {
      border: 1px solid #ebeef5;
      padding: 10px 20px;
      .p_checkReason {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
// 底部按钮
.botmBtnContainer {
  text-align: center;
  padding: 20px;
}
</style>
