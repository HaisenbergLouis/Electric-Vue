import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

// RouteRecordRaw：路由规则的TS类型约束，规范每一条路由对象格式
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/view/Home.vue"),
  },
  {
    path: "/goods",
    name: "Goods",
    component: () => import("@/view/Goods.vue"),
  },
  {
    path: "/goods/new",
    name: "NewGoods",
    component: () => import("@/view/Newgoods.vue"),
  },
  {
    path: "/goods/discount",
    name: "LimitSpecial",
    component: () => import("@/view/LimitSpecial.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/view/About.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/view/Cart.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/view/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/view/Register.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
