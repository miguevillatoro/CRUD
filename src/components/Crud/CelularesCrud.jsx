import React, {useState, useEffect} from 'react'
import Menu from '../Navbar/Navbar'
import Tabla from './Tabla'
import axios from "axios"
import CelularesForm from './CelularesForm'

const CelularesCrud = () => {

    const[celulares, setCelulares] = useState()
    const[id, setId] = useState()
    const[del, setDel] = useState()

    function configurar(id, del){
        setId(id)
        setDel(del)
    }

    useEffect(() =>{
        cargarCelulares()
    }, [])

    async function cargarCelulares(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/celulares")
            let lista = await res.data

            setCelulares(lista)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    return (
        <div>
            {
                celulares === undefined ?
                <div className='spin'>
                    {/* <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h2>Cargando...</h2> */}

                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h2>Cargando</h2>
                </div>
                :
                <Tabla evento={configurar} controlador="celulares" lista={celulares} cols={["Celular ID", "Marca", "Modelo", "Color", "Precio", "Descripcion", "Operadora"]} />
            }
        

        <div className="modal fade" id="celularesModal" tabIndex="-1" aria-labelledby="celularesModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="celularesModalLabel">Formulario Celulares</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <CelularesForm id={id} del={del} actualizar={cargarCelulares} />
                </div>
                </div>
            </div>
        </div> 

    </div>
    )
}

export default CelularesCrud