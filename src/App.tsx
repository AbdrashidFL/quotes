import './App.sass'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./containers/Layout/Layout.tsx";
import {Form} from "./containers/Form/Form.tsx";
import {Quotes} from "./containers/Quotes/Quotes.tsx";
import {ErrorPage} from "./components/ErrorPage/ErrorPage.tsx";

const App = () =>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index path={'/'} element={<Quotes/>}/>
                        <Route path={'quotes/:category'} element={<Quotes/>}/>
                        <Route path={'add-quote'} element={<Form typeForm={'add'}/>}/>
                        <Route path={'quotes/:id/edit'} element={<Form typeForm={'edit'}/>}/>
                        <Route path={'/*'} element={<ErrorPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
