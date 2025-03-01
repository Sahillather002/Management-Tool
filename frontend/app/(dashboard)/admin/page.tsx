import UserCard from "@/components/UserCard";
import { candidate_columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Shell } from "@/components/shells/shell";
import { candidatesSchema } from "@/lib/validations/schema";
import { z } from "zod";

async function getTasks() {

  const temp = await fetch(
    "http://127.0.0.1:8000/candidates/"
  );
  if (!temp.ok) {
    throw new Error("Failed to fetch candidates data");
  }
  const tempData = await temp.json();

  const candidates = z.array(candidatesSchema).parse(
    tempData.map((candidate: any) => {
      const id = String(candidate.id);
      const application_date = new Date(candidate.application_date);

      return {
        id,
        name: candidate.name,
        image_url: candidate.image_url,
        rating: candidate.rating ?? 0, 
        stages : candidate.stages,
        applied_role: candidate.applied_role,
        application_date,
        attachments: candidate.attachments || [],
      }
    })
  );

  return candidates;
}

export default async function AdminPage(){
  const candidates = await getTasks();
return (
  <div className="p-4 flex flex-col gap-4 bg-[#151515]">
    <div className="max-h-[500px] flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap">
      <UserCard 
        type="blue" 
        designation="Sr. UX Designer" 
        location="Hyderabad"
        applications={432}
        lastWeekApplications={15}
        experience={3}
        posted={1}
        imageSrc="/designer.png"
      />
      <UserCard 
        type="red" 
        designation="Growth Manager" 
        location="Bengaluru"
        applications={1234}
        lastWeekApplications={25}
        experience={5}
        posted={2}
        imageSrc="/growth.png"
      />
      <UserCard 
        type="yellow" 
        designation="Finance analyst" 
        location="Mumbai"
        applications={567}
        lastWeekApplications={20}
        experience={4}
        posted={5}
        imageSrc="/finance.png"
      />
      <UserCard 
        type="green" 
        designation="Security analyst" 
        location="Pune"
        applications={789}
        lastWeekApplications={10}
        experience={2}
        posted={0}
        imageSrc="/security.png"
      />
    </div>
    <span className="text-3xl font-bold pt-4 text-white">Candidates</span>
    <Shell>
      <div className='flex h-fit mt-[-30px]  rounded-xl text-white bg-[#1E1E1E]'>
        <DataTable data={candidates} columns={candidate_columns} />
      </div>
    </Shell>
  </div>
);
};
