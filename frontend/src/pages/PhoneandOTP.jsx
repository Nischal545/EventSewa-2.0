import {useState} from "react";
import Button from "../components/Button.jsx";
import OtpForm from "../components/OtpForm.jsx";
import {Link} from "react-router-dom";


export default function PhoneandOTP() {
    const [isSubmit, setIsSubmit] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmit(true);
    }

    return (
        <>

            <div className={"h-screen bg-emerald-300"}>
                <form className={"flex flex-col justify-center items-center gap-4 bg-red-600"} onSubmit={handleSubmit}>
                    <label>Phone Number</label>
                    <input type={'text'} placeholder={'Phone Number'} className={"border border-b-black"}/>
                    <Button>Submit</Button>
                </form>

                {isSubmit && (
                    <div className={"mt-4 pt-4 boarder-top"}>
                        <OtpForm/>
                        <Link to='/SplitLayout'><Button index={0}>Submit</Button></Link>
                    </div>
                )}
            </div>
        </>
    )
}