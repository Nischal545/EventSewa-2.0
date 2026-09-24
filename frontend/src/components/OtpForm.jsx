import React, {useRef} from 'react';
import Button from './Button';

function OtpForm() {
    // Creating references to automatically move focus to the next box
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const val = e.target.value;
        // If user typed a number, jump to the next input field automatically
        if (val && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // If user presses Backspace, move focus to the previous input box
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: '450px'}}>
            <form>
                <label htmlFor="basicOTP" className="form-label fw-bold mb-3 text-secondary">
                    Enter OTP Code
                </label>

                {/* Flex layout container to align OTP input squares perfectly */}
                <div className="d-flex gap-2 justify-content-between mb-4">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <input
                            key={idx}
                            type="text"
                            maxLength="1"
                            ref={(el) => {
                                inputsRef.current[idx] = el
                            }}
                            onChange={(e) => handleChange(e, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            className="form-control text-center fs-4 fw-bold"
                            style={{width: '50px', height: '55px', border: '2px solid #ced4da'}}
                        />
                    ))}
                </div>
            </form>

        </div>
    );
}

export default OtpForm;
