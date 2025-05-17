import { PGliteProvider } from "@electric-sql/pglite-react";
import db from "./lib/db";
import Home from "@/page/home";

export default function App() {
  return (
    <PGliteProvider db={db}>
      <Home />
    </PGliteProvider>
  );
}
