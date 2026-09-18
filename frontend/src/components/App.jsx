import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isCheckingToken, setIsCheckingToken] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el avatar:", error);
      });
  }

  function handleCardLike(card) {
    const isLiked = (card.likes || []).some((like) => {
      const likeId = typeof like === "string" ? like : like._id;
      return likeId === currentUser._id;
    });

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => {
        console.error("Error al cambiar el like:", error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al crear la tarjeta:", error);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.error("Error al registrar al usuario:", error);
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        setLoggedIn(true);
        setEmail(email);

        navigate("/");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((data) => {
        setLoggedIn(true);
        setEmail(data.email);
      })
      .catch((error) => {
        console.error("Error al validar el token:", error);
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        setEmail("");
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("Error al cargar el usuario:", error);
      });

    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("Error al cargar las tarjetas:", error);
      });
  }, [loggedIn]);

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              isCheckingToken={isCheckingToken}
            >
              <div className="page">
                <div className="page__content">
                  <Header
                    loggedIn={loggedIn}
                    email={email}
                    onSignOut={handleSignOut}
                  />
                  <Main
                    cards={cards}
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/signin"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <div className="page">
                <div className="page__content">
                  <Header loggedIn={false} email="" onSignOut={() => {}} />
                  <Login onLogin={handleLogin} />
                </div>
              </div>
            )
          }
        />
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <div className="page">
                <div className="page__content">
                  <Header loggedIn={false} email="" onSignOut={() => {}} />
                  <Register onRegister={handleRegister} />
                </div>
              </div>
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
        isSuccess={isRegistrationSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
