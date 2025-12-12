import TraineeHeader from "../../components/trainee/header";
import PackageSummaryMain from "../../components/trainee/PackageSummaryMain";
import "./PackageSummaryPage.css";

export default function PackageSummaryPage() {
    return (
        <div className="package-summary-page">
           <TraineeHeader title="Package Summary"/>
           <div className="package-summary-container">
            <PackageSummaryMain/>
           </div>
           <div className="edit-profile-footer">
        <p>
          Copyright © 2025 Yanmu. All rights reserved. Developed by Ginger Technologies.
        </p>
      </div>
           
        </div>
    )
}