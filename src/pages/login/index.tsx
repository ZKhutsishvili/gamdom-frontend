import React, { useState } from "react";
import TextInput from "../../components/shared/TextInput";
import Button from "../../components/shared/Button";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/apiClient";
import Spinner from "../../components/shared/Spinner";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [status, setStatus] = useState("default")
    const [errorMessage, setErrorMessage] = useState("")
    const [_, setCookie] = useCookies()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        setStatus("in_progress")
        axiosInstance.post("/api/user/login", data).then(res => {
            const token = res?.data?.token
            if (token) {
                setCookie("token", token)
                axiosInstance.interceptors.request.use((config) => {
                    config.headers.Authorization = `Bearer ${token}`;
                    return config;
                });
                navigate("/homepage")
            }
        }).catch(res => {
            setStatus("error")
            setErrorMessage(res?.response?.data?.message || "There was an error during account creation")
        })
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-md max-w-2/3 flex flex-col items-center mt-10 bg-[#1c2329] rounded-xl p-5 gap-5">
                <p className="font-medium text-[34px] text-white w-full">
                    Login
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">
                    <div className="flex flex-col w-full gap-5">
                        <TextInput errorMessage={errors?.email?.message as string} validation={{ required: "Email is required" }} register={register} placeholder="Enter your Email" label="Email" name="email"/>
                        <TextInput errorMessage={errors?.password?.message as string} validation={{ required: "Password is required" }} register={register} placeholder="Enter your Password" label="Password" name="password" type="password"/>
                    </div>
                    {status === "in_progress" ? 
                    <Spinner />
                    :
                    <Button label="Login" type="submit"/>
                    }
                    {status === "error" && <p className="text-red-500 text-sm font-medium">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
