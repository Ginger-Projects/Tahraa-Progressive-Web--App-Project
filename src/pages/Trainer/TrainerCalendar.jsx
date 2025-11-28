import TraineeHeader from "../../components/trainee/header";
import Calendar from "../../components/trainee/Calendar";
import './TrainerCalendar.css'

export default function TrainerCalendar(){
    return(
        <div className="trainee-calendar">
            <TraineeHeader />
            <div className="calendar-block">
             <Calendar/>
            </div>
            
        </div>
    )
}