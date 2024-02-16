<template>
  <div v-if="comentarios" class="filtros">
    <div class="container-comment-action">
      <span class="sortBy">Ordenar por:</span>
      <div class="filtro-fecha">
        <Dropdown
          dropdownIcon="pi pi-calendar"
          class="opciones-fecha"
          v-model="fechaSeleccionada"
          :options="fechas"
          showClear
          optionLabel="name"
          placeholder="Por fecha"
        />
        <i class="pi pi-filter" id="boton-filtro" @click="filtrarPorFecha"></i>
      </div>
      <Divider class="linea" />
      <span>{{ numeroComentarios(comentarios.length) }}</span>
    </div>
  </div>
  <div v-if="comentarios" class="container-comment">
    <div v-for="comentario in comentariosAux" :key="comentario.id">
      <div class="credit-bar">
        <div class="credit-bar-items-left">
          <div class="avatar">
            <Avatar
              :image="comentario.estudianteTO.imagen"
              class="mr-2"
              shape="circle"
            />
          </div>

          <div class="author-info">
            <p class="author">
              {{ comentario.estudianteTO.nombre }}
              {{ comentario.estudianteTO.apellido }}
            </p>
            <p>{{ this.formatearFecha(comentario.fecha) }}</p>
          </div>

          <Button
            size="small"
            v-if="checked"
            text
            icon="pi pi-delete-left"
            severity="danger"
            rounded
            @click="eliminarComentario(comentario.id)"
          ></Button>
        </div>
      </div>
      <div class="container-content">
        <p>{{ comentario.contenido }}</p>
      </div>
      <Divider />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Column from "primevue/column";
import Avatar from "primevue/avatar";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import { useConfirm } from "primevue/useconfirm";
import Toast from "primevue/toast";
import {
  createToast,
  obtenerFecha,
  compararDia,
  compararSemana,
  compararMes,
  compararAnio,
} from "@/helpers/Funciones";
import { eliminarComentarioFachada } from "../helpers/ForoCliente";
export default {
  data() {
    return {
      confirm: useConfirm(),
      editar: false,
      comentariosAux: [],
      fechaSeleccionada: null,
      fechas: [
        { name: "Hoy", code: "HY" },
        { name: "Ultimos 7 dias", code: "U7" },
        { name: "Este mes", code: "EM" },
        { name: "Este año", code: "EA" },
      ],
    };
  },
  props: {
    comentarios: {
      type: Array,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Divider,
    Avatar,
    Button,
    Column,
    Dropdown,
    Toast,
  },

  mounted() {
    this.comentariosAux = this.comentarios;
  },
  methods: {
    numeroComentarios(numero) {
      return numero != 1 ? `${numero} comentarios` : `${numero} comentario`;
    },
    eliminarComentario(id) {
      this.confirm.require({
        message: "Se eliminará el comentario",
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          try {
            eliminarComentarioFachada(id);
            createToast(
              this.$toast,
              "success",
              "Completado",
              "Se ha eliminado el comentario"
            );
            this.comentariosAux = this.comentariosAux.filter(
              (comentario) => comentario.id !== id
            );
          } catch (error) {
            createToast(this.$toast, "error", "Error", "Hubo un problema");
          }
        },
      });
    },

    formatearFecha(fecha) {
      return fecha.replace("T", " / ");
    },

    filtrarPorFecha() {
      if (this.fechaSeleccionada) {
        switch (this.fechaSeleccionada.code) {
          case "HY":
            this.comentariosAux = this.comentarios.filter((noticia) => {
              compararDia(obtenerFecha(), noticia.fecha);
              console.log("actual: " + obtenerFecha());
              console.log(
                "fecha del comentario: " + this.formatearFecha(noticia.fecha)
              );
            });
            break;
          case "U7":
            this.comentariosAux = this.comentarios.filter((noticia) =>
              compararSemana(obtenerFecha(), noticia.fecha)
            );
            break;
          case "EM":
            this.comentariosAux = this.comentarios.filter((noticia) =>
              compararMes(obtenerFecha(), noticia.fecha)
            );
            break;
          case "EA":
            this.comentariosAux = this.comentarios.filter((noticia) =>
              compararAnio(obtenerFecha(), noticia.fecha)
            );
            break;
          default:
            this.comentariosAux = this.comentarios;
        }
      } else {
        this.comentariosAux = this.comentarios;
        console.log("No se selecciono.");
      }
    },
  },
};
</script>

<style scoped>
#boton-filtro {
  background: #64748b;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 2.5vmin;
  cursor: pointer;
  box-shadow: 0 2px 3px 0.5px gray;
}

#boton-filtro:hover {
  background: #475569;
}
.filtros {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
}
.filtro-fecha {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.container-comment-action {
  align-items: center;
  align-content: center;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 75%;
}
.linea {
  width: 100%;
}
span {
  font-size: 0.75rem;
  line-height: 1rem;
}
.container-comment {
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 20px;
  text-align: left;
  width: 100%;
}
.credit-bar {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  line-height: 1rem;
  padding-top: 1rem;
}

.credit-bar-items-left {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding-right: 0.5rem;
}

.author-info {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  align-self: center;
  flex-direction: row;
}

.topic-ago {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.25rem;
  flex-direction: row;
  flex: none;
  padding: 0px 0px;
}

.topic-ago,
p {
  margin-top: 2px;
  margin-bottom: 2px;
}

.container-content {
  padding-left: 2rem;
  margin-left: 0.5rem;
  display: inline-block;
  text-align: left;
  max-width: 100%;
  line-height: 1.25rem;
}
</style>
