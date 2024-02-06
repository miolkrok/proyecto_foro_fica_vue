<template>
  <div class="autorizacion">
    <form class="formulario">
      <span id="titulo">Autorización</span>
      <span class="p-float-label">
        <InputText class="input" id="usuario" v-model="usuario" type="text" />
        <label for="usuario">Usuario</label>
      </span>
      <span class="p-float-label">
        <InputText
          class="input"
          id="contrasenia"
          v-model="contrasenia"
          type="password"
        />
        <label for="contrasenia">Contraseña</label>
      </span>

      <Button
        label="Ingresar"
        icon="pi pi-sign-in"
        @click="ingresar"
        raised
        class="boton-texto"
      />

      <i id="icono" class="pi pi-sign-in"></i>
    </form>
    <Toast />
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";

//Dialogo
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

//Helpers
import { obtenerTokenFachada } from "@/helpers/AutorizacionCliente";

export default {
  components: { InputText, Button, Toast },
  data() {
    return {
      toast: useToast(),
      usuario: "",
      contrasenia: "",
    };
  },
  methods: {
    async ingresar() {
      if (this.usuario && this.contrasenia) {
        try {
          const token = await obtenerTokenFachada({
            username: this.usuario,
            password: this.contrasenia,
          });
          this.toast.add({
            severity: "success",
            summary: "Token",
            detail: "Token Generado: " + token,
            life: 3000,
          });

          //Guardar token en el localStorage
          localStorage.setItem("token", token);
          
          this.$router.push("/inicio");
        } catch (error) {
          if (error.response.status === 401)
            this.toast.add({
              severity: "error",
              summary: "Usuario",
              detail: "Usuario o contraseña incorrecta",
              life: 3000,
            });
          return;
        }
      } else {
        this.toast.add({
          severity: "warn",
          summary: "Advertencia",
          detail: "Llene todos los campos",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.autorizacion {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  animation: fade 0.3s linear;
}

#titulo {
  color: #6f4dff;
  font-size: 4vmin;
  font-weight: bold;
}

@keyframes fade {
  to {
    opacity: 0.5;
    transform: scale(1);
  }
  from {
    opacity: 1;
    transform: scale(0);
  }
}

.formulario {
  width: 50%;
  padding: 2%;
  background: white;
  box-shadow: 0 0 10px grey, 0 0 40px 30px gainsboro;
  border-radius: 5px;
  display: flex;
  margin: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

span {
  margin-top: 20px;
  width: 80%;
}

.input {
  width: 100%;
  font-size: 2vmin;
}

label {
  font-size: 2.5vmin;
}

.boton-texto {
  display: flex;
  margin: 20px;
  gap: 10px;
}

#icono {
  display: none;
  color: white;
  background: #6366f1;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 4vmin;
}

@media screen and (max-width: 500px) {
  .formulario {
    width: 100%;
  }
}

@media screen and (max-width: 425px) {
  .boton-texto {
    display: none;
  }
  #icono {
    display: inline-block;
  }
}
</style>
