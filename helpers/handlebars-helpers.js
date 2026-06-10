module.exports = {
  eq: function (a, b) {
    return a === b;
  },
  getCloudinaryResize: (url, width) => {
    return `${url.replace('/upload/', `/upload/w_${width}/`)} ${width}w`;
  },
  getCloudinaryGallery: (url, width) => {
    if (!url) return '';
    // CHANGED: Upgraded from g_faces to g_auto:subject,c_fill
    return url.replace('/upload/', `/upload/c_fill,g_auto:subject,w_${width}/`);
  },
};
