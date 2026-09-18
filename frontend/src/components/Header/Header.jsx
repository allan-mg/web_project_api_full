import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />

      <div className="header__info">
        {loggedIn ? (
          <>
            <span className="header__email">{email}</span>

            <button
              className="header__logout"
              type="button"
              onClick={onSignOut}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            className="header__link"
            to={location.pathname === "/signup" ? "/signin" : "/signup"}
          >
            {location.pathname === "/signup" ? "Iniciar sesión" : "Regístrate"}
          </Link>
        )}
      </div>
    </header>
  );
}
