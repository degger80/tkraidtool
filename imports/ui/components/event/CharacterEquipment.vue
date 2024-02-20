<template lang="pug">
.equipment
  v-row
    v-col(cols="12" lg="3")  
      v-row
        v-col.sm-6
          CharacterEquipmentSlot(slotName='WeaponA1' :item="equipment['WeaponA1']")
          CharacterEquipmentSlot(slotName='WeaponA2' :item="equipment['WeaponA2']")
        v-col.sm-6
          CharacterEquipmentSlot(slotName='WeaponB1' :item="equipment['WeaponB1']" align="left")
          CharacterEquipmentSlot(slotName='WeaponB2' :item="equipment['WeaponB2']" align="left")
      v-row
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['Helm']" :bonusesQty="equipment['bonusesQty']" slotName="Helm")
          CharacterEquipmentSlot(:item="equipment['Shoulders']" :bonusesQty="equipment['bonusesQty']" slotName="Shoulders")
          CharacterEquipmentSlot(:item="equipment['Coat']" :bonusesQty="equipment['bonusesQty']" slotName="Coat")
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['Gloves']" :bonusesQty="equipment['bonusesQty']" align="left" slotName="Gloves")
          CharacterEquipmentSlot(:item="equipment['Leggings']" :bonusesQty="equipment['bonusesQty']" align="left" slotName="Leggings")
          CharacterEquipmentSlot(:item="equipment['Boots']" :bonusesQty="equipment['bonusesQty']" align="left" slotName="Boots")
      v-row
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['Backpack']" slotName="Backpack")
          CharacterEquipmentSlot(:item="equipment['Ring1']" slotName="Ring1")
          CharacterEquipmentSlot(:item="equipment['Ring2']" slotName="Ring2")
          CharacterEquipmentSlot(:item="equipment['Relic']" slotName="Relic")
        v-col.sm-6
          CharacterEquipmentSlot(:item="equipment['Amulet']" align="left" slotName="Amulet")
          CharacterEquipmentSlot(:item="equipment['Accessory1']" align="left" slotName="Accessory1")
          CharacterEquipmentSlot(:item="equipment['Accessory2']" align="left" slotName="Accessory2")
    v-col(cols="12" lg="9")  
      EChart(:stats="character.stats")
  
</template>
<script>
import CharacterEquipmentSlot from "/imports/ui/components/event/CharacterEquipmentSlot";
import EChart from "/imports/ui/components/event/EChart";

export default {
  props: ["character"],

  components: {
    CharacterEquipmentSlot,
    EChart,
  },
  data() {
    return {
      equipment: this.character.equipment,
    };
  },
};
</script>
