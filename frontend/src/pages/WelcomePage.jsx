import Logo from "../assets/Logo.png"
import {useGoogleLogin} from "@react-oauth/google";
import GoogleSignup from "../components/GoogleSignup.jsx";
import Testing from './Testing.jsx'
import {Link} from "react-router-dom";

export default function WelcomePage() {
    // const handleGoogleSignin = GoogleSignup()
    // const consentScreen = useGoogleLogin({
    //     flow: 'auth-code',
    //
    //     onSuccess: (tokenResponse) => {
    //         console.log(tokenResponse)
    //     },
    //     onError: (error) => {
    //         console.log(error)
    //     }
    // })
    return (
        <>

            <div
                className="bg-white w-full h-screen">
                <div className="flex gap-1 justify-end m-2">
                    <button className="p-2 border border-blue-500
                     hover:bg-blue-500
                       hover: text-black transition-all duration-200 cursor-pointer
                       w-20">Signin
                    </button>

                    <Link to="/SignUpPage">
                        <button className="p-2 border border-red-600
                     hover:bg-red-600
                     hover: text-black transition-all duration-200 cursor-pointer
                     w-20">Signup
                        </button>
                    </Link>

                </div>
                <div className="flex flex-col gap-2 items-center min-h-full justify-center">
                    <h1 className="text-[#b4b9c2] text-3xl font-bold">Welcome To</h1>
                    <span className="bg-blue-100"><img src={Logo} alt="Logo"/></span>
                    <p>Find all the details regarding events happening in Nepal</p>
                </div>
            </div>
        </>
    )
}