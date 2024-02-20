<template>
  <div class="noticias">
    <div class="switch">
      <InputSwitch
        class="custom-inputswitch"
        v-model="checked"
        v-if="!noticiaEditor"
        @change="mensajeVista"
      />
    </div>

    <Button
      style="margin-top: 50px"
      icon="pi pi-plus"
      v-if="!noticiaEditor && checked"
      label="Agregar Noticia"
      raised
      @click="addNoticia"
    />
    <div class="filtros" v-if="!noticiaEditor">
      <span class="p-input-icon-left" style="margin-top: 40px">
        <i class="pi pi-search" />
        <InputText
          class="search"
          v-model="busqueda"
          placeholder="Buscar por titulo"
          @keyup="filtrarNoticias"
        />
      </span>
      <span> o </span>
      <span class="p-input-icon-left" style="margin-top: 40px">
        <i class="pi pi-search" />
        <InputText
          class="search"
          v-model="busquedaTipo"
          placeholder="Buscar por tipo"
          @keyup="filtrarNoticiasTipo"
        />
      </span>

      <div class="contraer-editor">
        <div class="filtro-fecha">
          <Dropdown
            dropdownIcon="pi pi-calendar"
            class="opciones-fecha"
            v-model="fechaSeleccionada"
            :options="fechas"
            showClear
            optionLabel="name"
            placeholder="Selecciona"
          />
          <Button
            icon="pi pi-filter"
            severity="secondary"
            raised
            @click="filtrarPorFecha"
          ></Button>
        </div>

        <Button
          :icon="iconContraer"
          :label="labelColapso"
          severity="secondary"
          raised
          @click="contraer"
        />
      </div>
    </div>
    <div v-if="!checked" class="noticias-vista">
      <NoticiaLectura
        v-for="noticia in noticiasAux"
        :key="noticia.id"
        :noticia="noticia"
        :panelCollapsed="colapsado"
        :editable="false"
      />
    </div>

    <div class="editor" v-else>
      <NoticiaEditor
        class="componente"
        v-if="noticiaEditor"
        :noticia="noticia"
      />
      <Button
        v-if="noticiaEditor"
        icon="pi pi-times"
        label="Cancelar"
        severity="secondary"
        raised
        @click="cancelar"
      />
    </div>
    <div v-if="!noticiaEditor && checked" class="noticias-vista">
      <NoticiaLectura
        v-for="noticia in noticiasAux"
        :key="noticia.id"
        :noticia="noticia"
        :panelCollapsed="colapsado"
        :editable="true"
        @editar="editarNoticia($event)"
      />
    </div>
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script>
import { obtenerNoticiasFachada } from "@/modules/publicacion/helpers/NoticiaCliente";
import SelectButton from "primevue/selectbutton";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import NoticiaEditor from "../components/NoticiaEditor.vue";
import NoticiaLectura from "../components/NoticiaLectura.vue";
import Panel from "primevue/panel";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

//Dialogos
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

