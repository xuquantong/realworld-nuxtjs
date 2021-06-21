<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment_content"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
    <div class="card" v-for="(item, index) in comments" :key="item.id">
      <div class="card-block">
        <p class="card-text">
          {{ item.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{ name: 'profile', params: { username: item.author.username } }"
        >
          <img :src="item.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="coment-author"
          :to="{ name: 'profile', params: { username: item.author.username } }"
          >{{ item.author.username }}</nuxt-link
        >
        <span class="date-posted">{{
          item.createAt | date("MMM DD,YYYY")
        }}</span>
        <span
          class="mod-options"
          v-if="user.username === item.author.username"
          @click="deleteComment(item.id, index)"
        >
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCommentsBySlug,
  addCommentToArticle,
  deleteComment,
} from "@/api/article";
import { mapState } from "vuex";
export default {
  middleware: "Authenticated",
  name: "articleCommnets",
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      comments: [], //所有的评论列表
      comment_content: "", //评论内容
    };
  },
  async mounted() {
    console.log("comments:", this.comments);
    const { data } = await getCommentsBySlug(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    async onSubmit() {
      try {
        const data = await addCommentToArticle(this.article.slug, {
          comment: {
            body: this.comment_content,
          },
        });
        this.comments.unshift(data.data.comment);
        this.comment_content = "";
      } catch (error) {
        console.log("error", error);
      }
    },
    async deleteComment(id, index) {
      try {
        console.log(this.comments);
        const data = await deleteComment(this.article.slug, id);
        this.comments.splice(index, 1);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>

<style>
</style>