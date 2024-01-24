import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/AppointmentForm.css";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [chiefComplaints, setChiefComplaints] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [patientAge, setPatientAge] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }
    if (!patientAge || patientAge <= 0) {
      errors.patientAge = "Please enter a valid age";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setChiefComplaints("");
    setPreviousExperience("");
    setPatientAge(0);
    setFormErrors({});

    toast.success("Appointment Scheduled!", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  return (
    <div className="appointment-form-section">
      <h1 className="legal-siteTitle">
        <Link to="/">
          FIX <span className="legal-siteSign">health</span>
        </Link>
      </h1>

      <div className="form-container">
        <h2 className="form-title">
          <span>Book Appointment Online</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label className="form-label">
            Patient Full Name:
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="form-input"
              required
            />
            {formErrors.patientName && (
              <p className="error-message">{formErrors.patientName}</p>
            )}
          </label>

          <br />
          <label className="form-label">
            Patient Phone Number:
            <input
              type="text"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              className="form-input"
              required
            />
            {formErrors.patientNumber && (
              <p className="error-message">{formErrors.patientNumber}</p>
            )}
          </label>

          <br />
          <label className="form-label">
            Patient Gender:
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              className="form-select"
              required
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">I will inform Doctor only</option>
            </select>
            {formErrors.patientGender && (
              <p className="error-message">{formErrors.patientGender}</p>
            )}
          </label>

          <br />
          <label className="form-label">
            Patient Age:
            <input
              type="number"
              value={patientAge}
              onChange={(e) => setPatientAge(Number(e.target.value))}
              className="form-input"
              required
            />
            {formErrors.patientAge && (
              <p className="error-message">{formErrors.patientAge}</p>
            )}
          </label>

          <br />
          <label className="form-label">
            Preferred Appointment Time:
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="form-input"
              required
            />
            {formErrors.appointmentTime && (
              <p className="error-message">{formErrors.appointmentTime}</p>
            )}
          </label>

          <br />
          <label className="form-label">
            Preferred Mode:
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              className="form-select"
              required
            >
              <option value="default">Select</option>
              <option value="voice">Voice Call</option>
              <option value="video">Video Call</option>
              <option value="video">Offline Consultation</option>
            </select>
            {formErrors.preferredMode && (
              <p className="error-message">{formErrors.preferredMode}</p>
            )}
          </label>

          <br />
          <label className="form-label">
            Chief Complaints:
            <textarea
              value={chiefComplaints}
              onChange={(e) => setChiefComplaints(e.target.value)}
              rows="4"
              cols="50"
              className="form-textarea"
            />
          </label>

          {patientAge > 45 && (
            <label className="form-label">
              Previous Experience with Physiotherapy:
              <textarea
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                rows="4"
                cols="50"
                className="form-textarea"
              />
            </label>
          )}

          <br />
          <button type="submit" className="text-appointment-btn">
            Confirm Appointment
          </button>

          <p
            className="success-message"
            style={{ display: isSubmitted ? "block" : "none" }}
          >
            Appointment details have been sent to the patient's phone number via
            SMS.
          </p>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2013-2023 fixhealth. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;
