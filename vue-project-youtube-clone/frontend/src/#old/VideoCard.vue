<template>
  <v-card flat tile max-width="300px" router to="/">
    <v-img
      v-if="video.thumbnailUrl !== 'no-photo.jpg'"
      :src="`${url}/uploads/thumbnails/${video.thumbnailUrl}`"></v-img>
    <div v-else class="thumbnailBox">
      <div class="thumbnailView">x</div>
    </div>
    <div class="videoBottom">
      <div class="channelProfile">
        <v-btn depressed fab icon router :to="`/channel/${channel.id}`">
          <v-avatar color="red" class="white--text">
            <h1>{{ channel.channelName.split('')[0].toUpperCase() }}</h1>
          </v-avatar>
        </v-btn>
      </div>
      <div>
        <v-card-title>{{ video.title }}</v-card-title>
        <v-card-subtitle>{{ channel.channelName }}</v-card-subtitle>
        <v-card-subtitle
          >{{ video.views }} 회 •
          {{ setCalDate(video.createdAt) }}</v-card-subtitle
        >
      </div>
    </div>
  </v-card>
</template>
<script>
import SetFormat from '@/mixins/SetFormat.vue';
export default {
  name: 'VideoCard',
  mixins: [SetFormat],
  props: {
    video: {
      type: Object,
      required: true,
    },
    channel: {
      type: Object,
      required: true,
    },
  },
  computed: {
    url() {
      console.log(this.channel.photoUrl);
      return process.env.VUE_APP_URL;
    },
  },
};
</script>
<style>
.videoBottom {
  align-items: flex-start;
  box-sizing: border-box;
  column-gap: 10px;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
}
.channelProfile {
}
</style>
