<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-btn
          class="large-screen-only q-mr-sm"
          to="/camera"
          flat
          dense
          round
          icon="eva-camera-outline"
          size="18px"
        />
        <q-separator class="large-screen-only" vertical spaced />
        <q-img
          src="../.././src/assets/logoinsta.jpg"
          style="width: 40px"
          :ratio="1"
        />
        <q-toolbar-title class="text-grand-hotel text-bold">
          InstagClone
        </q-toolbar-title>
        <q-btn
          class="large-screen-only"
          to="/"
          flat
          dense
          round
          icon="eva-home-outline"
          size="18px"
        />
        <q-btn-dropdown
          class="large-screen-only q-mr-sm"
          icon="eva-arrowhead-down-outline"
        >
          <q-list>
            <q-item to="/signup" clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Login</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/signin" clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Signup</q-item-label>
              </q-item-section>
            </q-item>

            <!-- <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item> -->
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-class="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" icon="eva-camera-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    return {};
  },
});
</script>

<style lang="sass">
.q-toolbar
    @media (min-width: $breakpoint-sm-min)
     height: 80px
.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: 'center'
.q-footer
  .q-tab__icon
    font: size 30px
</style>
