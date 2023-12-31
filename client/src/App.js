import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import VisitTable from './components/VisitTable';
import VisitForm from './components/VisitForm';
import ManageVisits from './components/ManageVisits';
import ManagePets from './components/ManagePets';
import About from './components/About';

import jwtDecode from 'jwt-decode';
import AuthContext from './contexts/AuthContext';
import CreateAccount from './components/CreateAccount';
import PetDetails from './components/PetDetails';
import ConfirmPetDelete from './components/ConfirmPetDelete';
import ContactInfoDetails from './components/ContactInfoDetails';
import ContactInfoForm from './components/ContactInfoForm';
import ManageAccount from './components/ManageAccount';
import ManageContactInfo from './components/ManageContactInfo';
import SitterDetails from './components/SitterDetails';
import FindSitter from './components/FindSitter';
import VisitDetails from './components/VisitDetails';


function App() {
  
  const [visits, setVisits] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [user, setUser] = useState(null);

  const login = (token) => {
    // Decode the token
    const { sub: username, authorities: authoritiesString } = jwtDecode(token);
  
    // Split the authorities string into an array of roles
    const roles = authoritiesString.split(',');
  
    // Create the "user" object
    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };
    localStorage.setItem("auth-token", token)
    setUser(user);
    return user;
  };  

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
  }

  const auth = {
    login,
    logout,
    user: user ? { ...user } : null
  }

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    if (token) {
      login(token)
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId='321605181263-7tsniamk1f3712hs4p6uc26dvshbv46k.apps.googleusercontent.com'>
      <AuthContext.Provider value={auth}>
        
        <BrowserRouter>
          <Nav />
          
          <Routes>
            {/* always visible */}
            <Route path='/' element={<Home />}/>
            <Route path="/findsitter" element={<FindSitter />}/>
            <Route path="/about" element={<About/>}/>

            {/* logged in as owner and sitter */}
            <Route path="/visittable/:id" element={ user ? <VisitTable visits={visits} /> : <Navigate to="/" /> } />
            <Route path="/visittable/visitdetails/:id" element={ user ? <VisitTable visits={visits} /> : <Navigate to="/" /> } />
            <Route path="/manageaccount" element={ user ? <ManageAccount /> : <Navigate to="/" />} />
            <Route path="/managecontactinfo" element={ user ? <ManageContactInfo /> : <Navigate to="/" />} />
            <Route path="/managepets" element={ user ? <ManagePets /> : <Navigate to="/" />} />
            <Route path="/managevisits" element={ user ? <ManageVisits /> : <Navigate to="/" />} />
            <Route path="/users/sitter/:username" element={ user ? <SitterDetails /> : <Navigate to="/" />} />
            <Route path="/user/my-info" element={ user ? <ContactInfoDetails /> : <Navigate to="/" />} />
            <Route path='/requestvisit' element={ user ? <ContactInfoForm contactInfo={contactInfo} /> : <Navigate to="/" /> }/>
            <Route path='/visitdetails/:id' element={ user ? <VisitDetails visits={visits} /> : <Navigate to="/" /> } />

            {/* logged in as owner only */}
            <Route path='/requestvisit' element={ user ? <VisitForm /> : <Navigate to="/" /> }/>
            <Route path="/petdetails/:id" element={ user ? <PetDetails /> : <Navigate to="/" />} />
            <Route path="/confirmpetdelete/:id" element={ user ? <ConfirmPetDelete /> : <Navigate to="/" />} />

            {/* logged out only */}
            <Route path='/login' element={ user ? <Navigate to="/" /> : <Login /> }/>
            <Route path='/create_account' element={ user ? <Navigate to="/" /> : <CreateAccount /> }/>

            {/* Helps to be last in list */}
            <Route path='*' element={<p>Page Not Found</p>} />
          </Routes>
        </BrowserRouter>
        
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;