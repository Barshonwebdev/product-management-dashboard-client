import { createContext, useEffect, useState } from "react";
import {app} from "../firebase/firebase.config";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
export const AuthContext=createContext(null);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();
const AuthProvider = ({children}) => { 
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,currentuser=>{
            setUser(currentuser);
            console.log(currentuser);
            setLoading(false);
        })

        return ()=>{
            return unsubscribe();
        }
    },[]);

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

   
    const signinUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logout=()=>{
        setLoading(true);
        return signOut(auth);
    }

    const googleSignin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    
    const authInfo={user,loading,createUser,signinUser,logout,googleSignin};
    return (
      <div>
        <AuthContext.Provider value={authInfo}>
          {children}
        </AuthContext.Provider>
      </div>
    );
};

export default AuthProvider;