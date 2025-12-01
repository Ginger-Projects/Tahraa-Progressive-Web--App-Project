import TraineeHeader from "../../components/trainee/header";
import Calendar from "../../components/trainee/Calendar";
import './TrainerCalendar.css'

export default function TrainerCalendar(){
    return (
        <div className="trainee-calendar">
            <TraineeHeader title="My Calendar" />

            <div className="calendar-block">
                <Calendar />
            </div>

            <footer className="calendar-footer">
                <p>
                    Copyright 2025 Tahra. All rights reserved. Developed by Ginger Technologies.
                </p>
            </footer>
        </div>
    );
}