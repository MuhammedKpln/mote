import { Spinner } from "@nextui-org/spinner";

export function MoteSpinner() {
  return (
    <div className="flex justify-center  align-center items-center my-auto">
      <Spinner label="Loading.." />
    </div>
  );
}
