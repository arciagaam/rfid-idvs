import { useEffect, useState } from "react"
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

const CoursesFilter = ({ courses }: { courses?: { id: number, value: string, name: string }[] }) => {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleSelectedValue = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((val) => val !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }

        setOpen(false);
    }

    useEffect(() => {
        console.log(selectedValues);
    }, [selectedValues]);

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
                                        const isSelected = selectedValues.includes(course.value);

                                        return (
                                            <CommandItem
                                                key={course.value}
                                                value={course.value}
                                                className="flex flex-row gap-2"
                                                onSelect={handleSelectedValue}
                                            >
                                                <input type="checkbox" checked={isSelected}/>
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
