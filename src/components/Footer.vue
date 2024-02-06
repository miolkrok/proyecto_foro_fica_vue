<template>
  <footer>
    <div class="info">
      <span style="font-weight: bold">Integrantes</span>
      <span>Arboleda Jumbo Cristian David</span>
      <span>Benavides Chango Andrés Sebastián</span>
      <span>Chávez García Erick Sebastián</span>
      <span>Merizalde Proaño Paúl Leonardo</span>
      <span>Moya Charro Christian Alexander</span>
    </div>
    <div class="info">
      <span style="font-weight: bold">Universidad Central del Ecuador</span>
      <span style="font-weight: bold"
        >Facultad de Ingeniería y Ciencias Aplicadas</span
      >
      <span style="font-weight: bold"
        >Carrera de Ingeniería en Computación
      </span>
      <Divider />
      <div class="imagenes">
        <img src="@/assets/logo-uce.png" />
        <img src="@/assets/IDI_Facultad.png" />
      </div>
    </div>
    <div class="info">
      <span style="font-weight: bold">Edison Estuardo Cayambe Chicaiza</span>
      <span>Programación Web</span>
      <span>Proyecto Final - Grupo 2</span>
    </div>
  </footer>
</template>

<script>
import Divider from "primevue/divider";
export default {
  components: {
    Divider,
  },
};
</script>

<style scoped>
footer {
  font-size: 3vmin;
  display: flex;
  gap: 10%;
  background: #333;
  padding: 20px;
  color: white;
  z-index: 10;
}

.info {
  margin-top: 5px;
  width: 33.33%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
}

.imagenes {
  display: flex;
  gap: 20%;
  align-items: center;
  justify-content: center;
  width: 100%;
}

img {
  width: 80px;
  height: 80px;
}

@media screen and (max-width: 550px) {
  footer {
    flex-direction: column;
    gap: 40px;
  }
  .info {
    width: 90%;
  }
}
</style>
