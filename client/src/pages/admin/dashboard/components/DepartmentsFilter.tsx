import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IoIosCheckbox, IoMdSquareOutline } from "react-icons/io";

type TDepartment = {
    id: number;
    name: string;
}

type TDepartmentFilterProps = {
    departments: TDepartment[];
    selectedValues: number[];
    setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
}

const DepartmentsFilter = ({ departments, selectedValues, setSelectedValues }: TDepartmentFilterProps) => {
    const [open, setOpen] = useState(false);

    const handleSelectedValue = (value: number) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((val) => val !== value));
        } else {
            setSelectedValues((prev) => ([...prev, value]));
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[256px] justify-between"
                >
                    {selectedValues.length
                        ? `${selectedValues.length} department${selectedValues.length > 1 ? "s" : ""} selected`
                        : "Select departments..."}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[256px] p-0">
                <Command>
                    {
                        departments && departments.length ? (
                            <>
                                <CommandInput placeholder="Search department..." />
                                <CommandEmpty>No department found.</CommandEmpty>
                                <CommandGroup className="max-h-96 overflow-auto">
                                    {departments.map((department) => {
                                        const isSelected = selectedValues.includes(department.id);

                                        return (
                                            <CommandItem
                                                key={department.id}
                                                value={department.id.toString()}
                                                className="flex flex-row gap-2 cursor-pointer"
                                                onSelect={() => handleSelectedValue(department.id)}
                                            >
                                                <div className="aspect-square w-4">
                                                    {
                                                        isSelected
                                                            ? <IoIosCheckbox />
                                                            : <IoMdSquareOutline />
                                                    }
                                                </div>
                                                {department.name}
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </>
                        ) : (
                            <div className="py-6 text-center text-sm" role="presentation">No department listed</div>
                        )
                    }
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { DepartmentsFilter };
