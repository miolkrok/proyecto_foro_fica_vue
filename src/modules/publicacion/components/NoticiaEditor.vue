<template>
  <div>
    <div class="titulo">
      <div>
        <Tag
          v-if="!titulo"
          class="tag-titulo"
          icon="pi pi-info-circle"
          severity="info"
          value="Ingrese título"
        ></Tag>
      </div>
      <InputText id="titulo" v-model="titulo" />
    </div>

    <div class="tipo">
      <div>
        <Tag
          class="tag-tipo"
          icon="pi pi-info-circle"
          severity="info"
          value="Ingrese el tipo de noticia"
        ></Tag>
      </div>
        <Dropdown
            dropdownIcon="pi pi-calendar"
            class="opciones-tipo"
            v-model="tipoSeleccionada"
            :options="tipos"
            showClear
            optionLabel="name"
            placeholder="Seleccionar tipo"
          />
    </div>

    <Tag
      v-if="!isTexto && !isImagen && !isVideo"
      class="tag"
      icon="pi pi-info-circle"
      severity="info"
      value="Elija al menos un componente de la noticia"
    ></Tag>



    <div class="noticias-admin">
      <NoticiaTexto
        class="componente"
        ref="notiTexto"
        v-if="isTexto"
        :texto="texto"
        @quitar="quitarTexto"
      />

      <NoticiaImagen
        class="componente"
        ref="notiImagen"
        v-if="isImagen"
        :img="imagen"
        :guardar="guardar"
        @quitar="quitarImagen"
      />

      <NoticiaVideo
        class="componente"
        ref="notiVideo"
        v-if="isVideo"
        :video="video"
        :guardar="guardar"
        @quitar="quitarVideo"
      />

      <div class="opciones">
        <div
          id="agregar-texto"
          :class="isTexto ? 'agregado' : 'agregar'"
          @click="addComponenteTexto()"
        >
          <img :src="addTextIcon" />
        </div>

        <div
          id="agregar-imagen"
          :class="isImagen ? 'agregado' : 'agregar'"
          @click="addComponenteImagen()"
        >
          <img :src="addImageIcon" />
        </div>

        <div
          id="agregar-video"
          :class="isVideo ? 'agregado' : 'agregar'"
          @click="addComponenteVideo()"
        >
          <img :src="addVideoIcon" />
        </div>
      </div>



      <div class="fuente">
      <div>
        <Tag
          class="tag-fuente"
          icon="pi pi-info-circle"
          severity="info"
          value="Ingrese Referencia o Fuente"
        ></Tag>
      </div>
      <InputText id="fuente" v-model="fuente" />
      </div>



      
      <div class="boton">
        <Button icon="pi pi-eraser" label="Limpiar" @click="limpiar" raised />
        <Button
          v-if="!editar"
          icon="pi pi-check"
          @click="guardarNoticia"
          label="Guardar"
          severity="success"
          raised
        />
        <Button
          v-else
          icon="pi pi-refresh"
          @click="actualizarNoicia"
          label="Actualizar"
          severity="success"
          raised
        />
      </div>
    </div>
  </div>
</template>

<script>
import NoticiaTexto from "./NoticiaTexto.vue";
import NoticiaImagen from "./NoticiaImagen.vue";
import NoticiaVideo from "./NoticiaVideo.vue";
import Tag from "primevue/tag";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import NoticiaLecturaVue from "./NoticiaLectura.vue";
import Dropdown from 'primevue/dropdown';

//Dialogo
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

//Helpers
import {
  ingresarNoticiaFachada,
  actualizarNoticiaFachada,
} from "@/modules/publicacion/helpers/NoticiaCliente";
import { obtenerFecha } from "@/helpers/Funciones";

export default {
  components: {
    NoticiaTexto,
    NoticiaImagen,
    NoticiaVideo,
    NoticiaLecturaVue,
    InputText,
    Button,
    Tag,
    Dropdown,
  },
  data() {
    return {
      toast: useToast(),
      confirm: useConfirm(),
      //Iconos de opciones
      addTextIcon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB0UlEQVR4nO2Wyy4EURCGP2ESQoaNWEqskCBI3B6ABxh7HoAXsMfCmBiXNXsewNhYsbHDemKBiIUYxGVcWk7yT9JppvtM62mb+ZNKTqoq5/9Pna46DTXUUEN49AOOrI9/wLJLwFLc5HVAHviS5eWLDRM6+RFwrPV4nAI2RDoHzGu9Hhd5A3ADfAAdQDvwDtwqVnVM6cT7Ll9Ovsk4BOyIbMblm5Vvu9rkjcA98AK0uvxJ4BkoAE3VFDCtk+7+EttTLFVNAXs+JCnFDoE0cAY8AE/AOZABev9CnlTpC7oKL9rUDY6Pmc7JAokwAmYDNi/Zq2bCKNAsG9PseFPOQRgROQvyS2DAZ49B4Eq5a5WQd6i8ZgDVe2JdwKdO7iUvCXNjSJUw+/XYCvAbtyuKmbvFQoDBpvyrtgKOfB6cE8VGKhAwJv+ZDXmnntyLMk/unTZr8ZCWM5TrqE0DsaDkxTLxhxACkloXbAScBvx2nStu2s72CsYruYIgZLSZ6XNbAVvyp4kAvZpwb+rzIAHDQFFt2E1EyIro6hcRXvJr5ZrKRYaExqujSmzqnltkEyp7UTm5sO8BASLMePV7kEzMnDxycjfMN2EmnPnCH2VmbT64H6P3G3T4uKVKoS1cAAAAAElFTkSuQmCC",
      addImageIcon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEUklEQVR4nO2bz29VRRTHP4ClVQok/FiYlkAgFhMSEkiEnWmLxsiCHT+iC3caiBBXbAj8A4QVASMstUJbwYWSuFGTpoBCQQ1UFjSQEGMMFkNbUn5E3yNjzktujnNvZ6bzbu/z3W9yFu/emTP3fO85Z2bO3AclSpQoUaJEiRL/RStwAPgBeARUG0weybPvF1u80AH8XAAjYslPYpMTWv9nxidJcPKEAwV42HrJhy4E/Kg6fe3jPgVCJ3BB2XLZpeOU6mQUNSpWKVsmXTpVlTQ6vO2plgRQOA8wYTgoLmzkPNDVLB7QCTywPNcDx/zU8AQMZkxrA81AwGQGARPNTsDDZiDgXAYBXzQDAV0ZSfCVZiAAyfYDEvMT8uZdjJ8zAjqBNygGcidgiWynp4FumoyAVuB7tfnYwtxC7wjrRsB84GxKstrI3GI7cKfeBBzLmK7+8Fi7a6wD9gKfA9eBceCZyLhc65M2azP0LHVcORJCwEcZxtfkHrDaUd8CYA8wDFQcdNekIn12i0cGoepJwC7gH9XnN+C0Rddt4OUZ9JnZ45aH0WkyCvTWm4DXgSeW5amJ+XnAKYu+m0C7RdeLwCcRDNdyEmirBwEbgL9U26eKdeOGn6k2g0JOEiuBKxluPQIclml1PbBI5FW5dljapIWLOR9YEZOADolp/aDvWNq+AHwpbe7KOkEb/2uK4Wc9k6dp259CxKgrCdUZCDDZ9BdLu4MzrA++Ad62uP2VlFzxGuEwa4+xFE9omw0BC4HvLG2OOzxUi+WaLea/BZYxeywTXVr/iVAC5slcrO+fC5xy3kwxviXw+WxoSSGhN2SAo5Z7w+LGvlhgmepuO755HwIMllvCYTTrpVUtA9iOy26J8hDssSQ815j3JcBgqyUxmvWL0wA7gL/Vtd+BNYTjotJ3xqNvCAHI7JDsN+Q6wGP12+zwNhGOdeptVDynulACuizjrnEZIClmA/IWs8M+pfOqZ/9QAgyuqb4fuAyQZOw9Zo8+pdes4vIi4Ijq+6nLADU5RBxcV3q7cySgR/UdcRnAyMfEw7jS3eURgiGSxHp1774LAV/Jej4Wnir97TkS0K7uPXEh4KWIxtsIWJwjAYtDCIiNhguB2Gi4JBgbhZ8Gp+r8kdRel7eQ00LofZfP5C5EJmFtgZbCq20N90dOQtOWTD+s2vTnQMCA62aoVT4rjUnCu2qM3ep+xeMILdZ2eGdWh47IJJjzQl0QGVVtxnIsiNxwqWItlG9rL1sSY4hsVvq35VQS0zXMSkFOrf/FyRQSQitNSSxPqQe6FHBzQ5uUqvVDjknchmJrSln8UsifJ+qNFZZ8UHPV/oCDkYGUg5GbkTyrbiTYPKFGxIis4nrkOCx5NNYj965lHI1dKrLxyXA4EXn6rUjMF87ts9CbEhK+cqNI2d4X86VuPxTwgcSQLHKCP5CgYDCla1O9NcfsJheYeoIpqhj5U66ZXZ3Z2HifVTwHtdLH00kHcEoAAAAASUVORK5CYII=",
      addVideoIcon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABzElEQVR4nO2ZwUrDQBCGv2qFevUNRF9A8aAtXpS+g9p48a7QevBowIuvYH2UXouvoOjBgwoWBevJ3ioLG1hCNm2S3bAp+8NA2jS7/787O83MgIeHRxJWgDbQA64MW0+OXccS9oEXYGrZnoGWDfKTEshHNgGaJt1GXfkf4A64NWx9YKzM82TKndox8uvYw0ZMxIGJQS+VAcXK24bYiWg+cbB1WAZ2pKXuVKgMKK5tY9Z8DeAceFN+9wrs5R3QNHTzRcTfNQf/G1hzUUAjhfinPJfR5zPXBDxoiH9IUULcjfL9tWsCpjEbyX/t1Sz8XBAwSiBuXUAN6EgT1/PiKOYqF9JVdLAmoKM8J67JKOJ0BnHrAspyvdAL0MDvQFkutAQECRnWQHlukHA/yBidrAkICiQuWaNTEryAmlzJeIY1VFZ6mHD/xBUX0sFHoTnhd2BhXSgoEC6PXXiZi6JT1mgjyDvxOl35hCYvFiqlrHxSH1a9rBJmKGx9uVrYmre0uEsFi7tbwPas4q5aXh/LErgtbAK/psvrddn2UUX0LfTI7mPkH032y1olt5j+0nw6L5qy7WObvFh5ba2/KMTBOQS6FnpkXenzYg4PDw+K4R8FDBmIvGSb5gAAAABJRU5ErkJggg==",

      
      
      //If para crear componentes
      isTexto: false,
      isImagen: false,
      isVideo: false,

      titulo: "",

      tipo: "",


      texto: "",
      imagen: "",
      video: "",

      fuente: "",

      editar: false,

      //Datos obtenidos de los componentes
      textoObtenido: null,
      imagenObtenido: null,
      videoObtenido: null,



      tipoSeleccionada: null,
      tipos: [
        { name: "Tecnologia y Ciencia", code: "TC" },
        { name: "Eventos UCE", code: "EV" },
        { name: "Admisiones", code: "AD" },
        { name: "Información General", code: "IG" },
        { name: "Empleos y Pasantias", code: "EP" },
        { name: "Cultural", code: "CT" },
        { name: "Cursos", code: "CS" },
      ],
    };
  },

  props: {
    //Noticia traida para editar
    noticia: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    if (this.noticia.titulo) {
      this.editar = true;
      this.titulo = this.noticia.titulo;


      if(this.noticia.tipo){
        this.isTipo = true;
        this.tipo = this.noticia.tipo;
      }

      if (this.noticia.texto) {
        this.isTexto = true;
        this.texto = this.noticia.texto;
      }

      if (this.noticia.imagen) {
        this.isImagen = true;
        this.imagen = this.noticia.imagen;
      }

      if (this.noticia.video) {
        this.isVideo = true;
        this.video = this.noticia.video;
      }

      if(this.noticia.fuente){
        this.fuente = this.noticia.fuente;
      }
    }
  },

  methods: {
    addComponenteTexto() {
      this.isTexto = true;
    },
    addComponenteImagen() {
      this.isImagen = true;
    },
    addComponenteVideo() {
      this.isVideo = true;
    },
    quitarTexto() {
      this.confirm.require({
        message: "Se eliminará el componente",
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          this.texto = "";
          this.isTexto = false;
        },
      });
    },
    quitarImagen() {
      this.confirm.require({
        message: "Se eliminará el componente",
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          this.imagen = "";
          this.isImagen = false;
        },
      });
    },
    quitarVideo() {
      this.confirm.require({
        message: "Se eliminará el componente",
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          this.video = "";
          this.isVideo = false;
        },
      });
    },

    limpiar() {
      this.confirm.require({
        message: "Seguro que desea limpiar los campos de la noticia",
        header: "Se limpiaran los campos",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          this.titulo = "";
          this.tipo = "";
          this.isTexto = false;
          this.isImagen = false;
          this.isVideo = false;
          this.fuente = "";
        },
      });
    },

    obtenerDatosComponentes() {
      const notiTexto = this.$refs.notiTexto;
      let countComponentes = 0;
      if (notiTexto) {
        if (notiTexto.value) {
          countComponentes++;
          this.textoObtenido = notiTexto.value;
        } else {
          this.toast.add({
            severity: "warn",
            summary: "Advertencia",
            detail: "Ingrese texto o elimine el componente",
            life: 3000,
          });
          return false;
        }
      }
      const notiImagen = this.$refs.notiImagen;
      if (notiImagen) {
        if (notiImagen.imagen) {
          countComponentes++;
          this.imagenObtenido = notiImagen.imagen;
        } else {
          this.toast.add({
            severity: "warn",
            summary: "Advertencia",
            detail: "Ingrese imagen o elimine el componente",
            life: 3000,
          });
          return false;
        }
      }
      const notiVideo = this.$refs.notiVideo;
      if (notiVideo) {
        if (notiVideo.urlEmbed) {
          countComponentes++;
          this.videoObtenido = notiVideo.urlEmbed;
        } else {
          this.toast.add({
            severity: "warn",
            summary: "Advertencia",
            detail: "Ingrese video o elimine el componente",
            life: 3000,
          });
          return false;
        }
      }

      if (countComponentes < 1) {
        this.toast.add({
          severity: "warn",
          summary: "Advertencia",
          detail: "Se debe ingresar al menos un componente",
          life: 3000,
        });
        return false;
      } else {
        return true;
      }
    },

    guardarNoticia() {
      if (this.titulo) {
        if (this.obtenerDatosComponentes()) {
          const ntc = {
            titulo: this.titulo,
            tipo: this.tipoSeleccionada.name,
            texto: this.textoObtenido,
            imagen: this.imagenObtenido,
            video: this.videoObtenido,
            fuente: this.fuente,
            fechaPublicacion: obtenerFecha(),
          };
          try {
            ingresarNoticiaFachada(ntc);
            this.toast.add({
              severity: "success",
              summary: "Creado",
              detail: "Se ingresó la noticia",
              life: 1000,
            });
            setTimeout(() => {
              window.location.reload();
            },1200);
          } catch (error) {
            console.log("No se pudo guardar la noticia: ");
          }
        }
      } else {
        this.toast.add({
          severity: "warn",
          summary: "Advertencia",
          detail: "Se debe ingresar un título",
          life: 3000,
        });
      }
    },

    actualizarNoicia() {
      //Actualizar la noticia
      if (this.titulo && this.obtenerDatosComponentes()) {
        const ntc = {
          titulo: this.titulo,
          tipo: this.tipoSeleccionada.name,
          texto: this.textoObtenido,
          imagen: this.imagenObtenido,
          video: this.videoObtenido,
          fuente: this.fuente,
          fechaPublicacion: this.noticia.fechaPublicacion,
        };

        this.confirm.require({
          message: "Se editará la noticia",
          header: "Confirmación de Actualización",
          icon: "pi pi-check-circle",
          acceptLabel: "Sí",
          rejectLabel: "No",
          accept: () => {
            try {
              actualizarNoticiaFachada(ntc, this.noticia.id);
              window.location.reload();
            } catch (error) {
              console.log("No se pudo actualizar la noticia: ", error);
            }
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.componente {
  width: 90%;
}

.tag,
.tag-titulo {
  margin: 20px;
  background: #bcc1ee;
  transition: all 0.2s linear;
}

.tag-titulo {
  margin: 0;
  margin-bottom: 5px;
}

.tag-tipo {
  margin: 20px;
  background: #bcc1ee;
  transition: all 0.2s linear;
}

.tag-fuente {
  margin: 20px;
  background: #bcc1ee;
  transition: all 0.2s linear;
}

#fuente{
  align-items: flex-start;
  margin: 20px;
  width: 600px; /* Ajusta el ancho según tus preferencias */
  height: 100px; /* Ajusta la altura según tus preferencias */
  font-size: 16px;
}

.titulo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titulo {
  align-items: flex-start;
  margin: 20px;
}

.noticias-admin {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  gap: 20px;
  width: 100%;
}

#titulo {
  color: black;
  font-weight: bold;
}

.opciones {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.agregar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 10px grey;
  transform-style: preserve-3d;
  transform: rotateY(360deg);
  transition: transform 0.6s;
  animation: girar 1.6s ease-in-out;
}

@keyframes girar {
  100% {
    transform: rotateY(0deg);
  }
}

.agregado {
  display: flex;
  background: gainsboro;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.agregar:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.opciones-tipo {
  display: flex;
  align-items: center;
  height: 30px;
}

.opciones img {
  width: 20px;
  height: 20px;
}

.boton {
  display: flex;
  gap: 10px;
}

button {
  margin-top: 30px;
  background: #3744b3;
  transition: all 0.3s linear;
}

button:hover {
  transform: scale(1.05);
}
</style>
