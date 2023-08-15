import {FC} from "react";
import {INavigationItem} from "../../interfaces/navigation.ts";
import {NavLink} from "react-router-dom";

export const NavigationItem: FC<INavigationItem> = ({to, body}) =>{
    return(
        <li><NavLink to={to}>{body}</NavLink></li>
    )
}