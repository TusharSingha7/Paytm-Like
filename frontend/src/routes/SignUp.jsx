import { Footer } from "../components/Footer";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import "../App.css"
import { useState } from "react";
import { Button } from "../components/Button";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export function SignUp(){
    const navigate = useNavigate();
    const [firstName,setFName] = useState("");
    const [lastName,setLName] = useState("");
    const [username,setUame] = useState("");
    const [Pass,setPass] = useState("");
    return <div className="OuterSignup"> 
        <Heading heading={"SignUp"}/>
        <SubHeading subheading={"Enter your details to create an account"}/>
        <InputBox onChange={(e)=>{
            setFName(e.target.value);
        }} head={"First Name"} placeH={"Tushar"}/>
        <InputBox onChange={(e)=>{
            setLName(e.target.value)
        }} head={"Last Name"} placeH={"Singh"}/>
        <InputBox onChange={(e)=>{
            setUame(e.target.value)
        }} head={"Email"} placeH={"tusharsingh@gmail.com"}/>
        <InputBox onChange={(e)=>{
            setPass(e.target.value)
        }} head={"Password"} placeH={"********"}/>
        <Button title={"SignUp"} onClick={async ()=>{
            try{
            const response  = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstName,
                lastName,
                password : Pass
            });
            const token = response.data.token;
            localStorage.setItem("token",token);
            navigate("/dashboard");
        }
        catch(err){
            alert("Enter Valid Inputs ");
        }
        }}/>
        <Footer context={"Already have an account ? "} where={"/signin"} body={"Login"}/>
    </div>
}