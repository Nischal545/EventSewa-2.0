import React, {useState} from "react";

const STEPS = ["Personal", "Details", "Review"];

const initialData = {
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    licenseNumber: "",
    citizenshipNumber: "",
    licenseImage: null,
    citizenshipFront: null,
    citizenshipBack: null,
    organizerLogo: null,
};

const inputBase =
    "w-full px-3 py-2.5 text-[15px] text-slate-900 bg-white border-[1.5px] rounded-xl outline-none transition focus:border-indigo-600 focus:ring-[3px] focus:ring-indigo-600/15";

function validate(step, data) {
    const errors = {};

    if (step === 1) {
        if (!data.ownerName.trim())
            errors.ownerName = "Owner name is required";

        if (!/^\S+@\S+\.\S+$/.test(data.email.trim()))
            errors.email = "Enter a valid email address";

        if (!/^\+?\d{7,15}$/.test(data.phone.replace(/\s/g, "")))
            errors.phone = "Enter a valid phone number";
    }

    if (step === 2) {
        if (!data.address.trim())
            errors.address = "Address is required";

        if (!data.licenseNumber.trim())
            errors.licenseNumber = "License number is required";

        if (!data.citizenshipNumber.trim())
            errors.citizenshipNumber = "Citizenship number is required";

        if (!data.licenseImage)
            errors.licenseImage = "Please upload your organizer license";

        if (!data.citizenshipFront)
            errors.citizenshipFront = "Please upload the front side";

        if (!data.citizenshipBack)
            errors.citizenshipBack = "Please upload the back side";
    }

    return errors;
}

