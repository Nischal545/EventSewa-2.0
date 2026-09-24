import GoogleSignup from "../components/GoogleSignup.jsx";
import Button from '../components/Button.jsx'
import {IoIosMail} from "react-icons/io"
import {FaGooglePlus} from 'react-icons/fa6'
import {Link} from 'react-router-dom'

export default function SignUpPage() {

    return (


        <>
            <div className="
flex flex-col gap-1 justify-center items-center min-h-screen">
                <div className="flex flex-col bg-amber-300 items-center justify-center px-25 py-15 gap-2.5">
                    <h1 className="text-2xl font-bold">SIGNUP PAGE</h1>
                    <div className="min-w-full flex flex-col items-center justify-center px-25 py-15 gap-2.5">

                        <Link to="/email&otp">
                            <Button index={1}
                                className={"w-full block"}
                                icon={IoIosMail}
                            >
                                Sign Up with Email

w
                            </Button>
                        </Link>

                        <Button index={2} onClick={GoogleSignup()} icon={FaGooglePlus} className={"w-full block"}>
                            Sign Up with Google
                        </Button>

                        <Button index={0} className="hover:shadow-none">
                            <Link to='/welcome'>
                                Back
                            </Link>

                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}