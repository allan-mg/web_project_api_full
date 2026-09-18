import { useState } from "react";
import "../../blocks/auth.css";

export default function Login({ onLogin }) {
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

    onLogin(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inicia sesión</h2>

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
          Inicia sesión
        </button>
      </form>
    </div>
  );
}
