import { useState } from "react";

import { DEFAULT_SQL_QUERIES, DEFAULT_SQL_QUERY } from "@/lib/constants";
import { triggerDownloadFile } from "@/lib/utils";
import { executeQuery } from "@/lib/db";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy, MousePointerClick, Play, Save } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";

export default function SqlQueryInterface() {
  const [query, setQuery] = useState(DEFAULT_SQL_QUERY);
  const [queryResult, setQueryResult] = useState<unknown[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showQueries, setShowQueries] = useState(false);
  const [queryName, setQueryName] = useState("");
  const [storedQueries, setStoredQueries] = useState<
    { name: string; query: string }[]
  >(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("userQueries");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleExecuteQuery = async () => {
    if (!query.trim()) {
      toast.error(
        <span className="flex flex-col">
          <span className="font-bold">Empty Query</span>
          <span>Please enter a SQL query to execute.</span>
        </span>
      );
      return;
    }

    setIsExecuting(true);
    setError(null);
    setQueryResult(null);

    try {
      const result = await executeQuery(query);
      console.log(result);
      if (result.rows.length > 0) {
        setColumns(result.fields.map((field) => field.name));
        setQueryResult(result.rows);
        toast.success("Query Executed", {
          description: "The query executed successfully.",
        });
      } else {
        setColumns([]);
        setQueryResult([]);
        toast.info("Query Executed", {
          description:
            "The query executed successfully but returned no results.",
        });
      }
    } catch (err) {
      console.error("Query execution error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while executing the query."
      );
      toast.error("Query Error", {
        description:
          err instanceof Error
            ? err.message
            : "An error occurred while executing the query.",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSaveQuery = () => {
    if (!queryName.trim() || !query.trim()) {
      toast.error("Invalid input", {
        description: "Query name and content must not be empty.",
      });
      return;
    }

    setIsSaving(true);

    const updated = [...storedQueries, { name: queryName, query }];
    setStoredQueries(updated);
    localStorage.setItem("userQueries", JSON.stringify(updated));
    toast.success("Saved", {
      description: `Query "${queryName}" saved to local storage.`,
    });

    setQueryName("");
    setIsSaving(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied", { description: "Query copied to clipboard" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="query" className="text-sm font-medium">
            SQL Query
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8"
          >
            {copied ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="relative">
          <Textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="font-mono min-h-[120px] resize-y"
            placeholder="Enter your SQL query here..."
          />
        </div>
        <div className="flex w-full justify-end gap-4">
          <Input
            placeholder="Query Label"
            value={queryName}
            onChange={(e) => setQueryName(e.target.value)}
          />
          <Button
            onClick={handleSaveQuery}
            disabled={isSaving}
            variant={"outline"}
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save Query"}
          </Button>
          <Button onClick={handleExecuteQuery} disabled={isExecuting}>
            <Play className="size-4" />
            {isExecuting ? "Executing..." : "Execute Query"}
          </Button>
        </div>
      </div>

      <div>
        <Toggle
          onClick={() => setShowQueries(!showQueries)}
          className="mb-4 cursor-pointer"
        >
          Saved Queries
          <MousePointerClick />
        </Toggle>
        {showQueries && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {[...DEFAULT_SQL_QUERIES, ...storedQueries].map((example) => (
              <Button
                key={example.name}
                variant="outline"
                className="justify-start h-auto py-2 px-3 text-left"
                onClick={() => setQuery(example.query.trim())}
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium">{example.name}</span>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <div className="text-destructive font-mono text-sm whitespace-pre-wrap">
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {queryResult && (
        <div className="rounded-md border overflow-hidden p-4">
          <div className="flex flex-row gap-4 pb-4 justify-between">
            <Label>Query Data</Label>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  triggerDownloadFile({
                    fileType: "CSV",
                    data: queryResult,
                    columns,
                  })
                }
              >
                Export CSV
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  triggerDownloadFile({
                    fileType: "JSON",
                    data: queryResult,
                    columns,
                  })
                }
              >
                Export JSON
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {queryResult.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Query executed successfully. No results to display.
              </div>
            ) : (
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column}>{column}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queryResult.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((column) => (
                        <TableCell key={`${column}-${rowIndex}`}>
                          {String((row as Record<string, unknown>)[column])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
