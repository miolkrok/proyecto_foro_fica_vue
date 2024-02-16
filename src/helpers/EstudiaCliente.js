import axios from "axios";
import tokenService from "@/services/tokenService";

const token = tokenService.getToken();
const headers = {
  Authorization: `Bearer ${token}`,
  Mensaje: "token",
};

/* Fachadas */

const obtenerTodosEstudiantesFachada = async () => {
  return await obtenerTodosEstudiantes();
};
const obtenerEstudianteFachada = async (cedula) => {
  return await obtenerEstudiante(cedula);
};

const ingresarEstudianteFachada = (bodyEstudiante) => {
  ingresarEstudiante(bodyEstudiante);
};

const actualizarEstudianteFachada = (bodyEstudiante, id) => {
  actualizarEstudiante(bodyEstudiante, id);
};

const actualizarEstudianteParcialFachada = (bodyEstudiante) => {
  actualizarEstudianteParcial(bodyEstudiante);
};

const eliminarEstudianteFachada = async (id) => {
  return await eliminarEstudiante(id);
};

/* Lambdas para CRUD */
const obtenerTodosEstudiantes = async () => {
  try {
    const data = axios
      .get(`http://localhost:8083/API/v1.0/Facultad/estudiantes`, {
        headers: headers,
      })
      .then((r) => r.data);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerEstudiante = async (cedula) => {
  try {
    const data = axios
      .get(`http://localhost:8083/API/v1.0/Facultad/estudiantes/${cedula}`, {
        headers: headers,
      })
      .then((r) => r.data);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

const ingresarEstudiante = (bodyEstudiante) => {
  try {
    axios
      .post(
        `http://localhost:8083/API/v1.0/Facultad/estudiantes`,
        bodyEstudiante,
        { headers: headers }
      )
      .then((r) => r.data);
  } catch (error) {
    throw error;
  }
};

const actualizarEstudiante = (bodyEstudiante, id) => {
  try {
    axios
      .put(
        `http://localhost:8083/API/v1.0/Facultad/estudiantes/${id}`,
        bodyEstudiante,
        { headers: headers }
      )
      .then((r) => r.data);
  } catch (error) {
    throw error;
  }
};

const actualizarEstudianteParcial = (bodyEstudiante) => {
  try {
    axios
      .patch(
        `http://localhost:8083/API/v1.0/Facultad/estudiantes`,
        bodyEstudiante,
        { headers: headers }
      )
      .then((r) => r.data);
  } catch (error) {
    throw error;
  }
};

const eliminarEstudiante = async (id) => {
  try {
    const data = axios
      .delete(`http://localhost:8083/API/v1.0/Facultad/estudiantes/${id}`, {
        headers: headers,
      })
      .then((r) => r.data);
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  obtenerTodosEstudiantesFachada,
  obtenerEstudianteFachada,
  ingresarEstudianteFachada,
  actualizarEstudianteFachada,
  actualizarEstudianteParcialFachada,
  eliminarEstudianteFachada,
};
