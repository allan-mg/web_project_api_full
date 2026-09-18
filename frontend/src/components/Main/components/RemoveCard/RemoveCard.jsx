export default function RemoveCard() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form
      className="popup__form"
      name="remove-card-form"
      id="remove-card-form"
      onSubmit={handleSubmit}
    >
      <button className="button popup__button" type="submit">
        Sí
      </button>
    </form>
  );
}
