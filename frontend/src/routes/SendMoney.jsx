import { useSearchParams } from "react-router-dom"
import { Button } from "../components/Button";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export function SendMoney(){
    const [searchId,] = useSearchParams();
    const [amount,setAmount] = useState(0);
    const name = searchId.get("firstName");
    return <div className="innerRoot"><div className="sendMoney">
        <h2>Send Money</h2>
        <p>{name}</p>
        <h3>Amount in rupees</h3>
        <input placeholder="Enter Amount" onChange={(e)=>{
            setAmount(parseInt(e.target.value));
        }}/>
        <Button title={"Send Money"} onClick={async ()=>{
            const id = searchId.get("id");
            const token = localStorage.getItem("token");

            axios.post("http://localhost:3000/api/v1/account/transfer",{
                to:id,
                amount:amount
            },{
                headers:{
                    Authorization :"Bearer " + token
                }
            }).then((response)=>{
                alert(response.data.msg);
            }).catch((err)=>{
                alert(err.response.data.msg);
            });
        }}/>
    </div></div>
}