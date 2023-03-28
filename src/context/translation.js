import { createContext } from "react";

const TranslationContext = createContext({
    language: "",
    setLanguage: () => {},
    translate: () => {}
})

export default TranslationContext;
