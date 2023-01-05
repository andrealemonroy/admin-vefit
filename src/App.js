import "./App.css";
import LoginButton from "./components/LoginButton";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
          <Logout />
        ) : (
          <div>
            <h2 className="text-2xl font-bold">Welcome to Vefit Admin</h2>
            <LoginButton />
          </div>
        )}

        <Profile />
      </header>
    </div>
  );
}

export default App;
