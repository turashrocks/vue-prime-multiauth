<template>
  <h3 class="text-center">Login</h3>
  <h6 class="text-center">Enter your Username and Password For Login</h6>
  <div class="card mt-4 p-4">
    <form class="theme-form" id="login_form" @submit.prevent="login_submit">
      <div class="form-group">
        <label class="col-form-label">Email</label>
        <input
          type="text"
          name="email"
          class="form-control"
          placeholder="John Deo"
        />
      </div>
      <div class="form-group">
        <label class="col-form-label">Password</label>
        <input
          type="password"
          name="password"
          class="form-control"
          placeholder="**********"
        />
      </div>

      <!-- <div class="form-group">
        <button
          type="button"
          class="btn btn-success m-1"
          @click.prevent="login(true, 'student')"
        >
          Client
        </button>
        <button
          type="button"
          class="btn btn-success m-1"
          @click.prevent="login(true, 'management')"
        >
          Agent
        </button>
        <button
          type="button"
          class="btn btn-success m-1"
          @click.prevent="login(true, 'admin')"
        >
          Admin
        </button>
      </div> -->

      <div class="form-row">
        <div class="col-sm-12">
          <button type="submit" class="btn btn-secondary">Sign In</button>
        </div>
      </div>
      <!-- <div class="form-row mt-2">
        <div class="col-sm-6">
          <div class="text-left mt-2 m-l-20">
            Don't have an account? &nbsp;&nbsp;
            <router-link :to="{ name: 'signup' }">singup</router-link>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="text-left mt-2 m-l-20">
            Forget Password??
            <router-link :to="{ name: 'forget' }">Click here</router-link>
          </div>
        </div>
      </div> -->
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  created: function () {
    // window.axios.post('/user/test-data')
    //     .then(res=>{
    //         console.log(res)
    //     })
  },

  methods: {
    ...mapMutations([
      "set_auth_role_name",
      "set_check_auth_status",
      "set_auth_token",
      "set_auth_info",
    ]),
    // login: function(status, role_name){
    //     this.set_auth_role_name(role_name);
    //     this.set_check_auth_status(status);
    // },
    login_submit: function () {
      let form_data = new FormData(document.getElementById("login_form"));
      window.axios
        .post("/user/login", form_data)
        .then((res) => {
          this.set_auth_token({ token: res.data.access_token });
          this.set_auth_info(res.data.user);
          localStorage.setItem("b_token", res.data.user.access_token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style></style>
