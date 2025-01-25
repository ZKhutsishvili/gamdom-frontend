import React, { useState } from "react";
import TextInput from "../../components/shared/TextInput";
import Button from "../../components/shared/Button";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/apiClient";
import Spinner from "../../components/shared/Spinner";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [status, setStatus] = useState("default")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const onSubmit = (data) => {
        setStatus("in_progress")
        axiosInstance.post("/api/user/register", data).then(() => {
            setStatus("success")
        }).catch(res => {
            setStatus("error")
            setErrorMessage(res?.response?.data?.message || "There was an error during account creation")
        })
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-md max-w-2/3 flex flex-col items-center mt-10 bg-[#1c2329] rounded-xl p-5 gap-5">
                <p className="font-medium text-[34px] text-white w-full">
                    Register
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">
                    <div className="flex flex-col w-full gap-5">
                        <TextInput errorMessage={errors?.name?.message as string} validation={{ required: "Name is required" }} register={register} placeholder="Enter your Name" label="Name" name="name"/>
                        <TextInput errorMessage={errors?.lastName?.message as string} validation={{ required: "Lastname is required" }} register={register} placeholder="Enter your Lastname" label="Lastname" name="lastName"/>
                        <TextInput errorMessage={errors?.email?.message as string} validation={{ required: "Email is required" }} register={register} placeholder="Enter your Email" label="Email" name="email"/>
                        <TextInput errorMessage={errors?.password?.message as string} validation={{ required: "Password is required" }} register={register} placeholder="Enter your Password" label="Password" name="password" type="password"/>
                    </div>
                    {status === "in_progress" ? 
                    <Spinner />
                    : status === "success" ?
                    <Button label="Login" onClick={() => navigate("/login")}/>
                    :
                    <Button label="Create account" type="submit" disabled={status === "in_progress"}/>
                    }
                    {status === "error" && <p className="text-red-500 text-sm font-medium">{errorMessage}</p>}
                    {status === "success" && <p className="text-green-500 text-sm font-medium">Account created successfully!</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
