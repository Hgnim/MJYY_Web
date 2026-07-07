<script setup lang="ts">
import serverMap_fix from "@/components/pages/serverMap/ts/serverMap_fix.ts";
import {ref, type Ref} from "vue";

const main:Ref<HTMLDivElement|null> = ref(null);
function continueBtn_click(){
serverMap_fix();
main.value!.style.display="none";
}
</script>

<template>
<div ref="main" id="main" class="position-absolute w-100 h-100">
  <div class="d-flex justify-content-center align-items-center w-100 h-100">
    <div class="position-relative">
      <p>地图正在加载，请等待地图加载完毕后点击继续</p>
      <div class="d-flex justify-content-center w-100">
        <button @click="continueBtn_click">继续</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
#main{
  z-index: 100;
  background: rgba(0,0,0,.4);
}
</style>