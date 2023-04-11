import router from ".";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "/camera", component: () => import("pages/CameraPage.vue") },
      { path: "/signin", component: () => import("pages/SigninPage") },
      { path: "/signup", component: () => import("pages/SignupPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requireAuth)) {
//     if (localStorage.getItem("jwt") == null) {
//       next({
//         path: "/signin",
//         params: { nextUrl: to.fullPath },
//       });
//     } else {
//       console.log("Logged in");
//       next();
//     }
//   } else {
//     console.log("Doesn't need auth");
//     next();
//   }
// });

export default routes;
