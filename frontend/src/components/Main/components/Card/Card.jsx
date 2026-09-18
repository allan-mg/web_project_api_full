import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import ImagePopup from "../ImagePopup/ImagePopup";

export default function Card(props) {
  const { card, onOpenPopup, onCardLike, onCardDelete } = props;
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link } = card;

  const isLiked = (card.likes || []).some((like) => {
    const likeId = typeof like === "string" ? like : like._id;
    return likeId === currentUser._id;
  });

  const ownerId = typeof card.owner === "string" ? card.owner : card.owner?._id;

  const isOwn = ownerId === currentUser._id;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  const imagePopup = {
    children: <ImagePopup card={card} />,
  };

  function handleImageClick() {
    onOpenPopup(imagePopup);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />

      {isOwn && (
        <button
          aria-label="Eliminar tarjeta"
          type="button"
          className="card__delete-button"
          onClick={handleDeleteClick}
        ></button>
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Botón Me gusta"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
