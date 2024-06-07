import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "../..";
import { applicationRoutes, authRoutes } from "../../routes";
import { Navbar } from "../Navbar/Navbar";

export const AppRouter = observer(() => {
  const contextValue = useContext(Context);
  const user = contextValue!.user;

  return (
    <div>
      <Navbar>
        <Routes>
        {user.isAuth &&
          authRoutes.map(({path, Component, roles}) => 
          roles?.includes(user.user.role) && <Route path={path} key={path} element={<Component />} />
        )}
        
        {applicationRoutes.map(({path, Component}) => 
          <Route path={path} key={path} element={<Component />} />
        )}
        </Routes>
      </Navbar>
    </div>
  );
});
