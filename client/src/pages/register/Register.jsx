import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/reducers/userReducers";
import { signup } from "../../services/users";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Register() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);

  const { mutate, isLoading } = useMutation({
        mutationFn: ({ firstName, secondName, phone, email, password }) => {
            toast.loading("Registering...");
            return signup({firstName, secondName, phone, email, password});
        },
        onSuccess: (data) => {
            toast.dismiss();
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data));
            toast.success("Account is created!");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    useEffect(() => {
        if(userState.userInfo){
            navigate("/");
        }
    }, [userState.userInfo, navigate]);

    const { 
        handleSubmit, 
        register, 
        formState: { errors, isValid},
        watch, 
    } = useForm({
        defaultValues: {
            firstName: "",
            secondName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onChange"
    })

    const submitHandler = (data) => {
        const { firstName, secondName, phone, email, password } = data;
        mutate({ firstName, secondName, phone, email, password });
    }

    const password = watch("password");


  return (
    <section className="relative flex flex-wrap flex-row-reverse lg:h-screen lg:items-center">
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 xl:w-1/2 xl:h-full xl:px-8 lg:py-4">
        <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

        <p className="mt-2 text-gray-500">
            ipsa culpa autem, at itaque nostrum!
        </p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="mx-auto mb-0 mt-3 max-w-md space-y-2">
        <div>
            <label htmlFor="firstName" className="sr-only">Fisrt Name</label>
            <input
                type="text"
                id="firstName"
                {...register("firstName", {
                    minLength: {
                        value: 2,
                        message: "name must be at least 02 characters"
                    },
                    required: {
                        value: true,
                        message: "please provide a valid name"
                    }
                })}
                className={`w-full rounded-lg outline-none focus:border-b focus:border-blue-500 transition-all duration-300 border-gray-200 p-4 pe-12 text-sm shadow-sm
                ${errors.firstName ? "border-red-500" : "border-0 "}`}
                placeholder="Enter first name"
            />
            {errors.firstName?.message && (
                <p className='text-red-500 text-xs mt-1'>
                    {errors.firstName?.message}
                </p>
            )}
        </div>
        <div>
            <label htmlFor="secondName" className="sr-only">Fisrt Name</label>
            <input
                type="text"
                id="secondName"
                {...register("secondName", {
                    minLength: {
                        value: 2,
                        message: "name must be at least 02 characters"
                    },
                    required: {
                        value: true,
                        message: "please provide a valid name"
                    }
                })}
                className={`w-full rounded-lg outline-none focus:border-b focus:border-blue-500 transition-all duration-300 border-gray-200 p-4 pe-12 text-sm shadow-sm
                ${errors.secondName ? "border-red-500" : "border-0 "}`}
                placeholder="Enter second name"
            />
            {errors.secondName?.message && (
                <p className='text-red-500 text-xs mt-1'>
                    {errors.secondName?.message}
                </p>
            )}
        </div>
        <div>
            <label htmlFor="phone" className="sr-only">Fisrt Name</label>
            <input
                type="tel"
                id='phone'
                {...register('phone', {
                    pattern: {
                        value:  /^\+237\d{9}$/,
                        message: 'Please Enter a valid Cameroon phone Number',  
                    },
                    required: {
                        value: true,
                        message: 'Phone is required'
                    }
                })}
                className={`w-full rounded-lg outline-none focus:border-b focus:border-blue-500 transition-all duration-300 border-gray-200 p-4 pe-12 text-sm shadow-sm
                ${errors.phone ? "border-red-500" : "border-[#c3cad9]"}`}
                placeholder="Enter phone number"
            />
        </div>
        {errors.phone?.message && (
            <p className='text-red-500 text-xs mt-1'>
                {errors.phone?.message}
            </p>
        )}
        <div>
            <label htmlFor="email" className="sr-only">
                Email
            </label>

            <div className="relative">
            <input
                type="email"
                id="email"
                {...register("email", {
                    pattern: {
                        value:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "please enter a valid email",
                    },
                    required: {
                        value: true,
                        message: "please provide a valid email"
                    }
                }
                )}
                className={`w-full rounded-lg outline-none focus:border-b focus:border-blue-500 transition-all duration-300 border-gray-200 p-4 pe-12 text-sm shadow-sm
                ${errors.email ? "border-red-500" : "border-0 "}`}
                placeholder="Enter email"
            />
            {errors.email?.message && (
                <p className='text-red-500 text-xs mt-1'>
                    {errors.email?.message}
                </p>
            )}

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
                </svg>
            </span>
            </div>
        </div>

        <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
            <input
                type="password"
                id="password"
                {...register("password", {
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                        message: "at least 08 characters and at least one upercase, a special character and one digit"
                    },
                    required: {
                        value: true,
                        message: "please provide a valid password"
                    }
                })}
                className={`w-full rounded-lg outline-none focus:border-b focus:border-blue-500 transition-all duration-300 border-gray-200 p-4 pe-12 text-sm shadow-sm
                ${errors.password ? "border-red-500" : "border-0 "}`}
                placeholder="Enter password"
            />
            {errors.password?.message && (
                <p className='text-red-500 text-xs mt-1'>
                    {errors.password?.message}
                </p>
            )}
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                </svg>
            </span>
            </div>
        </div>
        <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>

            <div className="relative">
            <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                    validate: (value) => {
                        if(value !== password) {
                            return "passwords do not match"
                        }
                    },
                    required: {
                        value: true,
                        message: "please enter a password confirmation"
                    }
                })}
                className={`w-full rounded-lg outline-none focus:border-b focus:border-blue-500 transition-all duration-300 border-gray-200 p-4 pe-12 text-sm shadow-sm
                ${errors.confirmPassword ? "border-red-500" : "border-0 "}`}
                placeholder="Confirm password"
            />
            {errors.confirmPassword?.message && (
                <p className='text-red-500 text-xs mt-1'>
                    {errors.confirmPassword?.message}
                </p>
            )}

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                </svg>
            </span>
            </div>
        </div>

        <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
            You have an account?
            <Link to="/login" className="underline ml-2">Sign in</Link>
            </p>

            <button
                type="submit"
                disabled={!isValid || isLoading}
                className="inline-block rounded-lg bg-red-500 hover:bg-red-400 transition-colors duration-300 px-5 py-3 text-sm font-medium text-white"
            >
                Sign up
            </button>
        </div>
        </form>
    </div>

    <div className="hidden xl:block xl:relative h-64 md:w-full sm:h-96 xl:h-full xl:w-1/2 bg-red-600 rounded-r-[200px]">
    </div>
    </section>
  )
}
