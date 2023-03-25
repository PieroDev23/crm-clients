import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;
  console.log();
  return (
    <div className="space-y-8">
      <h1 className="text-center text-4xl font-extrabold mt-20 text-blue-900">
        CRM - clients
      </h1>
      <p className="text-center">{error.statusText || error.message}</p>
    </div>
  );
}
