<template>
  <div id="playerView"></div>

</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const props = defineProps<{
  video: {
    [key: string]: any;
  };
}>();

const playerRef = ref();
const player = ref();
const initPlayer = () => {
  if (props.video.mime_type.indexOf("video") >= 0) {
    let player = new Player({
      id: "playerView",
      url: props.video.web_content_link,
      fluid: true,
      lang: "zh-cn",
      autoplay: false,
      videoInit: true,
      poster: props.video.thumbnail_link,
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
          src: props.video.web_content_link,
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
};
onMounted(initPlayer);
</script>

<style>
.plyr--video {
  height: 100%;
}
.plyr--audio {
  margin-top: 320px;
}
.plyr video {
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
