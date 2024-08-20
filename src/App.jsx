// /frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DropdownMenu from "./components/DropdownMenu";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Items from "./pages/Items";
import Reports from "./pages/Reports";
import PrivateRoute from "./components/PrivateRoute";
import ProjectForms from "./components/ProjectForms";
import AddItemstoProject from "./components/AddItemstoProject";

function App() {
  return (
    <Router>
      <DropdownMenu /> {/* Adiciona o menu suspenso em todas as páginas */}
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectForms />} />
          <Route path="/items/*" element={<Items />} />
          <Route path="/items/new" element={<AddItemstoProject />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes> */}
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
          path="/reports"
          element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
              <Reports />
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
      </Routes>
    </Router>
  );
}

export default App;
