import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlaceSubmit({
      name,
      link,
    });
  }

  return (
    <form
      className="popup__form"
      name="new-card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="place-name"
          maxLength="30"
          minLength="1"
          name="placeName"
          placeholder="Título"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <span className="popup__error" id="place-name-error"></span>
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_url"
          id="place-link"
          name="placeLink"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />

        <span className="popup__error" id="place-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}
