<template>
  <div class="sus">
    <SuscripcionInfo @crearEstudiante="crear" />

    <EstudianteCrearFormulario
      v-if="visibleAgregar"
      :visibilidad="visibleAgregar"
      @modal="modalAgregar($event)"
    />
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script>
import SuscripcionInfo from "../components/SuscripcionInfo.vue";
import Button from "primevue/button";
import EstudianteCrearFormulario from "@/components/EstudianteCrearFormulario.vue";

//Dialogo
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

export default {
  components: {
    SuscripcionInfo,
    Toast,
    ConfirmDialog,
    Button,
    EstudianteCrearFormulario,
  },
  data() {
    return {
      visibleAgregar: false,
      confirm: useConfirm(),
    };
  },

  methods: {
    crear() {
      this.confirm.require({
        message: "¿Desea ingresar un estudiante nuevo?",
        header: "Confirmación",
        icon: "pi pi-check-circle",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: async () => {
          this.abrirModalAgregar();
        },
      });
    },

    abrirModalAgregar() {
      this.visibleAgregar = !this.visibleAgregar;
    },
    modalAgregar(e) {
      this.visibleAgregar = e;
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.sus {
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
