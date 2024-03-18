import { useState } from "react";
import { axiosInstance } from "../config";


const UserInformation = ({}) => {

  const [cambUser, setCambUser] = useState({})
  const handleName = (e) =>{
    setCambUser({...cambUser, nombre : e.target.value})
  }
  const handleApellido = (e) =>{
    setCambUser({...cambUser, apellido : e.target.value})
  }
  const handleEmail = (e) =>{
    setCambUser({...cambUser, email : e.target.value})
  }
  const handleCBU = (e) =>{
    setCambUser({...cambUser, CBU : e.target.value})
  }
  const handleCuil = (e) =>{
    setCambUser({...cambUser, cuil : e.target.value})
  }
  const handleTelefono = (e) =>{
    setCambUser({...cambUser, telefono : e.target.value})
  }

  const updateData = async () => {
    const config = {        
      params: {
        token : localStorage.getItem("jwt")
      }

    };
    await axiosInstance.put("/user/modificar", cambUser,  config);
  };

  const handleSubmit = () => {
    updateData()
  }
  return (
    <div className="user-information">
      <h1>Perfil</h1>

      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input onChange={handleName} type="text" id="Nombre" value={cambUser?.nombre} />
      </div>

      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input onChange={handleApellido} type="text" id="Apellido" value={cambUser?.apellido} />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input onChange={handleEmail} type="email" id="email" value={cambUser?.email} />
      </div>
      {localStorage.getItem("role") === "OWNER" && <><div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input onChange={handleTelefono} type="text" id="telefono" value={cambUser?.telefono} />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">CBU:</label>
        <input onChange={handleCBU} type="text" id="telefono" value={cambUser?.CBU} />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">cuil:</label>
        <input onChange={handleCuil} type="text" id="telefono" value={cambUser?.cuil} />
      </div> </> }
     
      



      <button onClick={handleSubmit}>Actualizar datos</button>
    </div>
  );
};

export default UserInformation;