export default function OrganizerDashboard() {

    const [step, setStep] = useState(1);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Handle text and file inputs
    const handleChange = (e) => {
        const {name, value, files, type} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] || null : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    // Navigate forward
    const next = () => {
        const found = validate(step, data);

        setErrors(found);

        if (Object.keys(found).length === 0) {
            setStep((prev) => prev + 1);
        }
    };

    // Navigate backward
    const back = () => {
        setErrors({});
        setStep((prev) => prev - 1);
    };

    // Frontend-only submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (step !== 3) return;

        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-50 px-4 py-10">

            <div className="w-full max-w-2xl mx-auto">

                {/* PAGE HEADING */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Organizer Registration
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Provide your information and documents to register as an organizer.
                    </p>

                </div>

                {/* SUCCESS SCREEN */}

                {submitted ? (

                    <div className="bg-white rounded-2xl shadow-xl px-6 py-12 text-center">

                        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">

                            <span className="text-5xl text-green-600">
                                ✓
                            </span>

                        </div>

                        <h2 className="mt-6 text-2xl font-semibold text-slate-900">
                            Registration Request Sent!
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Hey {data.ownerName.split(" ")[0]}, we've received your
                            organizer registration request.
                        </p>

                        <p className="mt-2 text-slate-600">
                            We will notify you at:
                        </p>

                        <strong className="block mt-1 text-indigo-600">
                            {data.email}
                        </strong>

                        <p className="mt-6 text-sm text-slate-500">
                            Your documents are awaiting verification.
                        </p>

                    </div>

                ) : (

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="bg-white rounded-2xl shadow-xl px-5 py-7 sm:px-8 sm:py-9"
                    >

                        {/* PROGRESS */}

                        <ol className="flex justify-between mb-10">

                            {STEPS.map((label, i) => {

                                const n = i + 1;
                                const done = n < step;
                                const active = n === step;

                                return (
                                    <li
                                        key={label}
                                        className="relative flex-1 flex flex-col items-center gap-2 text-sm"
                                    >

                                        <span
                                            className={`z-10 grid place-items-center w-9 h-9 rounded-full font-semibold ${
                                                active || done
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-slate-200 text-slate-500"
                                            }`}
                                        >
                                            {done ? "✓" : n}
                                        </span>

                                        <span className={
                                            active || done
                                                ? "font-semibold text-slate-800"
                                                : "text-slate-400"
                                        }>
                                            {label}
                                        </span>

                                        {n !== 3 && (
                                            <div
                                                className={`absolute top-4 left-[calc(50%+22px)] w-[calc(100%-44px)] h-0.5 ${
                                                    done ? "bg-indigo-600" : "bg-slate-200"
                                                }`}/>
                                        )}

                                    </li>
                                );
                            })}

                        </ol>

                        {/* STEP 1: PERSONAL INFORMATION */}

                        {step === 1 && (

                            <div>

                                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                    Organizer Information
                                </h2>

                                <Field
                                    label="Organizer's Owner Name"
                                    name="ownerName"
                                    value={data.ownerName}
                                    onChange={handleChange}
                                    error={errors.ownerName}
                                    placeholder="Enter owner's full name"
                                />

                                <Field
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    placeholder="example@email.com"
                                />

                                <Field
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                    placeholder="+977 98XXXXXXXX"
                                />

                            </div>

                        )}

                        {/* STEP 2: ORGANIZER DETAILS */}

                        {step === 2 && (

                            <div>

                                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                                    Verification Details
                                </h2>

                                <p className="text-sm text-slate-500 mb-6">
                                    Enter your identification details and upload the required documents.
                                </p>

                                <Field
                                    label="Address"
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    error={errors.address}
                                    placeholder="City, Street"
                                />

                                <Field
                                    label="License Number"
                                    name="licenseNumber"
                                    value={data.licenseNumber}
                                    onChange={handleChange}
                                    error={errors.licenseNumber}
                                    placeholder="Enter organizer license number"
                                />

                                <FileField
                                    label="License Image"
                                    name="licenseImage"
                                    file={data.licenseImage}
                                    onChange={handleChange}
                                    error={errors.licenseImage}
                                />

                                <Field
                                    label="Citizenship Number"
                                    name="citizenshipNumber"
                                    value={data.citizenshipNumber}
                                    onChange={handleChange}
                                    error={errors.citizenshipNumber}
                                    placeholder="Enter citizenship number"
                                />

                                <FileField
                                    label="Citizenship (Front Side)"
                                    name="citizenshipFront"
                                    file={data.citizenshipFront}
                                    onChange={handleChange}
                                    error={errors.citizenshipFront}
                                />

                                <FileField
                                    label="Citizenship (Back Side)"
                                    name="citizenshipBack"
                                    file={data.citizenshipBack}
                                    onChange={handleChange}
                                    error={errors.citizenshipBack}
                                />

                                {/* OPTIONAL LOGO */}

                                <div className="mt-8 pt-6 border-t border-slate-200">

                                    <h3 className="text-lg font-semibold text-slate-900">
                                        Organizer Logo
                                        <span className="ml-2 text-xs font-medium text-green-600">
                                            Optional
                                        </span>
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-2 mb-4">
                                        Don't have an organizer logo yet? No worries!
                                        You can add or update your logo anytime from
                                        your organizer profile after registration.
                                    </p>

                                    <FileField
                                        label="Upload Organizer Logo"
                                        name="organizerLogo"
                                        file={data.organizerLogo}
                                        onChange={handleChange}
                                        optional
                                    />

                                </div>

                            </div>

                        )}

                        {/* STEP 3: REVIEW */}

                        {step === 3 && (

                            <div>

                                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                                    Review & Submit
                                </h2>

                                <p className="text-sm text-slate-500 mb-6">
                                    Please check all your information before submitting.
                                </p>

                                <h3 className="font-semibold text-slate-800 mb-3">
                                    Personal Information
                                </h3>

                                <dl className="border border-slate-200 rounded-xl overflow-hidden mb-6">

                                    <Row k="Owner Name" v={data.ownerName}/>
                                    <Row k="Email" v={data.email}/>
                                    <Row k="Phone" v={data.phone}/>
                                    <Row k="Address" v={data.address}/>

                                </dl>

                                <h3 className="font-semibold text-slate-800 mb-3">
                                    Verification Documents
                                </h3>

                                <dl className="border border-slate-200 rounded-xl overflow-hidden">

                                    <Row k="License Number" v={data.licenseNumber}/>
                                    <Row k="License Image" v={data.licenseImage?.name}/>
                                    <Row k="Citizenship Number" v={data.citizenshipNumber}/>
                                    <Row k="Citizenship Front" v={data.citizenshipFront?.name}/>
                                    <Row k="Citizenship Back" v={data.citizenshipBack?.name}/>
                                    <Row k="Organizer Logo" v={data.organizerLogo?.name || "Not uploaded"}/>

                                </dl>

                                <div className="mt-5 p-4 bg-indigo-50 rounded-xl">

                                    <p className="text-sm text-indigo-800">
                                        By submitting, you confirm that the information
                                        and documents provided are accurate and belong
                                        to the organizer being registered.
                                    </p>

                                </div>

                            </div>

                        )}

                        {/* NAVIGATION */}

                        <div className="flex justify-between items-center mt-8">

                            {step > 1 ? (

                                <button
                                    type="button"
                                    onClick={back}
                                    className="px-6 py-2.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                                >
                                    Back
                                </button>

                            ) : <span/>}

                            {step < 3 ? (

                                <button
                                    key="next"
                                    type="button"
                                    onClick={next}
                                    className="px-7 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                >
                                    Next
                                </button>

                            ) : (

                                <button
                                    key="submit"
                                    type="submit"
                                    className="px-7 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                >
                                    Submit Request
                                </button>

                            )}

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
}


// REUSABLE TEXT INPUT

function Field({
                   label,
                   name,
                   error,
                   type = "text",
                   ...props
               }) {
    return (
        <div className="flex flex-col mb-5">

            <label
                htmlFor={name}
                className="mb-1.5 text-sm font-semibold text-slate-700"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                className={`${inputBase} ${
                    error ? "border-red-500" : "border-slate-300"
                }`}
                {...props}
            />

            {error && (
                <span className="mt-1 text-xs text-red-500">
                    {error}
                </span>
            )}

        </div>
    );
}


// REUSABLE IMAGE UPLOAD

function FileField({
                       label,
                       name,
                       file,
                       onChange,
                       error,
                       optional = false,
                   }) {
    return (
        <div className="flex flex-col mb-5">

            <label
                htmlFor={name}
                className="mb-1.5 text-sm font-semibold text-slate-700"
            >
                {label}

                {optional && (
                    <span className="ml-2 text-xs font-normal text-slate-400">
                        (Optional)
                    </span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={onChange}
                className="w-full text-sm text-slate-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
                cursor-pointer"
            />

            {file && (
                <p className="mt-2 text-xs text-green-600">
                    ✓ Selected: {file.name}
                </p>
            )}

            {error && (
                <span className="mt-1 text-xs text-red-500">
                    {error}
                </span>
            )}

        </div>
    );
}


// REVIEW ROW

function Row({k, v}) {
    return (
        <div className="flex justify-between gap-4 px-4 py-3 text-sm odd:bg-slate-50">

            <dt className="text-slate-500">
                {k}
            </dt>

            <dd className="m-0 font-semibold text-slate-900 text-right break-words">
                {v || "—"}
            </dd>

        </div>
    );
}
