import React, { Children, useEffect, useState } from 'react';
import Title from '../../components/Title';
import Enlace from '../../components/Enlace';

import InglesImage from '../../assets/a1.jpg'
import Swal from 'sweetalert2';
import { getUserData } from '../../auth';
import { Link, useLoaderData } from 'react-router-dom';


export const loader = async () => {
    const user = await getUserData()

    return { user }
}

const ExitEnrollButton = ({ onPress, children, ...props }) => {
    return (
        <button {...props} onClick={onPress} className='bg-red-600 hover:bg-red-700 shadow-[inset_0px_-6px_0px_0px_#00000050] block sm:inline-block xl:inline-block lg:inline-block text-center my-2 font-semibold text-white p-4 transition-all duration-500'>
            {children}
        </button>
    )
}

const MyRoom = ({ room, handle }) => {
    const { nombre_aula, aula_descripcion, nivel, aula_id } = room

    return (
        <>
            <div className='flex gap-2 items-center my-2'>

                <img src={InglesImage} alt="" className='w-80' />

                <div className='flex-1 space-y-2'>
                    <Title>{nombre_aula}</Title>
                    <p>{aula_descripcion}</p>
                    <Link to={`/Dashboard/Rooms/${aula_id}`} className='bg-violet-900 text-center rounded text-white p-2 inline-block' >
                        Ver Aula
                    </Link>

                </div>
            </div>

        </>
    )

}

const DashboardRooms = () => {

    const { user } = useLoaderData()

    const [myRooms, setMyRooms] = useState([])

    const getMyRooms = async () => {
        await fetch(`http://localhost:4000/api/dashboard/rooms/${user.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            .then(response => response.json())
            .then(data => setMyRooms(data.body.data));
    }

    useEffect(() => { getMyRooms() }, [])

    return (
        <div>
            <div>
                <Enlace to={"/Dashboard/Courses"}>Inscribirme</Enlace>
            </div>

            <Title>
                Mis Aulas
            </Title>



            {myRooms.map(room => <MyRoom key={room.aula_id} room={room} />)}

        </div>
    );
}

export default DashboardRooms;
