<template>
  <div class="card" v-if="quejasAux">
    <Card
      class="contenido"
      style="width: 100%; margin-top: 2%; text-align: left"
      v-for="queja in quejasAux"
      :key="queja.id"
    >
      <template #title>
        <span id="nombres">
          {{ queja.estudianteTO.nombre }}
          {{ queja.estudianteTO.apellido }}</span
        >
      </template>
      <template #subtitle>
        <span id="fecha"> {{ formatearFecha(queja.fechaPublicacion) }}</span>
      </template>
      <template #content>
        <p>
          {{ queja.descripcion }}
        </p>
      </template>
      <template #footer v-if="check">
        <Button
          class="btn-eliminar"
          icon="pi pi-trash"
          label="Eliminar"
          severity="secondary"
          @click="eliminar(queja.id)"
          raised
        />
        <i class="pi pi-trash"></i>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";
import Button from "primevue/button";

//Dialogos
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

//Helpers
import { eliminarQuejaFachada } from "@/modules/publicacion/helpers/QuejaCliente";

export default {
  components: { Card, Button },

  data() {
    return {
      confirm: useConfirm(),
      toast: useToast(),
      fechaFormato: null,
      quejasAux: null,
    };
  },

  props: {
    check: {
      type: Boolean,
      required: true,
    },
    quejas: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.quejasAux = this.quejas;
  },

  methods: {
    formatearFecha(fecha) {
      return fecha.replace("T", " / ");
    },
    eliminar(id) {
      this.confirm.require({
        message: "Se eliminará la queja",
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        accept: () => {
          try {
            eliminarQuejaFachada(id);
          } catch (e) {
            this.toast.add({
              severity: "error",
              summary: "Eliminación",
              detail: "No se logro eliminar la queja",
              life: 3000,
            });
            return;
          }
          this.quejasAux = this.quejasAux.filter((queja) => queja.id !== id);
          this.toast.add({
            severity: "success",
            summary: "Eliminado",
            detail: "Se eliminó la queja exitosamente",
            life: 3000,
          });
        },
        reject: () => {
          this.toast.add({
            severity: "info",
            summary: "Cancelado",
            detail: "Se canceló la eliminación de la queja",
            life: 3000,
          });
        },
      });
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#nombres {
  font-size: 4vmin;
}

#fecha {
  font-size: 2vmin;
}

.pi-trash {
  display: none;
  background: #64748b;
  color: white;
  padding: 5px;
  font-size: 2.5vmin;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 1px gray;
  cursor: pointer;
}

.contenido p {
  font-size: 2.5vmin;
}

button {
  font-size: 2.5vmin;
}

@media screen and (max-width: 550px) {
  .btn-eliminar {
    display: none;
  }
  .pi-trash {
    display: inline-block;
  }
}
</style>
