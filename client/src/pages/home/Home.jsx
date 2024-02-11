import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { useSelector } from "react-redux";

export default function Home() {

    const navigate = useNavigate();
    const userState = useSelector(state => state.user);

  return (
    <MainLayout>
        <section className='absolute w-full top-[50%]'>
            <div className="flex flex-col justify-center items-center">
                <h2 className='text-3xl text-red-500 text-bold mb-8'>
                    Welcome{userState.userInfo && <span>, {userState.userInfo.firstName}</span>}
                </h2>
                {userState.userInfo ? (
                    <h3 className="text-lg font-bold text-gray-500">We are happy to have you there!</h3>
                ) : (
                    <div className="flex space-x-10">
                        <button
                            onClick={() => navigate("/login")} 
                            className="w-[7rem] h-auto rounded-lg bg-gray-500 hover:bg-gray-400 px-6 py-3 transition-colors duration-300 text-white font-bold"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate("/register")}
                            className="w=[7rem] h-auto rounded-lg bg-red-400 hover:bg-red-500 px-6 py-3 transition-colors duration-300 text-white font-bold"
                        >
                            Signup
                        </button>
                    </div>
                )}
            </div>
        </section>
    </MainLayout>
  )
}
