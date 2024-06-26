import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Users } from "../components/Users";
import { UsersList } from "../components/UsersList";
import axios from "axios";
import { Balance } from "../components/Balance";

export function Dashboard(){
    const [list,setList] = useState([]);
    const [filter,setFilter] = useState("");
    const [balance,setBalance] = useState(0);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                Authorization : "Bearer "+token
            }
        })
        .then((response)=>{
            setList(response.data.users);
        }).catch((err)=>{alert("error fetching list")})

        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers :{
                Authorization : "Bearer "+token
            }
        }).then((response)=>{
            setBalance(response.data.balance);
        }).catch((err)=>alert("error fetching balance"))
    },[filter,balance]);
    return <div className="dashboard">
        <AppBar/>
        <Balance amount={balance}/>
        <Users onChange={async (e)=>{
            setFilter(e.target.value);
        }}/>
        <UsersList list={list}/>
    </div>
}