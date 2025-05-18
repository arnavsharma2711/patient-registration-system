import type { Patient } from "@/lib/types";

import { useState } from "react";

import { useLiveQuery } from "@electric-sql/pglite-react";

import { ITEMS_PER_PAGE } from "@/lib/constants";
import { deletePatient } from "@/lib/db";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function PaginationDemo({
  totalCount,
  currentPage,
  setPage,
}: {
  totalCount: number;
  currentPage: number;
  setPage: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="w-full flex justify-between">
        <PaginationItem
          onClick={() => handlePageClick(currentPage - 1)}
          className={
            currentPage === 1
              ? "text-muted-foreground pointer-events-none"
              : "hover:cursor-pointer"
          }
        >
          <PaginationPrevious />
        </PaginationItem>
        <div className="flex flex-row gap-2">
          {visiblePages.map((page) =>
            page === "..." ? (
              <PaginationItem key={`ellipsis-${page}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page} className="hover:cursor-pointer">
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageClick(currentPage + 1)}
            className={
              currentPage === totalPages
                ? "text-muted-foreground  pointer-events-none"
                : "hover:cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  if (current > 0) pages.push(1);
  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");
  if (current < total + 1) pages.push(total);

  return pages;
}

export default function PatientRecords() {
  const [page, setPage] = useState(1);

  const patientsQuery = useLiveQuery<Patient>(
    `select * from patients limit 10 offset ${10 * (page - 1)};`
  );
  const patientsCountQuery = useLiveQuery("select count(*) from patients;");
  const totalCount = patientsCountQuery?.rows[0].count;

  const handleDeletePatient = async (id?: number) => {
    if (id === undefined) return;
    try {
      await deletePatient(id);
      localStorage.setItem("patient_db_updated", Date.now().toString());
      toast.info("Patient Deleted", {
        description: "Patient record has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Deletion Failed", {
        description: "There was an error deleting the patient record.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto md:min-h-[590px]">
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
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientsQuery?.rows.map((patient) => (
                  <TableRow key={patient.id} className="h-[55px]">
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
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Patient Record
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              {patient.first_name} {patient.last_name}&apos;s
                              record? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletePatient(patient.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : patientsQuery?.rows && patientsQuery.rows.length === 0 ? (
            <div className="text-center p-8 border rounded-md bg-muted/50 md:h-[590px]">
              No patients registered yet
            </div>
          ) : (
            <div className="text-center p-8 border rounded-md bg-muted/50 md:h-[590px]">
              Loading patient records...
            </div>
          )}
        </div>
      </div>

      <PaginationDemo
        totalCount={Number(totalCount)}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
}
