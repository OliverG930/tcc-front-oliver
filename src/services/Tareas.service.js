import axios from "axios";
const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'


export async function obtenerTareas({ roomId, token }) {

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const result = await axios.get(`${base_url}/api/dashboard/rooms/${roomId}/tasks`, config)

  return result.data

}

export async function createNewTask({ roomId, token, data }) {

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  const result = await axios.post(`${base_url}/api/dashboard/rooms/${roomId}/tasks`,
    data, config)

  return result.data

}

export async function deleteTask({ id, token }) {

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  const result = await axios.delete(`${base_url}/api/dashboard/rooms/tasks/${id}`, config)

  return result.data

}