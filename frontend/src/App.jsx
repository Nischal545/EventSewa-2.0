import './App.css'
import SplashPage from './pages/SplashPage.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import WelcomePage from "./pages/WelcomePage.jsx";
import SignupPage from './pages/SignUpPage.jsx'
import EmailandOTPPage from './pages/EmailandOTP.jsx'
import HomePage from './pages/HomePage.jsx'
import SplitLayout from './Layouts/SplitLayout.jsx'
import PhoneandOTP from "./pages/PhoneandOTP.jsx";

function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<SplashPage/>}/>
                    <Route exact path="/welcome" element={<WelcomePage/>}/>
                    <Route exact path="/SignUpPage" element={<SignupPage/>}/>
                    <Route exact path="/email&otp" element={<EmailandOTPPage/>}/>
                    <Route exact path="/SplitLayout" element={<SplitLayout/>}/>
                    <Route exact path="/phone&otp" element={<PhoneandOTP/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
