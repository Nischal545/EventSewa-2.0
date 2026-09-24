import Button from "../components/Button.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import OtpForm from "../components/OtpForm.jsx";
import SplitLayout from "../Layouts/SplitLayout.jsx";
import HomePage from "./HomePage.jsx";
import PhoneandOTP from "./PhoneandOTP.jsx";

export default function EmailandOTP() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setIsSubmit(true);
        setLoading(true);
        setMessage("");


        try {
            const response = await fetch("http://localhost:8000/api/receiveEmailOTP/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                })
            })

            const data = await response.json();

            if (response.ok) {
                setMessage("OTP Sent Successfully!");
            } else {
                setMessage("Failed to send OTP. Try again!");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            setMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            {/*    Email enter garne thau*/}
            <div className={"h-screen flex flex-col items-center justify-center"}>
                <form className={"bg-amber-300 flex flex-col items-center justify-center gap-10 p-40"}
                    onSubmit={handleSubmit}>
                    <h1 className={"italic text-x font-bold"}>EMAIL ADDRESS HERE</h1>
                    <div className={"flex items-center flex-col justify-center gap-2.5"}>
                        <label className={"italic text-x"}>
                            Full Name
                        </label>
                        <input className="border border-b-gray-950 p-1 italic text-xl rounded-lg" type="text"
                            name="info"
                            placeholder=""
                            onChange={(e) => setName(e.target.value)}/>

                        <label className={"italic text-x"}>
                            Email
                        </label>
                        <input className="border border-b-gray-950 p-1 italic text-xl rounded-lg" type="email"
                            name="email"
                            placeholder=""
                            onChange={(e) => setEmail(e.target.value)}/>

                        <label className={"italic text-x"}>
                            Password
                        </label>
                        <input className="border border-b-gray-950 p-1 italic text-xl rounded-lg" type="password"
                            name="password"
                            placeholder=""
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>


                    <Button index={1} type="submit"
                        className={"hover:shadow-none " + "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"}
                        disabled={isSubmit}
                    >
                        {loading ? "Sending..." : "Submit"}
                    </Button>
                    {message && <p>{message}</p>}
                </form>

                {isSubmit && (
                    <div className={"mt-4 pt-4 boarder-top"}>
                        <OtpForm/>
                        <Link to='/phone&otp'><Button index={0}>Submit</Button></Link>
                    </div>
                )}


            </div>


        </>
    )
}