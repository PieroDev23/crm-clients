import { useLoaderData } from "react-router-dom";
import { IClient } from "../../interfaces/index.interfaces";

import Client from "../../components/Client/Client";
import { getClients } from "../../api/clients.api";

export function loader(): Promise<Array<IClient>> {
  const clients = getClients();
  return clients || []
}

function Index() {
  const clients = useLoaderData() as Array<IClient>;

  return (
    <>
      <h1 className="font-black text-4xl text-green-500">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      {clients.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2">Client</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client, idx) => (
              <Client {...client} key={idx} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay clientes</p>
      )}
    </>
  );
}

export default Index;
