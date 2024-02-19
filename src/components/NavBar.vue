<template>
  <div v-if="$route.name === 'autorizacion'"></div>
  <div v-else>
    <nav>
      <div class="logo"><img src="../assets/logo_a.png" /></div>
      <div class="menu-icon" @click="toggleMenu">
        <i :class="icon" style="font-size: 5vmin"></i>
      </div>
      <ul :class="menuOpen ? 'show' : ''">
        <router-link to="/inicio">Inicio</router-link>
        <router-link to="/noticias">Noticias</router-link>
        <router-link to="/foro">Foro</router-link>
        <router-link to="/suscripcion">Suscripción</router-link>
        <router-link to="/quejas">Preguntas</router-link>
        <router-link to="/estudiantes">Estudiantes</router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      icon: "pi pi-bars",
    };
  },
  methods: {
    toggleMenu() {
      this.icon = this.menuOpen ? "pi pi-bars" : "pi pi-times";
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style scoped>
nav {
  background: #fff;
  border-bottom: solid gainsboro 0.5px;
  box-shadow: 0 2px 5px gainsboro;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

nav a.router-link-exact-active {
  background-color: #3744b3;
  color: white;
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  color: white;
}

nav a:hover {
  color: #3744b3;
  font-weight: bold;
}

ul {
  list-style: none;
  margin: 0;
  padding: 10px;
  display: flex;
}

a {
  font-size: 2.5vmin;
  color: #6c757d;
  font-weight: bold;
  padding: 15px;
  margin-left: 10px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
.logo {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.logo img {

  height: 85px;
}

.menu-icon {
  display: none;
  cursor: pointer;
  font-size: 30px;
  color: #3744b3;
}

@media screen and (max-width: 800px) {
  .logo {
    display: none;
  }
  nav {
    display: flex;
    flex-direction: column;
  }
  nav a.router-link-exact-active,
  nav a:hover {
    font-weight: bold;
  }

  ul {
    display: none;
  }

  .menu-icon {
    display: flex;
    padding: 5px 15px;
  }

  .show {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .show a {
    margin: 0;
    margin-bottom: 10px;
    width: 100%;
  }
}
</style>
