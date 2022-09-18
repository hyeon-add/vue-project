<template>
  <div id="Videos">
    <h2>채널 콘텐츠</h2>

    <v-tabs class="mt-5" v-model="tab">
      <v-tab>동영상</v-tab>
      <v-tab>실시간 스트리밍</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- 동영상 -->
      <v-tab-item>
        <v-card flat>
          <v-card-title>
            <v-text-field
              dense
              flat
              hide-details
              outlined
              append-icon="mdi-magnify"
              label="검색"
              v-model="search"
              @click:append="search"></v-text-field>
          </v-card-title>
          <v-data-table
            loading-text="잠시만 기다려주세요."
            no-data-text="콘텐츠가 없습니다."
            :headers="headers"
            :items="videos"
            :search="search"
            :loading="loading">
            <template v-slot:[`item.feelings`]="{ item }">
              <span class="mr-3">
                <v-icon small class="pr-1">mdi-thumb-up</v-icon>
                {{ item.likes }}
              </span>
              <span>
                <v-icon small class="pr-1">mdi-thumb-down</v-icon>
                {{ item.dislikes }}
              </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon text class="mr-2">
                <v-icon @click="editItem(item)"> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon text class="mr-2" router :to="`/watch/${item._id}`">
                <v-icon> mdi-youtube </v-icon>
              </v-btn>
              <v-btn icon text @click.stop="deleteBtn(item)">
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- 실시간 스트리밍 -->
      <v-tab-item> </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import VideoService from '@/services/VideoService';

export default {
  name: 'Videos',
  data: () => ({
    headers: [
      {
        text: '동영상',
        align: 'start',
        value: 'title',
      },
      { text: '공개상태', value: 'status' },
      { text: '조회수', value: 'views' },
      { text: '댓글', value: 'comments' },
      { text: '좋아요 (싫어요 대비)', value: 'feelings' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    videos: [],
    search: '',
    tab: null,
    loading: false,
  }),

  methods: {
    async getVideos() {
      this.loading = true;

      const videos = await VideoService.getAllVideos('private', {
        limit: 0,
      })
        .catch((error) => {
          console.log('getVideos - error : ', error);
        })
        .finally(() => {
          this.loading = false;
        });

      if (!videos) return;
      console.log(videos.data.data);
      this.videos = videos.data.data;
    },
  },

  mounted() {
    this.getVideos();
  },

  beforeRouteUpdate(to, from, next) {
    this.getVideos();
    next();
  },
};
</script>
<style></style>
