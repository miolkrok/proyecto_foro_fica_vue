import axios from "axios";

/* Fachadas */

const obtenerTokenFachada = async (bodyUsuario) => {
  return await obtenerToken(bodyUsuario);
};

/* Lambdas para CRUD */
const obtenerToken = async (bodyUsuario) => {
  try {
    const data = axios
      .post(
        `http://localhost:8081/API/v1.0/Autorizacion/tokens/obtener`,
        bodyUsuario
      )
      .then((r) => r.data);
    return data;
  } catch (error) {
    throw error;
  }
};

export { obtenerTokenFachada };
