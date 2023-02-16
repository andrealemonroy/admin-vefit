import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h2 className="text-2xl font-bold mb-10">Panel administrador de VEFIT</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => loginWithRedirect()}
      >
        Ingresar
      </button>
    </div>
  );
};

export default Login;
