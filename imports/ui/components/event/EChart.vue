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
          radius: "70%",
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "ConditionDamage", max: maxValue },
            { name: "Precision", max: maxValue },
            { name: "Ferocity", max: maxValue },

            { name: "Power", max: maxValue },
            { name: "Toughness", max: maxValue },
            { name: "Vitality", max: maxValue },

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
                sumStats["ConditionDamage"],
                sumStats["Precision"],
                sumStats["Ferocity"],
                sumStats["Power"],
                sumStats["Toughness"],
                sumStats["Vitality"],

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
