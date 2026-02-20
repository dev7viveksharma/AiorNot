import '../Style/Limit.css';
export default function Limit({value}){
    return(
        <div className="limitContainer">
            <h4>You Have Only {value} Chance Left!</h4>
        </div>
    )
}