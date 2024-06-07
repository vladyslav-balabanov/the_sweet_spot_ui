import React, { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import cl from '../../styles/Navbar.module.css';
import { CHART_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MANAGERS_ROUTE, ORDERS_ROUTE, PRODUCTS_ROUTE, REVIEWS_ROUTE } from "../../consts";
import { Button } from "react-bootstrap";


interface IProps {
  children: ReactNode;
}

interface ILink {
  link: string;
  text: string;
  roles?: string[];
}

const authLinks: ILink[] = [
  { link: PRODUCTS_ROUTE, text: "Products", roles: ["Admin", "Manager"]},
  { link: ORDERS_ROUTE, text: "Orders", roles: ["Admin", "Manager"]},
  { link: REVIEWS_ROUTE, text: "Reviews", roles: ["Admin", "Manager"]},
  { link: CHART_ROUTE, text: "Chart", roles: ["Admin"]},
  { link: MANAGERS_ROUTE, text: "Managers", roles: ["Admin"]},
];

const notAuthLinks: ILink[] = [
  { link: LOGIN_ROUTE, text: "Login" },
]

export const Navbar = ({ children }: IProps) => {
  const contextValue = useContext(Context);
  const user = contextValue!.user;

  const logout = () => {
    localStorage.removeItem('token');
    user.setIsAuth(false);
  }

  return (
    <div>
      <header>
        <nav className={["navbar navbar-expand-sm navbar-toggleable-sm navbar-light border-bottom box-shadow mb-3", cl.header].join(" ")}>
          <div className="container">
            <NavLink to={MAIN_ROUTE} className={["navbar-brand text-white", cl.nav].join(' ')}>
              Home
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
              <ul className="navbar-nav flex-grow-1">
                {user.isAuth ?  authLinks.map(({ link, text, roles}) => roles?.includes(user.user.role) && (
                  <li className="nav-item" key={link}>
                    <NavLink to={link} className={["nav-link text-white", cl.nav].join(' ')}>
                      {text}
                    </NavLink>
                  </li>
                ))
                :
                notAuthLinks.map(({ link, text }) => (
                  <li className="nav-item" key={link}>
                    <NavLink to={link} className={["nav-link  text-white", cl.nav].join(' ')}>
                      {text}
                    </NavLink>
                  </li>
                ))}
                {user.isAuth && 
                  <li>
                    <Button variant="secondary" type="button" onClick={logout}>Logout</Button>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <main role="main" className="pb-3">
          {children}
        </main>
      </div>
    </div>
  );
};
