import { User } from "@/payload-types";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getPayload } from "@/app/_authkit/services/payload";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  const payload = await getPayload();
  const result = await payload.find({
    collection: "users",
    depth: 2,
  });

  if (!result.totalDocs) {
    return [];
  }

  return result.docs;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
