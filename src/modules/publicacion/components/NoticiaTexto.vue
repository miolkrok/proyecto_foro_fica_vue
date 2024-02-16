<template>
  <div class="cont-texto">
    <div class="quitar">
      <Button id="quitar" icon="pi pi-minus" @click="quitar" />
    </div>
    <div class="cuadro-texto">
      <Editor v-model="value">
        <template v-slot:toolbar>
          <span class="ql-formats">
            <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
            <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
            <button
              v-tooltip.bottom="'Underline'"
              class="ql-underline"
            ></button>
          </span>
        </template>
      </Editor>
    </div>
    <Divider />
  </div>
</template>

<script>
import Editor from "primevue/editor";
import Tooltip from "primevue/tooltip";
import Button from "primevue/button";
import Divider from "primevue/divider";

export default {
  components: {
    Editor,
    Button,
    Divider,
  },

  directives: {
    Tooltip,
  },

  data() {
    return {
      show: false,
      value: null,
    };
  },

  props: {
    texto: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.value = this.texto;
  },

  methods: {
    quitar() {
      this.$emit("quitar");
    },
  },
};
</script>

<style scoped>
.quitar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

#quitar {
  height: 10px;
  background: #3744b3;
  transition: all 0.2s linear;
}

#quitar:hover {
  transform: scale(1.05);
}

.boton {
  display: flex;
  justify-content: flex-end;
}

.boton button {
  margin-top: 20px;
  background: #3744b3;
  transition: all 0.3s linear;
}

.boton button:hover {
  transform: scale(1.05);
}
</style>
