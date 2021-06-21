<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keyup.enter="addTagList"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) in tagList"
                    :key="tag"
                  >
                    <i class="ion-close-round" @click="deleteTag(index)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CreateArticle, getArticleBySlug, EditArticle } from "@/api/article";

export default {
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tag: "",
      tagList: [],
    };
  },
  async mounted() {
    const slug = this.$route.params.slug;
    console.log("slug:", this.$route);
    const { data } = await getArticleBySlug(slug);
    const article = data.article;
    this.title = article.title;
    this.description = article.description;
    this.body = article.body;
    this.tagList = article.tagList;
  },
  methods: {
    async onSubmit() {
      if (this.$route.params.slug) {
        const { editData } = await EditArticle(this.$route.params.slug, {
          article: {
            title: this.title,
            description: this.description,
            body: this.body,
          },
        });
        this.$router.push("/article/" + this.$route.params.slug);
      } else {
        const { data } = await CreateArticle({
          article: {
            title: this.title,
            description: this.description,
            body: this.body,
            tagList: this.tagList,
          },
        });
        // console.log("daattta:", data);
        this.$router.push("/article/" + data.article.slug);
      }
    },
    addTagList() {
      if (!this.tagList.includes(this.tag)) {
        this.tagList.push(this.tag);
        this.tag = "";
      } else {
        this.tag = "";
      }
      return false;
    },
    deleteTag(index) {
      this.tagList.splice(index, 1);
    },
  },
};
</script>

<style>
</style>