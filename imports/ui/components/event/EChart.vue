<template lang="pug">
  #echart.pl-12
</template>
<script>
import echarts from "echarts";

export default {
  props: ["stats"],
  mounted() {
    setTimeout(this.buildChart, 200);
  },
  updated() {
    setTimeout(this.buildChart, 200);
  },
  methods: {
    buildChart() {
      let sumStats = this.stats;

      let maxValue = 0;
      for (const el in sumStats) {
        maxValue = sumStats[el] > maxValue ? sumStats[el] : maxValue;
      }

      // console.log(sumStats);

      let el = window.document.getElementById("echart");
      let instance = echarts.init(el);
      let options = {
        title: {
          text: "Распределение статов",
        },
        tooltip: {},
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "Power", max: maxValue },
            { name: "Precision", max: maxValue },
            { name: "Ferocity", max: maxValue },
            { name: "Toughness", max: maxValue },
            { name: "Vitality", max: maxValue },
            { name: "ConditionDamage", max: maxValue },
            { name: "Healing", max: maxValue },
          ],
        },
        series: [
          {
            name: "Статы",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              [
                sumStats["Power"],
                sumStats["Precision"],
                sumStats["Ferocity"],
                sumStats["Toughness"],
                sumStats["Vitality"],
                sumStats["ConditionDamage"],
                sumStats["Healing"],
              ],
            ],
          },
        ],
      };
      instance.setOption(options);
    },
  },
};
</script>
<style lang="stylus">
#echart
  width 100%
  height 100%
</style>
