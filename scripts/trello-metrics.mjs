const REQUIRED_LISTS = [
  "Triage",
  "To Do - Ordered",
  "Today",
  "In Progress",
  "Waiting/Blocked/Repeat",
  "Done",
];

const OUTPUT_VERSION = 3;
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const FORWARD_LIST_ORDER = [
  "Triage",
  "To Do - Ordered",
  "Today",
  "In Progress",
  "Done",
];

export function getLocalParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
}

export function getLocalDateString(date, timeZone) {
  const parts = getLocalParts(date, timeZone);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function addDaysToLocalDate(localDate, days) {
  const [year, month, day] = localDate.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0));
  return utcNoon.toISOString().slice(0, 10);
}

export function getWeekStartDateString(date, timeZone) {
  const localDate = getLocalDateString(date, timeZone);
  const [year, month, day] = localDate.split("-").map(Number);
  const localNoon = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeek = localNoon.getUTCDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  return addDaysToLocalDate(localDate, -daysSinceMonday);
}

export function getMonthStartDateString(date, timeZone) {
  const parts = getLocalParts(date, timeZone);
  return `${parts.year}-${parts.month}-01`;
}

export function validateListMap(lists, requiredNames = REQUIRED_LISTS) {
  const byName = new Map();

  for (const list of lists) {
    if (!byName.has(list.name)) {
      byName.set(list.name, []);
    }
    byName.get(list.name).push(list);
  }

  const missing = requiredNames.filter((name) => !byName.has(name));
  const duplicated = requiredNames.filter((name) => (byName.get(name) || []).length > 1);

  if (missing.length || duplicated.length) {
    const parts = [];
    if (missing.length) {
      parts.push(`missing: ${missing.join(", ")}`);
    }
    if (duplicated.length) {
      parts.push(`duplicated: ${duplicated.join(", ")}`);
    }
    throw new Error(`Trello list name check failed (${parts.join("; ")}).`);
  }

  return Object.fromEntries(requiredNames.map((name) => [name, byName.get(name)[0]]));
}

function cardsForList(list) {
  return (list.cards || []).filter((card) => !card.closed);
}

function isMoveToListAction(action, listId) {
  return (
    action?.type === "updateCard" &&
    action?.data?.old?.idList &&
    action?.data?.listAfter?.id === listId
  );
}

function isMoveAction(action) {
  return action?.type === "updateCard" && action?.data?.old?.idList && action?.data?.listAfter?.id;
}

function actionLocalDate(action, timeZone) {
  return getLocalDateString(new Date(action.date), timeZone);
}

function actionsInRange(actions, startDate, endDate) {
  return actions.filter((action) => action.localDate >= startDate && action.localDate <= endDate);
}

function adjustedCount(count, offset) {
  return Math.max(0, count - offset);
}

function getMonthDayLabel(localDate) {
  return String(Number(localDate.slice(8, 10)));
}

