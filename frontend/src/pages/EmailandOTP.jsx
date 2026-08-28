import Button from "../components/Button.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import OtpForm from "../components/OtpForm.jsx";

export default function EmailandOTP() {
    const [isSubmit, setIsSubmit] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmit(true);
    }

    return (
        <>

            {/*    Email enter garne thau*/}
            <div className={"h-screen flex flex-col items-center justify-center"}>
                <form className={"bg-amber-300 flex flex-col items-center justify-center gap-2.5 p-20"}
                    onSubmit={handleSubmit}>
                    <h1 className={"italic text-xl"}>EMAIL ADDRESS HERE</h1>
                    <div className={"flex items-center gap-2.5"}>
                        <label className={"italic text-xl"}>
                            Email
                        </label>
                        <input className="border border-b-gray-950 p-1 italic text-xl" type="email" name="email"
                            placeholder=""/>
                    </div>


                    <Button index={1} type="submit" className={"hover:shadow-none"}>
                        Submit
                    </Button>

                </form>

                {isSubmit && (
                    <div className={"mt-4 pt-4 broder-top"}>
                        <OtpForm/>
                    </div>
                )}


            </div>


        </>
    )
}