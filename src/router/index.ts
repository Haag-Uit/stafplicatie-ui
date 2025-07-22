import { createRouter, createWebHistory, type Router } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import type { App } from "vue";
import CampyearIndex from "@/views/campyear/CampyearIndex.vue";
import CampyearCreate from "@/views/campyear/CampyearCreate.vue";
import CampyearEdit from "@/views/campyear/CampyearEdit.vue";
import ParticipantIndex from "@/views/participant/ParticipantIndex.vue";
import ParticipantView from "@/views/participant/ParticipantView.vue";
import UserIndex from "@/views/users/UserIndex.vue";
import UserCreate from "@/views/users/UserCreate.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import VolunteerIndex from "@/views/volunteer/VolunteerIndex.vue";
import VolunteerForm from "@/views/volunteer/VolunteerFormView.vue";
import VolunteerPersonSearch from "@/views/volunteer/VolunteerPersonSearch.vue";

export function createVueRouter(app: App): Router {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "dashboard",
        component: DashboardView,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/kampjaar",
        name: "campyearIndex",
        component: CampyearIndex,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/kampjaar/aanmaken",
        name: "campyearCreate",
        component: CampyearCreate,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/kampjaar/:year/wijzigen",
        name: "campyearEdit",
        component: CampyearEdit,
        beforeEnter: createAuthGuard(app),
        props: true,
      },
      {
        path: "/inschrijving",
        name: "participantIndex",
        component: ParticipantIndex,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/inschrijving/:id",
        name: "participantView",
        component: ParticipantView,
        beforeEnter: createAuthGuard(app),
        props: true,
      },
      {
        path: "/gebruiker",
        name: "userIndex",
        component: UserIndex,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/gebruiker/aanmaken",
        name: "userCreate",
        component: UserCreate,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/medewerker",
        name: "volunteerIndex",
        component: VolunteerIndex,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/medewerker/aanmaken",
        name: "volunteerCreateSearch",
        component: VolunteerPersonSearch,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/medewerker/aanmaken/persoon/:personId",
        name: "volunteerCreate",
        component: VolunteerForm,
        beforeEnter: createAuthGuard(app),
      },

      // Catch-all route for 404 Not Found
      {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: NotFoundView,
        beforeEnter: createAuthGuard(app),
      },
    ],
  });
}

export default createVueRouter;
