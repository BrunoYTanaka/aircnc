import React, { useState, useMemo } from 'react'
import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api'

function New({ history }) {
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null

        },
        [thumbnail]
    )

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user_id = localStorage.getItem('user')
        const data = new FormData()
        data.append('thumbnail', thumbnail)
        data.append('techs', techs)
        data.append('price', price)
        data.append('company', company)

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard')

    }

    return (
        <form onSubmit={handleSubmit}>

            <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}

            >
                <input type="file" onChange={(e) => setThumbnail(e.target.files[0])}></input>
                <img src={camera} alt="Selecionar imagem" />
            </label>

            <label htmlFor="company"> EMPRESA
            </label>
            <input id="company" placeholder="Sua empresa incrivel" value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <label htmlFor="techs"> TECNOLOGIAS * <span>(separadas por vírgula)</span>
            </label>
            <input id="techs" placeholder="Quais tecnologias usam?" value={techs}
                onChange={(e) => setTechs(e.target.value)}
            />
            <label htmlFor="price"> VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
            </label>
            <input id="price" placeholder="Valor cobrado por dia" value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button className="btn" type="submit">Cadastrar</button>
        </form>
    )
}

export default New
