<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <!-- <img class="full-width" src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->
      <video
        v-show="!imageCaptured"
        class="full-width"
        autoplay
        ref="video"
        playsinline
      />
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="200"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        @click="captureImage"
        v-if="hasCameraSupport"
        round
        color="grey-10"
        icon="eva-camera"
        size="lg"
      />
      <q-file
        v-else
        accept="image/*"
        v-model="imageUpload"
        label="Choose an image"
        outlined
        @update:model-value="captureImageFile"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.capation"
          class="col col-sm-6"
          label="Caption"
          dense
        />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.loction"
          class="col col-sm-6"
          label="Location"
          dense
          :loading="locationLoading && locationSupported"
        >
          <template v-slot:append>
            <q-btn
              v-if="!locationLoading"
              @click="getLoction"
              round
              dense
              flat
              icon="eva-navigation-2-outline"
            />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn color="info" label="Post Image" rounded unelevated />
      </div>
    </div>
  </q-page>
</template>

<script>
// import { error } from "console";
import { track } from "@vue/reactivity";
import { uid } from "quasar";
import { defineComponent } from "vue";
require("md-gum-polyfill");
// if your broswer is not support then you use this pakage
// import { stream } from "stream";

export default defineComponent({
  name: "CameraPage",
  data() {
    return {
      post: {
        id: uid(),
        capation: "",
        loction: "",
        photo: null,
        date: Date.now(),
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true,
      locationLoading: false,
    };
  },
  computed: {
    locationSupported() {
      if ("geolocation" in navigator) return true;
      return false;
    },
  },
  methods: {
    initCamera() {
      console.log("initCamera");
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((error) => {
          this.hasCameraSupport = false;
        });
    },
    captureImage() {
      console.log("captureImage");
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      this.post.photo = this.dataURItoPickimage(canvas.toDataURL());
      this.disableCamera();
    },
    captureImageFile(file) {
      // console.log("file", file);
      this.post.photo = file;
      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");

      var reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCaptured = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    disableCamera() {
      console.log("first");
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },
    dataURItoPickimage(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);
      var nimeString = dataURI.split(",")[0].split(":")[1].split(":")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var pickimage = new Blob([ab], { type: nimeString });
      return pickimage;
    },
    getLoction() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("postion", position);
          this.getCityAndCountry(position);
        },
        (error) => {
          console.log("error", error);
        },
        { timeout: 8000 }
      );
    },
    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;
      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log("result", result);
          this.locationSuccess(result);
        })
        .catch((error) => {
          console.log("error", error);
          this.locationError();
        });
    },
    locationSuccess(result) {
      this.post.loction = result.data.city;
      if (result.data.country) {
        this.post.loction += `, ${result.data.country}`;
      }
      this.locationLoading = false;
    },
    locationError() {
      this.$q.dialog({
        title: "Error",
        message: "Could not find your location",
      });
      this.locationLoading = false;
    },
  },

  mounted() {
    this.initCamera();
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
});
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
