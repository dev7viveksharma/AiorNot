import Link from '../Components/Link';
import Social from '../Components/Social';
import { FaInstagramSquare , FaLinkedin , FaGithubSquare } from "react-icons/fa";
import '../Style/Footer.css';
export default function Footer(){
    return(
        <>
        <footer className="Footer">
            <div className="footerlinks">
                <div className="motive">
                    <h2>AIorNot</h2>
                    <p>AIorNot is a website which detects AI Contents</p>
                </div>
                <div className="contentcontainer">
                    <div className="linkcontainer">
                        <Link heading={"Company"} links = {[{name : "About us" , link : "aboutus"},{name:"Contact us" , link:"contactus"}]}/>
                        <Link heading={"Assistive Tools"} links = {[{name : "Image" , link : "image"},{name:"Video" , link:"video"}]}/>
                        <Link heading={"Resources"} links = {[{name : "About us" , link : "aboutus"},{name:"Contact us" , link:"contactus"}]}/>
                    </div>
                    <div className="sociallinks">
                        <Social route={<FaInstagramSquare/>}/>
                        <Social route={<FaLinkedin/>}/>
                        <Social route={<FaGithubSquare/>}/>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>AIorNot by Vivek sharma 2025 &copy; All rights reserved</p>
            </div>
        </footer>
        </>
    )
}