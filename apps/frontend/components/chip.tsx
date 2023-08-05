import { IChipVariant } from "@/models/chip.model";
import { useMemo } from "react";

interface IProps {
  label: string;
  type?: IChipVariant;
}

export function Chip(props: IProps) {
  const buttonVariant = useMemo(() => {
    switch (props.type) {
      case IChipVariant.ERROR:
        return "bg-red-200 text-red-700";
      case IChipVariant.SUCCESS:
        return "bg-green-200 text-green-700";
      case IChipVariant.INFO:
        return "bg-blue-500 text-white";
      case IChipVariant.WARNING:
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-200 text-blue-700";
    }
  }, [props.type]);

  return (
    <div
      className={`${buttonVariant} p-1 max-w-min rounded-md text-tiny font-bold`}
    >
      {props.label}
    </div>
  );
}
