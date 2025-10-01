import { useState } from "react";

export function useAmountSeats() {
    const [countAdult, setCountAdult] = useState(0);
    const [countSenior, setCountSenior] = useState(0);
    const [countChild, setCountChild] = useState(0);

    const adultPrice = 140;
    const seniorPrice = 120;
    const childPrice = 80;

    const totalTickets = countAdult + countSenior + countChild;
    const totalPrice = countAdult * adultPrice + countSenior * seniorPrice + countChild * childPrice;

    return {
        countAdult,
        setCountAdult,
        countSenior,
        setCountSenior,
        countChild,
        setCountChild,
        totalTickets,
        totalPrice,
        adultPrice,
        seniorPrice,
        childPrice,
    };
}
