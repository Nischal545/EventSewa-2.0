import './App.css'
import SplashPage from './pages/SplashPage.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import WelcomePage from "./pages/WelcomePage.jsx";
import SignupPage from './pages/SignUpPage.jsx'

function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<SplashPage/>}/>
                    <Route exact path="/welcome" element={<WelcomePage/>}/>
                    <Route exact path="/SignUpPage" element={<SignupPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
