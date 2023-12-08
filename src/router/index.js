// this file creates the router instance that is used by our application

// we start by importing the createRouter and createWebHistory functions, as well as the components describing each of our views
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormView from "../views/FormView.vue";
import FetchView from "../views/FetchView.vue";
import LoginView from "../views/LoginView.vue"; 
import HomescreenView from "../views/HomescreenView.vue";
import ManageView from "../views/ManageView.vue";
import ProfView from "../views/ProfView.vue";
import ManageProfView from "../views/ManageProfView.vue"
import AddClass from "../views/AddClass.vue";
import AddClassDone from "../views/AddClassDone.vue";
import AdvisingView from "../views/AdvisingView.vue";
import ViewSchedule from "../views/ViewSchedule.vue"



const router = createRouter({
  // the history mode determines how vue router interacts with the url.
  // createWebHistory() simulates the default browser behavior of changing
  // the path of the url based on the current document.
  // import.meta.env.BASE_URL is a vite feature that you don't need to worry about
  // and can safely use. it refers to the current path to the directory being
  // served by vite, which in this project is always the same directory
  // (and therefore import.meta.env.BASE_URL is '/')
  history: createWebHistory(import.meta.env.BASE_URL),
  

  // each entry to this routes array has a path (what goes in the URL to access
  // this page), a name (check out components/AppHeader.vue for how this is used)
  // and, most importantly, the component that should be rendered for the view
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/form",
      name: "form",
      component: FormView,
    },
    {
      path: "/fetch",
      name: "fetch",
      component: FetchView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/homescreen",
      name: "homescreen",
      component: HomescreenView,
    },
    {
      path: "/managescreen",
      name: "managescreen",
      component: ManageView,
    },
    {
      path: "/professorscreen/:id",
      name: "professorscreen",
      component: ProfView,
    },
    {
      path: "/professormanage/:id",
      name: "professormanage",
      component: ManageProfView,
    },
    {
      path: "/addclass",
      name: "addclass",
      component: AddClass,
    },
    {
      path: "/classadded",
      name: "classadded",
      component: AddClassDone,
    },
    {
      path: "/advisingcreen",
      name: "advisingcreen",
      component: AdvisingView,
    },
    {
      path: "/viewschedule",
      name: "viewschedule",
      component: ViewSchedule,
    },
  ],
});

export default router;
