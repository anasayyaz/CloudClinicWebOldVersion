import { useState } from "react";
import lang from "../lang";

export const useTranslation = () => {
    const [language, setLanguage] = useState("english");
    const [count,setCount]=useState(0);
    
    

    const translate = (TEXT) => {
        if (language === "english") return lang.english[TEXT];
        else if (language === "french") return lang.french[TEXT];
        else return lang.english[TEXT];
    }

    return { language, setLanguage, translate ,count,setCount};
}