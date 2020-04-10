<template lang="pug">
  #echart.pl-12
</template>
<script>
import echarts from "echarts";

const getStats = (item) => {
  let stats = {};
  let attributes = {};
  if (
    item &&
    item.details &&
    item.details.infix_upgrade &&
    item.details.infix_upgrade.attributes
  ) {
    item.details.infix_upgrade.attributes.map(function (item) {
      // stats.push(item.attribute+": "+item.modifier);
      if (item.attribute === "CritDamage") {
        attributes["Ferocity"] = item.modifier;
      } else {
        attributes[item.attribute] = item.modifier;
      }
    });
  }

  if (
    item &&
    item.details &&
    item.details.infix_upgrade &&
    item.details.infix_upgrade.buff
  ) {
    var re = /\+(\d+) (\w+)/g;
    var str = item.details.infix_upgrade.buff.description;
    var m;

    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }

      if (attributes[m[2]]) {
        attributes[m[2]] = attributes[m[2]] + Number(m[1]);
      } else {
        attributes[m[2]] = Number(m[1]);
      }
    }
  }
  // console.log(attributes);

  for (const [attribute, value] of Object.entries(attributes)) {
    stats[attribute] = value;
  }

  return stats;
};

export default {
  // props: ["character"],
  meteor: {
    items() {
      return CollectionGWItems.find();
    },
  },
  computed: {
    stats() {
      this.items.map((el) => {
        console.log(el);
        let stats = getStats(el);
        console.log(stats);
      });
      return {};
    },
  },
  mounted() {
    // console.log(this.character);
    let sumStats = {
      Power: 0,
      Precision: 0,
      Ferocity: 0,
      Toughness: 0,
      Vitality: 0,
      ConditionDamage: 0,
      Healing: 0,
    };

    this.items.map((el) => {
      // console.log(el);
      let stats = getStats(el);
      // console.log(stats);
      for (const [attr, value] of Object.entries(stats)) {
        sumStats[attr] += value;
      }
    });

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
};
</script>
<style lang="stylus">
#echart
  width 100%
  height 100%
</style>
