import React, {useRef} from 'react';
import Button from './Button';

function OtpForm({otp, setOtp}) {

    // Creating references to automatically move focus
    const inputsRef = useRef([]);

    const storeValue = (e, index) => {
        const value = e.target.value;

        // Accept only numbers
        if (!/^\d*$/.test(value)) return;

        // Update the specific digit
        const updatedOTP = otp.split('');

        updatedOTP[index] = value;

        setOtp(updatedOTP.join(''));
    };

    const handleChange = (e, index) => {

        const val = e.target.value;

        if (val && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {

        if (
            e.key === 'Backspace' &&
            !e.target.value &&
            index > 0
        ) {
            inputsRef.current[index - 1].focus();
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: '450px'}}>

            <label
                htmlFor="basicOTP"
                className="form-label fw-bold mb-3 text-secondary"
            >
                Enter OTP Code
            </label>

            <div className="d-flex gap-2 justify-content-between mb-4">

                {[0, 1, 2, 3, 4, 5].map((idx) => (

                    <input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={otp[idx] || ''}
                        ref={(el) => {
                            inputsRef.current[idx] = el;
                        }}
                        onChange={(e) => {
                            storeValue(e, idx);
                            handleChange(e, idx);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className="form-control text-center fs-4 fw-bold"
                        style={{
                            width: '50px',
                            height: '55px',
                            border: '2px solid #ced4da'
                        }}
                    />

                ))}

            </div>

        </div>
    );
}

export default OtpForm;