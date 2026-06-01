import "../../Style/ForgetPassword.css";
export default function BoxInput({num , handleOtpInput}){
    return(
        <input type="text" maxLength={1} inputMode="numeric" ref={num} onChange={handleOtpInput} className="fp-otp-input-box" />
    )
}