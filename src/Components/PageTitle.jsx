import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const titles = {
    "/": "Home",
    "/text": "Text Detection",
    "/image": "Image Detection",
    "/video": "Video Detection",
    "/music": "Music Detection",
    "/ai": "Modern AI",
    "/aboutus": "About Us"
};

export default function PageTitle() {
    const location = useLocation();

    useEffect(() => {
        document.title = `${titles[location.pathname] || "AIorNot"} | AIorNot`;
    }, [location.pathname]);

    return null;
}