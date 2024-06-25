import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Users } from "../components/Users";
import { UsersList } from "../components/UsersList";
import axios from "axios";

export function Dashboard(){
    const [list,setList] = useState([]);
    const [filter,setFilter] = useState("");
    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                Authorization : "Bearer "+token
            }
        })
        .then((response)=>{
            setList(response.data.users);
        })
    },[filter]);
    return <div>
        <AppBar/>
        <Users onChange={async (e)=>{
            setFilter(e.target.value);
        }}/>
        <UsersList list={list}/>
    </div>
}