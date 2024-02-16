import { createRouter, createWebHistory } from "vue-router";
import tokenService from "@/services/tokenService";

const routes = [
  {
    path: "/",
    name: "autorizacion",
    component: () => import("@/views/AutorizacionView.vue"),
  },

  {
    path: "/inicio",
    name: "inicio",
    component: () => import("@/views/InicioView.vue"),
  },

  {
    path: "/noticias",
    name: "noticias",
    component: () => import("@/modules/publicacion/pages/NoticiasView.vue"),
    beforeEnter: (_to, _from, next) => {
      if (tokenService.isTokenValid()) {
        next();
      } else {
        next("/");
      }
    },
  },

  {
    path: "/foro",
    name: "foro",
    component: () => import("@/modules/acercamiento/pages/ForoView.vue"),
    beforeEnter: (_to, _from, next) => {
      if (tokenService.isTokenValid()) {
        next();
      } else {
        next("/");
      }
    },
  },

  {
    path: "/foro/:id",
    name: "foroPost",
    component: () => import("@/modules/acercamiento/pages/ForoPage.vue"),
    beforeEnter: (_to, _from, next) => {
      if (tokenService.isTokenValid()) {
        next();
      } else {
        next("/");
      }
    },
  },

  {
    path: "/suscripcion",
    name: "suscripcion",
    component: () => import("@/modules/acercamiento/pages/SuscripcionView.vue"),
    beforeEnter: (_to, _from, next) => {
      if (tokenService.isTokenValid()) {
        next();
      } else {
        next("/");
      }
    },
  },

  {
    path: "/quejas",
    name: "quejas",
    component: () => import("@/modules/publicacion/pages/QuejasView.vue"),
    beforeEnter: (_to, _from, next) => {
      if (tokenService.isTokenValid()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/estudiantes",
    name: "estudiantes",
    component: () => import("@/views/EstudiantesView.vue"),
    beforeEnter: (_to, _from, next) => {
      if (tokenService.isTokenValid()) {
        next();
      } else {
        next("/");
      }
    },
  },

  {
    path: "/:pathMatch(.*)*", //wildcard
    name: "error404",
    component: () => import("../views/NoEncontradoView"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
