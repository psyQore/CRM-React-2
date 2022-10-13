export async function getClients() {
  const url = "http://localhost:3000/clients";

  const response = await fetch(import.meta.env.VITE_API_URL);
  const result = await response.json();
  return result;
}
