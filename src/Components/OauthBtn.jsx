import "../Style/OauthBtn.css";
export default function OauthBtn({icon , name}){
    return(
        <button className="authbtn">
            <span>{icon}</span>
            <p>Continue with</p> 
            <span>{name}</span>
        </button>
    );
}