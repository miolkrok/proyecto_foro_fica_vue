<template>
  <div class="quejas">
    <div class="switch">
      <InputSwitch
        class="custom-inputswitch"
        v-model="checked"
        @change="mensajeVista"
      />
    </div>
    <div class="contenedor-formulario">
      <Button
        class="btn-agregar"
        v-if="!agregarQueja"
        icon="pi pi-plus"
        label="Agregar Queja"
        raised
        @click="agregarQueja = true"
      />
      <i class="pi pi-plus"></i>
      <QuejaFormulario
        v-if="agregarQueja"
        @cancelar="cancelarFormulario($event)"
      />
    </div>

    <div class="quejas-vista" v-if="!checked">
      <QuejasLectura v-if="quejas" :check="false" :quejas="quejas" />
    </div>
    <div class="admin" v-else>
      <QuejasLectura v-if="quejas" :check="true" :quejas="quejas" />
    </div>
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script>
import InputSwitch from "primevue/inputswitch";
import QuejaFormulario from "../components/QuejaFormulario.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import QuejasLectura from "../components/QuejasLectura.vue";
import { obtenerQuejasFachada } from "@/modules/publicacion/helpers/QuejaCliente";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

export default {
  components: {
    QuejaFormulario,
    InputSwitch,
    Card,
    Button,
    QuejasLectura,
    Toast,
    ConfirmDialog,
  },

  data() {
    return {
      //Cambiar entre Admin y Lectura
      checked: true,
      agregarQueja: false,
      quejas: null,
      toast: useToast(),
    };
  },

  async mounted() {
    try {
      this.quejas = await obtenerQuejasFachada();
    } catch (error) {
      this.toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error al obtener quejas",
        life: 3000,
      });
    }
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

    cancelarFormulario(event) {
      this.agregarQueja = event;
    },
  },
};
</script>

<style scoped>
.quejas {
  background: rgb(234, 234, 234);
  padding-bottom: 20px;
}
.p-inputswitch-slider {
  width: 10px;
}

.switch {
  position: absolute;
  left: 10px;
  padding: 10px 0px;
}

.contenedor-formulario {
  margin-top: 40px;
}

.quejas-vista,
.admin,
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.quejas-vista,
.admin {
  margin-top: 40px;
}

.card {
  width: 90%;
  gap: 20px;
}

.contenedor-formulario button {
  font-size: 3vmin;
}

.pi-plus {
  display: none;
  background: #6366f1;
  color: white;
  width: 20%;
  padding: 10px;
  font-size: 2.5vmin;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 1px gray;
  cursor: pointer;
}

@media screen and (max-width: 620px) {
  .btn-agregar {
    display: none;
  }
  .contenedor-formulario i {
    display: inline-block;
  }
}
</style>
