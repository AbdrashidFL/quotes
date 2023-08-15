import {IQuote, IResponseQuote} from "../../interfaces/quotes.ts";
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {apiQuotes} from "../../api/apiQuotes.ts";
import {categoryItems} from "../../config.ts";
import {OptionForm} from "../../components/OptionForm/OptionForm.tsx";
import {INavigationItem} from "../../interfaces/navigation.ts";
import {ITypeForm} from "../../interfaces/form.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Loader} from "../../components/UI/Loader/Loader.tsx";

export const Form: FC<ITypeForm> = ({typeForm}) =>{
    const navigate = useNavigate();
    const params = useParams();
    const idParams: string | undefined= params.id;
    const separateFirstCategory = categoryItems[1].to.split('/');
    const [stateLoader, setStateLoader] = useState<boolean>(false);
    const [stateNewQuote, setStateNewQuote] = useState<IQuote>({
        id: '',
        author: '',
        text: '',
        category: separateFirstCategory[separateFirstCategory.length-1]
    });
    const handleValueForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setStateNewQuote({
            ...stateNewQuote,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: FormEvent)=>{
        setStateLoader(true);
        e.preventDefault();
        if(stateNewQuote.author.trim().length >=3 && stateNewQuote.text.trim().length>=3)
        {
            if(typeForm==='add'){
                const data: {name: string} | undefined = await apiQuotes.postQuote({
                    author: stateNewQuote.author,
                    text: stateNewQuote.text,
                    category: stateNewQuote.category
                });
                if(data !== undefined){
                    await apiQuotes.putQuote({
                        id: data.name,
                        author: stateNewQuote.author,
                        text: stateNewQuote.text,
                        category: stateNewQuote.category
                    });
                    navigate('/')
                }
            }else{
                await apiQuotes.putQuote({
                    id: stateNewQuote.id,
                    author: stateNewQuote.author,
                    text: stateNewQuote.text,
                    category: stateNewQuote.category
                });
                navigate('/')
            }
        }else{
            alert('Error length form value');
        }
        setStateLoader(false);
    }

    const updateQuote = async () =>{
        setStateLoader(true);
        const data: IResponseQuote | null | undefined = await apiQuotes.getQuote();
        if(data !== undefined && data !== null){
            const keys: (string | undefined)[] = Object.keys(data).map((key: string)=>{
                if(key === idParams){
                    setStateNewQuote({
                        id: data[key].id,
                        author: data[key].author,
                        text: data[key].text,
                        category: data[key].category,
                    })
                    return key
                }
            })
            const key= keys.filter((key)=>key===idParams)
            if(key[0] === undefined){
                navigate('/*')
            }
        }else{
            setStateNewQuote({
                id: '',
                author: '',
                text: '',
                category: separateFirstCategory[separateFirstCategory.length-1]
            });
        }
        setStateLoader(false);
    }

    useEffect(()=>{
        // if(idParams !== undefined) updateQuote();
        if(idParams !== undefined) {void updateQuote()} else{
            setStateNewQuote({
                id: '',
                author: '',
                text: '',
                category: separateFirstCategory[separateFirstCategory.length-1]
            });
        }
    }, [params])

    return(
        <>
            <div className="form">
                <div className="container">
                    <h2>{idParams !== undefined ? 'Edit Quote' : 'Add Quote'}</h2>
                    <form className="form-item" onSubmit={onSubmit}>
                        <label>
                            <select className='input' name="category" onChange={handleValueForm} value={stateNewQuote.category} >
                                {
                                    categoryItems.map((item: INavigationItem, index: number)=>{
                                        if(item.to !== '/'){
                                            const separateUrl = item.to.split('/');
                                            return(
                                                <OptionForm value={separateUrl[separateUrl.length-1]} body={item.body} key={index}/>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </label>
                        <label>
                            <input className='input' type="text" name={'author'} onChange={handleValueForm} value={stateNewQuote.author}/>
                        </label>
                        <label>
                            <textarea className='input' name={'text'} onChange={handleValueForm} value={stateNewQuote.text}></textarea>
                        </label>
                        <button className='button'>{idParams !== undefined ? 'Edit' : 'Add'}</button>
                    </form>
                </div>
            </div>
            <Loader state={stateLoader}/>
        </>
    )
}