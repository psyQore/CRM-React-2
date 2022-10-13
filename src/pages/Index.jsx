import { useLoaderData } from "react-router-dom";
import { getClients } from "../data/clients";
import Client from "../components/Client";

export function loader() {
  const clients = getClients();

  return clients;
}

const index = () => {
  const clients = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Clientes</h1>
      <p className="mt-3">Administra tus Clientes</p>

      {clients.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clientes</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <Client key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="textr-center mt-10">No Hay Clientes Aún</p>
      )}
    </>
  );
};

export default index;
