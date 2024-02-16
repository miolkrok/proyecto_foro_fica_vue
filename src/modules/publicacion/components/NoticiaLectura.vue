<template>
  <div class="lectura" v-if="mostrar">
    <Panel
      class="panel"
      :header="noticia.titulo"
      :collapsed="panelCollapsed"
      toggleable
    >
      <template #icons v-if="editable">
        <button class="p-panel-header-icon p-link mr-2" @click="toggle">
          <span class="pi pi-cog"></span>
        </button>
        <Menu ref="menu" id="config_menu" :model="items" popup />
      </template>
      <div class="contenido">
        <div class="fecha">
          <span>{{ fechaFormato }}</span>
        </div>
        <p v-if="noticia.texto" v-html="noticia.texto"></p>
        <img v-if="noticia.imagen" :src="noticia.imagen" />

        <iframe
          v-if="noticia.video"
          width="70%"
          height="350"
          :src="noticia.video"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from "primevue/panel";
import Menu from "primevue/menu";
import { eliminarNoticiaFachada } from "@/modules/publicacion/helpers/NoticiaCliente";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

export default {
  components: {
    Panel,
    Menu,
    ConfirmDialog,
  },
  data() {
    return {
      confirm: useConfirm(),
      mostrar: true,
      fechaFormato: "",
      items: [
        {
          label: "Opciones",
          items: [
            {
              label: "Editar",
              icon: "pi pi-pencil",
              command: this.editar,
            },
            {
              label: "Borrar",
              icon: "pi pi-times",
              command: this.eliminar,
            },
          ],
        },
      ],
    };
  },
  props: {
    noticia: {
      type: Object,
      required: true,
    },
    panelCollapsed: {
      type: Boolean,
      required: true,
    },
    editable: {
      type: Boolean,
      required: true,
    },
  },

  created() {
    this.fechaFormato = this.noticia.fechaPublicacion.replace("T", " / ");
  },

  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    editar() {
      this.$emit("editar", this.noticia);
    },
    eliminar() {
      this.confirm.require({
        message: "Se eliminará la noticia",
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        accept: () => {
          eliminarNoticiaFachada(this.noticia.id);
          window.location.reload();
        },
      });
    },
  },
};
</script>

<style scoped>
.lectura {
  width: inherit;
  padding-top: 20px;
}

.panel {
  width: 100%;
  box-shadow: 0 0 20px 5px gainsboro;
  border-radius: 10px;
  font-size: 3.5vmin;
}

.fecha {
  display: flex;
    font-size: 2.5vmin;
  width: 100%;
  justify-content: flex-end;
  color: rgb(157, 157, 157);
}

.contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  padding: 0px 30px;
  text-align: left;
  font-size: 3vmin;
}

img {
  margin: 20px;
  max-width: 50%;
  height: 30%;
}

/*Media Query*/
@media screen and (max-width: 560px) {
  .panel {
    font-size: 4vmin;
  }

  p {
    padding: 0px 5px;
    font-size: 3.5vmin;
  }
}
</style>
