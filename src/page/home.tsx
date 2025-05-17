import { useState } from "react";

import { useLiveQuery } from "@electric-sql/pglite-react";

import type { Patient } from "@/lib/types";
import { seedFakePatients } from "@/lib/seedData";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PatientRegistrationForm from "@/components/patient-registration-form";

export default function Home() {
  const [activeTab, setActiveTab] = useState("register");

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="register">Register Patient</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Patient Registration</CardTitle>
              <CardDescription>
                Enter patient details to register a new patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientRegistrationForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <h1>Records</h1>
      {patientsQuery?.rows.map((ele: Patient) => (
        <p key={ele.id}>{JSON.stringify(ele)}</p>
      ))}
    </main>
  );
}
