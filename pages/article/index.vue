<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile',
              params: { username: article.author.username },
            }"
            ><img :src="article.author.image"
          /></nuxt-link>
          <div class="info">
            <nuxt-link
              class="author"
              :to="{
                name: 'profile',
                params: { username: article.author.username },
              }"
              >{{ article.author.username }}</nuxt-link
            >
            <span class="date">{{
              article.createAt | date("MMM DD, YYYY")
            }}</span>
          </div>
          <template v-if="user.username !== article.author.username">
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ article.author.username }}
              <span class="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </template>
          <template v-else>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-edit"></i>
              &nbsp; Edit Article
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-trash-a"></i>
              &nbsp; Delete Article
            </button>
          </template>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile',
              params: { username: article.author.username },
            }"
            ><img :src="article.author.image"
          /></nuxt-link>
          <div class="info">
            <nuxt-link
              class="author"
              :to="{
                name: 'profile',
                params: { username: article.author.username },
              }"
              >{{ article.author.username }}</nuxt-link
            >
            <span class="date">{{
              article.createAt | date("MMM DD, YYYY")
            }}</span>
          </div>
          <template v-if="user.username !== article.author.username">
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ article.author.username }}
              <span class="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </template>
          <template v-else>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary"
              :to="{ name: 'editor', params: { slug: article.slug } }"
            >
              <i class="ion-edit"></i>
              &nbsp; Edit Article
            </nuxt-link>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm btn-outline-primary"
              :disabled="isDeleting"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              &nbsp; Delete Article
            </button>
          </template>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleBySlug, DeleteArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleComments from "./components/article-comments";
import { mapState } from "vuex";

export default {
  name: "ArticleIndex",
  data() {
    return {
      isDeleting: false,
    };
  },
  async asyncData({ params }) {
    const { data } = await getArticleBySlug(params.slug);
    console.log("dagta:", data);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  components: {
    ArticleComments,
  },
  methods: {
    async deleteArticle() {
      this.isDeleting = true;
      await DeleteArticle(this.article.slug);
      this.isDeleting = false;
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style>
</style>