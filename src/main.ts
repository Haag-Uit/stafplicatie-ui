import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";
import { createVueRouter } from "./router";
import { i18n } from "./i18n/i18n";

const app = createApp(App);

app.use(createPinia());
app.use(createVueRouter(app));
app.use(i18n);

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: "openid profile email ",
    },
  })
);
app.mount("#app");
