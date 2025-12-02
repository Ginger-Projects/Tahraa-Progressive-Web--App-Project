import TraineeHeader from "../../components/trainee/header";
import WelcomeCard from "../../components/trainee/WelcomeCard";
import ScheduleSection from "../../components/trainee/ScheduleSection";
import MyExperts from "../../components/trainee/MyExperts";
import SavedExperts from "../../components/trainee/SavedExperts";
import CourseCard from "../../components/trainee/GroupCourse";
import PackageSummary from "../../components/trainee/PackageSummary";
import { Footer } from "../../components/Home/Footer";
import "./Trainer.css";

const Trainer = () => {
  return (
    <div className="trainer-container">
      <TraineeHeader />

      <div className="trainer-page">
        <div className="trainer-grid">
          {/* Left column: Welcome + Group course */}
          <div className="left-column">
            <WelcomeCard />
            <CourseCard />
          </div>

          {/* Right column: Schedule + Experts */}
          <div className="right-column">
            <ScheduleSection />
            <div className="experts-row">
              <MyExperts />
              <SavedExperts />
            </div>
          </div>
        </div>

        <PackageSummary />
      </div>

      <div style={{ marginTop: "40px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Trainer;
