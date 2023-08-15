import {FC} from "react";
import {IOptionForm} from "../../interfaces/form.ts";

export const OptionForm: FC<IOptionForm> = ({value, body}) =>{
    return(
        <>
            <option value={value}>{body}</option>
        </>
    )
}