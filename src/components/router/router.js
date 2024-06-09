import Main from "../pages/Main";
import PostsPage from "../pages/PostsPage";
import PostIdPage from "../pages/PostIdPage";
import PostPageWithStore from "../pages/PostsPageWithStore";
import { createRouter, createWebHashHistory } from "vue-router";
import PostsPageCompositionApi from "@/components/pages/PostsPageCompositionApi";

const routes = [
   {
      path: "/",
      component: Main,
   },
   {
      path: "/posts",
      component: PostsPage,
   },
   {
      path: "/posts/:id",
      component: PostIdPage,
   },
   {
      path: "/store",
      component: PostPageWithStore,
   },
   {
      path: "/Api",
      component: PostsPageCompositionApi,
   },
];

const router = createRouter({
   routes,
   history: createWebHashHistory(process.env.BASE_URL),
});

export default router;
