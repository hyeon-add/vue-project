<template>
  <div>
    <h2>채널 콘텐츠</h2>

    <v-tabs v-model="tab" class="mt-5">
      <v-tab>동영상</v-tab>
      <v-tab>실시간 스트리밍</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="pa-5">
        <v-data-table :headers="headers" :items="videos" :search="search">
          <template v-slot:top>
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              class="searchBar"
              v-model="search">
            </v-text-field>
          </template>
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.title }}</td>
              <td>{{ item.status }}</td>
              <td>
                <v-chip :color="setViewsChip(item.views)" class="white--text">
                  {{ item.views }}
                </v-chip>
              </td>
              <td>
                <span class="mr-3">
                  <v-icon small class="pr-1">mdi-thumb-up</v-icon>
                  {{ item.likes }}
                </span>
                <span>
                  <v-icon small class="pr-1">mdi-thumb-down</v-icon>
                  {{ item.dislikes }}
                </span>
              </td>
              <td>{{ item.createdAt | moment('YYYY-MM-DD HH:mm:ss') }}</td>
              <td>{{ setDateFormat(item.updatedAt) }}</td>
            </tr>
          </template>
        </v-data-table>
        <!-- <table class="tableStyle">
          <thead>
            <tr>
              <th>동영상</th>
              <th>공개상태</th>
              <th>조회수</th>
              <th>좋아요</th>
              <th>생성날짜</th>
              <th>수정날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="video in videos" :key="video.id">
              <td>{{ video.title }}</td>
              <td>{{ video.status }}</td>
              <td>{{ video.views }}</td>
              <td>{{ video.likes }}</td>
              <td>{{ video.createdAt | moment('YYYY-MM-DD HH:mm:ss') }}</td>
              <td>{{ video.updatedAt | moment('YYYY-MM-DD HH:mm:ss') }}</td>
            </tr>
          </tbody>
        </table> -->
      </v-tab-item>
      <v-tab-item class="pa-5">
        <v-data-table :headers="headers" :items="videos" :search="search">
          <template v-slot:top>
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              class="searchBar"
              v-model="search">
            </v-text-field>
          </template>

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

          <template v-slot:[`item.views`]="{ item }">
            <v-chip :color="setViewsChip(item.views)" class="white--text">
              {{ item.views }}</v-chip
            >
          </template>

          <template v-slot:[`item.createdAt`]="{ item }">
            {{ setDateFormat(item.createdAt) }}
          </template>

          <template v-slot:[`item.updatedAt`]="{ item }">
            {{ setDateFormat(item.updatedAt) }}
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import axios from 'axios';
import SetFormat from '@/mixins/SetFormat.vue';

export default {
  name: 'Contents',
  mixins: [SetFormat],
  data: () => ({
    headers: [
      {
        text: '동영상',
        align: 'start',
        value: 'title',
      },
      { text: '공개상태', value: 'status' },
      { text: '조회수', value: 'views' },
      { text: '좋아요', value: 'feelings', sort: false },
      { text: '생성날짜', value: 'createdAt' },
      { text: '수정날짜', value: 'updatedAt' },
    ],
    videos: [],

    search: '',

    tab: null,
    loading: false,
  }),
  computed: {},
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.getVideos();
      }
    },
  },
  methods: {
    async getVideos() {
      this.loading = true;
      await axios
        .get(process.env.VUE_APP_API + '/videos/private', {
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setViewsChip(value) {
      if (value === 0) return 'red';
      else if (value > 0 && value < 100) return 'orange';
      else if (value >= 100 && value < 1000) return 'green';
    },
  },
  mounted() {
    this.getVideos();
  },
};
</script>
<style>
.tableStyle {
  border: 1px solid #000;
  border-collapse: collapse;
  margin: 10px auto;
  table-layout: fixed;
  width: 100%;
}
.tableStyle th,
.tableStyle td {
  border: 1px solid #000;
}
.tableStyle th {
  background-color: blueviolet;
  color: white;
  font-size: 18px;
  padding: 5px 0px;
}
.tableStyle td {
  font-size: 16px;
  padding: 5px;
}

.searchBar {
  width: 400px;
  margin: 0px 20px;
}
</style>
