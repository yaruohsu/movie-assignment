import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('./features/WelcomePage'))
const Search = lazy(() => import('./features/search'))
const Detail = lazy(() => import('./features/detail'))
const WatchList = lazy(() => import('./features/watchList'))
const NotFound = lazy(() => import('./features/NotFoundPage'))


const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/search', element: <Search /> },
  { path: '/detail/:id', element: <Detail /> },
  { path: '/watchList', element: <WatchList /> },
  { path: '*', element: <NotFound /> },
]

export default routes
