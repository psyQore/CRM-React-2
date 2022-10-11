import { useNavigate, Form, useActionData } from "react-router-dom";
import FormNewClient from "../components/FormNewClient";
import Error from "../components/Error";

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  const email = formData.get("email");

  // Validacion
  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if(!regex.test(email)){
    errors.push("El email no es válido")
  }

  // Retornar errores
  if (Object.keys(errors).length) {
    return errors;
  }
}

const NewCLient = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  console.log(errors);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errors?.length &&
          errors.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <FormNewClient />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-700 p-3 uppercase font-bold text-white text-lg hover:bg-blue-800 cursor-pointer"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NewCLient;
