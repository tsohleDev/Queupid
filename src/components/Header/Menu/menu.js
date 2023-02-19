import Links from "../Links/links";
import clipper from "../../Assets/Images/clipper.svg";
import comb from "../../Assets/Images/comb.svg";
import hairwash from "../../Assets/Images/hairwash.svg";
import razor from "../../Assets/Images/razor.svg";

import "./menu.scss";

//mobile menu
function Menu(props) {
    const { links } = props;
    const icons = [comb, clipper, razor, hairwash];

    return (
        <div className="menu">
            <nav className="login">
                <Links isactive={false} path="/login" name={`Hi user`}/>
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