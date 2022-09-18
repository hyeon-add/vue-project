<template>
  <v-dialog persistent max-width="1000" v-model="dialog">
    <v-card>
      <div id="modal-header" class="align-center d-flex justify-space-between">
        <v-card-title>동영상 업로드</v-card-title>
        <v-btn icon text @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-card-text
        v-if="!uploaded"
        class="d-flex flex-column align-center my-md-12 py-md-12 my-sm-8 py-sm-8 my-xs-0 py-xs-0 my-12 py-12">
        <div v-if="!uploading" class="text-center">
          <div>
            <v-btn
              icon
              class="grey lighten-2 mb-4"
              style="height: 104px; width: 104px"
              @click="selectUploadFile">
              <v-icon x-large class="grey--text text--darken-1">
                mdi-upload
              </v-icon>
            </v-btn>
          </div>

          <ValidationProvider
            ref="provider"
            name="동영상 파일"
            rules="required-select|size:5000000"
            v-slot="{ errors }">
            <v-file-input
              ref="fileInput"
              accept="video/mp4"
              placeholder="동영상 파일을 선택하여 업로드"
              prepend-icon="mdi-video"
              :error-messages="errors"
              v-model="selectedFile"
              @change="uploadVideo">
            </v-file-input>
          </ValidationProvider>
          <v-btn
            depressed
            text
            class="blue darken-3 white--text mt-4"
            type="submit"
            @click="$refs.fileInput.$refs.input.click()">
            파일 선택
          </v-btn>
        </div>

        <v-progress-circular
          v-else
          color="teal"
          :rotate="360"
          :size="100"
          :width="15"
          :value="value">
          {{ value }}
        </v-progress-circular>
      </v-card-text>

      <v-card-text v-else>
        <h2 class="mb-6">세부정보</h2>

        <v-row>
          <v-col
            order="last"
            order-sm="last"
            order-md="first"
            order-lg="first"
            order-xl="first"
            cols="12"
            sm="12"
            md="8"
            lg="8">
            <ValidationObserver
              ref="videoUploadForm"
              v-slot="{ handleSubmit, invalid, validate }">
              <form @submit.prevent="handleSubmit(submitContent)">
                <ValidationProvider
                  name="제목"
                  rules="required|min:3"
                  v-slot="{ errors }">
                  <v-text-field
                    dense
                    filled
                    class="mb-3"
                    label="제목 (필수항목)"
                    counter="100"
                    max-length="100"
                    :error-messages="errors"
                    v-model="formData.title"></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="설명"
                  rules="required|min:3"
                  v-slot="{ errors }">
                  <v-textarea
                    auto-grow
                    filled
                    label="설명"
                    placeholder="시청자에게 동영상에 대해 이야기하기"
                    counter="5000"
                    max-length="5000"
                    rows="5"
                    row-height="20"
                    :error-messages="errors"
                    v-model="formData.description"></v-textarea>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="공개상태"
                  rules="required-select">
                  <v-select
                    filled
                    label="공개상태"
                    :items="visibilty"
                    :error-messages="errors"
                    v-model="formData.visibilty"></v-select>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="카테고리"
                  rules="required-select">
                  <v-select
                    filled
                    label="카테고리"
                    :loading="categoryLoading"
                    :items="categoriesTitles"
                    :error-messages="errors"
                    v-model="formData.category"></v-select>
                </ValidationProvider>

                <div class="mt-6 d-flex justify-space-between">
                  <v-btn
                    depressed
                    class="primary"
                    type="submit"
                    :loading="submitLoading"
                    :disabled="invalid || !validate"
                    >저장</v-btn
                  >
                </div>
              </form>
            </ValidationObserver>
          </v-col>

          <v-col
            order-sm="1"
            cols="12"
            sm="12"
            md="4"
            lg="4"
            class="text-center">
            <v-btn text @click="toggleShow">썸네일 업로드</v-btn>

            <!-- lib -->
            <!-- <myUpload
              :width="1280"
              :height="720"
              :headers="headers"
              :url="url"
              field="thumbnail"
              img-format="jpg"
              langType="ko"
              method="PUT"
              v-model="show"
              @crop-success="cropSuccess"></myUpload> -->

            <v-responsive width="330" class="mx-auto">
              <div v-if="!imgDataUrl" class="px-12" id="image-placeholder">
                <v-icon>mdi-image-plus</v-icon>
              </div>

              <v-img
                v-else
                height="350"
                max-width="330"
                :src="imgDataUrl"></v-img>
            </v-responsive>

            <p v-if="imgDataUrl == ''" class="red--text">
              썸네일을 업로드 해주세요.
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions v-if="!uploaded">
        <p class="text-center grey--text caption px-12 px-xs-0">
          YouTube에 동영상을 제출하면 YouTube 서비스 약관 및 커뮤니티 가이드에
          동의하게 됩니다. 불법촬영물 게재시 삭제 조치되고 관련 법에 따라 처벌
          받을 수 있습니다. 타인의 저작권 또는 개인정보 보호 권한을 침해해서는
          안 됩니다.
        </p>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import myUpload from 'vue-image-crop-upload';

