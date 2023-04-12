<template>
  <form @submit="signup()">
    <div class="q-pa-md constraint-signup" position="fixed-center">
      <div class="header">
        <q-toolbar-title class="text-grand-hotel text-bold">
          InstagClone
        </q-toolbar-title>
      </div>
      <div align="center">
        <i class="fa fa-instagram" style="font-size: 48px; color: #ff0066"></i>
      </div>
      <div class="text-center">
        <span>Sign up to see photos and videos from your friends.</span>
      </div>

      <div class="">
        <q-input
          :class="`text-box ${errors.email ? 'is-invalid' : ''}`"
          outlined
          v-model="email"
          label="Mobile Number or email"
          placeholder="Mobile Number or email"
        />
      </div>
      <div class="is-invalid">{{ errors.email }}</div>
      <div class="">
        <q-input
          :class="`text-box ${errors.full_name ? 'is-invalid' : ''}`"
          outlined
          v-model="full_name"
          label="Full Name"
          placeholder="Full Name"
        />
      </div>
      <div class="is-invalid">{{ errors.full_name }}</div>

      <div class="">
        <q-input
          :class="`text-box ${errors.user_name ? 'is-invalid' : ''}`"
          outlined
          v-model="user_name"
          label="Username"
          placeholder="Username"
        />
      </div>
      <div class="is-invalid">{{ errors.user_name }}</div>
      <div class="">
        <q-input
          :class="`text-box ${errors.password ? 'is-invalid' : ''}`"
          type="password"
          outlined
          v-model="password"
          label="Password"
          placeholder="Password"
        />
        <!-- <q-btn round dense flat icon="eva-eye-outline" /> -->
        <!-- <template v-slot:append>
          <q-btn round dense flat icon="eva-eye-outline" />
        </template> -->
      </div>
      <div class="is-invalid">{{ errors.password }}</div>
      <div class="">
        <q-input
          :class="`text-box ${errors.password2 ? 'is-invalid' : ''}`"
          type="password"
          outlined
          v-model="password2"
          label="Confirm Password"
          placeholder="Confirm Password"
        />
      </div>
      <div class="is-invalid">{{ errors.password2 }}</div>
      <div>
        <q-btn type="submit" color="secondary" label="Sign up" />
      </div>
    </div>
  </form>
  <div class="q-pa-md constraint-signup">
    <small>
      Have an account?
      <router-link to="/signin"><strong>Log in</strong></router-link>
    </small>
  </div>
</template>

<script>
import { ref } from "vue";
import validateRegisterInput from "../Validation/validateRegisterInput";
export default {
  setup() {
    return {
      email: ref(""),
      full_name: ref(""),
      user_name: ref(""),
      password: ref(""),
      password2: ref(""),
      errors: {},
      users: [],
    };
  },
  methods: {
    signup() {
      let user = {
        email: this.email,
        full_name: this.full_name,
        user_name: this.user_name,
        password: this.password,
        password2: this.password2,
      };
      const { isInvalid, errors } = validateRegisterInput(user);
      if (isInvalid) {
        this.errors = errors;
      } else {
        this.errors = {};
        // store user in local storage
        if (localStorage.users) {
          let lsUsers = localStorage.users;
          this.users = JSON.parse(lsUsers);
        }
        this.users.push(user);
        localStorage.setItem("users", JSON.stringify(this.users));
        this.email = "";
        this.full_name = "";
        this.user_name = "";
        this.password = "";
        this.password2 = "";
      }
    },
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
.is-invalid {
  color: red;
}
</style>
