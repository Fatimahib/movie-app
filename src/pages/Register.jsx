

    import { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { useAuth } from "../context/AuthContext";
    import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
    import GoogleIcon from "../assets/GoogleIcon.jsx";

    const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const { registerUser, signUpProvider } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
        await registerUser(email, password, `${firstName} ${lastName}`);
        navigate("/");
        toastSuccessNotify("Registration successful!");
        } catch (error) {
        setError(error.message);
        toastErrorNotify(error.message);
        }
    };

    const handleProviderLogin = async () => {
        try {
        await signUpProvider();
        navigate("/");
        toastSuccessNotify("Registration successful with Google!");
        } catch (error) {
        toastErrorNotify(error.message);
        }
    };

    return (
        <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main pt-16">
        <div className="form-container mt-[5vh] w-[380px] h-[580px] relative z-40"> 
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
            <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
                Sign Up
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="firstName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    placeholder=" "
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label
                    htmlFor="firstName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    First Name
                </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="lastName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                    placeholder=" "
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label
                    htmlFor="lastName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Last Name
                </label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input
                type="email"
                name="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                Email
                </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input
                type="password"
                name="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                Password
                </label>
            </div>
            <div className="flex justify-start">
                <Link
                to="/login"
                className="text-sm text-gray-500 hover:text-red-main dark:text-gray-400 dark:hover:text-red-main"
                >
                Already have an account?
                </Link>
            </div>
            <button
                type="submit"
                className="w-full mt-6 text-white bg-red-main hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                Register
            </button>
            <button
                type="button"
                onClick={handleProviderLogin}
                className="w-full mt-4 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55"
            >
                <GoogleIcon className="w-4 h-4 mr-2" />
                Sign up with Google
            </button>
            </form>
        </div>
        </div>
    );
    };

    export default Register;