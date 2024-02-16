<template>
  <div class="foro-post" v-if="foro">
    <div class="credit-bar">
      <div class="credit-bar-items-left">
        <Avatar :image="foro.estudiante.imagen" class="mr-2" shape="circle" />
        <div class="author-info">
          <span class="topic-ago">
            <p>{{ this.foro.fecha.replace("T", " / ") }}</p>
          </span>

          <p class="author">
            {{ foro.estudiante.nombre }}
            {{ foro.estudiante.apellido }}
          </p>
        </div>
      </div>
      <Button
        size="small"
        v-if="checked"
        label="Eliminar"
        icon="pi pi-delete-left"
        severity="danger"
        rounded
        @click="eliminarForo(foro.id)"
      ></Button>
    </div>

    <div class="title">
      <h3>{{ foro.titulo }}</h3>
    </div>

    <div class="content">
      <p>
        {{ foro.texto }}
      </p>
    </div>
  </div>
  <Toast />
</template>

<script>
import Avatar from "primevue/avatar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { eliminarForoFachada } from "../helpers/ForoCliente";
import { createToast } from "@/helpers/Funciones";
import { useConfirm } from "primevue/useconfirm";

export default {
  components: { InputText, Avatar, Button, Toast },

  props: {
    foro: {
      type: Object,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      confirm: useConfirm(),
      fechaFormato: null,
      forosData: null,
    };
  },

  methods: {
    eliminarForo(id) {
      this.confirm.require({
        message: "Se eliminará el foro",
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          try {
            eliminarForoFachada(id);
            createToast(
              this.$toast,
              "success",
              "Completado",
              "Se ha eliminado el foro"
            );
            this.$router.push(`/foro`);
          } catch (error) {
            createToast(this.$toast, "error", "Error", "Hubo un problema");
          }
        },
      });
    },
  },
};
</script>

<style scoped>
.foro-post {
  display: block;
  margin-bottom: 0.5rem;
  padding-left: 25px;
  padding-right: 10px;
  width: 70%;
  border: solid 1px gainsboro;
  box-shadow: 0 0 10px gainsboro;
  border-radius: 10px;
  background: whitesmoke;
}

.credit-bar {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  line-height: 1rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
}

.credit-bar-items-left {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding-right: 0.5rem;
}

.author-info {
  display: flex;
  gap: 0;
  flex-direction: column;
  padding: 0px 0px;
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

.topic {
  display: flex;
  align-items: center;
}

.title {
  display: block;
  font-size: 2rem;
  line-height: 2.25rem;
  font-weight: 600;
  text-align: left;
}

.title,
h2 {
  margin-top: 0px;
  margin-bottom: 1rem;
}

.content {
  margin-bottom: 0.5rem;
  padding-left: 0;
  padding-right: 0;
  font-size: 0.875rem;
  overflow: hidden;
  max-height: 253px;
  text-align: left;
}
</style>
