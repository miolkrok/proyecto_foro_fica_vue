import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import "./css/estilos.css";
import VueParticles from "vue-particles";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(VueParticles);
app.use(ToastService);
app.use(ConfirmationService);
app.mount("#app");
