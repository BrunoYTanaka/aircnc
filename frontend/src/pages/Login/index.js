import React, { useState } from 'react'
import api from '../../services/api'

function Login({ history }) {

    const [email, setEmail] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        const response = await api.post('/sessions', { email })

        const { _id } = response.data

        localStorage.setItem('user', _id)

        history.push('/dashboard')

    }

    const handleChange = e => {
        setEmail(e.target.value)
    }

    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-Mail *</label>
                <input type="email" id="email" value={email} placeholder="Seu melhor e-mail"
                    onChange={handleChange}
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}

export default Login
