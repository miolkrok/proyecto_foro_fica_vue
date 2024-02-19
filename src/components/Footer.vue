<template>
  <footer>
    <div class="info">
      <span style="font-weight: bold">Integrantes</span>
      <span>Franklin Alexander Condor Guerron</span>
      <span>Christian Alexander Moya Charro</span>
      <span>Luis Alexander Ortiz Laguapillo</span>
      <span>Kevin Daniel Toapanta Chiza</span>
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
        <img src="../assets/logo_w.png" />
      </div>
    </div>
    <div class="info">
      <span style="font-weight: bold">Msg. Karla Alexandra Avila Hidalgo</span>
      <span>Taller I</span>
      <span>Proyecto Final - Grupo 1</span>
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

  align-items: center;
  justify-content: center;
  width: 100%;
}

img {
  margin-left: 10px;
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
