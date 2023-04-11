<template>
  <form @submit="signup()">
    <div class="q-pa-md constraint-signup" position="fixed-center">
      <div class="header">
        <q-toolbar-title class="text-grand-hotel text-bold">
          InstagClone
        </q-toolbar-title>
      </div>
      <div class="text-center">
        <span>Sign up to see photos and videos from your friends.</span>
      </div>
      <div>
        <q-btn
          color="primary"
          icon="eva-facebook"
          label="Log in with Facebook"
        />
      </div>

      <div class="">
        <q-input
          class="text-box"
          outlined
          v-model="form.mobile_number"
          label="Mobile Number or email"
          placeholder="Mobile Number or email"
        />
      </div>
      <div class="">
        <q-input
          class="text-box"
          outlined
          v-model="full_name"
          label="Full Name"
          placeholder="Full Name"
        />
      </div>
      <div class="">
        <q-input
          class="text-box"
          outlined
          v-model="user_name"
          label="Username"
          placeholder="Username"
        />
      </div>
      <div class="">
        <q-input
          class="text-box"
          type="password"
          outlined
          v-model="password"
          label="Password"
          placeholder="Password"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="eva-eye-outline" /> </template
        ></q-input>
      </div>
      <div class="">
        <q-input
          class="text-box"
          type="password"
          icon="camera"
          outlined
          v-model="cpassword"
          label="Confarm Password"
          placeholder=" Confarm Password"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="eva-eye-outline" />
          </template>
        </q-input>
      </div>
      <div>
        <q-btn type="submit" color="info" label="Sign up" />
      </div>
    </div>
  </form>
  <div class="q-pa-md constraint-signup">
    <small>
      Have an account?
      <router-link to="/signin"><strong>Sign in</strong></router-link>

      <!-- <a href="#"><strong>Log in</strong></a> -->
    </small>
  </div>
</template>

<script>
import { ref } from "vue";
// import { projfirestore } from "../firebase/firebase";
export default {
  methods: {
    signup() {
      let userdetail = {
        mobile_number: this.mobile_number,
        full_name: this.full_name,
        user_name: this.user_name,
        password: this.password,
      };
      projfirestore.collection("userdetail").add(userdetail);
    },
  },
  setup() {
    return {
      form: {
        mobile_number: ref(""),
        full_name: ref(""),
        user_name: ref(""),
        password: ref(""),
      },
    };
  },
};
</script>
<style lang="scss">
.text-box {
  width: 300px;
}

.constraint-signup > div {
  margin: 1vh;
}
.constraint-signup div span {
  font-size: 3vh;
  text-align: center;
}
a,
u {
  text-decoration: none;
}
div > small {
  font-size: 2vh;
}
</style>
