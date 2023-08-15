import {FC} from "react";
import {ILoader} from "../../../interfaces/ui";

export const Loader: FC<ILoader> = ({state}) =>{
    return(
        <>
            <div className="loader" style={
                {
                    opacity: state ? '1' : '0',
                    zIndex: state ? '10' : '-10'
                }
            }>Loading...</div>
        </>
    )
}