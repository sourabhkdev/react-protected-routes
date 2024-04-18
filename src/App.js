import logo from "./logo.svg";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomeComponent";
import Card from "./pages/CardComponent";
import AccountComponent from "./pages/AccountComponent";
import ProtectedRoute from "./ProtectedRoutes";
import useAuth from "./useAuth";

function App() {
  const [isAuth, login, logout] = useAuth(false);
  return (
    <div className="App">
      <h2>Protected Routes</h2>
      <ul>
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/accounts">Accounts (Protected)</Link>
        </li>
        <li>
          <Link to="/cards">Cards (UnProtected)</Link>
        </li>
      </ul>
      {isAuth ? (
        <>
          <div className="ui message brown">You are logged in..</div>
          <button className="ui button blue" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="ui message violet">You are logged out..</div>
          <button className="ui button blue" onClick={login}>
            Login
          </button>
        </>
      )}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cards" element={<Card />} />
        {/* <Route path="/accounts" element={<AccountComponent />} /> */}
        {/* <ProtectedRoute path="/accounts" element={AccountComponent} auth={ true}/> */}
        <Route
          path="/accounts"
          element={
            <ProtectedRoute auth={isAuth}>
              <AccountComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
