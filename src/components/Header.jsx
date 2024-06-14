import  { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {

    const {user,logout}=useAuth();
    const logoutUser=()=>{
        setLoggedInUser('');
        return logout();
    }
    const [loggedinUser,setLoggedInUser]=useState([]);
    useEffect(()=>{
        fetch(`https://product-management-dashbaord-server.vercel.app/user/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            setLoggedInUser(data);
            console.log(data);
        });
    },[user?.email])
    return (
        <div className='mx-5 mt-5'>
            <div className='my-2 flex lg:flex-row text-center lg:text-start flex-col justify-between items-center'>
                <div>
                <h1 className='md:text-2xl text-lg my-1'>Welcome {loggedinUser.name},</h1>
                <p className='my-1 font-semibold md:text-xl'>Store Dashboard</p>
                </div>
                
                <div className=''>
                    {
                        user?
                    <button onClick={logoutUser} className='btn bg-white text-orange-600'>Logout</button>
                    :
                   <div className='space-x-2'>
                     <Link to={'/register'}><button className='btn text-white bg-orange-800'>Register</button></Link>
                     <Link to={'/login'}><button className='btn bg-orange-600 text-white'>Login</button></Link>
                   </div>
                     }
                </div>
            </div>



            <hr className=' border-opacity-50 border-orange-600' />
        </div>
    );
};

export default Header;