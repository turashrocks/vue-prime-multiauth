import { createApp } from "vue";

let $ = (window.jQuery = require("jquery"));
window.$ = $;

window.axios = require("axios");
window.axios.defaults.baseURL = "https://dropoffcourierbd.ebuilders.pro/api/v1";

window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error
    // console.log(error.response.data.errors);
    let object = error.response.data.data;
    $(`input`).siblings(".text-danger").remove();
    $(`textarea`).siblings(".text-danger").remove();

    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (document.getElementById(`${key}`)) {
          $(`#${key}`)
            .parent("div")
            .append(`<div class="text-danger">${element[0]}</div>`);
        } else {
          $(`input[name="${key}"]`)
            .parent("div")
            .append(`<div class="text-danger">${element[0]}</div>`);
          $(`select[name="${key}"]`)
            .parent("div")
            .append(`<div class="text-danger">${element[0]}</div>`);
          $(`input[name="${key}"]`).trigger("focus");
          $(`textarea[name="${key}"]`)
            .parent("div")
            .append(`<div class="text-danger">${element[0]}</div>`);
          $(`textarea[name="${key}"]`).trigger("focus");
        }
        console.log({
          [key]: element,
        });
      }
    }

    if (typeof error.response.data === "string") {
      console.log("error", error.response.data);
    }
    throw error;
  }
);

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Pagination from "v-pagination-3";

const app = createApp(App);
app.use(store);
app.use(router);
app.component("pagination", Pagination);
app.mount("#app");
// createApp(App).use(store).use(router).mount("#app");
