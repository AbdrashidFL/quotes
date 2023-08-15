import {categoryItems} from "../../config.ts";
import {INavigationItem} from "../../interfaces/navigation.ts";
import {NavigationItem} from "../../components/NavigationItem/NavigationItem.tsx";

export const CategoryItems = () =>{
    return(
        <>
            <div className="category">
                <div className="container">
                    <ul>
                        {
                            categoryItems.map((item: INavigationItem, index: number)=>(
                                <NavigationItem to={item.to} body={item.body} key={index}></NavigationItem>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}