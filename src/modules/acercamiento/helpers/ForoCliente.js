import axios from "axios";
import tokenService from "@/services/tokenService";

const token = tokenService.getToken();
const headers = {
  Authorization: `Bearer ${token}`,
  Mensaje: "token",
};

export const eliminarComentarioFachada = async (id) => {
  eliminarComentario(id);
};

export const crearComentarioFachada = async (comentario) => {
  crearComentario(comentario);
};

export const obtenerForosFachada = async () => {
  return await obtenerForos();
};

export const obtenerForoFachada = async (id) => {
  return await obtenerForo(id);
};

export const crearForoFachada = async (bodyForo) => {
  await crearForo(bodyForo);
};

export const eliminarForoFachada = async (id) => {
  eliminarForo(id);
};
const eliminarForo = async (id) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  axios
    .delete(`http://localhost:8083/API/v1.0/Facultad/foros/${id}`, {
      headers: headers,
    })
    .then((r) => r.data)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new Error();
    });
};

const eliminarComentario = async (id) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  axios
    .delete(`http://localhost:8083/API/v1.0/Facultad/comentarios/${id}`, {
      headers: headers,
    })
    .then((r) => r.data)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new Error();
    });
};
const crearComentario = async (comentario) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  axios
    .post(`http://localhost:8083/API/v1.0/Facultad/comentarios`, comentario, {
      headers: headers,
    })
    .then((r) => r.data)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new Error();
    });
};

const obtenerForos = async () => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  const data = axios
    .get(`http://localhost:8083/API/v1.0/Facultad/foros`, { headers: headers })
    .then((r) => r.data);
  return data;
};

const obtenerForoPorEstudiante = async (cedula) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  const data = axios
    .get(`http://localhost:8083/API/v1.0/Facultad/foros/`, { headers: headers })
    .then((r) => r.data);
  return data;
};

const crearForo = async (bodyForo) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  const data = axios
    .post(`http://localhost:8083/API/v1.0/Facultad/foros`, bodyForo, {
      headers: headers,
    })
    .then((r) => r.data)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw new Error();
    });
  return data;
};

const obtenerForo = async (id) => {
  if (!token) {
    return Promise.reject("Token no encontrado");
  }

  const data = axios
    .get(`http://localhost:8083/API/v1.0/Facultad/foros/${id}`, {
      headers: headers,
    })
    .then((r) => r.data);
  return data;
};
