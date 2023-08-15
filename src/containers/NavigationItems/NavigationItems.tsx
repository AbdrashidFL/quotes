import {menuItems} from "../../config.ts";
import {NavigationItem} from "../../components/NavigationItem/NavigationItem.tsx";
import {INavigationItem} from "../../interfaces/navigation.ts";

export const NavigationItems = () =>{
    return(
        <>
            <nav className="navigation">
                <ul>
                    {
                        menuItems.map((item: INavigationItem, index: number)=>(
                            <NavigationItem to={item.to} body={item.body} key={index}></NavigationItem>
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}