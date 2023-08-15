import {FC} from "react";
import {IQuoteParams} from "../../interfaces/quotes.ts";
import imgDelete from "../../assets/delete.png"
import imgEdit from "../../assets/edit.png"
import {Link} from "react-router-dom";
export const Quote: FC<IQuoteParams> = ({quote, deleteQuote}) =>{
    return(
        <div className="quotes-item">
            <div className="quotes-item__main">
                <p className="quotes-item__main-text">{quote.text}</p>
                <div className="quotes-item__main-btns">
                    <button onClick={()=>{
                        if(quote.id !== undefined){
                            deleteQuote(quote.id)
                        }
                    }}><img src={imgDelete} alt="Button delete"/></button>
                    <Link to={`/quotes/${quote.id}/edit`}><img src={imgEdit} alt="Button edit"/></Link>
                </div>
            </div>
            <div className="quotes-item__author">
                <p>Author: {quote.author}</p>
            </div>
        </div>
    )
}