import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import IdeaGenerator from './components/IdeaGenerator';
import Summarizer from './components/Summarizer';
import ContentCreation from './components/ContentCreation';
import Home from './components/Home';
import Layout from './components/Layout'
import { useState } from 'react';
import {Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(()=>{
  const storeUserDetails = localStorage.getItem("userDetails");
    if (storeUserDetails) {
      try {
        return JSON.parse(storeUserDetails);
      } catch (e) {
        console.error("Error parsing userDetails from localStorage", e);
        return null;
      }
    }
    return null;
  });
  const handleLogout = () => {
    setUserDetails(null);
     localStorage.removeItem("userDetails");  
  }
   
  return (
    <div className="App">
     {userDetails?.email_verified !== true && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/80 p-8 rounded-lg shadow-lg">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                localStorage.setItem("userDetails", JSON.stringify(decoded));
                setUserDetails(decoded);
                navigate("/", { replace: true });
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      )}
      {
        userDetails?.email_verified==true?   
        <Routes>
        <Route
            path="/"
            element={
              <Layout userDetails={userDetails} onLogout={handleLogout} />
            }
          >
          <Route index element={<Home />} />
          <Route path="generateIdea" element={<IdeaGenerator />} />
          <Route path="contentCreation" element={<ContentCreation />} />
          <Route path="summary" element={<Summarizer />} />
        </Route>
      </Routes>:<div className="text-center mt-4">Please Verify your Mail</div>
      }
      
     </div>
  );
}

export default App;
