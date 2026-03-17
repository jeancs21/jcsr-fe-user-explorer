import { useMemo } from "react";
import Select from "../../../components/ui/inputs/Select";
import type { UserFilterType } from "../interface/user.interface";

interface UserFilterValueSelectorProps {
  filterType: UserFilterType;
  selectedValue?: string;
  onValueChange: (value: string | undefined) => void;
  cities: string[];
  companies: string[];
}

const UserFilterValueSelector = ({
  filterType,
  selectedValue,
  onValueChange,
  cities,
  companies,
}: UserFilterValueSelectorProps) => {
  const selectOptions = useMemo(() => {
    const options = filterType === "city" ? cities : companies;
    return [
      { value: "", label: "Todos" },
      ...options.map((opt) => ({ value: opt, label: opt })),
    ];
  }, [filterType, cities, companies]);

  if (filterType === "none") return null;

  return (
    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
      <Select
        id="filter-select"
        label={`Seleccione ${
          filterType === "city" ? "una Ciudad" : "una Empresa"
        }:`}
        value={selectedValue || ""}
        onChange={(e) => onValueChange(e.target.value || undefined)}
        options={selectOptions}
        className="text-sm bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
      />
    </div>
  );
};

export default UserFilterValueSelector;
