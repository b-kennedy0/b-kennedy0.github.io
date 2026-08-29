import assert from "node:assert/strict";
import test from "node:test";
import {
  buildMetrics,
  getWeekStartDateString,
  validateListMap,
} from "./trello-metrics.mjs";

function list(id, name, cards = []) {
  return { id, name, closed: false, cards };
}

function card(id, closed = false) {
  return { id, name: `Card ${id}`, closed };
}

function moveAction(id, date, listAfterId = "done") {
  return {
    id,
    date,
    type: "updateCard",
    data: {
      old: { idList: "todo" },
      listAfter: { id: listAfterId, name: "Done" },
      card: { id: `card-${id}`, name: `Completed ${id}`, shortLink: id },
    },
  };
}

const lists = [
  list("triage", "Triage", [card("a"), card("b", true)]),
  list("ordered", "To Do - Ordered", [card("c"), card("d")]),
  list("today", "Today", [card("e")]),
  list("progress", "In Progress", [card("f"), card("g")]),
  list("blocked", "Waiting/Blocked/Repeat", [card("h")]),
  list("done", "Done", []),
];

test("builds dashboard counts from cards and Done move actions", () => {
  const generatedAt = new Date("2026-08-28T12:00:00.000Z");
  const metrics = buildMetrics({
    lists,
    generatedAt,
    timeZone: "Europe/London",
    actions: [
      moveAction("today", "2026-08-28T08:30:00.000Z"),
      moveAction("week", "2026-08-25T14:00:00.000Z"),
      moveAction("old", "2026-08-17T14:00:00.000Z"),
      moveAction("other-list", "2026-08-28T09:30:00.000Z", "progress"),
    ],
  });

  assert.equal(metrics.counts.completedToday, 1);
  assert.equal(metrics.counts.completedThisWeek, 2);
  assert.equal(metrics.counts.triage, 1);
  assert.equal(metrics.counts.pending, 3);
  assert.equal(metrics.counts.inProgress, 2);
  assert.equal(metrics.counts.blockedWaiting, 1);
  assert.equal(metrics.period.weekStart, "2026-08-24");
  assert.equal(metrics.period.weekEnd, "2026-08-30");
  assert.deepEqual(
    metrics.trends.completedByDay.map((day) => [day.label, day.date, day.count]),
    [
      ["Mon", "2026-08-24", 0],
      ["Tue", "2026-08-25", 1],
      ["Wed", "2026-08-26", 0],
      ["Thu", "2026-08-27", 0],
      ["Fri", "2026-08-28", 1],
    ],
  );
});

test("uses Monday as the start of the week", () => {
  assert.equal(
    getWeekStartDateString(new Date("2026-08-30T12:00:00.000Z"), "Europe/London"),
    "2026-08-24",
  );
  assert.equal(
    getWeekStartDateString(new Date("2026-08-31T12:00:00.000Z"), "Europe/London"),
    "2026-08-31",
  );
});

test("fails when required list names are missing or duplicated", () => {
  assert.throws(
    () => validateListMap([...lists, list("done2", "Done")]),
    /duplicated: Done/,
  );
  assert.throws(
    () => validateListMap(lists.filter((item) => item.name !== "Triage")),
    /missing: Triage/,
  );
});
