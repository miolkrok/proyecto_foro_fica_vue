<template>
  <div class="foro-editor">
    <h2>Crear un foro</h2>
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

    <label for="titulo">Titulo</label>
    <InputText id="titulo" v-model="titulo" />
    <label for="texto">Contenido</label>
    <Textarea id="texto" v-model="texto" autoResize rows="5" cols="30" />

    <Button
      class="boton"
      type="submit"
      icon="pi pi-plus"
      label="Agregar foro"
      raised
      @click="enviarFormulario()"
    />
    <Toast />
  </div>
</template>

<script>
import Toast from "primevue/toast";
import Editor from "primevue/editor";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { obtenerTodosEstudiantesFachada } from "@/helpers/EstudiaCliente";
import { createToast, obtenerFecha } from "@/helpers/Funciones";
import { crearForoFachada } from "../helpers/ForoCliente";
import Textarea from "primevue/textarea";

export default {
  components: { Toast, Button, Editor, InputText, Dropdown, Textarea },
  data() {
    return {
      titulo: "",
      texto: "",
      estudiantes: null,
      estudianteSeleccionado: null,
      check: false,
    };
  },
  props: {},
  async mounted() {
    this.estudiantes = await obtenerTodosEstudiantesFachada();
  },
  methods: {
    validarFormulario() {
      if (this.estudianteSeleccionado == null || this.titulo == "") {
        this.check = false;
        createToast(this.$toast, "warn", "no", "Un campo está vacío");
      } else {
        this.check = true;
      }
    },
    async enviarFormulario() {
      this.validarFormulario();
      if (this.check) {
        console.log(this.estudianteSeleccionado.id);
        const foro = {
          titulo: this.titulo,
          texto: this.texto,
          estudiante: this.estudianteSeleccionado,
          fecha: obtenerFecha(),
        };
        try {
          await crearForoFachada(foro);
          createToast(
            this.$toast,
            "success",
            "Completado",
            "Se ha creado un foro"
          );
          this.titulo = "";
          this.texto = "";
          this.estudiantes = null;
          this.estudianteSeleccionado = null;
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          createToast(this.$toast, "error", "Error", "Hubo un problema");
        }
      }
      this.check = false;
    },
  },
};
</script>

<style scoped>
.foro-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
