<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.email"
                  disabled
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                  disabled
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { mapState } from "vuex";
import { updateUser } from "@/api/user";

export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      bio: "",
      image: "",
      username: "",
    };
  },
  async mounted() {
    this.bio = this.user.bio;
    this.image = this.user.image;
    this.username = this.user.username;
  },
  methods: {
    logout() {
      this.$store.commit("setUser", null);
      Cookie.remove("user");
      this.$router.push("/");
    },
    async onSubmit() {
      const { data } = await updateUser({
        user: {
          bio: this.bio,
          image: this.image,
          username: this.username,
        },
      });
      console.log("dddaaaa:", data);
      // this.$router.push(`/profile/${this.user.id}`);
    },
  },
};
</script>

<style>
</style>