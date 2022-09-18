import Api from '@/services/Api';

export default {
  getAllVideos(data, params) {
    return Api().get(`videos/${data}`, {
      params,
    });
  },
  getOneVideo(id) {
    return Api().get(`videos/${id}`);
  },

  // 비디오 업로드
  uploadVideo(data, optional) {
    return Api().post('videos', data, optional);
  },

  // 비디오 수정
  updateVideo(id, data) {
    return Api().put(`videos/${id}`, data);
  },
  // 비디오 썸네일 수정
  updateThumbnail(id, data) {
    return Api().put(`videos/${id}/thumbnails`, data);
  },

  // 비디오 조회수 업데이트
  updateViews(id) {
    return Api().put(`videos/${id}/views`);
  },

  // 비디오 삭제
  deleteOneVideo(id) {
    return Api().delete(`videos/${id}`);
  },
};
