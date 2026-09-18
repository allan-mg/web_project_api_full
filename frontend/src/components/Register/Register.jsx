import { useState } from "react";
import { Link } from "react-router-dom";
import "../../blocks/auth.css";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>

      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button className="auth__button" type="submit">
          Regístrate
        </button>
      </form>

      <p className="auth__caption">
        ¿Ya eres miembro?{" "}
        <Link className="auth__link" to="/signin">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
