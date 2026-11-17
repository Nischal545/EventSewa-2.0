import "./App.css";
import SplashPage from "./pages/SplashPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage.jsx";
import SignupPage from "./pages/SignUpPage.jsx";
import EmailandOTPPage from "./pages/EmailandOTP.jsx";
import HomePage from "./pages/HomePage.jsx";
import CustomerDashboard from "../src/pages/Customer/CustomerDashboard.jsx";
import PhoneandOTP from "./pages/PhoneandOTP.jsx";
import OrganizerForm from "../src/pages/Organizer/OrganizerForm.jsx";
import OrganizerDashboard from "../src/pages/Organizer/OrganizerDashboard.jsx";
import HostingForm from "../src/components/EventHostingForm.jsx";
// import TimeSetter from "../src/components/TimeSetter.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SplashPage />} />
          <Route exact path="/welcome" element={<WelcomePage />} />
          <Route exact path="/SignUpPage" element={<SignupPage />} />
          <Route exact path="/email&otp" element={<EmailandOTPPage />} />
          <Route
            exact
            path="/CustomerDashboard"
            element={<CustomerDashboard />}
          />
          <Route exact path="/phone&otp" element={<PhoneandOTP />} />
          <Route exact path="/organizerForm" element={<OrganizerForm />} />
          <Route
            exact
            path="/organizerDashboard"
            element={<OrganizerDashboard />}
          />
          <Route exact path="/hostingForm" element={<HostingForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
