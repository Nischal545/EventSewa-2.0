import GoogleSignup from "../components/GoogleSignup.jsx";
import Button from '../components/Button.jsx'

export default function SignUpPage() {

    return (


        <>
            <div className="signpage">
                <h1>Signup Page</h1>
                <Button index={1} onClick={GoogleSignup()}
                    className="m-3"
                >
                    Sign In Here
                </Button>
            </div>
        </>
    )
}