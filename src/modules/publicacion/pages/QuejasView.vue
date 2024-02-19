<template>
  <div class="quejas">
    <div class="switch">
      <InputSwitch
        class="custom-inputswitch"
        v-model="checked"
        @change="mensajeVista"
      />
    </div>
    <h1>Preguntas Frecuentes</h1>
    <div class="contenedor-formulario">
      <div class="infor2">
        <Accordion class="preguntas">
          <AccordionTab header="Información general">
            <h4>¿Qué tipo de noticias se publican en este foro?</h4>
            <p>
              En este foro se publican noticias relacionadas con la Facultad de
              Ciencias Aplicadas de la Universidad Central del Ecuador. Esto
              incluye:
            </p>
            <p>
              - Anuncios importantes de la facultad, como fechas límite para
              solicitudes, eventos próximos, cambios en el plan de estudios,
              etc.
            </p>
            <p>
              - Información sobre becas, pasantías y oportunidades de trabajo
              disponibles para estudiantes de la facultad.
            </p>
            <p>
              - Artículos sobre investigaciones y proyectos que se están
              realizando en la facultad.
            </p>

            <h4>¿Con qué frecuencia se actualiza el foro?</h4>
            <p>
              El foro se actualiza diariamente con nuevas noticias e
              información. Se recomienda visitarlo con frecuencia para estar al
              día con las últimas novedades de la facultad.
            </p>

            <h4>
              ¿Cómo puedo suscribirme para recibir notificaciones de nuevas
              publicaciones?
            </h4>
            <p>
              Para suscribirte y recibir notificaciones por correo electrónico
              sobre nuevas publicaciones, simplemente haz clic en el botón
              "Suscripción" ubicado en la parte superior del foro. Al hacerlo,
              te asegurarás de estar al tanto de todas las actualizaciones y
              novedades
            </p>

            <h4>
              ¿Cómo puedo contactar al equipo del foro si tengo una pregunta o
              comentario?
            </h4>
            <p>
              Puedes contactar al equipo del foro por correo electrónico a la
              siguiente dirección: fica-uce@gmail.com. También puedes dejar un
              comentario en cualquier publicación del foro.
            </p>
          </AccordionTab>
          <AccordionTab header="Admisión Universitaria">
            <h4>¿Cuáles son los requisitos de admisión para la universidad?</h4>
            <p>
              Los requisitos para entrar a la Universidad Central del Ecuador
              varían según la carrera que deseas estudiar, pero en general, los
              requisitos básicos son:
            </p>

            <p>
              <strong
                >1.Ser bachiller o estar en proceso de culminar el
                bachillerato.</strong
              >
            </p>
            <p>
              <strong
                >2. Haber obtenido un puntaje mínimo en el Examen Nacional de
                Acceso a la Educación Superior (ENES).</strong
              >
              El puntaje mínimo varía según la carrera y la universidad.
            </p>
            <p>
              <strong>3. Presentar la documentación requerida:</strong>
              Certificado de haber rendido el ENES.
            </p>
            <p>- Cédula de ciudadanía o pasaporte.</p>
            <p>- Título de bachiller o acta de grado.</p>
            <p>- Certificado de haber rendido el ENES.</p>

            <p>
              <strong>4. Aprobar el curso de nivelación general.</strong> Este
              curso es obligatorio para todos los estudiantes que ingresan a la
              universidad por primera vez.
            </p>
            <h5>Algunos recursos que te pueden ser útiles:</h5>
            <p>- SENESCYT: https://www.educacionsuperior.gob.ec/</p>
            <p>- Universidad Central del Ecuador: https://www.uce.edu.ec/</p>
          </AccordionTab>
          <AccordionTab header="Solicitudes y Pasantías">
            <h4>
              ¿Cuáles son los formatos de las prácticas profesionales o
              pasantías?
            </h4>

            <p>
              Para acceder a los formatos de las prácticas profesionales o
              pasantías, simplemente visita la siguiente dirección web:
              https://www.uce.edu.ec/web/fiq/archive_noticias?artID=291392
            </p>
            <h4>
              ¿Cómo puedo contactar a un profesor o investigador para una
              pasantía?
            </h4>
            <p>
              Puedes contactar a un profesor o investigador por correo
              electrónico, teléfono o durante sus horas de oficina. La
              información de contacto de los profesores e investigadores se
              encuentra disponible en la página web de la Facultad:
              https://www.uce.edu.ec/web/fing
            </p>
            <h4>
              ¿Dónde puedo encontrar información sobre Vinculación con la
              Sociedad?
            </h4>
            <p>
              La información se encuentra disponible en la página web de la
              Universidad: https://www.uce.edu.ec/web/dvs
            </p>
          </AccordionTab>
          <AccordionTab header="Ciencia y tecnología">
            <h4>¿Cómo puedo participar en un proyecto de investigación?</h4>
            <p>
              Puedes contactar directamente a un profesor o investigador sobre
              proyectos de investigación y si hay oportunidades para participar.
            </p>
            <h4>
              ¿Qué recursos ofrece la facultad para estudiantes interesados en
              ciencia y tecnología?
            </h4>
            <p>
              - Laboratorios: La Facultad cuenta con laboratorios equipados con
              tecnología moderna para el desarrollo de investigaciones en
              diferentes áreas de ciencia y tecnología.
            </p>
            <p>
              - Centros de investigación: La Facultad cuenta con centros de
              investigación especializados en diferentes áreas de ciencia y
              tecnología.
            </p>
            <p>
              -Becas: La Facultad ofrece becas para estudiantes que deseen
              realizar investigaciones en ciencia y tecnología.
            </p>
            <h4>
              ¿Dónde puedo encontrar información sobre eventos y talleres
              relacionados con ciencia y tecnología?
            </h4>
            <p>
              - Para obtener información sobre eventos y talleres relacionados
              con ciencia y tecnología, te recomendaría dirigirte al apartado de
              noticias. Utiliza el buscador y escribe la palabra "eventos". De
              esta manera, podrás acceder rápidamente a la información que estás
              buscando.
            </p>
            <p>
              - Además, la página web de la Facultad también es una excelente
              fuente. La sección de eventos suele publicar información
              actualizada sobre eventos y talleres relacionados con ciencia y
              tecnología.
            </p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <Button
      class="btn-agregar"
      v-if="!agregarQueja"
      icon="pi pi-plus"
      label="Agregar Pregunta"
      raised
      @click="agregarQueja = true"
    />
    <i class="pi pi-plus"></i>
    <QuejaFormulario
      v-if="agregarQueja"
      @cancelar="cancelarFormulario($event)"
    />

    <div class="quejas-vista" v-if="!checked">
      <QuejasLectura v-if="quejas" :check="false" :quejas="quejas" />
    </div>
    <div class="admin" v-else>
      <QuejasLectura v-if="quejas" :check="true" :quejas="quejas" />
    </div>
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import InputSwitch from "primevue/inputswitch";
import QuejaFormulario from "../components/QuejaFormulario.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import QuejasLectura from "../components/QuejasLectura.vue";
import { obtenerQuejasFachada } from "@/modules/publicacion/helpers/QuejaCliente";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

