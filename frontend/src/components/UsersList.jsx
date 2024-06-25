import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
export function UsersList({list}){
    const navigate = useNavigate();
    return <div>
        {list.map((user)=>{
            return <div style={{display:'flex',justifyContent:'space-between'}} key={user._id}> 
                {user.firstName} {user.lastName}
                <Button title={"Send Money"} onClick={()=>{
                    navigate("/send?id="+user._id);
                }}/>
            </div>
        })}
    </div>
}