//Helpers
import {
  obtenerFecha,
  compararDia,
  compararSemana,
  compararMes,
  compararAnio,
} from "@/helpers/Funciones";
export default {
  components: {
    SelectButton,
    InputSwitch,
    InputText,
    Button,
    NoticiaEditor,
    NoticiaLectura,
    Panel,
    Dropdown,
    ConfirmDialog,
    Toast,
  },
  data() {
    return {
      confirm: useConfirm(),
      iconContraer: "pi pi-minus",
      colapsado: false,
      labelColapso: "Contraer Todo",
      toast: useToast(),
      //Valor de busqueda
      busqueda: "",

      //Valor de busqueda
      busquedaTipo: "",

      //Abrir editor de noticia
      noticiaEditor: false,

      //Array de objetos noticia
      noticias: [],
      noticiasAux: [],

      //Noticia de Panel
      noticia: {},

      //Cambiar entre Admin y Lectura
      checked: true,

      //Boolean que indica si guardar los datos de la noticia
      guardar: false,

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
    try {
      this.noticias = await obtenerNoticiasFachada();
    } catch (error) {
      this.toast.add({
        severity: "info",
        summary: "Token",
        detail: "Error al obtener noticias, " + error.message,
        life: 3000,
      });
    }

    this.noticiasAux = this.noticias;
    this.mensajeVista();
  },

  methods: {
    mensajeVista() {
      if (this.checked) {
        this.toast.add({
          severity: "info",
          summary: "Modo Administrador",
          detail: "Estas en la vista de administrador",
          life: 3000,
        });
      } else {
        this.toast.add({
          severity: "info",
          summary: "Modo Lectura",
          detail: "Estas en la vista de solo lectura",
          life: 3000,
        });
      }
    },

    contraer() {
      if (this.colapsado) {
        this.iconContraer = "pi pi-minus";
        this.labelColapso = "Contraer Todo";
        this.colapsado = false;
      } else {
        this.iconContraer = "pi pi-plus";
        this.labelColapso = "Ampliar Todo";
        this.colapsado = true;
      }
    },

    addNoticia() {
      this.noticiaEditor = !this.noticiaEditor;
    },

    editarNoticia(ntc) {
      this.noticia = ntc;
      this.noticiaEditor = true;
    },

    cancelar() {
      this.confirm.require({
        message: "Se cancelará la edición de la noticia",
        header: "Confirmación de Cancelación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          this.noticia = {};
          this.noticiaEditor = false;
        },
      });
    },

    filtrarPorFecha() {
      if (this.fechaSeleccionada) {
        switch (this.fechaSeleccionada.code) {
          case "HY":
            this.noticiasAux = this.noticias.filter((noticia) =>
              compararDia(obtenerFecha(), noticia.fechaPublicacion)
            );
            break;
          case "U7":
            this.noticiasAux = this.noticias.filter((noticia) =>
              compararSemana(obtenerFecha(), noticia.fechaPublicacion)
            );
            break;
          case "EM":
            this.noticiasAux = this.noticias.filter((noticia) =>
              compararMes(obtenerFecha(), noticia.fechaPublicacion)
            );
            break;
          case "EA":
            this.noticiasAux = this.noticias.filter((noticia) =>
              compararAnio(obtenerFecha(), noticia.fechaPublicacion)
            );
            break;
          default:
            this.noticiasAux = this.noticias;
        }
      } else {
        this.noticiasAux = this.noticias;
        console.log("No se selecciono.");
      }
    },

    filtrarNoticias() {
      if (this.busqueda) {
        this.noticiasAux = this.noticias.filter((noticia) =>
          noticia.titulo.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      } else {
        this.noticiasAux = this.noticias;
      }
    },

    filtrarNoticiasTipo() {
      if (this.busquedaTipo) {
        this.noticiasAux = this.noticias.filter((noticia) =>
          noticia.tipo.toLowerCase().includes(this.busquedaTipo.toLowerCase())
        );
      } else {
        this.noticiasAux = this.noticias;
      }
    }
  },
};
</script>

<style scoped>
.noticias {
  padding-bottom: 20px;
}

.noticias,
.editor,
.componente {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.componente,
.editor {
  justify-content: center;
  width: 100%;
}

.filtro-fecha {
  display: flex;
  align-items: center;
  gap: 10px;
}

.opciones-fecha {
  display: flex;
  align-items: center;
  height: 30px;
}

.contraer-editor {
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-top: 30px;
  justify-content: space-between;
}

.filtros {
  width: 80%;
}

.contraer-editor button {
  margin: 0;
  height: 30px;
}

.noticias-vista {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

.switch {
  position: absolute;
  left: 10px;
  padding: 10px 0px;
}

i {
  font-size: 2.5vmin;
}

button {
  margin-top: 40px;
  font-size: 2.5vmin;
  transition: all 0.3s linear;
}

button:hover {
  transform: scale(1.05);
}

/*Media Query*/
@media screen and (max-width: 560px) {
  i {
    font-size: 3vmin;
  }

  .contraer-editor {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  span i {
    display: none;
  }

  .search {
    font-size: 3.5vmin;
    padding: 5px;
  }
}

@media screen and (max-width: 470px) {
  .filtro-fecha i {
    display: none;
  }

  .filtro-fecha {
    flex-direction: column;
  }

  button {
    font-size: 3.5vmin;
    padding: 5px;
  }
}
</style>
