import React, {useState, useEffect} from 'react'
import Menu from '../Navbar/Navbar'
import Tabla from './Tabla'
import axios from "axios"
import JuegosForm from './JuegosForm'

const JuegosCrud = () => {

    const[juegos, setJuegos] = useState()
    const[id, setId] = useState()
    const[del, setDel] = useState()


    function configurar(id, del){
        setId(id)
        setDel(del)
    }

    useEffect(() =>{
        cargarJuegos()
    }, [])

    async function cargarJuegos(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/juegos")
            let lista = await res.data

            setJuegos(lista)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    return (
        <div> 
            {
                juegos === undefined ?
                <div className='spin'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h2>Cargando</h2>
                </div>
                :
                <Tabla evento={configurar} controlador="juegos" lista={juegos} cols={["Juegos ID", "Titulo", "Descripcion", "Plataforma", "Precio", "Categoria"]} />
            }
        

        <div className="modal fade" id="juegosModal" tabIndex="-1" aria-labelledby="juegosModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="juegosModalLabel">Formulario Juegos</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <JuegosForm id={id} del={del} actualizar={cargarJuegos} />
            </div>
            </div>
        </div>
        </div>
    </div>
    )
}

export default JuegosCrud;