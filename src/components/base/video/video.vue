<template>
  <div class="video">
    <!-- <video-player
      class="video-player-box"
      ref="videoPlayer"
      fluid
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied"
    >
    </video-player> -->
    <move-video
      class="video-playback"
      icon-width="48px"
      icon-height="51px"
      videoWidth="100%"
      videoHeight="100%"
      :full-screen="true"
      :init-icon="initIcon"
      :controls="false"
      :load-icon="loadIcon"
      video-url="http://192.168.71.33:50000//upload/file/test.mp4"
      image-url="https://img-dpy.bhbcdn.com/cv-img_b1d731_1554894122628.jpg"
    />
  </div>

</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Model, Ref } from 'vue-property-decorator';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import moveVideo from 'move-video';
@Component({
  name: 'VideoBasic',
  components: {
    videoPlayer,
    moveVideo,
  },
})
export default class VideoBasic extends Vue {
  /*=============================================
  =                      Data                   =
  =============================================*/
  private playerOptions = {
    // videojs options
    height: '193',
    width: '293',
    muted: true,
    language: 'en',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [
      {
        type: 'video/mp4',
        src: 'http://192.168.71.33:50000//upload/file/test.mp4',
      },
    ],
  };
  /*=============================================
  =                      Model                  =
  =============================================*/
  /*=============================================
  =                    Props                    =
  =============================================*/
  /**
   * 视屏
   */
  @Prop({
    type: String,
  })
  video!: string | null;
  /*=============================================
  =                    Watch                    =
  =============================================*/
  /*=============================================
  =                   Computed                  =
  =============================================*/

  /*=============================================
  =                     Method                  =
  =============================================*/
  // listen event
  onPlayerPlay(player) {
    // console.log('player play!', player)
  }
  onPlayerPause(player) {
    // console.log('player pause!', player)
  }
  // ...player event

  // or listen state event
  playerStateChanged(playerCurrentState) {
    // console.log('player current update state', playerCurrentState)
  }

  // player is ready
  playerReadied(player) {
    console.log('the player is readied', player);
    // you can use it to do something...
    // player.[methods]
  }
  /*=============================================
  =                    Mounted                  =
  =============================================*/
}
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  height: 386px;
  margin-top: 30px;
  margin-bottom: 20px;
  position: relative;
  background-color: red;
}
</style>