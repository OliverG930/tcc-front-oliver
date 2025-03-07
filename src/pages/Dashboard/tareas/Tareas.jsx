import { TareaOfList } from "@components/TareasOfList";
import Title from "@components/Title";
import { obtenerTareas } from "@services/Tareas.service";
import { useAuthStore } from "@store/authStore";
import { useRoomStore } from "@store/roomStore";
import { useEffect, useState } from "react";

const Tareas = () => {

  const { room } = useRoomStore()
  const { token } = useAuthStore()
  const [tareas, setTareas] = useState([])

  const cargarTareas = async () => {
    const tareasResult = await obtenerTareas({ roomId: room.aula, token, token })
    const { body: tasks } = tareasResult
    setTareas(tasks)
  }

  useEffect(() => {
    cargarTareas()
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3">
        <TareaOfList tareas={tareas} />
      </div>
    </section>
  )
}

export default Tareas;
