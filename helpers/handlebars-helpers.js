module.exports = {
  eq: function (a, b) {
    return a === b;
  },
  // 1. Upgraded for Srcset: Injecting f_auto and q_auto perfectly safely
  getCloudinaryResize: (url, width) => {
    return `${url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)} ${width}w`;
  },
  // 2. NEW Helper: For individual src/href strings (no 'w' descriptor appended)
  getCloudinaryOptimize: (url) => {
    if (!url) return '';
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  },
  getCloudinaryGallery: (url, width) => {
    if (!url) return '';
    return url.replace('/upload/', `/upload/c_fill,g_auto:subject,w_${width}/`);
  },
  section: function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  },
};
