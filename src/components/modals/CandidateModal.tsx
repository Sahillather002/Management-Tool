import Image from "next/image";
import React, { useState } from "react";

interface CandidateModalProps {
  candidate: any | null;
  onClose: () => void;
}

const applicationStages = [
  { name: "Screening", date: "March 20, 2023" },
  { name: "Design Challenge", date: "March 22, 2023" },
  { name: "Interview" },
  { name: "HR Round" },
  { name: "Hired" },
];

const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  onClose,
}) => {
  const [currentStage, setCurrentStage] = useState(
    candidate ? candidate.stage : applicationStages[0]
  );

  if (!candidate) return null;

  const handleNextStage = () => {
    const currentIndex = applicationStages.findIndex(
      (s) => s.name.toLowerCase() === currentStage?.toLowerCase()
    );
    if (currentIndex < applicationStages.length - 1) {
      setCurrentStage(applicationStages[currentIndex + 1].name);
    }
  };

  const getStageStatus = (stage: string) => {
    const currentIndex = applicationStages.findIndex(
      (s) => s.name.toLowerCase() === currentStage?.toLowerCase()
    );
    const stageIndex = applicationStages.findIndex(
      (s) => s.name.toLowerCase() === stage.toLowerCase()
    );

    if (stageIndex < currentIndex) return "completed";
    if (stageIndex === currentIndex) return "active";
    return "upcoming";
  };

  const handleReject = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/candidates/${candidate.id}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCurrentStage("Rejected");
        alert("Candidate Rejected Successfully");
      } else {
        throw new Error("Failed to Reject Candidate");
      }
    } catch (error) {
      console.error("Error rejecting candidate", error);
      alert("Failed to Reject Candidate");
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-end backdrop-blur-sm  bg-opacity-40"
      style={{ top: "-15px" }}
    >
      {" "}
      <div className="bg-[#151515] rounded-md overflow-y-scroll scrollbar-hide p-5 h-full w-1/3">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Candidate Details</h2>
          <button
            onClick={onClose}
            className="absolute rounded-full h-8 w-8 cursor-pointer bg-[#1E1E1E] p-0 flex items-center justify-center top-6 right-6 text-[#898989]"
          >
            X
          </button>
        </div>

        <div className="flex flex-col bg-[#1E1E1E] rounded-xl my-4 p-4 items-center justify-center">
          <div className="w-20 h-20 overflow-hidden rounded-full flex items-center justify-center">
            <Image
              src={candidate.image_url}
              className="object-cover w-full h-full"
              alt={candidate?.name || ""}
              height={20}
              width={20}
            />
          </div>
          <h2 className="text-xl mt-4 font-semibold">{candidate.name}</h2>
          <h2 className="text-base font-semibold text-[#898989]">
            {candidate.applied_role}
          </h2>
          <div className="flex gap-4 mt-8">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-[#262626] overflow-hidden rounded-full flex items-center justify-center">
                <Image
                  src="/sms.png"
                  className="object-cover "
                  alt={candidate?.name || ""}
                  height={30}
                  width={30}
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[#898989] text-base">EMAIL</span>
                <span className="text-base">{candidate?.name}@gmail.com</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-16 h-16 bg-[#262626] overflow-hidden rounded-full flex items-center justify-center">
                <Image
                  src="/call.png"
                  className="object-cover "
                  alt={candidate?.name || ""}
                  height={30}
                  width={30}
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[#898989] text-l">PHONE NUMBER</span>
                <span>+11 5423-6548</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  bg-[#1E1E1E] rounded-xl my-4 p-4 gap-6">
          <h2 className="text-xl mt-4 font-semibold">Application Details</h2>
          {applicationStages.map((stage, index) => {
            const status = getStageStatus(stage.name);
            return (
              <div key={index} className="flex items-center gap-4 relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${
                  status === "completed"
                    ? "bg-green-500"
                    : status === "active"
                    ? "bg-yellow-500"
                    : "bg-[#262626] text-[#555]"
                }`}
                >
                  {status === "completed" ? (
                    <Image
                      src="/done.png"
                      alt="Completed"
                      width={20}
                      height={20}
                    />
                  ) : status === "active" ? (
                    <Image
                      src="/review.png"
                      alt="Under Review"
                      width={20}
                      height={20}
                      className="object-center"
                    />
                  ) : (
                    index + 1
                  )}
                </div>

                {index !== applicationStages.length - 1 && (
                  <div className="absolute left-5 top-10 w-1 h-12 bg-dotted border-l border-dashed border-[#555]"></div>
                )}

                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      status === "upcoming" ? "text-[#555]" : "text-white"
                    }`}
                  >
                    {stage.name}
                  </h3>
                  {stage.date && (
                    <p className="text-sm text-[#898989]">{stage.date}</p>
                  )}
                </div>

                {status === "active" && (
                  <span className="bg-yellow-700 text-yellow-300 px-3 py-1 rounded-full text-sm">
                    Under Review
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p>Current Stage: {currentStage}</p>
        <p>Applied Role: {candidate.applied_role}</p>
        <p>
          Application Date:{" "}
          {new Date(candidate.application_date).toDateString()}
        </p>
        <h3 className="mt-4 font-semibold">Attachments:</h3>
        <ul>
          {candidate.attachments.map((url: string, index: number) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-items-start gap-4">
          <button
            onClick={handleNextStage}
            disabled={currentStage === "Hired"}
            className="text-white px-4 py-2 cursor-pointer rounded flex flex-row gap-2"
            style={{
              background:
                "linear-gradient(107.3deg, #6E38E0 13.39%, #FF5F36 77.64%)",
            }}
          >
            Move to Next Step
            <Image
              src="/arrow_right.png"
              alt="arrow right"
              height={10}
              width={20}
            />
          </button>
          <button
            onClick={handleReject}
            disabled={currentStage === "Rejected" || currentStage === "Hired"}
            className="text-white px-4 py-2 cursor-pointer rounded"
            style={{
              background:
                "linear-gradient(107.3deg, #38E0AE 13.39%, #AF36FF 77.64%)",
            }}
          >
            Reject
          </button>
          <button
            onClick={handlePrintPDF}
            className=" text-white px-4 py-2 cursor-pointer rounded"
            style={{
              background:
                "linear-gradient(107.3deg, #E03838 13.39%, #FFA836 77.64%)",
            }}
          >
            PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
