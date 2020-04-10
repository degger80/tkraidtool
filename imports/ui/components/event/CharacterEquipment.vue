<template lang="pug">
.equipment
  v-row
    v-col(cols="12" lg="3")  
      v-row
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['WeaponA1']")
          CharacterEquipmentSlot(:item="equipment['WeaponA2']")
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['WeaponB1']" align="left")
          CharacterEquipmentSlot(:item="equipment['WeaponB2']" align="left")
      v-row
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['Helm']")
          CharacterEquipmentSlot(:item="equipment['Shoulders']")
          CharacterEquipmentSlot(:item="equipment['Coat']")
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['Gloves']" align="left")
          CharacterEquipmentSlot(:item="equipment['Leggings']" align="left")
          CharacterEquipmentSlot(:item="equipment['Boots']" align="left")
      v-row
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['Backpack']")
          CharacterEquipmentSlot(:item="equipment['Ring1']")
          CharacterEquipmentSlot(:item="equipment['Ring2']")
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['Amulet']" align="left")
          CharacterEquipmentSlot(:item="equipment['Accessory1']" align="left")
          CharacterEquipmentSlot(:item="equipment['Accessory2']" align="left")
    v-col(cols="12" lg="9")  
      EChart(v-if="$subReady.gwItems")
  
</template>
<script>
import CharacterEquipmentSlot from "/imports/ui/components/event/CharacterEquipmentSlot";
import EChart from "/imports/ui/components/event/EChart";

export default {
  props: ["character", "eventType"],
  components: {
    CharacterEquipmentSlot,
    EChart,
  },
  data() {
    return {};
  },
  computed: {
    itemIds() {
      let ids = [];
      this.character.equipment.map(function (equipment) {
        ids.push(equipment.id);
        if (equipment.upgrades) {
          equipment.upgrades.map(function (upgrade) {
            ids.push(upgrade);
          });
        }
        if (equipment.infusions) {
          equipment.infusions.map(function (infusion) {
            ids.push(infusion);
          });
        }
      });
      return ids;
    },
    equipment() {
      const slots = {
        Helm: { slot: "Helm" },
        Shoulders: { slot: "Shoulders" },
        Coat: { slot: "Coat" },
        Gloves: { slot: "Gloves" },
        Leggings: { slot: "Leggings" },
        Boots: { slot: "Boots" },
        Amulet: { slot: "Amulet" },
        Ring1: { slot: "Ring1" },
        Ring2: { slot: "Ring2" },
        Accessory1: { slot: "Accessory1" },
        Accessory2: { slot: "Accessory2" },
        Backpack: { slot: "Backpack" },
        Ring1: { slot: "Ring1" },
        WeaponA1: { slot: "WeaponA1" },
        WeaponA2: { slot: "WeaponA2" },
        WeaponB1: { slot: "WeaponB1" },
        WeaponB2: { slot: "WeaponB2" },
      };

      this.character.equipment.map(function (item) {
        // console.log(item);
        slots[item.slot] = {
          _id: item.id,
          upgrades: item.upgrades,
          infusions: item.infusions,
          skin: item.skin,
          slot: item.slot,
          stats: item.stats && item.stats.attributes,
        };
      });
      return slots;
    },
  },
  meteor: {
    $subscribe: {
      gwItems() {
        return [this.itemIds]; // send the param to the server
      },
    },
  },
};
</script>
