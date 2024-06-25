import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";

export function SignIn(){
    const navigate = useNavigate();
    const [username,setUname] = useState("");
    const [password,setPass] = useState("");
    return <div>
        <Heading heading={"SignIn"}/>
        <SubHeading subheading={"Enter your credentials to access your account"}/>
        <InputBox onChange={(e)=>{
            setUname(e.target.value);
        }} head={"Email"} placeH={"tushar@gmail.com"}/>
        <InputBox onChange={(e)=>{
            setPass(e.target.value);
        }} head={"password"} placeH={"*******"}/>
        <Button onClick={async ()=>{
            try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem("token",token);
            navigate("/dashboard");
        }
        catch(err){
            alert("No User Exits with these credentials");
        }
        }} title={"SignIn"}/>
        <Footer context={"Don't have an account ?"} where={"/signup"} body={"SingUp"}/>
    </div>
}