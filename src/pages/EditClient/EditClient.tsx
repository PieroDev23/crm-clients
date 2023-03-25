import {
  ActionFunctionArgs,
  Form as FormRRD,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { getClient, updateClient } from "../../api/clients.api";
import Form from "../../components/Form/Form";
import Error from "../../components/Error/Error";
import { IClient } from "../../interfaces/index.interfaces";
import { FormDataEntryValues } from "../../interfaces/newClient.interfaces";

export async function loader({ params }: LoaderFunctionArgs): Promise<IClient> {
  const client = await getClient(params.id as string);

  if (Object.values(client).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "no hubo resultados",
    });
  }

  return client;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data: FormDataEntryValues = Object.fromEntries(formData);

  const email = formData.get("email") as string;
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  const isValidEmail = regex.test(email);
  const errors = [];

  if (!isValidEmail) {
    errors.push("Email invalid");
  }

  if (Object.values(data).includes("")) {
    errors.push("All fields are required");
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  //Actualizar cliente
  await updateClient(params.id!, data);
  return redirect("/");
}

export default function EditClient() {
  const client = useLoaderData() as IClient;
  const navigate = useNavigate();
  const errors = useActionData() as Array<string>;
  return (
    <>
      <h1 className="font-black text-4xl text-green-500">Edit Client</h1>
      <p className="mt-3">
        Llena todos los campos para editar los datos de un cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-1">
        {errors && errors.map((error, idx) => <Error key={idx}>{error}</Error>)}
        <FormRRD method="post" noValidate>
          <Form client={client} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-500 p-3 uppercase text-white text-lg hover:cursor-pointer"
            value="registrar cliente"
          />
        </FormRRD>
      </div>
    </>
  );
}
