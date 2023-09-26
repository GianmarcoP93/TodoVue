<template>
  <div>
    <!-- Access to XMLHttpRequest at 'https://xkcd.com/100/info.0.json' from origin 'http://localhost:8080' 
        has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource -->

    <!-- Non ho le autorizzazioni -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Albo",
  data() {
    return {
      comicData: {},
    };
  },
  mounted() {},
  methods: {
    loadComic(number) {
      axios
        .get(`https://xkcd.com/${number}/info.0.json`)
        .then((response) => {
          this.comicData = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
