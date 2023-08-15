import {instance} from "./instance.ts";
import {IQuote, IResponseQuote} from "../interfaces/quotes.ts";

class ApiQuotes {
    async postQuote({author, text, category}: IQuote){
        try {
            const response = await instance.post('quotes.json',{
                id: '',
                author: author,
                text: text,
                category: category
            })
            const {statusText, data}: {statusText: string, data: {name: string}} = response;
            if(statusText === 'OK'){
                return data;
            }else{
                throw new Error('Error Post Quote');
            }
        }catch (e){
            alert('Error Post Quote');
            console.log(e);
        }
    }
    async putQuote({id, author, text, category}: IQuote){
        try {
            const response = await instance.put(`quotes/${id}.json`,{
                id: id,
                author: author,
                text: text,
                category: category
            })
            const {statusText}: {statusText: string} = response;
            if(statusText !== 'OK'){
                throw new Error('Error Put Quote');
            }
        }catch (e){
            alert('Error Put Quote');
            console.log(e);
        }
    }
    async getQuote(){
        try {
            const response = await instance.get(`quotes.json`);
            const {statusText, data}: {statusText: string, data: IResponseQuote | null} = response;
            if(statusText === 'OK'){
                return data;
            }else {
                throw new Error('Error Get All Quote');
            }
        }catch (e){
            alert('Error Get All Quote');
            console.log(e);
        }
    }
    async deleteQuote(id: string){
        try {
            const response = await instance.delete(`quotes/${id}.json`);
            const {statusText}: {statusText: string} = response;
            if(statusText !== 'OK'){
                throw new Error('Error Delete Quote');
            }
        }catch (e){
            alert('Error Delete Quote');
            console.log(e);
        }
    }
    async getSortingQuotes(category: string){
        try {
            const response = await instance.get(`/quotes.json?orderBy="category"&equalTo="${category}"`);
            const {statusText, data}: {statusText: string, data: IResponseQuote | null} = response;
            if(statusText === 'OK'){
                return data;
            }else {
                throw new Error('Error Get Quote');
            }
        }catch (e){
            alert('Error Get Sorting Quote');
            console.log(e);
        }
    }
}
export const apiQuotes: ApiQuotes = new ApiQuotes();