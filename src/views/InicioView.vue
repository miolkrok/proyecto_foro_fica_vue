<template>
  <div class="inicio">
    <Particulas id="particulas" />
    <div class="titulo">
      <h1>Página Web Diseño Industrial</h1>
    </div>

    <div class="cont-galeria">
      <Galleria
        :value="images"
        :numVisible="1"
        :circular="true"
        containerStyle="max-width: 100%;"
        :showItemNavigators="true"
        :showThumbnails="false"
        :showItemNavigatorsOnHover="true"
        :showIndicators="true"
        v-model:activeIndex="indiceActivo"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item.image"
            style="width: 100%; max-height: 60vh"
          />
        </template>
      </Galleria>
    </div>

    <div class="informacion">
      <div class="infor1">
        <Fieldset>
          <template #legend>
            <div class="flex align-items-center text-primary">
              <span class="font-bold text-lg">Beneficio Subscripción</span>
            </div>
          </template>
          <p class="m-0">
            En nuestro blog, no solo te mantenemos actualizado con las últimas
            noticias de la Facultad de diseño industrial, sino que te damos la
            oportunidad de ser un protagonista activo. ¿Tienes una idea genial
            que quieres compartir? ¿Quieres discutir un tema de interés con
            compañeros de ideas afines? ¡Este es el lugar perfecto para hacerlo,
            SUSCRÍBETE! <br>

            Por la suscripción podrás reclamar un Dorito <span style="color: red">¡GRATIS!</span>
          </p>
        </Fieldset>
      </div>

      <div class="infor2">
        <Accordion :activeIndex="0">
          <AccordionTab header="Informar y Actualizar">
            <p>
              Noticias oportunas y relevantes de la Facltad de diseño
              industrial, incluyendo proyectos innovadores, tendencias
              emergentes y eventos importantes.
            </p>
          </AccordionTab>
          <AccordionTab header="Facilitar la Colaboración">
            <p>
              Colaboración y el intercambio de ideas entre estudiantes de diseño
              industrial, y profesionales, a través de foros, post de discusión.
            </p>
          </AccordionTab>
          <AccordionTab header="Interacción Activa">
            <p>
              Comunidad activa en torno al blog, donde los lectores participen a
              través de comentarios, preguntas y contribuciones de contenido.
            </p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script>
import Particulas from "@/modules/publicacion/components/Particulas.vue";
import Fieldset from "primevue/fieldset";
import Galleria from "primevue/galleria";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Card from "primevue/card";

export default {
  name: "HomeView",
  components: {
    Particulas,
    Galleria,
    Fieldset,
    Accordion,
    AccordionTab,
    Card,
  },
  data() {
    return {
      images: [
        {
          image: "https://i.imgur.com/O8g7Vqc.png",
        },
        {
          image:
            "https://focrea.com/wp-content/uploads/2022/05/FOCREA-1-scaled.jpg",
        },
        {
          image: "https://i.imgur.com/VQH4urm.jpg  ",
        },
        {
          image:
            "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          image:
            "https://images.pexels.com/photos/323645/pexels-photo-323645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
      indiceActivo: 0,
    };
  },

  methods: {
    metodo1() {
      console.log(this.indiceActivo + "asd");
    },

    mediaquery() {
      if (window.innerWidth <= 460) {
        divs.forEach((div) => {
          div.style.display = "none";
        });
      }
    },
  },
};
</script>
<style scoped>
.inicio {
  max-width: 100%;
}

#particulas {
  position: fixed;
  height: 100%;
  width: 100%;
}

.m-0 {
  text-align: justify;
}

.titulo {
  width: 40%;
  display: flex;
  background: #3259bd;
  font-size: 0.8vw;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding-left: 20px;
  color: white;
}

.cont-galeria {
  z-index: 1;
}
.informacion {
  display: flex;
  width: 100%;
  padding: 10px;
  gap: 2%;
}

.infor1,
.infor2 {
  width: 50%;
}

p {
  font-size: 3vmin;
}

@media screen and (max-width: 350px) {
  .titulo {
    width: 100%;
  }

  .cont-galeria {
    display: none;
  }

  #particulas {
    display: none;
  }
  .informacion {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .infor1,
  .infor2 {
    width: 100%;
  }
}
</style>