import Validate from '@/mixins/Validate.vue';

import CategoryService from '@/services/CategoryService';
import VideoService from '@/services/VideoService';

export default {
  name: 'UploadVideoModal',
  mixins: [Validate],
  props: {
    openDialog: Boolean,
  },
  data: () => ({
    categoriesTitles: [],
    categories: [],
    selectedFile: [],
    visibilty: ['공개', '비공개'],

    formData: {
      category: '',
      description: '',
      id: '',
      title: '',
      visibilty: '',
    },

    imgDataUrl: '',
    url: '',

    value: 0,

    show: false,
    categoryLoading: false,
    submitLoading: false,
    uploaded: false,
    uploading: false,
  }),

  components: {
    // myUpload,
  },

  computed: {
    dialog(props) {
      console.log(props.openDialog);
      return props.openDialog;
    },
    headers() {
      return { Authorization: `Bearer ${this.$store.getters.GE_TOKEN}` };
    },
  },

  methods: {
    // 카테고리 가져오기
    async getCategories() {
      this.categoryLoading = true;

      const categoriesData = await CategoryService.getAllCategories()
        .catch((error) => {
          console.log('getCategories - error : ', error);
        })
        .finally(() => {
          this.categoryLoading = false;
        });

      if (!categoriesData) return;
      const categories = categoriesData.data.data;
      console.log('getCategories - categories : ', categories);

      this.categoriesTitles = categories.map((category) => {
        return category.title;
      });
      this.categories = categories;
    },

    // 비디오 업로드(임시 저장 - draft)
    async uploadVideo() {
      this.uploading = true;

      const fd = new FormData();
      fd.append('video', this.selectedFile, this.selectedFile.name);

      const videoData = await VideoService.uploadVideo(fd, {
        onUploadProgress: (uploadEvent) => {
          this.value = Math.round(
            (uploadEvent.loaded / uploadEvent.total) * 100
          );
        },
      })
        .catch((error) => {
          console.log('uploadVideo - error : ', error);
        })
        .finally(() => {
          this.uploaded = true;
          this.uploading = false;
        });

      if (!videoData) return;
      const video = videoData.data.data;

      // formData: {
      //   category: '',
      //   description: '',
      //   id: '',
      //   title: '',
      //   visibilty: '',
      // },
      this.formData.category = video.cateogry;
      this.formData.description = video.description;
      this.formData.id = video._id;
      this.formData.title = video.title;
      this.url = `${process.env.VUE_APP_URL}/api/v1/videos/${video._id}/thumbnails`;
    },

    // 콘텐츠 저장
    async submitContent() {
      if (this.imgDataUrl == '') return;

      this.submitLoading = true;

      // 선택한 카테고리 id 찾기
      this.formData.category = this.categories.find(
        (category) => category.title === this.formData.category
      )._id;

      const axiosBody = {
        categoryId: this.formData.category,
        description: this.formData.description,
        title: this.formData.title,
        status: this.formData.visibilty.toLowerCase(),
      };
      console.log('submitContent - axiosBody : ', axiosBody);

      const video = await VideoService.updateVideo(this.formData.id, axiosBody)
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.submitLoading = false;
          this.uploaded = false;
        });

      if (!video) return;

      // 초기화
      this.formData.visibilty = '';
      this.imgDataUrl = '';
      this.selectedFile = [];

      // 모달 닫기
      this.closeModal();

      // queryString 추가 -> Videos에서 getVideos() 실행
      this.$router.push(`/studio/videos?${new Date()}`);
    },

    // 파일 선택
    selectUploadFile() {
      this.$refs.fileInput.$refs.input.click();
    },

    // 썸네일 업로드 모달 열기/닫기
    toggleShow() {
      this.show = !this.show;
    },

    // 크롭 성공
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------');
      console.log(field);

      this.imgDataUrl = imgDataUrl;
    },

    // 모달 닫기
    closeModal() {
      this.$emit('closeDialog');
    },
  },

  mounted() {
    this.getCategories();
  },
};

// persistent: esc, 배경 클릭 제한
</script>

<style lang="scss">
#modal-header {
  border-bottom: 1px solid rgb(238, 232, 232);
}

#image-placeholder {
  padding-top: 8em;
  padding-bottom: 8em;
  border: 2px dashed rgb(209, 209, 209);
}
</style>
