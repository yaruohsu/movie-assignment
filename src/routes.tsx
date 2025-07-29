import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Search = lazy(() => import("./features/search"));
const Detail = lazy(() => import("./features/detail"));
const WatchList = lazy(() => import("./features/watchList"));

const routes: RouteObject[] = [
  { path: "/", element: <Search /> },
  { path: "/detail", element: <Detail /> },
  { path: "/watchList", element: <WatchList /> },
];

export default routes;
