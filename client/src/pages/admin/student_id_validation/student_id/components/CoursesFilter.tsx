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

import { TCourse } from "../.."

type TCourseFilterProps = {
    courses: TCourse[];
    selectedValues: number[];
    setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
}

const CoursesFilter = ({ courses, selectedValues, setSelectedValues }: TCourseFilterProps) => {
    const [open, setOpen] = useState(false);

    const handleSelectedValue = (value: number) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((val) => val !== value));
        } else {
            setSelectedValues((prev) => ([...prev, value]));
        }

        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedValues.length
                        ? `${selectedValues.length} course${selectedValues.length > 1 ? "s" : ""} selected`
                        : "Select courses..."}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {
                        courses && courses.length ? (
                            <>
                                <CommandInput placeholder="Search course..." />
                                <CommandEmpty>No course found.</CommandEmpty>
                                <CommandGroup>
                                    {courses.map((course) => {
                                        const isSelected = selectedValues.includes(course.id);

                                        return (
                                            <CommandItem
                                                key={course.value}
                                                value={course.value}
                                                className="flex flex-row gap-2"
                                                onSelect={() => handleSelectedValue(course.id)}
                                            >
                                                {
                                                    isSelected
                                                        ? <IoIosCheckbox />
                                                        : <IoMdSquareOutline />
                                                }
                                                {course.name}
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </>
                        ) : (
                            <div className="py-6 text-center text-sm" role="presentation">No course listed</div>
                        )
                    }
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { CoursesFilter };
