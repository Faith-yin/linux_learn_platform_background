<!--
 * @Author: 殷鹏飞
 * @Date: 2020-03-14 11:07:13
 * @Description: 学习资源使用统计 部分
-->
<template>
  <div id="list-wrapper" v-show="loadFinishMark">
    <!-- 上方卡片 -->
    <div class="card-box">
      <el-col :span="4" v-for="(item,index) in cardList" :key="index">
        <el-card shadow="hover">{{item.text}}：
          <span class="item-num">{{item.number}}</span>
        </el-card>
      </el-col>
    </div>
    <!-- 中间 -->
    <div class="container">
      <!-- 折线图容器 -->
      <div id="box" style="width: 400px;height: 400px;"></div>
      <div>
        <div>
          <el-radio-group v-model="selectValue" @change="changeRadio">
            <el-radio :label="1">文章阅读量</el-radio>
            <el-radio :label="2">课程视频观看量</el-radio>
            <el-radio :label="3">Issues浏览量</el-radio>
          </el-radio-group>
        </div>
        <!-- 柱状图容器 -->
        <div id="article-box" style="width: 400px;height: 400px;"></div>
      </div>
      <!-- 折线图容器 -->
      <div>
        <div>
          <el-radio-group v-model="selectValue2" @change="changeRadio2">
            <el-radio :label="1">7日文章发布量</el-radio>
            <el-radio :label="2">7日课程视频发布量</el-radio>
            <el-radio :label="3">7日Issues发布量</el-radio>
          </el-radio-group>
        </div>
        <!-- 柱状图容器 -->
        <div id="three-box" style="width: 400px;height: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import publicClass from '@/mixins/public_class.js'
import publicInfo from '@/relyClass/public_info.js'
import moment from 'moment'
import { Message, Loading  } from 'element-ui'

