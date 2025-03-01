import { candidate_columns, columns } from "../components/data-table/columns";
import { DataTable } from "../components/data-table/data-table";
import { Shell } from "../components/shells/shell";
import { taskSchema, candidatesSchema } from "../lib/validations/schema";
import { z } from "zod";

export const runtime = 'edge';

async function getTasks() {
  const res = await fetch(
    "https://my.api.mockaroo.com/tasks.json?key=f0933e60"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch tasks data");
  }
  const data = await res.json();

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

  console.log(candidates);

  const tasks = z.array(taskSchema).parse(
    data.map((task: any) => {
      task.due_date = new Date(Date.parse(task.due_date));
      return task;
    })
  );

  return { tasks, candidates };
}

export default async function TaskPage() {
  const { tasks, candidates } = await getTasks();

  return (
    <Shell>
      <div className='flex h-full min-h-screen w-full flex-col text-white bg-[#1E1E1E]'>
        <DataTable data={candidates} columns={candidate_columns} />
      </div>
    </Shell>
  );
}