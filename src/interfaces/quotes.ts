export interface IQuote{
    id?: string,
    author: string,
    text: string,
    category: string
}
export interface IResponseQuote{
    [key: string]: IQuote
}
export interface IQuoteParams{
    quote: IQuote,
    deleteQuote: (id: string)=>void
}