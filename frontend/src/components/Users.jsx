
export function Users({onChange}){
    return <div className="users">
        <div>Users</div>
        <input placeholder="search users.." onChange={onChange}/>
    </div>
}