export default {
  mixins: [publicClass, publicInfo],
  data() {
    return {
      loadFinishMark: false, //加载完成标志
      loadingInstance: null, // loading
      cardList: [], //卡片列表
      webNumList: [],   // 网站访问量列表
      selectValue: 1,   // 当前柱状图的选项
      selectShowList: [],  // 当前柱状图要展示的数据列表
      articelList: [], // 文章按日期降序排列
      videoList: [],    // video按日期降序排列
      issuesList: [], // issues文章按日期降序排列
      selectValue2: 1, // 当前折线图的选项
      publicNumber: [], // 7日访问量数组
      selectShowList2: [],  // 当前折线图要展示的数据列表
      publishArticleNumber: [], //近七日访问量 article
      publishVideoNumber: [], //近七日访问量 video
      publishIssuesNumber: [], //近七日访问量 issues
    }
  },
  methods: {
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-02 21:33:40
     * @Description: 网站访问量 折线图 初始化
     */
    createPolylineChart() {
      //初始化ehcharts实例
      let myChart = this.$echarts.init(document.getElementById("box"));
      //指定图表的配置项和数据
      let option = {
        //标题
        title: {
          text: "平台近7日访问量"
        },
        //工具箱
        toolbox: {
          show: true
        },
        //图例-每一条数据的名字叫销量
        legend: {
          data: ["访问量"]
        },
        //x轴
        xAxis: {
          name: '日期',
          data: [
            moment(this.webNumList[6].date).format('MM/DD'), 
            moment(this.webNumList[5].date).format('MM/DD'),
            moment(this.webNumList[4].date).format('MM/DD'),
            moment(this.webNumList[3].date).format('MM/DD'),
            moment(this.webNumList[2].date).format('MM/DD'),
            moment(this.webNumList[1].date).format('MM/DD'),
            moment(this.webNumList[0].date).format('MM/DD'),
          ],
          axisLabel: {
            interval: 0,
            // rotate: 45,
          }
        },
        //y轴没有显式设置，根据值自动生成y轴
        yAxis: {},
        //数据-data是最终要显示的数据
        series: [
          {
            name: "访问量",
            type: "line",
            data: [
              this.webNumList[6].viewCount, 
              this.webNumList[5].viewCount,  
              this.webNumList[4].viewCount,  
              this.webNumList[3].viewCount, 
              this.webNumList[2].viewCount, 
              this.webNumList[1].viewCount, 
              this.webNumList[0].viewCount, 
            ],
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            },
          }
        ],
        tooltip: {
          //提示框，鼠标悬浮交互时的信息提示
          trigger: "item", //触发类型，默认数据触发，可选值有item和axis
          formatter: "{a} <br/>{b} : {c}", //鼠标指上时显示的数据  a（系列名称），b（类目值），c（数值）, d（占总体的百分比）
          backgroundColor: "rgba(0,0,0,0.7)" //提示背景颜色，默认为透明度为0.7的黑色
        }
      }
      //使用刚刚指定的配置项和数据项显示图表
      myChart.setOption(option)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-03 15:14:28
     * @Description: radio 发生变化时
     */
    changeRadio() {
      this.selectValue == 1 && (this.selectShowList = this.articelList)
      this.selectValue == 2 && (this.selectShowList = this.videoList)
      this.selectValue == 3 && (this.selectShowList = this.issuesList)
      this.createArticleHistogramChart()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-03 14:43:51
     * @Description: article 柱状图
     */
    createArticleHistogramChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("article-box"));
      // 指定图表的配置项和数据
      var option = {
        // 标题
        title: {
          // text: "文章阅读量排行",
          left: "left",
        },
        // 工具箱
        toolbox: {
          show: true,
        },
        tooltip: {
          trigger: "axis"
        },
        // 图例
        legend: {
          data: ["阅读量"]
        },
        // x轴
        xAxis: {
          name: '标题',
          data: [
            this.selectShowList[0].title, 
            this.selectShowList[1].title, 
            this.selectShowList[2].title, 
            this.selectShowList[3].title, 
            this.selectShowList[4].title,
          ],
          axisLabel: {
            interval: 0,
            rotate: 45,
          }
        },
        yAxis: {},
        // 数据
        series: [
          {
            name: "浏览量",
            type: "bar",
            data: [
              this.selectShowList[0].viewCount, 
              this.selectShowList[1].viewCount, 
              this.selectShowList[2].viewCount, 
              this.selectShowList[3].viewCount, 
              this.selectShowList[4].viewCount,
            ],
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-03 16:02:57
     * @Description: radio2 发生变化时
     */
    changeRadio2() {
      this.selectValue2 == 1 && (this.selectShowList2 = this.publicNumber.article)
      this.selectValue2 == 2 && (this.selectShowList2 = this.publicNumber.video)
      this.selectValue2 == 3 && (this.selectShowList2 = this.publicNumber.issues)
      this.createPolylineChart2()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-03 16:07:13
     * @Description: 发布量 折线图
     */
    createPolylineChart2() {
      //初始化ehcharts实例
      let myChart = this.$echarts.init(document.getElementById("three-box"));
      //指定图表的配置项和数据
      let option = {
        //标题
        title: {
          // text: "生鲜销量统计"
        },
        //工具箱
        toolbox: {
          show: true
        },
        //图例-每一条数据的名字叫销量
        legend: {
          data: ["销量"]
        },
        //x轴
        xAxis: {
          data: [
            moment(this.selectShowList2[6].date).format('MM/DD'),
            moment(this.selectShowList2[5].date).format('MM/DD'),
            moment(this.selectShowList2[4].date).format('MM/DD'),
            moment(this.selectShowList2[3].date).format('MM/DD'),
            moment(this.selectShowList2[2].date).format('MM/DD'),
            moment(this.selectShowList2[1].date).format('MM/DD'),
            moment(this.selectShowList2[0].date).format('MM/DD'),
          ],
        },
        //y轴没有显式设置，根据值自动生成y轴
        yAxis: {},
        //数据-data是最终要显示的数据
        series: [
          {
            name: "发布量",
            type: "line",
            data: [
              this.selectShowList2[6].publishCount, 
              this.selectShowList2[5].publishCount, 
              this.selectShowList2[4].publishCount, 
              this.selectShowList2[3].publishCount, 
              this.selectShowList2[2].publishCount,
              this.selectShowList2[1].publishCount,
              this.selectShowList2[0].publishCount,
            ],
          }
        ],
        tooltip: {
          //提示框，鼠标悬浮交互时的信息提示
          trigger: "item", //触发类型，默认数据触发，可选值有item和axis
          formatter: "{a} <br/>{b} : {c}", //鼠标指上时显示的数据  a（系列名称），b（类目值），c（数值）, d（占总体的百分比）
          backgroundColor: "rgba(0,0,0,0.7)" //提示背景颜色，默认为透明度为0.7的黑色
        }
      };
      //使用刚刚指定的配置项和数据项显示图表
      myChart.setOption(option);
    },








    /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-03 12:52:40
     * @Description: 获取各个表总量, 网站访问量信息, 获取文章，video，issues列表信息 近七日访问量
     */
    async fetchTotal() {
      let {data} = await this.findTotal()
      this.cardList = data
    },
    async fetchWebNum() {
      let {data} = await this.showAllWebNum()
      this.webNumList = data
    },
    async fetchArticleList() {
      let {data} = await this.showArticleOrderByView()
      this.articelList = data
    },
    async fetchVideoList() {
      let {data} = await this.showVideoOrderByView()
      this.videoList = data
    },
    async fetchIssuesList() {
      let {data} = await this.showIssuesOrderByView()
      this.issuesList = data
    },
    async fetchPublishList() {
      let {data} = await this.showPublish()
      this.publicNumber = data
      
    },

    /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-03 14:29:14
     * @Description: 获取页面信息
     */
    async fetchList() {
      await this.fetchTotal()
      await this.fetchWebNum()
      await this.fetchArticleList()
      await this.fetchVideoList()
      await this.fetchIssuesList()
      await this.fetchPublishList()
    },
  },
  async mounted() {
    let options = {
      spinner: 'el-icon-loading',
      background: 'rgba(0,0,0,0.7)',
    }
    // 打开loading
    this.loadingInstance = Loading.service(options)

    // 数据请求
    await this.fetchList()
    // 初始化显示的数据
    this.selectShowList = this.articelList
    this.selectShowList2 = this.publicNumber.article
    // 网站访问量 折线图 初始化
    this.createPolylineChart()
    // 阅读量 柱状图 初始化
    this.createArticleHistogramChart()
    // 发布量 折线图 初始化
    this.createPolylineChart2()

    // 关闭loading,并打开加载完成开关
    this.loadFinishMark = true
    this.loadingInstance.close();
  },
  beforeDestroy() {
    // 关闭loading
    // this.loadingInstance.close();
  },
}
</script>

<style lang="scss">
#list-wrapper {
  // 标题部分
  .title-wrapper {
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    text-align: center;
  }

  // 搜索部分
  .search-wrapper {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .input-with-select {
      width: 70%;
      .el-button:hover {
        color: #409EFF;
      }
    }
  }

  .card-box {
    display: flex;
    justify-content: space-around;
    // 卡片
    .el-col.el-col-4 {
      .item-num {
        font-size: 25px;
        color: #ff6700;
      }
    }
  }

  .container {
    padding-top: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    #box {

    }
  }
}
</style>