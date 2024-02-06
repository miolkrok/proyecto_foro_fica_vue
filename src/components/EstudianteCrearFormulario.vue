<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Agregar Estudiante"
    :style="{ width: '50vw' }"
    @hide="onDialogHide"
  >
    <EstudianteFormulario
      :estudiante="{}"
      @getEstudiante="crearEstudiante($event)"
    />
    <Toast />
  </Dialog>
  <Toast />
</template>

<script>
import Dialog from "primevue/dialog";
import EstudianteFormulario from "./EstudianteFormulario.vue";
import { ingresarEstudianteFachada } from "@/helpers/EstudiaCliente";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default {
  components: { Dialog, EstudianteFormulario, Toast },
  data() {
    return {
      estudianteAux: {},
      visible: false,
      datos: null,
      toast: useToast(),
    };
  },

  props: {
    visibilidad: {
      type: Boolean,
      required: true,
    },
  },

  mounted() {
    this.visible = this.visibilidad;
  },

  methods: {
    onDialogHide() {
      if (!this.visible) {
        this.$emit("modal", false);
      }
    },

    crearEstudiante(estudiante) {
      estudiante.suscripcion = false;
      console.log(estudiante);
      try {
        ingresarEstudianteFachada(estudiante);
        this.toast.add({
          severity: "success",
          summary: "Exito",
          detail: "Se agrego con exito",
          life: 3000,
        });
        setTimeout(() => {
          this.visible = false;
        }, 1000);
      } catch {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "No se logro ingresar el estudiante",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style scoped></style>
