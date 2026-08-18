export default function Input({type , placeholder , id , inputclass , value , data , readOnly}){
    return(
        <input type={type} placeholder={placeholder} id= {id} className={inputclass} onChange={data} value={value} readOnly={readOnly} required/>
    )
}