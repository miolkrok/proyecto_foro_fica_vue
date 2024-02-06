<template>
  <div class="contenedor-carga">
    <div class="carga">
      <div class="spinner"></div>
      <span>CARGANDO</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.carga {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
 max-width: 100%;
  gap: 10px;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 5px solid #3498db;
  border-top: 4px solid transparent;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

span {
  font-size: 4vmin;
  font-weight: bold;
  color: #333;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@media screen and (max-width: 600px) {
  .spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #3498db;
    border-top: 2px solid transparent;
  }
}
</style>
