import React from 'react'
import {useState,useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {
  const [nombre,setNombre]= useState('');
  const [propietario,setpropietario]= useState('');
  const [email,setEmail]= useState('');
  const [fecha,setFecha]= useState('');
  const [sintomas,setSintomas]= useState('');

  const [error, setError] = useState(false);

  useEffect(()=>{
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setpropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])
   

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return fecha+random;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if([nombre,propietario,email,fecha,sintomas].includes('')){
      console.log("Hay un campo vacio")
      setError(true);
      return;
    }
    setError(false);
    const objPaciente ={
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }
    if(paciente.id){
      objPaciente.id=paciente.id;
      console.log(objPaciente);
      console.log(paciente);
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objPaciente : pacienteState); 
      setPacientes(pacientesActualizados);
      setPaciente({});
    }else{
      objPaciente.id=generarId();
      setPacientes([...pacientes,objPaciente]);
    }
    //console.log(objPaciente);
   
    setNombre('');
    setpropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }
  

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-center text-3xl ">Seguimiento Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
          Añade Pacientes y {""}
          <span className="text-indigo-600 font-bold"> Administralos</span>
        </p>
        <form
          onSubmit={handleSubmit} 
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 "
        >
          {error && <Error>Todos los campos son obligatorios</Error> }
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700">
              Nombre Mascota {nombre}
            </label>
            <input 
              id='mascota'
              type="text" 
              placeholder='Nombre de la mascota'
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={(e)=> setNombre(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700">
              Nombre Propietario
            </label>
            <input 
              id='propietario'
              type="text" 
              placeholder='Nombre del Propietario'
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={(e)=> setpropietario(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input 
              id='email'
              type="email" 
              placeholder='Email contacto propietario'
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700">
              Alta
            </label>
            <input 
              id='alta'
              type="date" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={(e)=> setFecha(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700">
              Sintomas
            </label>
            <textarea 
              id='sintomas'
              type="date" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder='Describe los sintomas'
              value={sintomas}
              onChange={(e)=> setSintomas(e.target.value)}
            />
          </div>
          <input  
            type="submit" 
            className="w-full bg-indigo-600 p-3 uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-opacity text-white"
            value={paciente.id?"Editar Paciente":"Agregar Paciente"}
          />
        </form>
    </div>
  )
}

export default Formulario