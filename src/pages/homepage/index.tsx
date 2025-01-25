import React, { useEffect, useState } from "react";
import TextInput from "../../components/shared/TextInput";
import Button from "../../components/shared/Button";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/apiClient";
import Spinner from "../../components/shared/Spinner";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import EventCard, { Event } from "../../components/shared/EventCard";

const Login = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        axiosInstance.get("/api/event").then(res => {
            if (res.data) {
                setEvents(res.data)
                setLoader(false)
            }
        })
    }, []);

    return (
        <div className="w-full flex justify-center">
            <div className="w-2/3 min-h-[500px] flex flex-col items-center mt-10 bg-[#1c2329] rounded-xl p-5 gap-10">
                <p className="font-medium text-[34px] text-[#818e9d] w-full">
                    Events
                </p>
                <div className="h-[1px] bg-[#818e9d] w-full"/>
                {loader && <div className="flex h-full w-full justify-center items-center">
                    <Spinner/>
                </div>
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {events?.map((event: Event) => (
                        <EventCard key={event.id} {...event}/>
                    ))}
                </div>
                
            </div>
        </div>
    );
};

export default Login;
