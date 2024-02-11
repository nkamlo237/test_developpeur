import { useDispatch, useSelector } from "react-redux";

import { logout } from '../store/actions/user';
import { images } from "../constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Header() {

  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("logged out successfully!")
    navigate("/");
  }

  return (
    <section className="sticky top-0 left-0 right-0 bg-gray-50">
        <div className="container py-5 mx-auto flex flex-col md:flex-row justify-between items-center gap-y-5 md:gap-y-0">
            <img 
                src={images.Logo} 
                className="w-16 h-16" 
            />
            <div className="flex justify-center items-center gap-x-4">
                <h2 className="text-2xl font-medium text-[#0D2436]">Developer test</h2>
                {userState.userInfo && 
                  <button 
                    className="w=[7rem] h-auto rounded-lg bg-red-500 hover:bg-red-400 px-6 py-3 transition-colors duration-300 text-white font-bold"
                    onClick={logoutHandler}>
                    Logout
                  </button>
                }
            </div>
        </div>
    </section>
  )
}
