<template>
   <div>
      <h1>Страница с постами</h1>
      <my-input v-focus v-model="searchQuery" placeholder="Поиск..."></my-input>
      <div class="app__btns">
         <my-button @click="showDialog">Создать пост</my-button>
         <my-select v-model="selectedSort" :options="sortOptions" />
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
import axios from "axios";
export default {
   components: { PostForm, PostList },
   data() {
      components: {
         PostForm, PostForm;
      }
      return {
         posts: [],
         dialogVisible: false,
         isPostsLoading: false,
         selectedSort: "",
         searchQuery: "",
         page: 1,
         limit: 10,
         totalPage: 0,
         sortOptions: [
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
         ],
      };
   },
   methods: {
      createPost(post) {
         this.posts.push(post);
         this.dialogVisible = false;
      },
      removePost(post) {
         console.log(this.posts)
         this.posts = this.posts.filter((p) => p.id !== post.id);
      },
      showDialog() {
         this.dialogVisible = true;
      },
      async fetchPost() {
         try {
            console.log("2");
            this.isPostsLoading = true;
            const response = await axios.get(
               "https://jsonplaceholder.typicode.com/posts",
               {
                  params: {
                     _page: this.page,
                     _limit: this.limit,
                  },
               }
            );
            this.totalPage = Math.ceil(
               response.headers["x-total-count"] / this.limit
            );
            this.posts = response.data;
         } catch (e) {
            console.log(e);
         } finally {
            this.isPostsLoading = false;
         }
      },
      async loadMorePosts() {
         try {
            console.log("1");
            this.page += 1;
            const response = await axios.get(
               "https://jsonplaceholder.typicode.com/posts",
               {
                  params: {
                     _page: this.page,
                     _limit: this.limit,
                  },
               }
            );
            this.totalPage = Math.ceil(
               response.headers["x-total-count"] / this.limit
            );
            this.posts = [...this.posts, ...response.data];
         } catch (e) {
            console.log(e);
         }
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
      sortedPosts() {
         return [...this.posts].sort((post1, post2) =>
            post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
         );
      },
      sortedAndSearchedPosts() {
         return this.sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
         );
      },
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
