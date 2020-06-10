<template>
  <div class="dashboard-editor-container" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
//theme:macarons vintage 
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import service from "../../utils/request";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    }
  },
  data() {
    return {
      chart: null,
      legendData: [],
      seriesData: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();//该出是什么
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    this.showpie(); //初始化pie
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          //   data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"]
          data: this.legendData
        },
        series: [
          {
            name: "WEEKLY WRITE ARTICLES",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            // data: [
            //   { value: 320, name: "Industries" },
            //   { value: 240, name: "Technology" },
            //   { value: 149, name: "Forex" },
            //   { value: 100, name: "Gold" },
            //   { value: 59, name: "Forecasts" }
            // ]
            data: this.seriesData,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    },
    //
    showpie() {
      service
        .get("goods/pieshow")
        .then(res => {
          this.legendData = res.data.legend;
          this.seriesData = res.data.series;
          //重新展示pie
          this.initChart();
        })
        .catch(() => {
          this.loading = false;
        });
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
</style>