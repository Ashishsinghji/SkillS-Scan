
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getStudentApplications } from "../services/applicationService";

import {
    FaMapMarkerAlt,
    FaBullseye,
    FaCalendarAlt,
    FaThumbtack,
    FaExclamationTriangle,
    FaMicrophone,
    FaClock,
    FaBriefcase,
    FaLaptop,
    FaLink
} from "react-icons/fa";

import "../css/MyApplications.css";


const MyApplications = () => {

    const student = JSON.parse(
        sessionStorage.getItem("currentUser")
    );

    const [applications, setApplications] = useState([]);


    useEffect(() => {

        if (student?.email) {
            loadApplications();
        }

    }, []);


    const loadApplications = async () => {

        try {

            const data = await getStudentApplications(
                student.email
            );

            setApplications(data);

        } catch (error) {

            console.log(
                "Failed to load applications:",
                error
            );

        }

    };


    /*
     * ================================
     * APPLICATION SUMMARY
     * ================================
     *
     * Applied:
     * Any application that has NOT been rejected.
     *
     * This means an application remains
     * "Applied" even after it moves to:
     *
     * Under Review
     * Shortlisted
     * Interview Scheduled
     * Interview Completed
     * Selected
     *
     */

    const appliedCount = applications.filter(
        (app) => app.status !== "Rejected"
    ).length;


    /*
     * Shortlisted:
     *
     * Once a candidate reaches Shortlisted,
     * they remain part of the shortlisted
     * recruitment pipeline.
     */

    const shortlistedStatuses = [
        "Shortlisted",
        "Interview Scheduled",
        "Interview Completed",
        "Selected"
    ];

    const shortlistedCount = applications.filter(
        (app) =>
            shortlistedStatuses.includes(app.status)
    ).length;


    /*
     * Interviews:
     *
     * Count both scheduled and completed interviews.
     */

    const interviewCount = applications.filter(
        (app) =>
            app.status === "Interview Scheduled" ||
            app.status === "Interview Completed"
    ).length;


    const rejectedCount = applications.filter(
        (app) => app.status === "Rejected"
    ).length;


    return (

        <div className="applications-page">

            <Sidebar />


            <div className="applications-content">

                <h1>
                    My Applications
                </h1>


                {/* =========================
                    APPLICATION SUMMARY
                ========================== */}

                <div className="application-summary">

                    <div className="summary-card">

                        <span>
                            Total
                        </span>

                        <strong>
                            {applications.length}
                        </strong>

                    </div>


                    <div className="summary-card applied-summary">

                        <span>
                            Applied
                        </span>

                        <strong>
                            {appliedCount}
                        </strong>

                    </div>


                    <div className="summary-card shortlisted-summary">

                        <span>
                            Shortlisted
                        </span>

                        <strong>
                            {shortlistedCount}
                        </strong>

                    </div>


                    <div className="summary-card rejected-summary">

                        <span>
                            Rejected
                        </span>

                        <strong>
                            {rejectedCount}
                        </strong>

                    </div>


                    <div className="summary-card interview-summary">

                        <span>
                            Interviews
                        </span>

                        <strong>
                            {interviewCount}
                        </strong>

                    </div>

                </div>


                {/* =========================
                    EMPTY STATE
                ========================== */}

                {applications.length === 0 ? (

                    <div className="empty-applications">

                        <h2>
                            No Applications Found
                        </h2>

                        <p>
                            You have not applied for any jobs yet.
                        </p>

                    </div>

                ) : (

                    <div className="applications-grid">

                        {applications.map((application) => {

                            const jobDeleted =
                                !application.jobId;


                            const jobTitle =
                                application.jobTitle ||
                                application.jobId?.jobTitle ||
                                "Job information unavailable";


                            const companyName =
                                application.companyName ||
                                application.jobId?.companyName ||
                                "Company information unavailable";


                            const location =
                                application.location ||
                                application.jobId?.location ||
                                "Location unavailable";


                            const interview =
                                application.interview;


                            const interviewScheduled =
                                application.status ===
                                    "Interview Scheduled" &&
                                interview?.scheduled;


                            return (

                                <div
                                    className="application-card"
                                    key={application._id}
                                >

                                    {/* =========================
                                        JOB INFORMATION
                                    ========================== */}

                                    <h2>
                                        {jobTitle}
                                    </h2>

                                    <h3>
                                        {companyName}
                                    </h3>


                                    <p>

                                        <FaMapMarkerAlt />

                                        {location}

                                    </p>


                                    <p>

                                        <FaBullseye />

                                        ATS Score:{" "}

                                        {application.atsScore ?? 0}%

                                    </p>


                                    <p>

                                        <FaCalendarAlt />

                                        Applied:{" "}

                                        {application.createdAt
                                            ? new Date(
                                                application.createdAt
                                            ).toLocaleDateString()
                                            : "Date unavailable"}

                                    </p>


                                    {/* =========================
                                        CURRENT STATUS
                                    ========================== */}

                                    <p>

                                        <FaThumbtack />

                                        Status:{" "}

                                        <strong>
                                            {application.status ||
                                                "Applied"}
                                        </strong>

                                    </p>


                                    {/* =========================
                                        STATUS INFORMATION
                                    ========================== */}

                                    {application.status ===
                                        "Under Review" && (

                                        <div className="completed-interview-box">

                                            Your application is currently
                                            being reviewed by the recruiter.

                                        </div>

                                    )}


                                    {application.status ===
                                        "Shortlisted" && (

                                        <div className="selected-box">

                                            <strong>
                                                You've Been Shortlisted!
                                            </strong>

                                            <br />

                                            The recruiter has selected
                                            your application for the
                                            interview stage.

                                        </div>

                                    )}


                                    {/* =========================
                                        DELETED JOB
                                    ========================== */}

                                    {jobDeleted &&
                                        application.status !==
                                            "Interview Scheduled" &&
                                        application.status !==
                                            "Interview Completed" && (

                                        <div className="job-unavailable">

                                            <FaExclamationTriangle />

                                            This job is no longer available.

                                        </div>

                                    )}


                                    {/* =========================
                                        INTERVIEW SCHEDULED
                                    ========================== */}

                                    {interviewScheduled && (

                                        <div className="student-interview-box">

                                            <h3>

                                                <FaMicrophone />

                                                Interview Scheduled

                                            </h3>


                                            {/* DATE */}

                                            <div className="interview-detail">

                                                <strong>

                                                    <FaCalendarAlt />

                                                    Date

                                                </strong>


                                                <span>

                                                    {interview.date
                                                        ? new Date(
                                                            interview.date
                                                        ).toLocaleDateString(
                                                            undefined,
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric"
                                                            }
                                                        )
                                                        : "Not available"}

                                                </span>

                                            </div>


                                            {/* TIME */}

                                            <div className="interview-detail">

                                                <strong>

                                                    <FaClock />

                                                    Time

                                                </strong>


                                                <span>

                                                    {interview.time ||
                                                        "Not available"}

                                                </span>

                                            </div>


                                            {/* MODE */}

                                            <div className="interview-detail">

                                                <strong>

                                                    <FaBriefcase />

                                                    Mode

                                                </strong>


                                                <span>

                                                    {interview.mode ||
                                                        "Not available"}

                                                </span>

                                            </div>


                                            {/* ONLINE INTERVIEW */}

                                            {interview.mode ===
                                                "Online" && (

                                                <>

                                                    <div className="interview-detail">

                                                        <strong>

                                                            <FaLaptop />

                                                            Interview Type

                                                        </strong>


                                                        <span>
                                                            Online
                                                        </span>

                                                    </div>


                                                    {interview.meetingLink ? (

                                                        <a
                                                            href={
                                                                interview.meetingLink
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="join-interview-btn"
                                                        >

                                                            <FaLink />

                                                            Join Interview

                                                        </a>

                                                    ) : (

                                                        <p className="meeting-link-missing">

                                                            Meeting link has
                                                            not been provided yet.

                                                        </p>

                                                    )}

                                                </>

                                            )}


                                            {/* OFFLINE INTERVIEW */}

                                            {interview.mode ===
                                                "Offline" && (

                                                <div className="offline-interview">

                                                    <div className="interview-detail">

                                                        <strong>

                                                            <FaMapMarkerAlt />

                                                            Location

                                                        </strong>


                                                        <span>

                                                            {interview.location ||
                                                                "Location not provided"}

                                                        </span>

                                                    </div>


                                                    <p className="offline-note">

                                                        Please arrive a few
                                                        minutes before the
                                                        scheduled interview.

                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    )}


                                    {/* =========================
                                        INTERVIEW COMPLETED
                                    ========================== */}

                                    {application.status ===
                                        "Interview Completed" && (

                                        <div className="completed-interview-box">

                                            <strong>
                                                Interview Completed
                                            </strong>

                                            <br />

                                            Your interview has been completed.
                                            The recruiter will evaluate your
                                            interview and update your application.

                                        </div>

                                    )}


                                    {/* =========================
                                        SELECTED
                                    ========================== */}

                                    {application.status ===
                                        "Selected" && (

                                        <div className="selected-box">

                                            <strong>
                                                Congratulations! 🎉
                                            </strong>

                                            <br />

                                            You have been selected
                                            for this position.

                                        </div>

                                    )}


                                    {/* =========================
                                        REJECTED
                                    ========================== */}

                                    {application.status ===
                                        "Rejected" && (

                                        <div className="rejected-box">

                                            This application was not
                                            selected for the next stage.

                                        </div>

                                    )}

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );

};


export default MyApplications;
