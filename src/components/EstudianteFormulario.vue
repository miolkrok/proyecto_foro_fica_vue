<template>
  <form @submit="onSubmit" class="formulario">
    <span class="p-float-label">
      <InputText class="input" id="cedula" v-model="datos.cedula" type="text" />
      <label for="cedula">Cédula</label>
    </span>

    <span class="p-float-label">
      <InputText class="input" id="nombre" v-model="datos.nombre" type="text" />
      <label for="nombre">Nombre</label>
    </span>

    <span class="p-float-label">
      <InputText
        class="input"
        id="apellido"
        v-model="datos.apellido"
        type="text"
      />
      <label for="apellido">Apellido</label>
    </span>

    <div class="suscripcion">
      <label for="suscripcion" class="ml-2"> Suscripción </label>
      <Checkbox
        v-model="datos.suscripcion"
        inputId="suscripcion"
        name="suscripcion"
        :binary="true"
      />
    </div>

    <Button
      v-if="!opciones"
      label="Agregar Imagen"
      icon="pi pi-camera"
      style="margin: 20px"
      @click="abrirOpciones"
    />

    <div v-else class="cargar-imagen">
      <input ref="inputFile" id="foto" type="file" @change="eleccionImagen" />

      <Button
        icon="pi pi-image"
        class="agregar-imagen"
        :label="labelFile"
        @click="abrirSelector"
      />
      Ó
      <Button
        icon="pi pi-link"
        class="agregar-imagen"
        :label="labelFile"
        @click="abrirImagenUrl"
      />
    </div>
    <div>
      <div v-if="showUrl" class="urlInput">
        <InputText
          type="text"
          v-model="url"
          placeholder="Ingresa url de imagen"
          @keyup.enter="cargarImagen"
        />
        <Button icon="pi pi-arrow-circle-right" @click="cargarImagen" />
      </div>
    </div>
    <div v-if="datos.imagen">
      <Avatar :image="datos.imagen" class="mr-2" size="xlarge" shape="circle" />
    </div>
    <Button label="Confirmar" severity="success" raised @click="confirmar" />
    <Toast />
  </form>
</template>

<script>
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default {
  components: { Button, InputText, Avatar, Toast, Checkbox },
  data() {
    return {
      toast: useToast(),
      datos: {
        cedula: "",
        nombre: "",
        apellido: "",
        imagen: "",
        suscripcion: false,
      },

      // Mostrar opciones de seleccion de imagen
      opciones: false,

      // Texto del Label de Inptut file
      labelFile: "Elegir Imagen",

      //Variables de manejo de imagen
      imgFile: null,
      url: null,

      showUrl: false,
    };
  },

  props: {
    estudiante: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    if (this.estudiante) {
      this.datos = this.estudiante;
      if (this.datos.imagen) {
        this.opciones = true;
      }
    }
  },

  methods: {
    abrirOpciones() {
      this.opciones = true;
    },

    eleccionImagen(event) {
      this.imgFile = event.target.files[0];

      if (this.imgFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.datos.imagen = event.target.result;
          this.opciones = true;
          this.showUrl = false;
          this.labelFile = "Cambiar Imagen";
        };
        reader.readAsDataURL(this.imgFile);
      } else {
        this.datos.imagen = "";
      }
    },

    abrirSelector() {
      this.$refs.inputFile.click();
    },

    abrirImagenUrl() {
      this.opciones = true;
      this.labelFile = "Cambiar Imagen";
      if (this.labelFile == "Cambiar Imagen") {
        this.datos.imagen = "";
        this.url = "";
      }
      this.showUrl = true;
    },

    cargarImagen() {
      this.datos.imagen = this.url;
      this.showUrl = false;
    },

    confirmar() {
      if (!this.datos.cedula || !this.datos.nombre || !this.datos.apellido) {
        this.toast.add({
          severity: "warn",
          summary: "Advertencia",
          detail: "Complete todos los campos",
          life: 3000,
        });
        return;
      }

      if (!this.datos.imagen) {
        this.datos.imagen =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
      }
      this.$emit("getEstudiante", this.datos);
    },
  },
};
</script>

<style scoped>
.formulario {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

span {
  margin-top: 30px;
  width: 90%;
}

.input {
  width: 100%;
}

.suscripcion {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10%;
  margin-top: 20px;
  font-size: 2.5vmin;
}

Button:hover {
  transform: scale(1.05);
}

.cargar-imagen {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px;
}

.urlInput {
  margin: 10px;
}

.agregar-imagen {
  transition: all 0.2s linear;
}

.agregar-imagen:hover {
  transform: scale(1.05);
}

#foto {
  display: none;
}
.mr-2 {
  margin: 15px;
}
</style>
