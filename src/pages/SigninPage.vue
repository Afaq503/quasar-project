<template>
  <!-- <div class="q-pa-md constraint-signin" position="fixed-center">
    <div class="header">
      <q-toolbar-title class="text-grand-hotel text-bold">
        InstagClone
      </q-toolbar-title>
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
      />
    </div>
    <div>
      <q-btn color="info" label="Log in" />
    </div>
  </div> -->

  <form @submit="Login()">
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
        <span>Login to see photos and videos from your friends.</span>
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

      <div>
        <q-btn type="submit" color="secondary" label="Sign in" />
      </div>
    </div>
  </form>
  <div class="q-pa-md constraint-signin">
    <small>
      Don't Have an account?
      <router-link to="/signup"><strong>Sign up</strong></router-link>

      <!-- <a href="#"></a> -->
    </small>
  </div>
</template>

<script>
import { ref } from "vue";
import validateLogin from "../Validation/validateLogin";

export default {
  setup() {
    return {
      email: ref(""),
      password: ref(""),
      errors: {},
      users: [],
    };
  },
  data() {
    return {
      user_name: "",
      password: "",
    };
  },
  methods: {
    Login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      const { isInvalid, errors } = validateLogin(user);
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
        this.password = "";
      }
    },
  },
};
</script>
<style lang="scss">
.text-box {
  width: 300px;
}

.constraint-signin > div {
  margin: 1vh;
}
.constraint-signin div span {
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
