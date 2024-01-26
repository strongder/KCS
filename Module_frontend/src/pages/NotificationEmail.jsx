import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Logo from '../assets/images/logo.png'
import { Input } from "@mui/material";
import ResetPassword from "./ResetPassword"

const NotificationEmail = ({email, code}) => {

    const [value, setValue] = useState('')
    const [status , setStatus] = useState(false)
    const handleButton = () => {
        if(value == code.verification) {
            console.log(new Date().getTime - code.createDate);
            if(new Date().getTime() - code.createDate <= 60000) {
                // console.log(new Date().getTime - code.createDate);
                setStatus(true);
            } else {
                alert("Mã xác nhận đã hết hiệu lực")
            }
        } else {
            console.log(value);
            console.log(code);
            alert("Mã xác nhận không đúng")
        }
    }

    if(status) {
        return <ResetPassword email = {email}/>
    }
    return (
        <>
            <div className='"header-forgot-pass'>
                <div className="logo-image">
                    <img src={Logo} alt=""></img>
                </div>
                <div className="text-image">
                    <p style={{textAlign: "center", marginBottom: "10px"}}>Đặt lại mật khẩu</p>
                </div>
            </div>
            <div className="reset-password-container">
                <div>
                    <p style={{textAlign: "center", marginBottom: "10px"}}>Nhập mã xác nhận</p>
                </div>
                <div>
                    <p style={{textAlign: "center", marginBottom: "10px"}}>Mã xác minh đã được gủi tới địa chỉ Email: </p>
                    <p style={{textAlign: "center", marginBottom: "10px"}}>{email}</p>
                    <input type = 'text' onChange={(e) => setValue(e.target.value)} value = {value}/>
                    <button onClick={() => handleButton()}>Tiếp tục</button>
                </div>
            </div>
        </>
    );
}

export default NotificationEmail;