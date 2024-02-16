<template>
  <div class="formulario-contenedor">
    <form @submit="onSubmit" class="formulario">
      <h2 style="color: #6f4dff">Formulario de Queja</h2>
      <span class="p-float-label">
        <InputText class="input" id="value" v-model="cedula" type="text" />
        <label for="value">Cedula</label>
      </span>

      <span class="p-float-label">
        <Textarea
          class="input"
          v-model="descripcion"
          autoResize
          rows="5"
          cols="30"
        />
        <label for="value">Descripción</label>
      </span>
      <div class="botones">
        <Button label="Enviar" icon="pi pi-check" @click="enviar" raised />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="cancelar"
          severity="secondary"
          raised
        />
      </div>
    </form>
    <Toast />
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

//Dialogo
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

//Helpers
import { obtenerEstudianteFachada } from "@/helpers/EstudiaCliente";
import { ingresarQuejaFachada } from "@/modules/publicacion/helpers/QuejaCliente";
import { obtenerFecha } from "@/helpers/Funciones";

export default {
  components: {
    InputText,
    Textarea,
    Button,
    Toast,
  },
  data() {
    return {
      cedula: null,
      descripcion: null,
      toast: useToast(),
      estudiante: null,
    };
  },

  methods: {
    async enviar() {
      if (!this.cedula) {
        this.toast.add({
          severity: "warn",
          summary: "Advertencia",
          detail: "Se debe ingresar una cédula",
          life: 3000,
        });
        return;
      }
      if (!this.descripcion) {
        this.toast.add({
          severity: "warn",
          summary: "Advertencia",
          detail: "Se debe ingresar la descripción",
          life: 3000,
        });
        return;
      }

      try {
        this.estudiante = await obtenerEstudianteFachada(this.cedula);
      } catch (error) {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error al obtener estudiante",
          life: 3000,
        });
        return;
      }

      const queja = {
        estudiante: this.estudiante,
        descripcion: this.descripcion,
        fechaPublicacion: obtenerFecha(),
      };

      try {
        await ingresarQuejaFachada(queja);
        this.toast.add({
          severity: "success",
          summary: "Exito",
          detail: "Se ingreso la queja con exito",
          life: 3000,
        });
        window.location.reload();
      } catch (error) {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error al ingresar queja",
          life: 3000,
        });
      }
    },

    cancelar() {
      this.$emit("cancelar", false);
    },
  },
};
</script>

<style scoped>
.formulario-contenedor {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  animation: fade 0.3s linear;
}

@keyframes fade {
  to {
    opacity: 0.5;
    transform: scale(1);
  }
  from {
    opacity: 1;
    transform: scale(0);
  }
}

.formulario {
  width: 50%;
  padding: 2%;
  background: white;
  box-shadow: 0 0 10px grey;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

span {
  margin-top: 20px;
  width: 80%;
}

.input {
  width: 100%;
}

Button:hover {
  transform: scale(1.05);
}

.botones {
  display: flex;
  margin-top: 10px;
  gap: 10px;
}
</style>
