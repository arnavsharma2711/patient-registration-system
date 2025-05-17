import { PGliteProvider } from "@electric-sql/pglite-react";

import db from "@/lib/db";
import Home from "@/page/home";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <PGliteProvider db={db}>
      <Toaster />
      <Home />
    </PGliteProvider>
  );
}
