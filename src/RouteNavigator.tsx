import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

//Layout for the navbar
import { Layout } from './components/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AddFood } from './pages/AddFood';
import { Foods } from './pages/Foods';
import { MedicalReport } from './pages/MedicalReport';
import { AddMedicalReport } from './pages/AddMedicalReport';
import { FoodPlans } from './pages/FoodPlans';
import { AddFoodPlans } from './pages/AddFoodPlans';
import { CreateUser } from './pages/createUser';
import { UpdateUser } from './pages/UpdateUser';

export default function RouteNavigator() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const authLogin = async () => {
    await loginWithRedirect();
  };
  return (
    <Router>
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="crear-usuario" element={<CreateUser />} />
            <Route path="usuarios">
              <Route path=":email" element={<UpdateUser />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="alimentos" element={<Foods />} />
            <Route path="agregar-alimento" element={<AddFood />} />
            <Route path="agregar-alimento/:id" element={<AddFood />} />
            <Route path="informes-medicos" element={<MedicalReport />} />
            <Route
              path="agregar-informe-medico"
              element={<AddMedicalReport />}
            />
            <Route
              path="agregar-informe-medico/:id"
              element={<AddMedicalReport />}
            />
            <Route path="planes-de-comidas" element={<FoodPlans />} />
            <Route path="agregar-plan-de-comida" element={<AddFoodPlans />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}
