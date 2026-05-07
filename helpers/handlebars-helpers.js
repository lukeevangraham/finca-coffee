module.exports = {
  eq: function (a, b) {
    return a === b;
  },
  getCloudinaryResize: (url, width) => {
    return `${url.replace("/upload/", `/upload/w_${width}/`)} ${width}w`;
  },
};
