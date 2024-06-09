<template>
   <div>
      <h1>Страница с постами</h1>
      <my-input v-focus v-model="searchQuery" placeholder="Поиск..."></my-input>
      <div class="app__btns">
         <my-button>Создать пост</my-button>
         <my-select v-model="selectedSort" :options="sortOptions" />
      </div>

      <my-dialog v-model:show="dialogVisible">
         <post-form />
      </my-dialog>
      <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
      <div v-else>Идет загрузка...</div>
   </div>
</template>

<script>
import { usePosts } from "../../hooks/usePosts";
import { useSortedPosts } from "@/hooks/useSortedPosts";
import { useSortedAndSearchedPosts } from "@/hooks/useSortedAndSearchedPosts";
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
         dialogVisible: false,

         sortOptions: [
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
         ],
      };
   },
   setup(props) {
      const { posts, totalPage, isPostsLoading } = usePosts(10);
      const { sortedPosts, selectedSort } = useSortedPosts(posts);
      const { searchQuery, sortedAndSearchedPosts } =
         useSortedAndSearchedPosts(sortedPosts);
      return {
         posts,
         totalPage,
         isPostsLoading,
         sortedPosts,
         selectedSort,
         searchQuery,
         sortedAndSearchedPosts,
      };
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
