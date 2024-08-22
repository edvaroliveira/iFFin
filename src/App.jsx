// /frontend/src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DropdownMenu from "./components/DropdownMenu";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import PrivateRoute from "./components/PrivateRoute";
import ProjectForms from "./components/ProjectForms";
import AddItemstoProject from "./components/AddItemstoProject";
import UserForm from "./components/UserForm";
import ProjectReport from "./components/ProjectReport";

function App() {
  return (
    <Router>
      <DropdownMenu /> {/* Adiciona o menu suspenso em todas as páginas */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/new"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ProjectForms />
            </PrivateRoute>
          }
        />
        <Route
          path="/items/new"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AddItemstoProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
              <ProjectReport />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
