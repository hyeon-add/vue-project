<template>
  <div id="Home">
    <VideoBox
      v-for="video in videos"
      :key="video.id"
      :video="video"
      :channel="video.userId"></VideoBox>
    <!-- <VideoCard
      v-for="video in videos"
      :key="video.id"
      :video="video"
      :channel="video.userId"></VideoCard> -->
    <!-- <div class="VideoCard" v-for="video in videos" :key="video.id">
      <div class="Thumbnail"></div>
      <div class="VideoBottom">
        <div class="VideoPhoto"></div>
        <div class="VideoTitles">
          <p>{{ video.title }}</p>
          <p>{{ video.userId.channelName }}</p>
          <div class="VideoInfo">
            <span>{{ video.views }}</span>
            <span>{{ video.createdAt }}</span>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import axios from 'axios';

// import VideoCard from '@/components/VideoCard.vue';
import VideoBox from '@/components/VideoBox.vue';

export default {
  name: 'Home',
  data: () => ({
    videos: [],
  }),
  components: {
    // VideoCard,
    VideoBox,
  },
  methods: {
    async getVideos() {
      await axios
        .get(process.env.VUE_APP_API + '/videos/public', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          this.videos = response.data.data;
          console.log('getVideos - response : ', response, response.data.data);
        })
        .catch((error) => {
          console.log('getVideos - error : ', error);
        });
    },
  },
  mounted() {
    this.getVideos();
  },
};
</script>
<style>
#Home {
  display: grid;
  column-gap: 30px;
  grid-template-columns: repeat(auto-fill, max(300px));
  justify-content: center;
  padding: 20px;
  row-gap: 30px;
}
</style>
