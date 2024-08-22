// /frontend/src/components/DropdownMenu.jsx

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const DropdownMenu = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Condiciona a exibição do menu ao não estar na página de login
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Sistema de Gerenciamento
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          {user && user.role === "admin" && (
            <>
              <NavDropdown title="Cadastro" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/projects/new">
                  Projetos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/items/new">
                  Itens de Projetos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/users/new">
                  Usuários
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Alteração" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/projects/edit">
                  Projetos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/items/edit">
                  Itens de Projetos
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Exclusão" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/projects/delete">
                  Projetos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/items/delete">
                  Itens de Projetos
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          <Nav.Link as={Link} to="/reports">
            Relatórios
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DropdownMenu;
