import React from "react";
import "./Header.scss";
import { Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";

Header.propTypes = {};

function Header() {
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          <Col xs="auto">
            <NavLink
              className="header__link"
              to="/photos"
              activeClassName="header__link--active"
            >
              <h2>Photo App</h2>
            </NavLink>
          </Col>
          <Col xs="auto">
            <NavLink
              className="header__link"
              to="/sign-in"
              activeClassName="header__link--active"
            >
              Sign In
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
