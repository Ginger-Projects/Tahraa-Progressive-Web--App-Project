import TraineeHeader from '../../components/trainee/header'
import WelcomeCard from "../../components/trainee/WelcomeCard";
import ScheduleSection from "../../components/trainee/ScheduleSection";
import MyExperts from "../../components/trainee/MyExperts";
import SavedExperts from "../../components/trainee/SavedExperts";
import CourseCard from "../../components/trainee/GroupCourse";
import "./Trainer.css";
import PackageSummary from "../../components/trainee/packageSummary";
import { Footer } from "../../components/Home/Footer";

const Trainer = () => {
  return (
    <div className="trainer-container">
    <TraineeHeader />
    
    <div className="trainer-page">
      
      <div className="trainer-grid">
        {/* Left column */}
        <div className="left-column">
          <WelcomeCard />
          <CourseCard />
        </div>

        {/* Right column */}
        <div className="right-column">
          <ScheduleSection />
          <div className="experts-row">
            <MyExperts />
            <SavedExperts />
          </div>
        </div>
        
      </div>
      <PackageSummary/>

    </div>
    <div style={{marginTop:"40px"}}>
    <Footer/>
    </div>
    
    </div>
  );
};

export default Trainer;
