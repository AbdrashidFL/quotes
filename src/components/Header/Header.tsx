import {Link} from "react-router-dom";
import {NavigationItems} from "../../containers/NavigationItems/NavigationItems.tsx";

export const Header = () =>{
    return(
        <>
            <Link to={'/'} className={'header-logo'}>Quotes</Link>
            <NavigationItems></NavigationItems>
        </>
    )
}