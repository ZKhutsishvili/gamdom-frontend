import React, { useState } from "react";
import Button from "./Button";
import CustomModal from "./CustomModal";
import TextInput from "./TextInput";
import { useForm } from "react-hook-form";

export interface Event {
    name: string;
    odds: number;
    id: number;
}

const EventCard = ({name, odds, id}: Event) => {
    const [isOpen, setIsOpen] = useState(false)
    const [bet, setBet] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = () => {
        setBet(true)
    }
    const onClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col justify-between w-full min-h-[200px] bg-[#0a1119] p-5 rounded-md">
            <div className="flex justify-between">
                <p className="text-[#818e9d] w-full">
                    Event
                </p>
                <p className="text-[#818e9d] w-full">
                    {name}
                </p>
            </div>
            <div className="h-[1px] bg-[#818e9d] w-full"/>
            <div className="flex justify-between">
                <p className="text-[#818e9d]">
                    Odds
                </p>
                <p className="text-[#818e9d]">
                    {odds}
                </p>
            </div>
            <Button label="Place a bet" onClick={() => setIsOpen(true)}/>
            {isOpen &&
                <CustomModal onClose={onClose} width="400px">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">
                        <p className="text-[#818e9d] w-full">
                            {name}
                        </p>
                        <TextInput 
                        errorMessage={errors?.amount?.message as string} 
                        validation={{
                            required: "Required",
                            pattern: {
                              value: /^[+]?\d+([.]\d+)?$/,
                              message: "Please input correct amount"
                            }
                        }}
                        register={register} 
                        placeholder="Enter an amount" 
                        label="Place a bet" 
                        name="amount"
                        />
                        {bet ? 
                        <p className="text-green-500 text-sm font-medium">Bet was placed successfuly!</p>
                        :
                        <Button label="Submit" type="submit"/>
                        }
                    </form>
                </CustomModal>
            }
        </div>
    );
};

export default EventCard;
