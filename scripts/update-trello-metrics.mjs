import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fetchTrelloMetrics } from "./trello-metrics.mjs";

const outputPath = resolve(process.argv[2] || "data/trello-metrics.json");
const timeZone = process.env.TRELLO_DASHBOARD_TIMEZONE || "Europe/London";

try {
  const metrics = await fetchTrelloMetrics({
    key: process.env.TRELLO_KEY,
    token: process.env.TRELLO_TOKEN,
    boardId: process.env.TRELLO_BOARD_ID,
    timeZone,
  });

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(metrics, null, 2)}\n`);
  console.log(`Wrote Trello metrics to ${outputPath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
