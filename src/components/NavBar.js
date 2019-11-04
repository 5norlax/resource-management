import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="https://www.yash.com/">
          <img style={{ marginTop: '15px', marginLeft: '15px'}} alt="YASH Technologies" src="https://www.yash.com/wp-content/themes/Yash/images/yash-logo.svg" title="YASH Technologies" width="130" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto w-50" navbar>
            <NavItem>
              <NavLink href="/">Overview</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/resources">Resources</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/resourceform">Add Resource</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addjob">Add Job</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;