import Button from "../components/Button.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import OtpForm from "../components/OtpForm.jsx";

export default function EmailandOTP() {

    const [isSubmit, setIsSubmit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // SEND OTP
    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:8000/api/receiveEmailOTP/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                    })
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage("OTP Sent Successfully!");
                setIsSubmit(true);
            } else {
                setMessage(data.message || "Failed to send OTP. Try again!");
            }

        } catch (error) {
            console.error("Error sending OTP:", error);
            setMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }


    // VERIFY OTP
    async function handleVerifyOTP(e) {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:8000/api/verifyOTP/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: otp,
                    })
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage("Email Verified Successfully!");
            } else {
                setMessage(data.message || "Invalid OTP!");
            }

        } catch (error) {
            console.error("Error verifying OTP:", error);
            setMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">

                {/* Email enter garne thau */}

                <form
                    className="bg-amber-300 flex flex-col items-center justify-center gap-10 p-40"
                    onSubmit={handleSubmit}
                >

                    <h1 className="italic text-x font-bold">
                        EMAIL ADDRESS HERE
                    </h1>

                    <div className="flex items-center flex-col justify-center gap-2.5">

                        <label className="italic text-x">
                            Full Name
                        </label>

                        <input
                            className="border border-b-gray-950 p-1 italic text-xl rounded-lg"
                            type="text"
                            name="info"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label className="italic text-x">
                            Email
                        </label>

                        <input
                            className="border border-b-gray-950 p-1 italic text-xl rounded-lg"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label className="italic text-x">
                            Password
                        </label>

                        <input
                            className="border border-b-gray-950 p-1 italic text-xl rounded-lg"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <Button
                        index={1}
                        type="submit"
                        className="hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        disabled={loading || isSubmit}
                    >
                        {loading ? "Sending..." : "Submit"}
                    </Button>

                    {message && <p>{message}</p>}

                </form>


                {/* OTP SECTION */}

                {isSubmit && (

                    <div className="mt-4 pt-4 border-t">

                        <form onSubmit={handleVerifyOTP}>

                            <OtpForm
                                otp={otp}
                                setOtp={setOtp}
                            />

                            <Link to="/SplitLayout"><Button
                                index={0}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </Button></Link>

                        </form>

                    </div>

                )}

            </div>
        </>
    );
}
