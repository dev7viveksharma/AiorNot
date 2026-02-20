import "../Style/OauthBtn.css";
export default function OauthBtn({icon , name}){
    return(
        <button className="authbtn">{icon} Continue with {name}</button>
    );
}