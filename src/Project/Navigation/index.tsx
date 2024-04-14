import { FaMagnifyingGlass, FaHouse, FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import "./index.css"
import { useSelector } from "react-redux";
function Navigation() {
    const { currentUser } = useSelector((state: any) => state.user);

    const links = [
        {label: "Home", icon: <FaHouse /> },
        {label: "Search", icon: <FaMagnifyingGlass />},
        {label: "Profile", icon: <FaCircleUser /> },
    ]
    const { pathname } = useLocation();
    return (    
        <div className="">
            <div className="d-block d-sm-none">
                <ul className="nav wd-mm-navigation">
                    {links.map((link, index) => (
                        <li key={index} className={`nav-item text-center ps-5 pe-5 pt-2 pb-2 ${pathname.includes(link.label) ? "wd-active" : ""}`} >
                            <Link to={`/MustardMatrix/${link.label}`}> {link.icon} <br/> {link.label}  </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="d-none d-sm-block sticky-top">
                <ul className="nav flex-column wd-mm-navigation wd-size">
                    <li className="ps-4 pe-4 pt-3">

                    </li>
                    {links.map((link, index) => (
                        <li key={index} className={`nav-item text-center ps-4 pe-4 pt-5 pb-5 ${pathname.includes(link.label) ? "wd-active" : ""}`} >
                            <Link to={`/MustardMatrix/${(link.label === "Profile" && !currentUser) ? "SignIn" : link.label}`}> {link.icon} <br/> {link.label}  </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navigation;