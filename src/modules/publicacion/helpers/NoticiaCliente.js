import axios from "axios";
import tokenService from "@/services/tokenService";

const token = tokenService.getToken();
const headers = {
  Authorization: `Bearer ${token}`,
  Mensaje: "token",
};

/* Fachadas */
const obtenerNoticiasFachada = async () => {
  return await obtenerNoticias();
};

const ingresarNoticiaFachada = (bodyNoticia) => {
  ingresarNoticia(bodyNoticia);
};

const actualizarNoticiaFachada = (bodyNoticia, id) => {
  actualizarNoticia(bodyNoticia, id);
};

const eliminarNoticiaFachada = async (id) => {
  return await eliminarNoticia(id);
};

/* Lambdas para CRUD */
const obtenerNoticias = async () => {
  try {
    const data = axios
      .get("http://localhost:8083/API/v1.0/Facultad/noticias", {
        headers: headers,
      })
      .then((r) => r.data);
    return data;
  } catch (error) {
    throw error;
  }
};

const ingresarNoticia = (bodyNoticia) => {
  try {
    axios
      .post(`http://localhost:8083/API/v1.0/Facultad/noticias`, bodyNoticia, {
        headers: headers,
      })
      .then((r) => r.data);
  } catch (error) {
    throw error;
  }
};

const actualizarNoticia = (bodyNoticia, id) => {
  try {
    axios
      .put(
        `http://localhost:8083/API/v1.0/Facultad/noticias/${id}`,
        bodyNoticia,
        { headers: headers }
      )
      .then((r) => r.data);
  } catch (error) {
    throw error;
  }
};

const eliminarNoticia = async (id) => {
  try {
    const data = axios
      .delete(`http://localhost:8083/API/v1.0/Facultad/noticias/${id}`, {
        headers: headers,
      })
      .then((r) => r.data);
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  obtenerNoticiasFachada,
  ingresarNoticiaFachada,
  eliminarNoticiaFachada,
  actualizarNoticiaFachada,
};
