<template>
  <div class="foro">
    <div class="switch">
      <InputSwitch
        v-model="checked"
        @change="mensajeVista"
        @click="edicion = !edicion"
        v-if="!edicion"
      />
    </div>

    <h2 v-if="!edicion">Foros</h2>
    <div class="filtros" v-if="!edicion">
      <span>Filtrar</span>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          v-model="busqueda"
          placeholder="Por título"
          @keyup="filtrarForosPorTitulo"
        />
      </span>

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
    </div>
    <div v-if="checked" class="foro-editor">
      <ForoEditor />
      <Button
        class="boton"
        severity="secondary"
        icon="pi pi-times"
        label="Cancelar"
        style="margin-top: 20px"
        raised
        @click="cancelar"
      />
    </div>

    <div v-else class="foro-lectura">
      <ForoLectura v-if="foros && !edicion" :check="true" :foros="forosAux" />
    </div>
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script>
import InputSwitch from "primevue/inputswitch";
import ForoLectura from "./ForoLectura.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import SelectButton from "primevue/selectbutton";
import Panel from "primevue/panel";
import Dropdown from "primevue/dropdown";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import ForoEditor from "../components/ForoEditor.vue";

//import { useConfirm } from "primevue/useconfirm";
import {
  obtenerFecha,
  compararDia,
  compararSemana,
  compararMes,
  compararAnio,
  createToast,
} from "@/helpers/Funciones";
import { obtenerForosFachada } from "@/modules/acercamiento/helpers/ForoCliente.js";
export default {
  components: {
    ForoEditor,
    ForoLectura,
    SelectButton,
    InputSwitch,
    InputText,
    Button,
    Panel,
    Dropdown,
    Toast,
    ConfirmDialog,
  },

  data() {
    return {
      confirm: useConfirm(),
      edicion: false,
      foros: [],
      numero: 23,
      busqueda: "",
      checked: false,
      foroEditor: false,
      forosAux: [],
      fechaSeleccionada: null,
      fechas: [
        { name: "Hoy", code: "HY" },
        { name: "Ultimos 7 dias", code: "U7" },
        { name: "Este mes", code: "EM" },
        { name: "Este año", code: "EA" },
      ],
    };
  },
  async mounted() {
    this.foros = await obtenerForosFachada();
    this.forosAux = this.foros;
    this.mensajeVista();
  },
  methods: {
    cancelar() {
      this.confirm.require({
        message: "Se cancelará la edición",
        header: "Confirmación de Edición",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          window.location.reload();
        },
      });
    },

    mensajeVista() {
      if (this.checked) {
        createToast(
          this.$toast,
          "info",
          "Modo Administrador",
          "Estas en la vista de administrador"
        );
      } else {
        createToast(
          this.$toast,
          "info",
          "Modo Lectura",
          "Estas en la vista de solo lectura"
        );
      }
    },

    filtrarForosPorTitulo() {
      if (this.busqueda) {
        this.forosAux = this.foros.filter((foro) =>
          foro.titulo.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      } else {
        this.forosAux = this.foros;
      }
    },

    filtrarPorFecha() {
      if (this.fechaSeleccionada) {
        switch (this.fechaSeleccionada.code) {
          case "HY":
            this.forosAux = this.foros.filter((noticia) =>
              compararDia(obtenerFecha(), noticia.fecha)
            );
            break;
          case "U7":
            this.forosAux = this.foros.filter((noticia) =>
              compararSemana(obtenerFecha(), noticia.fecha)
            );
            break;
          case "EM":
            this.forosAux = this.foros.filter((noticia) =>
              compararMes(obtenerFecha(), noticia.fecha)
            );
            break;
          case "EA":
            this.forosAux = this.foros.filter((noticia) =>
              compararAnio(obtenerFecha(), noticia.fecha)
            );
            break;
          default:
            this.forosAux = this.foros;
        }
      } else {
        this.forosAux = this.foros;
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

.foro {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  background: gainsboro;
}

.switch {
  display: flex;
  flex-direction: column;
  align-items: left;
  left: 10px;
  padding: 10px 0px;
  padding-left: 10px;
  width: 100%;
}
.filtro-fecha {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filtros {
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  width: 100%;
}

.filtros span {
  align-self: center;
}
.foro-editor,
.foro-lectura {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 768px;
}

@media screen and (max-width: 768px) {
  .foro-editor,
  .foro-lectura {
    min-width: auto;
    width: 100%;
  }
}

@media screen and (max-width: 400px) {
  .foro-lectura {
    min-width: 400px;
  }
}
</style>
