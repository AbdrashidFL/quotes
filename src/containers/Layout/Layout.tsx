import {Outlet, useLocation} from "react-router-dom";
import {Header} from "../../components/Header/Header.tsx";
import {CategoryItems} from "../CategoryItems/CategoryItems.tsx";
import {Footer} from "../../components/Footer/Footer.tsx";
import {categoryItems} from "../../config.ts";

export const Layout = () =>{
    const location = useLocation();
    const pathForm = location.pathname;
    const returnNavigation = () =>{
        if(pathForm === '/' || categoryItems.some((item)=> pathForm === `/${item.to}`)) return <CategoryItems/>
    }
    return(
        <>
            <header className="header">
                <div className="container">
                    <Header/>
                </div>
            </header>
            <main className="main">
                {
                    returnNavigation()
                }
                <Outlet/>
            </main>
            <footer className="footer">
                <div className="container">
                    <Footer/>
                </div>
            </footer>
        </>
    )
}