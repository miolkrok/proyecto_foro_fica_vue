<template>
  <div class="foro-page-container">
    <div class="switch">
      <InputSwitch v-model="checked" @change="mensajeVista" />
    </div>

    <div class="foro-page" v-if="foro">
      <ForoPostVue :foro="foro" :checked="checked" />
      <ForoAddCommentVue
        :foroId="foro.id"
        v-if="checked"
        @getComentario="getComentario($event)"
      />
      <ForoComment
        v-if="foroComentarios"
        :key="componentKey"
        :comentarios="foroComentarios"
        :checked="checked"
        class="foro-comment"
      />
    </div>
    <ConfirmDialog />
    <Toast style="z-index: 99" />
  </div>
</template>

<script>
import InputSwitch from "primevue/inputswitch";
import ForoPostVue from "../components/ForoPost.vue";
import ForoComment from "../components/ForoComment.vue";
import { obtenerForoFachada } from "../helpers/ForoCliente";
import { createToast } from "@/helpers/Funciones";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import ForoAddCommentVue from "../components/ForoAddComment.vue";
export default {
  components: {
    ForoAddCommentVue,
    ForoPostVue,
    ForoComment,
    Toast,
    InputSwitch,
    ConfirmDialog,
  },
  data() {
    return {
      foro: null,
      foroComentarios: null,
      componentKey: 0,
      checked: false,
      refresh: true,
    };
  },

  mounted() {
    // console.log('componentKey anes emitt' + this.componentKey)
    // this.emitter.on("recargarComentarios", async () => {
    // 	console.log('recibir')
    // 	this.componentKey += 1;
    // 	this.inicializar()
    // });

    this.inicializar();
    this.mensajeVista();
  },

  methods: {
    async inicializar() {
      const { id } = this.$route.params;
      try {
        this.foro = await obtenerForoFachada(id);
      } catch (error) {
        createToast(this.$toast, "error", "Error", "Error al obtener foro");
      }
      this.foroComentarios = this.foro.comentarios;
      console.log(this.foroComentarios);
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
    async getComentario(e) {
      this.foroComentarios = null;
      console.log(this.foroComentarios, this.foro);
      setTimeout(() => {
        this.inicializar();
      }, 500);
    },
  },
};
</script>

<style scoped>
.foro-page-container {
  background: rgb(235, 235, 235);
}

.container-app {
  padding-left: 1rem;
  padding-right: 1rem;
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
.foro-page,
.foro-comment {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 768px;
}
.foro-page {
  min-width: 50%;
  margin-bottom: 20px;
}
</style>
