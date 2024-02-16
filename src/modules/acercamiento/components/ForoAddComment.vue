<template>
  <div class="add-comment-editor">
    <h3>Agregar un comentario</h3>
    <div class="autor">
      <label for="estudianteSeleccionado">Autor</label>
      <Dropdown
        id="estudianteSeleccionado"
        v-model="estudianteSeleccionado"
        :options="estudiantes"
        optionLabel="nombre"
        placeholder="Selecciona un autor"
      />
    </div>
    <label for="contenido">Contenido</label>
    <Textarea
      id="contenido"
      v-model="contenido"
      autoResize
      rows="5"
      cols="30"
    />
    <Button
      class="boton"
      type="submit"
      icon="pi pi-plus"
      label="Agregar comentario"
      @click="enviarFormulario()"
    />
    <Toast />
  </div>
</template>

<script>
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

import Button from "primevue/button";
import { createToast, obtenerFecha } from "@/helpers/Funciones";

import { obtenerTodosEstudiantesFachada } from "@/helpers/EstudiaCliente";

import { crearComentarioFachada } from "../helpers/ForoCliente";

export default {
  components: {
    Textarea,
    Dropdown,
    Button,
    Toast,
    InputText,
    Toast,
  },
  data() {
    return {
      contenido: "",
      estudiantes: null,
      estudianteSeleccionado: null,
    };
  },
  props: {
    foroId: {
      required: true,
      type: Number,
    },
  },
  async mounted() {
    this.estudiantes = await obtenerTodosEstudiantesFachada();
  },
  methods: {
    validarFormulario() {
      if (this.estudianteSeleccionado == null || this.contenido == "") {
        createToast(this.$toast, "warn", "Incompleto", "Un campo está vacío");
        return false;
      }
      return true;
    },
    async enviarFormulario() {
      if (this.validarFormulario()) {
        const comentario = {
          contenido: this.contenido,
          estudianteId: this.estudianteSeleccionado.id,
          fecha: obtenerFecha(),
          foroId: this.foroId,
        };
        try {
          await crearComentarioFachada(comentario);
          createToast(
            this.$toast,
            "success",
            "Completado",
            "Se ha creado un comentario"
          );
          this.$emit("getComentario",true);
        } catch (error) {
          createToast(this.$toast, "error", "Error", "Hubo un problema");
        }
      }
    },
  },
};
</script>

<style scoped>
.add-comment-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
}

label,
.p-inputtext {
  width: 100%;
}

label,
.boton {
  margin-top: 20px;
  margin-bottom: 5px;
}
#texto {
  text-anchor: start;
  height: 200px;
}
.autor {
  display: flex;
  flex-direction: column;
  width: 50%;
}

@media screen and (max-width: 600px) {
  .autor {
    width: 100%;
  }
}
</style>
