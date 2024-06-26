import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
export function UsersList({list}){
    const navigate = useNavigate();
    return <div>
        {list.map((user)=>{
            return <div className="usersList" key={user._id}> 
                {user.firstName} {user.lastName}
                <Button title={"Send Money"} onClick={()=>{
                    const name = user.firstName+" "+user.lastName;
                    navigate("/send?id="+user._id+"&firstName="+name);
                }}/>
            </div>
        })}
    </div>
}