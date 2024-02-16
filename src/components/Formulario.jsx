import {useState, useEffect} from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [simptomas, setSimptomas] = useState("");
    const [error, setError] = useState(false);

    useEffect ( () => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSimptomas(paciente.simptomas)
        }
    }, [paciente])    

const generarId = () => {
    const random = Math.random().toString(36);
    const fecha = Date.now().toString(36)

    return random + fecha

}

const handleSubmit = (e) => {
    e.preventDefault();
    if([nombre, propietario, email, fecha, simptomas].includes("")){
        console.log("Hay almenos un campo vacío")
        setError(true)
        return;
    } 
    setError(false)
    const objetoPacientes = {
        nombre,
        propietario,
        email,
        fecha,
        simptomas,
    }

    if (paciente.id){
        //editant un registre
        objetoPacientes.id=paciente.id

        const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id===paciente.id ? objetoPacientes : pacienteState)
        setPacientes(pacientesActualizados)
        setPaciente({})
    } else {
        objetoPacientes.id = generarId();
        setPacientes([...pacientes, objetoPacientes])

    }

    //reiniciar el formulari
    setNombre("")
    setPropietario("")
    setEmail("")
    setFecha("")
    setSimptomas("")
}

    

  
    return (
    <div className="md:w-1/ lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {""}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" action="">
            {error && <Error mensaje="Todos los campos son obligatorios"/> }
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
                <input id="mascota" type="text" placeholder="Nombre de la mascota" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
                <input id="propietario" type="text" placeholder="Nombre del propietario" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={(e) => setPropietario(e.target.value)} />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="email">E-mail</label>
                <input id="email" type="email" placeholder="E-mail contacto propietario" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
                <input id="alta" type="date" className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas</label>
                <textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los sintomas" id="sintomas" value={simptomas} onChange={(e) => setSimptomas(e.target.value)}></textarea>
            </div>
            <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
             hover:bg-indigo-700 cursor-pointer transition-all" 
             value={
                paciente.id ? "Editar Paciente":"Agregar Paciente"
             } id="" />
        </form>
    </div>
  )
}

export default Formulario