<template lang="pug">
v-card.py-8
  v-card-title 
    img.mr-2(:src="`${assetsUrl}/professions/${character['profession']}_tango_icon_48px.png`")
    | {{character.name}} - {{character.username}}
  v-card-text
    v-row
      v-col.lg-5
        CharacterBuild.pt-2(:character="character")
      v-col.lg-7
        CharacterPvpEquipment(v-show="false" :character="character" :eventType="eventType")
        CharacterEquipment(:character="character" :eventType="eventType")
</template>
<script>
import CharacterBuild from "/imports/ui/components/event/CharacterBuild";
import CharacterEquipment from "/imports/ui/components/event/CharacterEquipment";
import CharacterPvpEquipment from "/imports/ui/components/event/CharacterPvpEquipment";

export default {
  props: ["character", "defaultEventType"],
  data() {
    return {
      eventType: this.defaultEventType,
      assetsUrl: Meteor.settings.public.assetsUrl,
    };
  },
  components: {
    CharacterBuild,
    CharacterEquipment,
    CharacterPvpEquipment,
  },
};
</script>
<style lang="stylus">
.mode-selector{

  ul.mode{

    position: absolute;
    left: 60px;
    top: -60px;

    li{
      float: left;
      background: url(/images/mode_buttons.png) no-repeat 0px 0px;
      list-style: none;
      width: 60px;
      height: 73px;
      margin: 0;
      cursor: pointer;
      &.on{
        height: 85px;
        cursor: default;

      }
      &.pve{
        background-position: -3px -180px;
        &.on{
          background-position: -133px -180px;
        }
      }
      &.pvp{
        background-position: -3px 0px;
        &.on{
          background-position: -133px -0px;
        }
      }
      &.wvw{
        background-position: -3px -90px;
        &.on{
          background-position: -133px -90px;
        }
      }
    }
  }

  ul.info{
    position: absolute;
    right: 50px;
    top: -10px;

    li{
      float: left;
      background: url(/images/info_type.png) no-repeat 0px 0px;
      list-style: none;
      width: 40px;
      height: 40px;
      margin: 0;
      cursor: pointer;
      &.on{
        cursor: default;
      }
      &.equip{
        background-position: -80px 0px;
        &.on{
          background-position: -80px -80px;
        }
      }
      &.build{
        background-position: -40px 0px;
        &.on{
          background-position: -40px -80px;
        }
      }
    }

  }
}



.character-build{
  .spec-branch{
    width: 560px;
    height: 110px;
    margin-bottom: 10px;
    border: 1px solid #000;
    background-position: 0 100%;

    position: relative;


    .spec-icon{
      position: absolute;
      width: 64px;
      height: 64px;
      top: 54px;
      left: -13px;
    }

    .spec-name{
      color: #fff;
      margin: 5px;
      font-weight: bold;
      text-shadow: 5px #000;
      display: inline-block;
    }

    .trait{
      width: 33px;
      height: 33px;

      position: absolute;


      img{
        width: 100%;
        height: 100%;
        position: relative;
      }
      .overlay{
        background-color: #000;
        opacity: 0.6;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
      }

      &.active{
        box-shadow: 0 0 10px rgba(255,255,255,1); /* Параметры тени */
        .overlay{
          opacity: 0;
        }
      }

      .trait-tooltip{
        display: none;
        position: absolute;
        background-color: #FFF;
        border-radius: 3px;
        border: 1px solid #eee;
        padding: 10px;
        font-size: 1em;
        min-width: 250px;
        left: 36px;
        bottom: 0;
        z-index: 10;
        h5{
          white-space: nowrap;
          font-size: 1rem;
        }
      }

      &.minor{
        width: 30px;
        height: 30px;

        .trait-tooltip{
          left: 33px;
        }

        &.t1{ left: 125px; top: 38px;}
        &.t2{ left: 275px; top: 38px;}
        &.t3{ left: 425px; top: 38px;}

      }

      &.major{
        &.t1{ left: 200px; top: 2px;}
        &.t2{ left: 200px; top: 38px;}
        &.t3{ left: 200px; top: 74px;}
        &.t4{ left: 350px; top: 2px;}
        &.t5{ left: 350px; top: 38px;}
        &.t6{ left: 350px; top: 74px;}
        &.t7{ left: 500px; top: 2px;}
        &.t8{ left: 500px; top: 38px;}
        &.t9{ left: 500px; top: 74px;}
      }

      &:hover{
        .trait-tooltip{
          display: block;

        }

        .overlay{
          opacity: 0;
        }
      }
    }
  }
}
</style>
