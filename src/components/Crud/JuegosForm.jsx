import React, {useEffect, useState} from 'react'
import axios from "axios"

const JuegosForm = ({id, del, actualizar}) => {

    if(del !== true)
            del = false

    /* const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [color, setColor] = useState("")
    const [precio, setPrecio] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [operadora, setOperadora] = useState("") */

    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [plataforma, setPlataforma] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")

    useEffect(() => {
        

        if(id !== undefined)
            cargarJuegos()
        else{

            setTitulo("")
            setDescripcion("")
            setPlataforma("")
            setPrecio("")
            setCategoria("")
        }
    }, [id])

    async function cargarJuegos(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/juegos/"+id)
            let data = await res.data
            setTitulo(data.titulo)
            setDescripcion(data.descripcion)
            setPlataforma(data.plataforma)
            setPrecio(data.precio)
            setCategoria(data.categoria)

        }
        catch(error){
            alert(error)
            if(error.response.status === 404)
                document.querySelector("#btnCancelar").click()
        }
    }

    function enviar(e){
        let form = document.querySelector("#formulario")

        e.preventDefault()
        e.stopPropagation()

        if(!form.checkValidity()){

            form.classList.add('was-validated')
        }
        else{
            if(id === undefined)
                guardar()
            else if(del !== true)
                editar()
            else{
                let respuesta = window.confirm("Esta seguro que desea eliminar?")
                
                if(respuesta === true)
                    eliminar()
            }
                
        }
        
    }

    async function eliminar(){
        try{
            let res = await axios.delete("https://denny2023.azurewebsites.net/api/juegos?id=" + id)
            let data = await res.data

            alert(data.message)

            if(data.status === 1){
                document.querySelector("#btnCancelar").click()
                actualizar()
            }
        }
        catch(error){
            alert(error)
            if(error.response.status === 404)
                document.querySelector("#btnCancelar").click()
        }
    }

    async function editar(){
        try{
            const juego =
            {
                juegoId: id,
                titulo: titulo,
                descripcion: descripcion,
                plataforma: plataforma,
                precio: precio,
                categoria: categoria
            }

            let res = await axios.put("https://denny2023.azurewebsites.net/api/juegos", juego)
            let data = await res.data

            alert(data.message)

            if(data.status === 1){
                document.querySelector("#btnCancelar").click()
                actualizar()
            }

        }
        catch(error){
            alert(error)
            if(error.response.status === 404)
                document.querySelector("#btnCancelar").click()
        }
    }

    async function guardar(){
        try{
            const juego =
            {
                titulo: titulo,
                descripcion: descripcion,
                plataforma: plataforma,
                precio,
                categoria: categoria
            }

            let res = await axios.post("https://denny2023.azurewebsites.net/api/juegos", juego)
            let datos = res.data

            alert(datos.message)

            if(datos.status === 1){
                document.querySelector("#btnCancelar").click()
                actualizar()
            }
                

        }
        catch(error){
            alert(error)
        }
    }

    function cancelar(e){
        e.preventDefault()
        e.stopPropagation()
        let form = document.querySelector("#formulario")
        form.classList.remove('was-validated')
    }

    return (
        <div>
            <form id="formulario" className='needs-validation' noValidate>
                {
                    id !== undefined ?
                    <div className='form-group mb-3'>
                        <label className='form-label'>ID:</label>
                        <input type="text" value={id} readOnly disabled className="form-control" />
                    </div>
                    :
                    ""
                }
            
                <div className='form-group mb-3'>
                    <label className='form-label'>Titulo:</label>
                    <input required type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="form-control" disabled={del} placeholder="Ingrese una marca" />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Descripción:</label>
                    <input required type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="form-control" disabled={del} placeholder="Ingrese la descripción" />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Plataforma:</label>
                    <input required type="text" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} className="form-control" disabled={del} placeholder="Ingrese un modelo" />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Precio:</label>
                    <input required type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} className="form-control" disabled={del} placeholder="Ingrese el precio" />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Categoria:</label>
                    <input required type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="form-control" disabled={del} placeholder="Ingrese la operadoras" />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className='modal-footer form-group mb-3'>
                    <input onClick={(e) => enviar(e)} type="submit" className={`btn btn-${id === undefined ? "success" : del===true ? "danger" : "primary"}`} value={id === undefined ? "Guardar" : del===true ? "Eliminar" : "Editar"} />
                    <button id="btnCancelar" data-bs-dismiss="modal" onClick={(e) => cancelar(e)} className='btn btn-warning'>Cancelar</button>
                </div>
        </form>
        
    </div>
    )
}

export default JuegosForm;