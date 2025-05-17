import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Patient } from "@/lib/types";
import { useLiveQuery } from "@electric-sql/pglite-react";
import { seedFakePatients } from "@/lib/seedData";

export default function Home() {
  const patientsQuery = useLiveQuery<Patient>("select * from patients");
  return (
    <main className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">
            Patient Management System
          </CardTitle>
          <CardDescription>
            Register and manage patient records with client-side SQL database
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => seedFakePatients(10)}>Seed Data</Button>
        </CardFooter>
      </Card>
      <h1>Records</h1>
      {patientsQuery?.rows.map((ele: Patient) => (
        <p key={ele.id}>{JSON.stringify(ele)}</p>
      ))}
    </main>
  );
}
