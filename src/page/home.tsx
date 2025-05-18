import { useState } from "react";

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
import PatientRecords from "@/components/patient-records";
import SqlQueryInterface from "@/components/sql-query-interface";
import Dashboard from "@/components/dashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <main className="container mx-auto py-8 px-4">
      <Card className="mb-4">
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
        <TabsList className="flex justify-start w-full overflow-auto no-scrollbar">
          <div className="w-full flex flex-row gap-1">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="register">Register Patient</TabsTrigger>
            <TabsTrigger value="records">Patient Records</TabsTrigger>
            <TabsTrigger value="query">SQL Query</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                View patient statistics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dashboard />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Patient Registration</CardTitle>
              <CardDescription>
                Enter patient details to register a new patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientRegistrationForm
                onRegistered={() => setActiveTab("records")}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>
                View and manage all registered patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientRecords />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="query">
          <Card>
            <CardHeader>
              <CardTitle>SQL Query Interface</CardTitle>
              <CardDescription>
                Run custom SQL queries on patient data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SqlQueryInterface />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
