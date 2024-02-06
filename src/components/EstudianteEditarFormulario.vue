<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Editar Estudiante"
    :style="{ width: '50vw' }"
    @hide="onDialogHide"
  >
    <EstudianteFormulario
      :estudiante="estudiante"
      @getEstudiante="editarEstudiante($event)"
    />
    <Toast />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import EstudianteFormulario from "./EstudianteFormulario.vue";
import { actualizarEstudianteFachada } from "@/helpers/EstudiaCliente";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
export default {
  components: { Dialog, EstudianteFormulario, Toast },
  data() {
    return {
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
    estudiante: {
      type: Object,
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

    editarEstudiante(estudiante) {
      console.log(estudiante);
      try {
        actualizarEstudianteFachada(estudiante, estudiante.id);
        this.toast.add({
          severity: "success",
          summary: "Exito",
          detail: "Se editó con exito",
          life: 3000,
        });
        this.visible = false;
      } catch {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "No se logro editar el estudiante",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style scoped></style>
