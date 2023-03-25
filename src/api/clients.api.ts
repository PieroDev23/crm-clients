import { FormDataEntryValues } from "../interfaces/newClient.interfaces";
import { IClient } from "./../interfaces/index.interfaces.d";
const url = import.meta.env.VITE_API_URL;

export async function getClients(): Promise<Array<IClient>> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getClient(id: string): Promise<IClient> {
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return data;
}

export async function addClient(client: FormDataEntryValues) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
  } catch (err) {
    console.error(err);
  }
}

export async function updateClient(id: string, client: FormDataEntryValues) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.json();
  } catch (err) {
    console.error(err);
  }
}

export async function deleteClient(id: string) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    await response.json();
  } catch (err) {
    console.error(err);
  }
}
