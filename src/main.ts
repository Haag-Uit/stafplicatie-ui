import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";
import { createVueRouter } from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(createVueRouter(app));

app.use(
  createAuth0({
    domain: "dev-haaguit.eu.auth0.com",
    clientId: "E7G4Jj4FadD2e8tld15pLrhxgEwb52x1",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: "http://localhost:8080", // Important for access tokens!
      scope: "openid profile email ",
    },
  })
);
app.mount("#app");
