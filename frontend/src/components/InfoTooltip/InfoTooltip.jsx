import Popup from "../Main/components/Popup/Popup";
import "../../blocks/info-tooltip.css";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) {
    return null;
  }

  return (
    <Popup onClose={onClose} title=" ">
      <div className="info-tooltip">
        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? "info-tooltip__icon_success"
              : "info-tooltip__icon_error"
          }`}
        ></div>

        <p className="info-tooltip__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </Popup>
  );
}
