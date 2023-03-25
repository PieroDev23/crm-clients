import {
  useNavigate,
  Form as FormRRD,
  ActionFunctionArgs,
  useActionData,
  redirect,
} from "react-router-dom";
import Error from "../../components/Error/Error";
import Form from "../../components/Form/Form";

import { addClient } from "../../api/clients.api";
import { FormDataEntryValues } from "../../interfaces/newClient.interfaces";

export async function action({
  request,
}: ActionFunctionArgs): Promise<Array<string> | Response> {
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

  await addClient(data);
  return redirect("/");
}

function NewClient() {
  const navigate = useNavigate();
  const errors = useActionData() as Array<string>;

  return (
    <>
      <h1 className="font-black text-4xl text-green-500">New Client</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
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
          <Form />
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

export default NewClient;
