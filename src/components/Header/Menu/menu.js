import Links from "../Links/links";
import clipper from "../../Assets/Images/clipper.svg";
import comb from "../../Assets/Images/comb.svg";
import hairwash from "../../Assets/Images/hairwash.svg";
import razor from "../../Assets/Images/razor.svg";

import "./menu.scss";
import { useSelector } from "react-redux";

//mobile menu
function Menu(props) {
    const {user} = useSelector(state => state.auth0)
    const { links } = props;
    const icons = [comb, clipper, razor, hairwash];

    return (
        <div className="menu">
            <nav className="login">
                {/* get user to say Hi to */}
                <Links isactive={false} path="/login" name={user ? `Hi ${user.username}` : 'Hi User'}/>
            </nav>

            <nav>
                <ul>
                    {links.map((link, i) => {
                        if (link.name === "Login" || link.name === "Signup") return null;

                        const isOdd = (i + 1) % 2 !== 0;

                        return (
                        <li key={link.name}>
                            { !isOdd && <img src={icons[i]} alt='' /> }
                            <Links isactive={false} path={link.path} name={link.name} />
                            { isOdd && <img src={icons[i]} alt='' /> }
                        </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Menu;