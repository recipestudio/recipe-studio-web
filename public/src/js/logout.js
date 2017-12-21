$(document).ready(() => {
  window.setTimeout(() => {
    showPreload();
    window.setTimeout(() => {
      window.location = "/";
    }, 1000);
  }, 1000);
});
