import { useEffect } from 'react';
import '../Style/Usercard.css';
import Logincard from './Logincard';
export default function Usercard({card , verifiedUser}){
    // scroll removing logic if needed
    //   useEffect(() => {
    //         document.body.style.overflow = "hidden";
    //         return () => {
    //         document.body.style.overflow = "auto";
    //         };
    //     }, []);
        return(
            <>
            <div className="usercardcontainer">
                <Logincard card = {card}/>
            </div>
            </>
        );
}