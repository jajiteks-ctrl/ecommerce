import { useContext, useEffect,createContext,useState} from "react";

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {

    const [mode, setMode] = useState(localStorage.getItem("mode") || "light")

    useEffect(() => {
        document.body.className = mode
        localStorage.setItem("mode", mode)

    })

    const toogleTheme = () => {
        if (mode === "light") {
            setMode("dark")
        }
        else {
            setMode("light")
        }
    }


    return (
        <ThemeContext.Provider value = {{mode,toogleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider


export const useTheme = ()=>{
    return useContext(ThemeContext)
}