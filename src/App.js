import "./App.css";
import LoginButton from "./components/LoginButton";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import AddProduct from "./components/AddProduct";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="App">
      {isAuthenticated ? (
        
        <div className="flex flex-row">
        <div className="w-1/3 flex flex-col justify-center items-center">
        <Profile />
        <Logout />
        </div>
        <AddProduct></AddProduct>
        </div>

      ) : (
        <div className="flex flex-col items-center justify-center h-[100vh]">
          <h2 className="text-2xl font-bold mb-10">Panel administrador de VEFIT</h2>
          <LoginButton />
        </div>
      )}

     
    </div>
  );
}

export default App;