export function buildMetrics({ lists, actions, generatedAt = new Date(), timeZone = "Europe/London" }) {
  const listMap = validateListMap(lists);
  const today = getLocalDateString(generatedAt, timeZone);
  const weekStart = getWeekStartDateString(generatedAt, timeZone);
  const monthStart = getMonthStartDateString(generatedAt, timeZone);
  const doneListId = listMap.Done.id;
  const triageListId = listMap.Triage.id;
  const rankByListId = new Map(
    FORWARD_LIST_ORDER.map((name, index) => [listMap[name].id, index]),
  );

  const doneActions = actions
    .filter((action) => isMoveToListAction(action, doneListId))
    .map((action) => ({
      localDate: actionLocalDate(action, timeZone),
    }));
  const forwardActions = actions
    .filter((action) => {
      if (!isMoveAction(action) || action.data.listAfter.id === doneListId) return false;
      const oldRank = rankByListId.get(action.data.old.idList);
      const newRank = rankByListId.get(action.data.listAfter.id);
      return oldRank !== undefined && newRank !== undefined && newRank > oldRank;
    })
    .map((action) => ({
      localDate: actionLocalDate(action, timeZone),
    }));
  const triageClearedActions = actions
    .filter((action) => isMoveAction(action) && action.data.old.idList === triageListId)
    .map((action) => ({
      localDate: actionLocalDate(action, timeZone),
    }));

  const completedTodayActions = doneActions.filter((action) => action.localDate === today);
  const completedThisWeekActions = actionsInRange(doneActions, weekStart, today);
  const completedThisMonthActions = actionsInRange(doneActions, monthStart, today);
  const movedForwardThisWeekActions = actionsInRange(forwardActions, weekStart, today);
  const movedForwardThisMonthActions = actionsInRange(forwardActions, monthStart, today);
  const triageClearedThisWeekActions = actionsInRange(triageClearedActions, weekStart, today);
  const triageClearedThisMonthActions = actionsInRange(triageClearedActions, monthStart, today);
  const completedByDay = Array.from({ length: 5 }, (_, index) => {
    const date = addDaysToLocalDate(weekStart, index);
    return {
      date,
      label: WEEKDAY_LABELS[index],
      count: completedThisWeekActions.filter((action) => action.localDate === date).length,
    };
  });
  const completedByMonthDay = [];
  for (let date = monthStart; date <= today; date = addDaysToLocalDate(date, 1)) {
    completedByMonthDay.push({
      date,
      label: getMonthDayLabel(date),
      count: completedThisMonthActions.filter((action) => action.localDate === date).length,
    });
  }
  const counts = {
    completedToday: completedTodayActions.length,
    completedThisWeek: completedThisWeekActions.length,
    completedThisMonth: completedThisMonthActions.length,
    movedForwardThisWeek: movedForwardThisWeekActions.length,
    movedForwardThisMonth: movedForwardThisMonthActions.length,
    triageClearedThisWeek: triageClearedThisWeekActions.length,
    triageClearedThisMonth: triageClearedThisMonthActions.length,
    triage: cardsForList(listMap.Triage).length,
    pending: adjustedCount(
      cardsForList(listMap["To Do - Ordered"]).length +
      cardsForList(listMap.Today).length,
      3,
    ),
    inProgress: adjustedCount(cardsForList(listMap["In Progress"]).length, 2),
    blockedWaiting: cardsForList(listMap["Waiting/Blocked/Repeat"]).length,
  };

  return {
    version: OUTPUT_VERSION,
    generatedAt: generatedAt.toISOString(),
    timeZone,
    period: {
      today,
      weekStartsOn: "Monday",
      weekStart,
      weekEnd: addDaysToLocalDate(weekStart, 6),
      monthStart,
    },
    counts,
    trends: {
      completedByDay,
      completedByMonthDay,
    },
    lists: {
      triage: listSummary(listMap.Triage),
      toDoOrdered: listSummary(listMap["To Do - Ordered"]),
      today: listSummary(listMap.Today),
      inProgress: listSummary(listMap["In Progress"]),
      blockedWaiting: listSummary(listMap["Waiting/Blocked/Repeat"]),
      done: listSummary(listMap.Done),
    },
  };
}

function listSummary(list) {
  return {
    name: list.name,
    openCards: cardsForList(list).length,
  };
}

export async function fetchTrelloMetrics({ key, token, boardId, timeZone }) {
  if (!key || !token || !boardId) {
    throw new Error("TRELLO_KEY, TRELLO_TOKEN, and TRELLO_BOARD_ID are required.");
  }

  const auth = new URLSearchParams({ key, token });
  const boardBase = `https://api.trello.com/1/boards/${encodeURIComponent(boardId)}`;

  const listsUrl = new URL(`${boardBase}/lists`);
  listsUrl.search = new URLSearchParams({
    ...Object.fromEntries(auth),
    fields: "id,name,closed",
    filter: "open",
    cards: "open",
    card_fields: "id,name,idList,closed,url,shortLink",
  });

  const since = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString();
  const actionsUrl = new URL(`${boardBase}/actions`);
  actionsUrl.search = new URLSearchParams({
    ...Object.fromEntries(auth),
    filter: "updateCard:idList",
    fields: "id,date,type,data",
    limit: "1000",
    since,
  });

  const [listsResponse, actionsResponse] = await Promise.all([
    fetch(listsUrl),
    fetch(actionsUrl),
  ]);

  if (!listsResponse.ok) {
    throw new Error(`Trello lists request failed: ${listsResponse.status} ${listsResponse.statusText}`);
  }
  if (!actionsResponse.ok) {
    throw new Error(`Trello actions request failed: ${actionsResponse.status} ${actionsResponse.statusText}`);
  }

  const [lists, actions] = await Promise.all([
    listsResponse.json(),
    actionsResponse.json(),
  ]);

  return buildMetrics({ lists, actions, generatedAt: new Date(), timeZone });
}

export const requiredLists = REQUIRED_LISTS;
