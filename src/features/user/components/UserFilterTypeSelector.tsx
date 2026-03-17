import RadioButton from "../../../components/ui/inputs/RadioButton";
import type { UserFilterType } from "../interface/user.interface";

interface UserFilterTypeSelectorProps {
  currentType: UserFilterType;
  onTypeChange: (type: UserFilterType) => void;
}

const UserFilterTypeSelector = ({
  currentType,
  onTypeChange,
}: UserFilterTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
        Filtrar por:
      </h3>

      <div className="flex flex-col space-y-3">
        <RadioButton
          id="filter-city"
          label="Ciudad"
          name="filterType"
          value="city"
          checked={currentType === "city"}
          onChange={() => onTypeChange("city")}
          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
        />

        <RadioButton
          id="filter-company"
          label="Empresa"
          name="filterType"
          value="company"
          checked={currentType === "company"}
          onChange={() => onTypeChange("company")}
          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default UserFilterTypeSelector;
