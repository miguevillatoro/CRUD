import React from 'react'

const Tabla = ({cols, controlador, lista, evento}) => {

    /*
    useEffect(() => {
        //console.log(lista)

        console.log(Object.values(lista[0]))
    }, [])*/

    return (
        <div className='tbl'>
            <table className='table table-bordered'>
                <thead>
                    <tr className='text-center table-light'>
                        {
                            cols.map((value, index) =>{
                                return <th key={index}>{value}</th>
                            })
                        }
                        <th className='btn-cr'>
                            <button className='btn btn-nuevo' onClick={() => evento()} data-bs-toggle="modal" data-bs-target={`#${controlador}Modal`}><i className="bi bi-file-earmark-plus"></i></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((value, index) => {
                            return <tr key={index}>
                                {Object.values(value).map((value2, index2) => {
                                    return <td key={index2}>{value2}</td>
                                })}
                                <td className='table-light btn-cr'>
                                    <button className='btn btn-editar btn-r' onClick={() => evento(Object.values(value)[0])} data-bs-toggle="modal" data-bs-target={`#${controlador}Modal`}><i className="bi bi-pencil-square"></i></button>
                                    <button className='btn btn-eliminar' onClick={() => evento(Object.values(value)[0], true)} data-bs-toggle="modal" data-bs-target={`#${controlador}Modal`}><i className="bi bi-trash3"></i></button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Tabla;