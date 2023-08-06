import React,{useEffect,useContext,useState,createContext} from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();
const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    })

    useEffect(()=>{
        
        const data = Cookies.get("token");
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            })
        }
    },[])
    return (
        <React.StrictMode>
            <AuthContext.Provider value={[auth,setAuth]}>
                {children}
            </AuthContext.Provider>
        </React.StrictMode>
    )
}

// custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth,AuthProvider};