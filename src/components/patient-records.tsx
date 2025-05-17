import type { Patient } from "@/lib/types";

import { useLiveQuery } from "@electric-sql/pglite-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PatientRecords() {
  const patientsQuery = useLiveQuery<Patient>("select * from patients");

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          {patientsQuery?.rows && patientsQuery.rows.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Language Preference</TableHead>
                  <TableHead>Emergency Contact</TableHead>
                  <TableHead>Registration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientsQuery?.rows.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      {patient.first_name} {patient.last_name}
                    </TableCell>
                    <TableCell>{patient.date_of_birth}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      {patient.phone}
                      {patient.email ? (
                        <div className="text-xs text-muted-foreground">
                          {patient.email}
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell>{patient.blood_type}</TableCell>
                    <TableCell>{patient.language_preference}</TableCell>
                    <TableCell>{patient.emergency_contact}</TableCell>
                    <TableCell>{patient.registration_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : patientsQuery?.rows && patientsQuery.rows.length === 0 ? (
            <div className="text-center p-8 border rounded-md bg-muted/50 h-[570px]">
              No patients registered yet
            </div>
          ) : (
            <div className="text-center p-8 border rounded-md bg-muted/50 h-[570px]">
              Loading patient records...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
