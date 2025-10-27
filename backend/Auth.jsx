import React,{useState} from "react";
export default function Auth(){
    const [registername,setregistername]=useState("");
    const[registeremail,setregisteremail]=useState("");
    const[registerpassword,setregisterpassword]=useState("");

    const[loginname,setloginname]=useState("");
    const[loginpassword,setloginpassword]=useState("");

    return(
        <div className="authcontainer">
            <div className="form-section authform">
<h2>registration</h2>
            </div>
            <div className="form-section authform">
<h2>login</h2>
            </div>
        </div>
    )
}