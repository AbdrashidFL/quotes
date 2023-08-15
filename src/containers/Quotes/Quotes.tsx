import {useEffect, useState} from "react";
import {IQuote, IResponseQuote} from "../../interfaces/quotes.ts";
import {apiQuotes} from "../../api/apiQuotes.ts";
import {Quote} from "../../components/Quote/Quote.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {Loader} from "../../components/UI/Loader/Loader.tsx";
import {categoryItems} from "../../config.ts";

export const Quotes = () =>{
    const navigation = useNavigate()
    const params = useParams();
    const categoryParams: string | undefined = params.category;
    const [stateLoader, setStateLoader] = useState<boolean>(false);
    const [stateQuotes, setStateQuotes] = useState<IQuote[]>([]);

    const updateQuotes = async () =>{
        setStateLoader(true);
        const data: IResponseQuote | null | undefined = categoryParams === undefined ? await apiQuotes.getQuote() : await apiQuotes.getSortingQuotes(categoryParams);
        if(data !== undefined && data !== null){
            const quotes: IQuote[] = Object.keys(data).map((key: string)=>{
                return {
                    id: data[key].id,
                    author: data[key].author,
                    text: data[key].text,
                    category: data[key].category,
                }
            })
            setStateQuotes(quotes);
        }else{
            setStateQuotes([]);
        }
        setStateLoader(false);
    }
    const deleteQuote = async (id: string) =>{
        await apiQuotes.deleteQuote(id);
        updateQuotes();
    }
    useEffect(()=>{
        const categoryId = categoryItems.map((item)=>{
            if(item.to !== '/'){
                const separateUrl = item.to.split('/');
                return separateUrl[separateUrl.length-1]
            }
        })
        if(categoryParams === undefined || categoryId.includes(categoryParams)){
            updateQuotes()
        } else navigation('/*')
    },[params])
    return(
        <>
            <div className="quotes">
                <div className="container">
                    {
                        stateQuotes.length !== 0 ? (
                            <div className="quotes-wrap">
                                {
                                    stateQuotes.map((quote: IQuote, index: number)=>(
                                        <Quote
                                            quote={quote}
                                            deleteQuote={deleteQuote}
                                            key={index}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <h2>No quotes</h2>
                        )
                    }
                </div>
            </div>
            <Loader state={stateLoader}/>
        </>
    )
}