export default {
  components: {
    QuejaFormulario,
    InputSwitch,
    Card,
    Button,
    QuejasLectura,
    Toast,
    ConfirmDialog,
    Accordion,
    AccordionTab,
  },

  data() {
    return {
      //Cambiar entre Admin y Lectura
      checked: true,
      agregarQueja: false,
      quejas: null,
      toast: useToast(),
    };
  },

  async mounted() {
    try {
      this.quejas = await obtenerQuejasFachada();
    } catch (error) {
      this.toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error al obtener quejas",
        life: 3000,
      });
    }
    this.mensajeVista();
  },

  methods: {
    mensajeVista() {
      if (this.checked) {
        this.toast.add({
          severity: "info",
          summary: "Modo Administrador",
          detail: "Estas en la vista de administrador",
          life: 3000,
        });
      } else {
        this.toast.add({
          severity: "info",
          summary: "Modo Lectura",
          detail: "Estas en la vista de solo lectura",
          life: 3000,
        });
      }
    },

    cancelarFormulario(event) {
      this.agregarQueja = event;
    },
  },
};
</script>

<style scoped>
h4,
h5 {
  text-align: left;
}

p {
  text-align: left;
  font-size: 10pt;
}
.quejas {
  background: rgb(234, 234, 234);
  padding-bottom: 20px;
}
.p-inputswitch-slider {
  width: 10px;
}

.switch {
  position: absolute;
  left: 10px;
  padding: 10px 0px;
}

.contenedor-formulario {
  margin-top: 40px;
}

.quejas-vista,
.admin,
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.quejas-vista,
.admin {
  margin-top: 40px;
}

.card {
  width: 90%;
  gap: 20px;
}

.contenedor-formulario button {
  font-size: 3vmin;
}

.pi-plus {
  display: none;
  background: #6366f1;
  color: white;
  width: 20%;
  padding: 10px;
  font-size: 2.5vmin;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 1px gray;
  cursor: pointer;
}

@media screen and (max-width: 620px) {
  .btn-agregar {
    display: none;
  }
  .contenedor-formulario i {
    display: inline-block;
  }
}

.informacion {
  display: flex;
  width: 100%;
  padding: 10px;
  gap: 2%;
}

.infor2 {
  width: 50%;
}
@media screen and (max-width: 350px) {
  .informacion {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .infor2 {
    width: 100%;
  }
}
.contenedor-formulario {
  display: flex;
  justify-content: center;
}
.btn-agregar {
  margin-top: 15px;
}
</style>
