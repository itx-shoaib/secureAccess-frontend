import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import {Provider} from "react-redux"
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import store from "./store"
import PrivateRoute from './components/PrivateRoute.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ChatMeScreen from './screens/ChatMeScreen.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    {/* Protected Route */}
       <Route path='' element={<PrivateRoute />}>
        <Route index={true} path='/' element={<HomeScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/chatme' element={<ChatMeScreen />} />
      </Route>
      {/* Protected Route END */}
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
  </Provider>
)
