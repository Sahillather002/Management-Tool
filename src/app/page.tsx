import { candidate_columns } from "../components/data-table/columns";
import dynamic from "next/dynamic"; // Import dynamic
import { Shell } from "../components/shells/shell";
import { candidatesSchema } from "../lib/validations/schema";
import { z } from "zod";

export const runtime = 'edge';

// Fetch candidates
async function getTasks() {
  const response = await fetch("http://127.0.0.1:8000/candidates/");
  if (!response.ok) {
    throw new Error("Failed to fetch candidates data");
  }
  
  const tempData = await response.json();

  // Validate and parse data
  const candidates = z.array(candidatesSchema).parse(
    tempData.map((candidate: any) => {
      const id = String(candidate.id);
      const application_date = new Date(candidate.application_date).toISOString(); // Convert to ISO string for consistency

      return {
        id,
        name: candidate.name,
        image_url: candidate.image_url,
        rating: candidate.rating ?? 0,
        stages: candidate.stages,
        applied_role: candidate.applied_role,
        application_date,
        attachments: candidate.attachments || [],
      }
    })
  );

  return { candidates };
}

// Dynamically import DataTable
const DataTable = dynamic(() => import("../components/data-table/data-table"), {
  ssr: false,
});

export default async function TaskPage() {
  const { candidates } = await getTasks();

  return (
    <Shell>
      <div className='flex h-full min-h-screen w-full flex-col text-white bg-[#1E1E1E]'>
        <DataTable data={candidates} columns={candidate_columns} />
      </div>
    </Shell>
  );
}