import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { worker } from "@electric-sql/pglite/worker";

worker({
  async init(options) {
    return new PGlite({
      dataDir: options.dataDir,
      extensions: { live },
    });
  },
});
