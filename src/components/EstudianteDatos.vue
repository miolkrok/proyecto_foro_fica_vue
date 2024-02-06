<template>
  <Carga v-if="!estudiantes" />
  <div v-else>
    <div class="contenedor-tabla">
      <DataTable
        :value="estudiantes"
        tableStyle="min-width: 50rem;"
        class="tabla"
      >
        <template #header>
          <span style="font-size: 3.5vmin">Estudiantes</span>
        </template>
        <Column field="cedula" header="Cédula"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="apellido" header="Apellido"></Column>
        <Column field="suscripcion" header="Suscripción">
          <template #body="slotProps">
            <Tag
              :severity="getSeverity(slotProps.data.suscripcion)"
              value="Suscripción"
            ></Tag>
          </template>
        </Column>
        <Column header="Image">
          <template #body="slotProps">
            <Avatar
              :image="slotProps.data.imagen"
              class="mr-2"
              size="xlarge"
              shape="circle"
            />
          </template>
        </Column>
        <Column header="Actualizar" style="width: 10%"
          ><template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              raised
              @click="editarEstudiante(slotProps.data)"
          /></template>
        </Column>
        <Column header="Eliminar" style="width: 10%"
          ><template #body="slotProps">
            <Button
              icon="pi pi-trash"
              raised
              @click="confirmarEliminarEstudiante(slotProps.data.id)"
            /> </template
        ></Column>
      </DataTable>
    </div>
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script>
import Carga from "@/views/Carga.vue";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Avatar from "primevue/avatar";
import Tag from "primevue/tag";
import InputText from "primevue/inputtext";
import EstudianteCrearFormulario from "@/components/EstudianteCrearFormulario.vue";

//Dialogo
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

//Helpers
import {
  obtenerTodosEstudiantesFachada,
  eliminarEstudianteFachada,
} from "@/helpers/EstudiaCliente";

export default {
  components: {
    Carga,
    EstudianteCrearFormulario,
    Button,
    Column,
    DataTable,
    Avatar,
    Tag,
    InputText,
    ConfirmDialog,
    Toast,
  },
  data() {
    return {
      cedula: "",
      estudiantes: null,
      confirm: useConfirm(),
      toast: useToast(),
    };
  },
  async mounted() {
    try {
      this.estudiantes = await obtenerTodosEstudiantesFachada();
    } catch (error) {
      this.toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error al obtener estudiantes",
        life: 3000,
      });
    }
  },
  methods: {
    getSeverity(estado) {
      switch (estado) {
        case true:
          return "success";
        case false:
          return "danger";
      }
    },

    editarEstudiante(data) {
      this.$emit("getEstudiante", data);
    },
    confirmarEliminarEstudiante(id) {
      this.confirm.require({
        message: "Se eliminará el estudiante con id: " + id,
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
          this.eliminarEstudiante(id);
        },
      });
    },
    eliminarEstudiante(id) {
      try {
        eliminarEstudianteFachada(id);
        this.toast.add({
          severity: "success",
          summary: "Exito",
          detail: "Se eliminó con exito",
          life: 3000,
        });
        window.location.reload();
      } catch {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo eliminar el estudiante",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.contenedor-tabla {
  display: flex;
  justify-content: center;
}

.tabla {
  margin-top: 20px;
  width: 80%;
  box-shadow: 0 0 10px gray;
  border-radius: 5px;
  overflow: hidden;
  font-size: 2.4vmin;
}

@media screen and (max-width: 1060px) {
  .tabla {
    width: 100%;
  }
}
</style>
