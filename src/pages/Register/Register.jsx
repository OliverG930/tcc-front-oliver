import { useState } from 'react'
import Banner from '../../components/Banner'
import Button from '../../components/Button'
import Content from '../../components/Content'
import EnlaceDefaultNoBg from '../../components/EnlaceDefaultNoBg'
import Header from '../../components/Header'
import Alert from '../../components/Alerts'
import RegisterService from '../../services/auth'
import isEmail from 'validator/lib/isEmail'
import Separador from '../../components/Separador'

const Input = ({ type, label, handle }) => {
    return (
        <div className='my-4'>
            <label>{label}</label>
            <input type={type} className='p-2 rounded-xl border w-full' onChange={(e) => handle(e.target.value)} />
        </div>
    )
}

const Register = () => {

    const [user, setUser] = useState([])
    const [hideAlert, setHideAlert] = useState(true)
    const [alertMessage, setAlertMessage] = useState('default')
    const [alertType, setAlertType] = useState('default')


    const nameHandle = (text) => {
        setUser({ ...user, name: text })
    }

    const emailHandle = (text) => {
        setUser({ ...user, email: text })
    }

    const passwordHandle = (text) => {
        setUser({ ...user, password: text })
    }

    const showAlert = ({ type, message, time }) => {
        setHideAlert(false)
        setAlertMessage(message || 'no message yet')
        setAlertType(type || 'default')
        setTimeout(() => { setHideAlert(true) }, time || 3000)
    }

    const registerSubmit = (e) => {
        e.preventDefault()

        if (!user.name || user.name === "") {
            showAlert({
                type: 'danger',
                message: 'campo nombre sin rellenar'
            })

            return
        }

        if (!user.email || user.email === "") {

            showAlert({
                type: 'danger',
                message: 'campo correo sin rellenar'
            })

            return
        }

        if (!user.password || user.password === "") {

            showAlert({
                type: 'danger',
                message: 'campo contraseña sin rellenar'
            })

            return
        }

        if (!isEmail(user.email)) {

            showAlert({
                type: 'danger',
                message: 'invalid email'
            })

            return
        }


        RegisterService.register(user).then(result => {
            console.log(result)

            showAlert({
                type: 'success',
                message: 'Registro exitoso'
            })


        }).catch((err) => {

            if (err.code === "ERR_BAD_RESPONSE") {

                showAlert({
                    type: 'danger',
                    message: err.response.data.body
                })

                setTimeout(() => { setHideAlert(true) }, 5000)
            }

        })

    }

    return (
        <>
            <Header />
            <Banner text='Registro de Usuarios' />

            <Content>
                <Alert type={alertType} message={alertMessage} hide={hideAlert} />
                <div className='bg-gray-50 bg-opacity-50 border rounded border-gray p-6'>

                    <div className='w-2/3 mx-auto '>

                        <form action="/register-success" method='POST' onSubmit={(e) => registerSubmit(e)}>
                            <Input type="text" label="Nombre" handle={nameHandle} />
                            <Input type="text" label="Correo electrónico" handle={emailHandle} />
                            <Input type="password" label="Contraseña" handle={passwordHandle} />

                            <Separador />

                            <Button text='Register' /> | <EnlaceDefaultNoBg href="/login" text="Login" />

                        </form>
                    </div>
                </div>
            </Content>


        </>
    )

}

export default Register