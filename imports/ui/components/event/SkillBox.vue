<template lang="pug">
  .skills
    .equipped-skill.equipped-pet(v-for="skill in skills")
      img(:src="skill.icon")
      .overlay
      .item-tooltip
        h5 {{skill.name}}
        p {{skill.description}}
</template>
<script>
export default {
  props: ["skills"],
};
</script>
<style lang="stylus">
.skills{
  margin-bottom: 20px;
  display flex
  .equipped-skill{
    width: 48px;
    height 48px;
    margin-right 10px
    &:first-child {
      margin-right: 20px
    }
    &:last-child {
      margin-left 10px
    }
  }
  .equipped-pet{
    position: relative;

    img{
      width: 100%;
      height: 100%;
    }

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
      top: 0;
      left: 110px;
      background-color: #FFF;
      display: none;
      min-width: 250px;
      font-size: 1rem;

      opacity: 1;
      z-index: 10;


      h5{
        white-space: nowrap;
        font-size: 1.2rem;
      }
    }

    &.equipped-legend, &.equipped-skill{
      .item-tooltip{
        left: 70px;
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
  }
  .pets{
    display: inline-block;
    width: 100%;
    margin: 10px;
    margin-bottom: -30px;
    &.skills{
      margin-bottom: 10px;
    }

    .pet{
      width: 100px;
      height: 100px;

      margin-bottom: 3px;
      float: left;
      &.skill{
        width: 60px;
        height: 60px;
        &:first-child{
          margin-right: 5px;
        }
        &:last-child{
          margin-left: 5px;
        }
      }

      &.legend{
        width: 60px;
        height: 60px;
        margin: 0 5px 20px 0;
      }


    }
  }

}
</style>
