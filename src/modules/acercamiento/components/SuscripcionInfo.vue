<template>
  <div class="sus-info">
    <div class="busqueda">
      <span class="p-float-label">
        <InputText class="input" id="cedula" v-model="cedula" type="text" />
        <label for="cedula">Cédula</label>
      </span>
      <i class="pi pi-verified" id="boton-busqueda" @click="suscribir">
        <span style="font-family: Segoe UI; margin-left: 10px"
          >Suscribir</span
        ></i
      >
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";

//Dialogo
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

//Helpers
import {
  obtenerEstudianteFachada,
  actualizarEstudianteParcialFachada,
} from "@/helpers/EstudiaCliente";

export default {
  components: {
    InputText,
  },

  data() {
    return {
      cedula: "",
      toast: useToast(),
      confirm: useConfirm(),
    };
  },

  methods: {
    suscribir() {
      if (this.cedula) {
        this.confirm.require({
          message: "Se suscribirá el estudiante con cédula: " + this.cedula,
          header: "Confirmación de Suscripción",
          icon: "pi pi-exclamation-triangle",
          acceptLabel: "Sí",
          rejectLabel: "No",
          accept: async () => {
            try {
              await obtenerEstudianteFachada(this.cedula);
            } catch (error) {
              this.toast.add({
                severity: "error",
                summary: "Estudiante",
                detail: "No existe el estudiante",
                life: 3000,
              });
              this.$emit("crearEstudiante");
              return;
            }
            try {
              actualizarEstudianteParcialFachada({
                cedula: this.cedula,
                suscripcion: true,
              });
              this.toast.add({
                severity: "succes",
                summary: "Estudiante",
                detail: "Se suscribió existosamente a el estudiante",
                life: 3000,
              });
              this.cedula = "";
            } catch (error) {
              console.log("error");
            }
          },
        });
      } else {
        this.toast.add({
          severity: "warn",
          summary: "Campos",
          detail: "Ingrese una cédula",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.sus-info {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#boton-busqueda {
  background: #22c55e;
  padding: 10px;
  border-radius: 5px;
  color: whitesmoke;
  box-shadow: 0 1px 2px 0.5px gray;
  cursor: pointer;
}

#boton-busqueda:hover {
  background: #16a34a;
}

#busqueda-input {
  font-size: 2vmin;
  height: fit-content;
}

.busqueda {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2%;
}

span {
  width: 60%;
}

.input {
  width: 100%;
}

@media screen and (max-width: 900px) {
  span {
    width: 70%;
  }
}

@media screen and (max-width: 700px) {
  span {
    width: 90%;
  }
}

@media screen and (max-width: 400px) {
  #boton-busqueda span {
    display: none;
  }
}
</style>
