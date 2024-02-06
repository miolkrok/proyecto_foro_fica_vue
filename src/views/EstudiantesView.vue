<template>
  <div class="estudiante">
    <Button
      icon="pi pi-plus"
      label="Crear Estudiante"
      severity="secondary"
      raised
      id="crear-boton"
      @click="abrirModalAgregar"
    />

    <i class="pi pi-plus" id="btn-crear"></i>

    <EstudianteCrearFormulario
      v-if="visibleAgregar"
      :visibilidad="visibleAgregar"
      @modal="modalAgregar($event)"
    />

    <EstudianteEditarFormulario
      v-if="visibleEditar"
      :visibilidad="visibleEditar"
      :estudiante="estudiante"
      @modal="modalEditar($event)"
    />

    <EstudianteDatos @getEstudiante="getEstudiante($event)" />
  </div>
</template>

<script>
import EstudianteDatos from "@/components/EstudianteDatos.vue";
import EstudianteCrearFormulario from "@/components/EstudianteCrearFormulario.vue";
import Button from "primevue/button";
import EstudianteEditarFormulario from "@/components/EstudianteEditarFormulario.vue";

export default {
  components: {
    EstudianteDatos,
    Button,
    Button,
    EstudianteCrearFormulario,
    EstudianteEditarFormulario,
  },
  data() {
    return {
      visibleAgregar: false,
      visibleEditar: false,
      estudiante: null,
    };
  },
  methods: {
    abrirModalAgregar() {
      this.visibleAgregar = !this.visibleAgregar;
    },
    modalAgregar(e) {
      this.visibleAgregar = e;
      window.location.reload();
    },
    getEstudiante(e) {
      this.abrirModalEditar();
      this.estudiante = e;
    },
    abrirModalEditar() {
      this.visibleEditar = !this.visibleEditar;
    },
    modalEditar(e) {
      this.visibleEditar = e;
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.estudiante {
  padding: 30px;
   max-width: 100%;
}
#btn-crear {
  display: none;
  background: #64748b;
  padding: 10px;
  border-radius: 5px;
  color: white;
  box-shadow: 0 1px 2px 1px gray;
  cursor: pointer;
}
#btn-crear:hover {
  background: #475569;
}

@media screen and (max-width: 350px) {
  #crear-boton {
    display: none;
  }

  #btn-crear {
    display: inline-block;
  }
}
</style>
