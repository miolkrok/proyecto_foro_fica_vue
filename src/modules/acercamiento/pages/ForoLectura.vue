<template>
  <div class="containerForos">
    <Card v-for="foro in foros" :key="foro.id" @click="dentroForo(foro)">
      <template #content>
        <div class="container">
          <div class="credit-bar">
            <div class="credit-bar-items-left">
              <Avatar
                :image="foro.estudiante.imagen"
                class="mr-2"
                shape="circle"
              />
              <div class="author-info">
                <span class="topic-ago">
                  <!-- <a class="topic" rpl="" href="/r/football/">r/football</a> -->
                  <p>{{ formatearFecha(foro.fecha) }}</p>
                </span>
                <p class="author">
                  {{ foro.estudiante.nombre }}
                  {{ foro.estudiante.apellido }}
                </p>
              </div>
            </div>
          </div>
          <div class="title">
            <h3 @click="abrirForo(foro.id)">{{ foro.titulo }}</h3>
          </div>
          <div class="comment">
            <p>{{ numeroComentarios(foro) }}</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";
import Button from "primevue/button";
import ForoPostVue from "../components/ForoPost.vue";
import Avatar from "primevue/avatar";
import router from "@/router/router";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
export default {
  components: {
    InputText,
    Card,
    Button,
    Avatar,
    ForoPostVue,
    router,
    Dropdown,
  },

  props: {
    check: {
      type: Boolean,
      required: true,
    },
    foros: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fechaFormato: null,
      forosData: null,
    };
  },

  methods: {
    formatearFecha(fecha) {
      return fecha.replace("T", " / ");
    },
    numeroComentarios(foro) {
      const length = foro.comentarios.length;
      return length != 1 ? `${length} comentarios` : `${length} comentario`;
    },
    dentroForo(foro) {
      console.log(foro.id);
    },
    abrirForo(id) {
      this.$router.push(`/foro/${id}`);
    },
  },

  created() {
    this.forosData = this.foros;
  },
};
</script>

<style scoped>
.containerForos {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 25px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  margin-top: 20px;
}
.p-card {
  width: 100%;
  padding: 0rem 0rem;
  text-align: left;
  box-shadow: red;
}

.credit-bar {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  line-height: 1rem;
}

.credit-bar-items-left {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding-right: 0.5rem;
}

.author-info {
  display: flex;
  gap: 0;
  flex-direction: column;
  padding: 0px 0px;
}

.topic-ago {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.25rem;
  flex-direction: row;
  flex: none;
  padding: 0px 0px;
}

.topic-ago,
p {
  margin-top: 2px;
  margin-bottom: 2px;
}

.topic {
  display: flex;
  align-items: center;
}

.title {
  display: block;
  font-size: 2rem;
  line-height: 2.25rem;
  font-weight: 600;
  text-align: left;
}
.title:hover {
  cursor: pointer;
}

.title,
h3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.comment {
  text-align: right;
}
</style>
