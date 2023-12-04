import { InterfaceLifeco } from "../src/models/lifeco";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchLifecos(): Promise<InterfaceLifeco[]> {
  const response = await fetchData("/api/lifecos", { method: "GET" });
  return response.json();
}

export async function createLifeco(
  lifeco: InterfaceLifeco
): Promise<InterfaceLifeco> {
  const response = await fetchData("/api/lifecos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lifeco),
  });
  return response.json();
}

export async function updateLifeco(
  lifecoId: string,
  lifeco: InterfaceLifeco
): Promise<InterfaceLifeco> {
  const response = await fetchData("/api/lifecos/" + lifecoId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lifeco),
  });
  return response.json();
}

export async function deleteLifeco(lifecoId: string) {
  await fetchData("/api/lifecos/" + lifecoId, { method: "DELETE" });
}
