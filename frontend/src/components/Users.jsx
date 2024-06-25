
export function Users({onChange}){
    return <div >
        <div style={{fontWeight:"bold"}}>Users</div>
        <input placeholder="search users.." onChange={onChange}/>
    </div>
}