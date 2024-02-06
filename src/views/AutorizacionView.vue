<template>
  <div class="autorizacion">
    <AutorizacionFormulario />
  </div>
</template>

<script>
import AutorizacionFormulario from "@/components/AutorizacionFormulario.vue";
export default {
  components: { AutorizacionFormulario },
};
</script>

<style scoped>
.autorizacion {
  max-width: 100%;
}
</style>
