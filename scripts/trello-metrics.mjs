const REQUIRED_LISTS = [
  "Triage",
  "To Do - Ordered",
  "Today",
  "In Progress",
  "Waiting/Blocked/Repeat",
  "DONE",
];

const OUTPUT_VERSION = 1;

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

export function buildMetrics({ lists, actions, generatedAt = new Date(), timeZone = "Europe/London" }) {
  const listMap = validateListMap(lists);
  const today = getLocalDateString(generatedAt, timeZone);
  const weekStart = getWeekStartDateString(generatedAt, timeZone);
  const doneListId = listMap.DONE.id;

  const doneActions = actions
    .filter((action) => isMoveToListAction(action, doneListId))
    .map((action) => ({
      id: action.id,
      date: action.date,
      localDate: getLocalDateString(new Date(action.date), timeZone),
      card: {
        id: action.data?.card?.id,
        name: action.data?.card?.name,
        shortLink: action.data?.card?.shortLink,
      },
    }));

  const completedTodayActions = doneActions.filter((action) => action.localDate === today);
  const completedThisWeekActions = doneActions.filter(
    (action) => action.localDate >= weekStart && action.localDate <= today,
  );
  const completedByDay = Array.from({ length: 5 }, (_, index) => {
    const date = addDaysToLocalDate(weekStart, index);
    return {
      date,
      label: ["Mon", "Tue", "Wed", "Thu", "Fri"][index],
      count: completedThisWeekActions.filter((action) => action.localDate === date).length,
    };
  });

  const counts = {
    completedToday: completedTodayActions.length,
    completedThisWeek: completedThisWeekActions.length,
    triage: cardsForList(listMap.Triage).length,
    pending:
      cardsForList(listMap["To Do - Ordered"]).length +
      cardsForList(listMap.Today).length,
    inProgress: cardsForList(listMap["In Progress"]).length,
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
    },
    counts,
    trends: {
      completedByDay,
    },
    lists: {
      triage: listSummary(listMap.Triage),
      toDoOrdered: listSummary(listMap["To Do - Ordered"]),
      today: listSummary(listMap.Today),
      inProgress: listSummary(listMap["In Progress"]),
      blockedWaiting: listSummary(listMap["Waiting/Blocked/Repeat"]),
      done: listSummary(listMap.DONE),
    },
    audit: {
      completedTodayActions,
      completedThisWeekActions,
    },
  };
}

function listSummary(list) {
  return {
    id: list.id,
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

  const since = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString();
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
