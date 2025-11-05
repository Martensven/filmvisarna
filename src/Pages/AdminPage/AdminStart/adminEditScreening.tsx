import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

type Auditorium = {
    _id: string;
    name: string;
};

export default function AdminEditScreening() {
    // Using Params to get the id from the URL to get the screening to edit
    const { id } = useParams();
    const nav = useNavigate();

    const [time, setTime] = useState("");
    const [auditorium, setAuditorium] = useState("");
    const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);

    // Fetching screening data
    useEffect(() => {
        const fetchScreening = async () => {
            const screeningRes = await fetch(`/api/admin/screenings/${id}`);
            const screeningData = await screeningRes.json();
            setTime(screeningData.time);
            setAuditorium(screeningData.auditoriumId);
        };
        // Fetching list of auditoriums for a dropdown
        const fetchAuditoriums = async () => {
            const auditoriumRes = await fetch(`/api/auditoriums`);
            const auditoriumData = await auditoriumRes.json();
            setAuditoriums(auditoriumData);
        };
        fetchScreening();
        fetchAuditoriums();
    }, [id]);

    

    return (
        
    );
}