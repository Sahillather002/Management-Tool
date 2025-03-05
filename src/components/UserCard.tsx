import Image from "next/image";
import clsx from "clsx";

interface UserCardProps {
  type: string;
  designation: string;
  location: string;
  applications: number;
  lastWeekApplications: number;
  experience: number;
  posted: number;
  imageSrc: string;
}

const UserCard = ({
  type,
  designation,
  location,
  applications,
  lastWeekApplications,
  experience,
  posted,
  imageSrc
}: UserCardProps) => {
  const gradientBg = clsx({
    "relative before:absolute before:w-[200px] before:h-[200px] before:bg-[radial-gradient(circle,_rgba(41,197,238,0.3),_transparent)] before:top-0 before:right-0 before:rounded-full before:translate-x-1/2 before:-translate-y-1/2 before:opacity-50 before:blur-xl backdrop-blur-lg border-blue-400 before:overflow-hidden":
      type === "blue", // Blue
    "relative before:absolute before:w-[200px] before:h-[200px] before:bg-[radial-gradient(circle,_rgba(255,0,0,0.3),_transparent)] before:top-0 before:right-0 before:rounded-full before:translate-x-1/2 before:-translate-y-1/2 before:opacity-50 before:blur-xl backdrop-blur-lg border-red-500 before:overflow-hidden":
      type === "red", // Red
    "relative before:absolute before:w-[200px] before:h-[200px] before:bg-[radial-gradient(circle,_rgba(255,255,0,0.3),_transparent)] before:top-0 before:right-0 before:rounded-full before:translate-x-1/2 before:-translate-y-1/2 before:opacity-50 before:blur-xl backdrop-blur-lg border-yellow-400 before:overflow-hidden":
      type === "yellow", // Yellow
    "relative before:absolute before:w-[200px] before:h-[200px] before:bg-[radial-gradient(circle,_rgba(0,128,0,0.3),_transparent)] before:top-0 before:right-0 before:rounded-full before:translate-x-1/2 before:-translate-y-1/2 before:opacity-50 before:blur-xl backdrop-blur-lg border-green-500 before:overflow-hidden":
      type === "green", // Green
  });

  return (
    <div
      className={`rounded-3xl p-4 w-[400px] flex-shrink-0 text-white border-l-4 overflow-hidden ${gradientBg}`}
    >
      <div className="flex justify-between items-center">
        <Image src={imageSrc} alt="" width={60} height={60} />
        <div className="flex justify-center flex-col">
          <span className="text-[21px] text-white">{designation}</span>
          <span className="text-[14px] text-gray-500">Posted {posted} days ago</span>
        </div>
        <Image src="/navigate.png" alt="" width={40} height={40} />
      </div>
      <div className="flex gap-4 pt-4">
        <div className="bg-[#282828] rounded-full p-2 flex gap-2 ">
          <Image src="/location.png" alt="" width={20} height={20} />
          <span className="text-[13px] text-[#898989]">{location}</span>
        </div>
        <div className="bg-[#282828] rounded-full p-2 flex gap-2">
          <Image src="/experience.png" alt="" width={20} height={20} />
          <span className="text-[13px] text-[#898989]">{experience} years</span>
        </div>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex items-baseline gap-2">
          <h1 className="text-4xl font-semibold my-4">{applications}</h1>
          <h2 className="capitalize text-sm font-medium text-[#898989]">{type}</h2>
        </div>
        <div>
          <span className="text-green-400 text-[16px]">{lastWeekApplications} in last week</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;