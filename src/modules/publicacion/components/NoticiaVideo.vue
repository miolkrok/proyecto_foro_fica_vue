<template>
  <div>
    <div class="quitar">
      <Button id="quitar" icon="pi pi-minus" @click="quitar" raised />
    </div>

    <div class="video">
      <div class="input">
        <InputText
          id="urlInput"
          type="text"
          v-model="url"
          placeholder="Ingresa url de YouTube"
          @keyup.enter="convertirUrlVideo"
        />
        <Button icon="pi pi-arrow-circle-right" @click="convertirUrlVideo" />
      </div>

      <iframe
        v-if="urlEmbed"
        :width="ancho"
        :height="alto"
        :src="urlEmbed"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <Divider />
  </div>
</template>

<script>
import Button from "primevue/button";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
export default {
  components: {
    Button,
    Divider,
    InputText,
  },

  data() {
    return {
      //Variables para manejo de video YouTube
      url: "",
      urlEmbed: "",

      //Tamaño del frame del video de Youtube
      ancho: 550,
      alto: 350,
    };
  },

  props: {
    video: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.urlEmbed = this.video;
  },

  methods: {
    convertirUrlVideo() {
      this.urlEmbed = this.url.replace("watch?v=", "embed/");
    },
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
}

#quitar {
  height: 10px;
  background: #3744b3;
  transition: all 0.2s linear;
}

#quitar:hover {
  transform: scale(1.05);
}

.video {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.input {
  display: flex;
  justify-content: center;
}

.input button {
  background: #3744b3;
  color: white;
  border: none;
  margin-left: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.input button:hover {
  transform: scale(1.1);
}

.video input {
  width: 200px;
  outline: none;
  border: solid gray 1px;
  border-radius: 5px;
}

.boton {
  display: flex;
  justify-content: flex-end;
}

.boton button {
  margin-top: 10px;
  background: #3744b3;
  transition: all 0.3s linear;
}

.boton button:hover {
  transform: scale(1.05);
}
</style>
