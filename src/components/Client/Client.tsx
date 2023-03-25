import { ClientProps } from "../../interfaces/client.interfaces";

import {
  Form,
  useNavigate,
  redirect,
  ActionFunctionArgs,
} from "react-router-dom";
import { deleteClient } from "../../api/clients.api";
import { FormEvent } from "react";

export async function action({ params }: ActionFunctionArgs) {
  await deleteClient(params.id!);
  return redirect("/");
}

function Client({ name, company, tel, id, email }: ClientProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    if (!confirm("¿Deseas eliminar este registro?")) {
      e.preventDefault();
    }
  };

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-1xl text-gray-800">{name}</p>
        <p className="capitalize">{company}</p>
      </td>

      <td className="p-6">
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Tel: </span>
          {tel}
        </p>
      </td>

      <td className="p-6 flex gap-3">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          editar
        </button>

        <Form
          method="post"
          action={`/clientes/${id}/eliminar`}
          onSubmit={handleSubmit}
        >
          <button
            type="submit"
            className="text-red-600 hover:red-blue-700 uppercase font-bold text-xs"
          >
            eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
}

export default Client;
