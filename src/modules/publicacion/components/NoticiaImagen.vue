<template>
  <div>
    <div class="quitar">
      <Button id="quitar" icon="pi pi-minus" @click="quitar"  raised/>
    </div>
    <div class="cargar-imagen">
      <input ref="inputFile" id="foto" type="file" @change="eleccionImagen" />

      <Button
        icon="pi pi-image"
        id="agregar-imagen"
        :label="labelFile"
        @click="abrirSelector"
      />
      <i class="pi pi-minus" style="color: #3744b3; margin: 10px"></i>

      <Button
        icon="pi pi-link"
        id="agregar-imagen"
        :label="labelFile"
        @click="abrirImagenUrl"
      />
    </div>
    <div v-if="seleccionar">
      <div v-if="showUrl">
        <InputText
          id="urlInput"
          type="text"
          v-model="url"
          placeholder="Ingresa url de imagen"
          @keyup.enter="cargarImagen"
        />
        <Button icon="pi pi-arrow-circle-right" @click="cargarImagen" />
      </div>

      <div v-if="imagen" class="imagen-editor">
        <img
          :src="imagen"
          alt="imagen cargada"
          :style="{ width: 200 + 'px' }"
        />
      </div>
    </div>

    <Divider />
  </div>
</template>

<script>
import Button from "primevue/button";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";

export default {
  components: {
    Button,
    Divider,
    InputText,
  },
  data() {
    return {
      // Mostrar imagen seleccionada
      seleccionar: false,

      // Texto del Label de Inptut file
      labelFile: "Subir Imagen",

      //Variables de manejo de imagen
      imagen: null,
      imgFile: null,
      url: null,

      showUrl: false,
    };
  },

  props: {
    img: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.imagen = this.img;
    if (this.imagen) {
      this.seleccionar = true;
      this.labelFile = "Cambiar Imagen";
    }
  },

  methods: {
    eleccionImagen(event) {
      this.imgFile = event.target.files[0];

      if (this.imgFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imagen = event.target.result;
          this.seleccionar = true;
          this.showUrl = false;
          this.labelFile = "Cambiar Imagen";
        };
        reader.readAsDataURL(this.imgFile);
      } else {
        this.imagen = "";
      }
    },

    abrirSelector() {
      this.$refs.inputFile.click();
    },

    abrirImagenUrl() {
      this.seleccionar = true;
      this.labelFile = "Cambiar Imagen";
      if (this.labelFile == "Cambiar Imagen") {
        this.imagen = "";
        this.url = "";
      }
      this.showUrl = true;
    },

    cargarImagen() {
      this.imagen = this.url;
      this.showUrl = false;
    },

    quitar() {
      this.$emit("quitar");
    },
  },
};
</script>

<style scoped>
.cargar-imagen {
  margin: 30px;
}

.imagen-editor,
.img {
  border: solid gainsboro 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.imagen-editor {
  padding: 20px;
  gap: 20px;
}

.img {
  width: 100%;
  height: 350px;
  padding: 10px;
  border: solid gainsboro 1px;
}

#agregar-imagen {
  border-radius: 5px;
  background: #3744b3;
  transition: all 0.2s linear;
}

#agregar-imagen:hover {
  transform: scale(1.05);
}

.quitar {
  display: flex;
  justify-content: flex-end;
}

#quitar {
  height: 10px;
  background: #3744b3;
  margin-bottom: 10px;
  transition: all 0.2s linear;
}

#quitar:hover {
  transform: scale(1.05);
}

.slides {
  border: solid gainsboro 1px;
  display: flex;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  gap: 20px;
}

#foto {
  display: none;
}
</style>
