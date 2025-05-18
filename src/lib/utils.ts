import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function downloadCSV({
  data,
  columns,
}: {
  data: unknown[];
  columns: string[];
}) {
  const csvRows = [
    columns.join(","),
    ...data.map((row) =>
      columns
        .map((col) => {
          const cell = (row as Record<string, unknown>)[col];
          if (cell === null || cell === undefined) return "";
          const escaped = String(cell).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "query-results.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJSON({ data }: { data: unknown[] }) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "query-results.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function triggerDownloadFile({
  fileType,
  data,
  columns,
}: {
  fileType: string;
  data: unknown[];
  columns: string[];
}) {
  try {
    switch (fileType) {
      case "CSV":
        downloadCSV({ data, columns });
        toast.success("Download Started", {
          description: "Your CSV file is being downloaded.",
        });
        break;

      case "JSON":
        downloadJSON({ data });
        toast.success("Download Started", {
          description: "Your JSON file is being downloaded.",
        });
        break;

      default:
        toast.error("Invalid File Type", {
          description: "The selected file type is not supported for download.",
        });
        return;
    }
  } catch {
    toast.error("Download Failed", {
      description: "An error occurred while downloading the file.",
    });
  }
}
