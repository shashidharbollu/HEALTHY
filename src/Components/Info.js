import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          We bring healthcare to your convenience, offering a comprehensive
          range of on-demand medical services tailored to your needs. Our
          platform allows you to connect with experienced online doctors who
          provide expert medical advice, issue online prescriptions, and offer
          quick refills whenever you require them.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Knee Pain"
          description="Thorough examination and diagnostic tests to identify the root cause of knee pain.
          Specialized imaging techniques like X-rays, MRIs, and CT scans for accurate diagnosis."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Shoulder PAIN"
          description="Physical therapy and tailored exercises.
          Arthroscopic procedures or joint replacement if required."
          icon={faHeartPulse}
        />

        <InformationCard
          title="SPINE ACHE"
          description="Non-surgical options like physical therapy and medications.
          Minimally invasive procedures or surgeries if necessary."
          icon={faTooth}
        />
      </div>
    </div>
  );
}

export default Info;
