<template>
  <div id="playerView"></div>

</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import http, { notionHttp } from "../utils/axios";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const initPlayer = () => {
  getFile(route.params.id).then((res) => {
    console.log("视频信息",res.data);
    
    if (res.data.mime_type.indexOf("video") >= 0) {
      var playerObj = null;
      /*播放器参数配置*/
      var params = {
        container: document.getElementById("playerView"),
        name: "SceneViewer",
        scenesArr: [
          {
            sceneId: "v1",
            sceneName:res.data.name,
            sceneFilePath:  res.data.web_content_link,
            sceneType: "Video",
            initFov: 110,
            isVideoLoop: false,
          },
          // "http://video.utovr.com/00000000-hmd-wutuan-2k.mp4"
        ],
        initOverCallBack: function () {
          /*将播放器对象赋值给playerObj*/
          playerObj = this;
        },
        //播放器不支持全景播放回调
        errorCallBack: function (e) {
          console.log("错误状态：" + e);
        },
        //浏览器不支持全屏回调
        fsCallBack: function (status, playObj) {
          alert("浏览器不支持全屏！");
        },
        videoPlayEndCallBack: function () {
        console.log("videoPlayEndCallBack");
        
        },
      };
      initLoad(params);
    }
  });
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
onMounted(initPlayer);
</script>

<style>

        #playerView {
            position: absolute;
            width: 100%;
            height: 100%;
            left:0px;
            top:0px;
            overflow: hidden;
        }
</style>
