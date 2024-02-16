<template>
  <div class="particle-container">
    <vue-particles
      class="particles"
      color="#3240b5"
      :particleOpacity="0.1"
      :particlesNumber="100"
      shapeType="polygon"
      :particleSize="10"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="1"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.particle-container {
  z-index: 0;
}
.particles {
  height: 100%;
}
</style>
