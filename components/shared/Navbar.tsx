import React, { ReactNode, FC } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import Link from 'next/link';

interface AppLinkProps {
  children: ReactNode;
  className: string;
  href: string;
}

const AppLink:FC<AppLinkProps> = ({ children, className, href }) => (
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>
);

const AppNavbar = () => {
  return (
    <>
      <div className='navbar-wrapper'>
        <Navbar expand='lg' className='navbar-dark fj-mw9'>
            <AppLink href='/' className='navbar-brand mr-3 font-weight-bold'>
              NozomuTsuruta
            </AppLink>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className='mr-auto'>
              <AppLink href='/portfolios' className='nav-link mr-3'>
                Portfolio
              </AppLink>
              <AppLink href='/forum/categories' className='nav-link mr-3'>
                Courses
              </AppLink>
              <AppLink href='/cv' className='nav-link mr-3'>
                Cv
              </AppLink>
            </Nav>
            <Nav>
              <AppLink href='/login' className='nav-link mr-3'>
                Sign In
              </AppLink>
              <AppLink
                href='/register'
                className='nav-link mr-3 btn btn-success bg-green-2 bright'
              >
                Sign Up
              </AppLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default AppNavbar;
