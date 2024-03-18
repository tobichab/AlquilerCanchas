import React from "react"
import { Link } from "react-router-dom"
import { useContextGlobal } from "../Components/utils/GlobalContext"

const Favoritos = () => {
  const { favs, setFavs } = useContextGlobal();

  const removeFav = (id) => {
    const favsActualizados = favs.filter((fav) => fav.idd !== id)
    setFavs(favsActualizados)
    localStorage.setItem("favoritos", JSON.stringify(favsActualizados))
  };

  return (
    <div className="card-container-recommended">
      {favs.length > 0 ? (
        favs.map((card) => (
          <div className="card-recommended" key={card.idd}>
            <Link to={`/Detail/${card.idd}`}>
              <img src={card.imagen} alt="imagenCancha" />
            </Link>
            <h3>{card.nombre}</h3>
            <p>{card.ubicacion}</p>
            <button className="buttonfav" onClick={() => removeFav(card.idd)}><i class="fa-solid fa-heart" style={{color:"red"}}></i></button>
          </div>
        ))
      ) : (
        <p className="none-favs-p">No hay favoritos</p>
      )}
    </div>
  )
}

export default Favoritos
