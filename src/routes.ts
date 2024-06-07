import { ComponentType } from "react";
import { CHART_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MANAGERS_ROUTE, ORDERS_ROUTE, PRODUCTS_ROUTE, REVIEWS_ROUTE } from "./consts";
import { Charts } from "./pages/Charts";
import { Login } from "./pages/Login";
import { MainPage } from "./pages/MainPage";
import { Managers } from "./pages/Managers";
import { Orders } from "./pages/Orders";
import { Products } from "./pages/Products";
import { Reviews } from "./pages/Reviews";

interface RouteData {
    path: string,
    Component: ComponentType,
    roles?: string[]
}

export const authRoutes: RouteData[] = [
    { path: PRODUCTS_ROUTE, Component: Products, roles: ["Admin", "Manager"]},
    { path: ORDERS_ROUTE, Component: Orders, roles: ["Admin", "Manager"]},
    { path: REVIEWS_ROUTE, Component: Reviews, roles: ["Admin", "Manager"]},
    { path: CHART_ROUTE, Component: Charts, roles: ["Admin"]},
    { path: MANAGERS_ROUTE, Component: Managers, roles: ["Admin"]},
]

export const applicationRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: LOGIN_ROUTE, Component: Login },
]