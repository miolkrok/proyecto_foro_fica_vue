import axios from "axios";
import tokenService from "@/services/tokenService";

const token = tokenService.getToken();
const headers = {
  Authorization: `Bearer ${token}`,
  Mensaje: "token",
};

/* Fachadas */
const obtenerQuejasFachada = async () => {
  return await obtenerQuejas();
};

const ingresarQuejaFachada = async (bodyQueja) => {
  await ingresarQueja(bodyQueja);
};

const actualizarQuejaFachada = (bodyQueja, id) => {
  actualizarQueja(bodyQueja, id);
};

const eliminarQuejaFachada = async (id) => {
  return await eliminarQueja(id);
};

/* Lambdas para CRUD */
const obtenerQuejas = async () => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  const data = axios
    .get("http://localhost:8083/API/v1.0/Facultad/quejas", { headers: headers })
    .then((r) => r.data);
  return data;
};

const ingresarQueja = async (bodyQueja) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  axios
    .post(`http://localhost:8083/API/v1.0/Facultad/quejas`, bodyQueja, {
      headers: headers,
    })
    .then((r) => r.data);
};

const actualizarQueja = (bodyQueja, id) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  axios
    .put(`http://localhost:8083/API/v1.0/Facultad/quejas/${id}`, bodyQueja, {
      headers: headers,
    })
    .then((r) => r.data);
};

const eliminarQueja = async (id) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  const data = axios
    .delete(`http://localhost:8083/API/v1.0/Facultad/quejas/${id}`, {
      headers: headers,
    })
    .then((r) => r.data);
  return data;
};

export {
  obtenerQuejasFachada,
  ingresarQuejaFachada,
  actualizarQuejaFachada,
  eliminarQuejaFachada,
};
