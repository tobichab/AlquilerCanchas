import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useContextGlobal } from "./utils/GlobalContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RecommendedCard = ({ image, id, location, name }) => {
  const { favs, setFavs } = useContextGlobal()
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favoritos")) || []
    const existingFav = storedFavs.find((fav) => fav.idd === id)
    setIsFav(existingFav !== undefined)
  }, [id]);

  const addFavs = () => {
    const newFav = { idd: id, imagen: image, nombre: name, ubicacion: location }
    setFavs([...favs, newFav])
    setIsFav(true)
    localStorage.setItem("favoritos", JSON.stringify([...favs, newFav]))
  };

  const removeFavs = () => {
    const updatedFavs = favs.filter((fav) => fav.idd !== id)
    setFavs(updatedFavs)
    setIsFav(false)
    localStorage.setItem("favoritos", JSON.stringify(updatedFavs))
  };

  const addOrRemove = () => {
      if (isFav) {
        removeFavs()
      } else {
        addFavs()
      }
    
  };
  const userRole = localStorage.getItem("role");
  return (
    <div className="card-recommended">
      <Link to={`/Detail/${id}`}>
        <img src={image} alt="imagenCancha" />
      </Link>
      <h3>{name}</h3>
      <p>{location}</p>
      {userRole === "USER" && (
        <button className="buttonfav" onClick={addOrRemove} style={{zIndex: 1}}>
          {isFav ? (
            <i class="fa-solid fa-heart" style={{color:"red", fontSize:20}}></i>
          ) : (
            <i class="fa-regular fa-heart" style={{fontSize:20}}></i>
          )}
        </button>
      )}
    </div>
  );
};

export default RecommendedCard;


