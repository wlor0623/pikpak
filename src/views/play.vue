<template>
  <div class="full-page">
    <!-- <n-page-header subtitle="返回" @back="handleBack">
    
  </n-page-header>   -->

    <div id="playerView">
      <div class="showVR" @click="playVR">
        <i class="iconfont icon-VRFilled"></i>
      </div>

    </div>

  </div>

</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { defineComponent } from "vue";
import http, { notionHttp } from "../utils/axios";
import { useRoute, useRouter } from "vue-router";

import { NPageHeader, NButton } from "naive-ui";
const route = useRoute();
const router = useRouter();
const initPlayer = () => {
  getFile(route.params.id).then((res) => {
    if (res.data.mime_type.indexOf("video") >= 0) {
      let player = new Player({
        id: "playerView",
        url: res.data.web_content_link,
        // height: document.documentElement.clientHeight - 100,
        width: "100%",
        height: "100%",
        // fluid: true,
        lang: "zh-cn",
        autoplay: false,
        videoInit: true,
        poster: res.data.thumbnail_link,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        defaultPlaybackRate: 1,
        rotateFullscreen: true,
        download: true,
        pip: true,
        screenShot: {
          saveImg: true,
          quality: 1,
          type: "image/png",
          format: ".png",
        },
        keyShortcut: "on",
        keyShortcutStep: {
          //设置调整步长
          currentTime: 15, //播放进度调整步长，默认10秒
          volume: 0.2, //音量调整步长，默认0.1
        },
      });
    } else {
      let player = new Music({
        id: "playerView",
        url: [
          {
            src: res.data.web_content_link,
            name: "song01",
            vid: "000001",
          },
        ],
        volume: 0.8,
        width: 900,
        height: 50,
        preloadNext: true,
        switchKeepProgress: false,
        abCycle: {
          start: 3,
          end: 9,
          loop: true,
        },
      });
    }
  });
};
const playVR = () => {
  router.push("/play/vr/" + route.params.id);
};
const getFile = (id: string) => {
  return http
    .get("https://api-drive.mypikpak.com/drive/v1/files/" + id, {
      params: {
        _magic: "2021",
        thumbnail_size: "SIZE_LARGE",
      },
    })
    .then((res) => {
      return res;
    });
};
const handleBack = () => {
  router.go(-1);
};
onMounted(initPlayer);
</script>

<style>
.showVR {
  position: absolute;
  bottom: 0;
  right: 310px;
  z-index: 999;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.showVR .iconfont {
  color: #fff;
  font-size: 24px;
}
#playerView {
  position: relative;
}

</style>
