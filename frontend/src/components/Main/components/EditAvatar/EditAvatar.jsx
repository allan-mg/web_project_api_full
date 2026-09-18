import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_avatar"
          id="owner-avatar"
          name="avatar"
          placeholder="Enlace de la imagen"
          required
          type="url"
          ref={avatarRef}
          defaultValue={currentUser.avatar || ""}
        />

        <span className="popup__error" id="owner-avatar-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
