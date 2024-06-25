import { Link } from "react-router-dom";
import { SignIn } from "../routes/SignIn";

export function Footer({where,body,context}){
    return <div>
        {context} <Link to={where}>{body}</Link>
    </div>
}