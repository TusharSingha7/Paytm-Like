
export function InputBox({head,placeH,onChange}){

    return <div>
        <div>
        {head}
        </div>
        <input type="text" placeholder={placeH} onChange={onChange}/>
    </div>
}