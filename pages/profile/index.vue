<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" class="user-img" />
            <h4>{{ userProfile.username }}</h4>
            <p>
              {{ userProfile.bio }}
            </p>
            <button
              v-if="userProfile.following"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="unfollowUser(userProfile.username)"
            >
              <i class="ion-plus-round"></i>
              &nbsp;Unfollow {{ userProfile.username }}
            </button>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="followUser(userProfile.username)"
            >
              <i class="ion-plus-round"></i>
              &nbsp;Follow {{ userProfile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'my_article' }"
                  :to="{ name: 'profile', query: { tab: 'my_article' } }"
                  exact
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'favorited' }"
                  :to="{
                    name: 'profile',
                    query: { tab: 'favorited' },
                  }"
                  exact
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="item in articles"
            :key="item.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: { username: item.author.username },
                }"
              >
                <img :src="item.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: { username: item.author.username },
                  }"
                  >{{ item.author.username }}
                </nuxt-link>
                <span class="date">{{
                  item.createdAt | date("MMM DD , YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: item.favorited }"
                @click="onFavorite(item)"
                :disabled="item.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{ name: 'article', params: { slug: item.slug } }"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";
import { followUser, getProfile, unfollowUser } from "@/api/user";

export default {
  middleware: "authenticated",
  name: "UserProfile",
  computed: {
    ...mapState(["user"]),
  },
  async asyncData({ params, query, store }) {
    const tab = query.tab || "my_article";
    // const { data } = await getArticles({
    //   [tab === "my_article" ? "author" : "favorited"]: params.username,
    // });
    // // console.log(data.articles);
    // data.articles.forEach((article) => (article.favoriteDisabled = false));
    // const { profiledata } = await getProfile(params.username);
    // console.log("profile:", profiledata);
    const [articledata, profiledata] = await Promise.all([
      getArticles({
        [tab === "my_article" ? "author" : "favorited"]: params.username,
      }),
      getProfile(params.username),
    ]);
    articledata.data.articles.forEach(
      (article) => (article.favoriteDisabled = false)
    );
    // console.log("articles:", articledata.data.articles);
    return {
      tab,
      articles: articledata.data.articles,
      userProfile: profiledata.data.profile,
    };
  },
  watchQuery: ["tab"],
  methods: {
    async onFavorite(item) {
      item.favoriteDisabled = true;
      if (item.favorited) {
        await deleteFavorite(item.slug);
        item.favorited = false;
        item.favoritesCount += -1;
      } else {
        await addFavorite(item.slug);
        item.favorited = true;
        item.favoritesCount += 1;
      }
      item.favoriteDisabled = false;
    },
    async followUser(username) {
      await followUser(username);
      this.userProfile.following = true;
    },
    async unfollowUser(username) {
      await unfollowUser(username);
      this.userProfile.following = false;
    },
  },
};
</script>

<style>
</style>