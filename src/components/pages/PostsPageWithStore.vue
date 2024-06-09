<template>
   <div>
      <h1>Страница с постами</h1>
      <my-input
         v-focus
         :model-value="searchQuery"
         @update:model-value="setSearchQuery"
         placeholder="Поиск..."
      ></my-input>
      <div class="app__btns">
         <my-button @click="showDialog">Создать пост</my-button>
         <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions"
         />
      </div>

      <my-dialog v-model:show="dialogVisible">
         <post-form @create="createPost" />
      </my-dialog>

      <post-list
         :posts="sortedAndSearchedPosts"
         @remove="removePost"
         v-if="!isPostsLoading"
      />
      <div v-else>Идет загрузка...</div>

      <div v-intersection="loadMorePosts" class="observer"></div>

      <!-- <div class="page__wrapper">
         <div
            v-for="pageNumber in totalPage"
            :key="pageNumber"
            class="page"
            :class="{
               'current-page': page === pageNumber,
            }"
            @click="changePage(pageNumber)"
         >
            {{ pageNumber }}
         </div>
      </div> -->
   </div>
</template>

<script>
import PostForm from "../PostForm.vue";
import PostList from "../PostList.vue";
import MyButton from "../UI/MyButton.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
   components: { PostForm, PostList, MyButton },
   data() {
      components: {
         PostForm, PostForm;
      }
      return {
         dialogVisible: false,
      };
   },
   methods: {
      ...mapMutations({
         setPage: "post/setPage",
         setSearchQuery: "post/setSearchQuery",
         setSelectedSort: "post/setSelectedSort",
         setPosts: "post/setPosts",
      }),
      ...mapActions({
         loadMorePosts: "post/loadMorePosts",
         fetchPost: "post/fetchPost",
      }),
      createPost(post) {
         this.posts.push(post);
         this.dialogVisible = false;
      },
      removePost(post) {
         this.setPosts(this.posts.filter((p) => p.id !== post.id));
      },
      showDialog() {
         this.dialogVisible = true;
      },

      // changePage(pageNumber) {
      //    console.log(pageNumber);
      //    this.page = pageNumber;
      // },
   },
   mounted() {
      this.fetchPost();
   },
   computed: {
      ...mapState({
         posts: (state) => state.post.posts,
         isPostsLoading: (state) => state.post.isPostsLoading,
         selectedSort: (state) => state.post.selectedSort,
         searchQuery: (state) => state.post.searchQuery,
         page: (state) => state.post.page,
         limit: (state) => state.post.limit,
         totalPage: (state) => state.post.totalPage,
         sortOptions: (state) => state.post.sortOptions,
      }),
      ...mapGetters({
         sortedPosts: "post/sortedPosts",
         sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
      }),
   },
   watch: {
      // page() {
      //    this.fetchPost();
      // },
   },
};
</script>

<style>
.app__btns {
   margin: 15px 0;
   display: flex;
   justify-content: space-between;
}

.page__wrapper {
   display: flex;
   margin-top: 10px;
}

.page {
   border: 1px solid black;
   padding: 10px;
}

.current-page {
   border: 2px solid teal;
}
.observer {
   height: 30px;
   background: green;
}
</style>
