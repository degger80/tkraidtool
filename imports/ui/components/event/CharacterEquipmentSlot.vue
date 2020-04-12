<template lang="pug">
.es-wrap
  .equipment-slot(:class="[slotName, align]")
    EquipedItem(:item="item" :class="align" v-if="item")
    EquipedItem( v-if="item" v-for="upgrade, index in item.upgrades" :item="upgrade" :bonusesQty="bonusesQty" :class="['upgrade', `u${index+1}`, align]")
    EquipedItem( v-if="item" v-for="upgrade, index in item.infusions" :item="upgrade" :class="['infusion', `u${index+1}`, align]")
</template>
<script>
import EquipedItem from "/imports/ui/components/event/EquipedItem";
import EquippedItemUpgrade from "/imports/ui/components/event/EquippedItemUpgrade";

export default {
  props: {
    slotName: String,
    item: {
      default: false,
    },
    align: {
      default: "right",
    },
    bonusesQty: {
      default: null,
    },
  },
  components: {
    EquipedItem,
    EquippedItemUpgrade,
  },
};
</script>
<style lang="stylus">
.equipment-slot{
  width: 50px;
  height: 50px;
  background-image: url("/images/armor_n_acces_new.png");
  margin-bottom: 3px;
  position: relative;



  &.Shoulders{
    background-position: -50px 0;
  }

  &.Coat{
    background-position: -100px 0;
  }

  &.Gloves{
    background-position: -150px 0;
  }

  &.Leggings{
    background-position: -200px 0;
  }

  &.Boots{
    background-position: -250px 0;
  }

  &.Accessory1{
    background-position: -300px 0;
  }
  &.Accessory2{
    background-position: -300px 0;
  }

  &.Ring1{
    background-position: -350px 0;
  }
  &.Ring2{
    background-position: -350px 0;
  }
  &.Backpack{
    background-position: -400px 0;
  }
  &.Amulet{

    background-image: url("/images/amulet.jpg");
  }

  &.WeaponA1{
    background-image: url("/images/weapon_new.png");

  }
  &.WeaponA2{
    background-image: url("/images/weapon_new.png");
    background-position: -50px 0;
  }
  &.WeaponB1{
    background-image: url("/images/weapon_new.png");
  }
  &.WeaponB2{
    background-image: url("/images/weapon_new.png");
    background-position: -50px 0;
  }




  .equipped-item{
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    position: relative;

    .overlay{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #FFF;
      opacity: 0;
      transition: all .2s ease-in-out;
    }

    .item-tooltip{
      position: absolute;
      border: 1px solid #eee;
      border-radius: 3px;
      padding: 10px;
      bottom: 0;
      right: 60px;
      background-color: #FFF;
      display: none;

      opacity: 1;
      z-index: 10;
      min-width: 250px;

      p{
        margin-bottom: 0;
      }

      h5{

        font-size: 14px;
        // font-weight: bold;
      }
    }

    &:hover{
      .item-tooltip{
        display: block;
      }

      .overlay{
        opacity: 0.4;
      }

    }

    &.left{
      .item-tooltip{
        right: auto;
        left: 55px;
      }
    }

    &.Junk{
      border-color:#aaa;
      .item-tooltip{
        h5{
          color: #aaa
        }
      }
    }
    &.Basic{
      border-color:#000;
      .item-tooltip{
        h5{
          color: #000
        }
      }
    }
    &.Fine{
      border-color:#62A4DA;
      .item-tooltip{
        h5{
          color: #62A4DA
        }
      }
    }
    &.Masterwork{
      border-color:#1a9306;
      .item-tooltip{
        h5{
          color: #1a9306
        }
      }
    }
    &.Rare{
      border-color:#fcd00b;
      .item-tooltip{
        h5{
          color: #fcd00b
        }
      }
    }
    &.Exotic{
      border-color:#ffa405;
      .item-tooltip{
        h5{
          color: #ffa405
        }
      }
    }
    &.Ascended{
      border-color:#fb3e8d;
      .item-tooltip{
        h5{
          color: #fb3e8d
        }
      }
    }
    &.Legendary{
      border-color:#4C139D;
      .item-tooltip{
        h5{
          color: #4C139D
        }
      }
    }

    img{
      width: 100%;
      height: 100%;
    }


  }
  .infusion{
    position: absolute;
    top: 0;
    left: 76px;
    width: 24px;
    height: 24px;

    .equipped-item{
      .item-tooltip{
        left: 26px;
      }
    }

    &.right{
      left: auto;
      right: 76px;
      .equipped-item{
        .item-tooltip{
          left: auto;
          right: 26px;
        }
      }
    }

    &.u2{
      top:auto;
      bottom: 0;
    }
  }

  .upgrade{
    position: absolute;
    top: 0;
    left: 52px;
    width: 24px;
    height: 24px;

    .equipped-item{
      .item-tooltip{
        left: 26px;
      }
    }

    &.right{
      left: auto;
      right: 52px;
      .equipped-item{
        .item-tooltip{
          left: auto;
          right: 26px;
        }
      }
    }

    &.u2{
      top:auto;
      bottom: 0;
    }
  }

}
</style>
