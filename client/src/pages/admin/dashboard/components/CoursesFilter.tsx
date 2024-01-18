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

type TCourse = {
    id: number;
    name: string
}

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
    }

    const SelectedValuesTitle = () => {
        const filteredCourses = courses.filter((course => selectedValues.includes(course.id)));

        const filteredCoursesLabels = filteredCourses.map(filteredCourse => filteredCourse.name)

        return filteredCoursesLabels.join(', ');
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[256px] justify-between overflow-hidden"
                    title={SelectedValuesTitle()}
                >
                    {selectedValues.length
                        ? SelectedValuesTitle()
                        : "Select courses..."}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[256px] p-0">
                <Command>
                    {
                        courses && courses.length > 0 ? (
                            <>
                                <CommandInput placeholder="Search course..." />
                                <CommandEmpty>No course found.</CommandEmpty>
                                <CommandGroup className="max-h-96 overflow-auto">
                                    {courses.map((course) => {
                                        const isSelected = selectedValues.includes(course.id);

                                        return (
                                            <CommandItem
                                                key={course.id}
                                                value={course.id.toString()}
                                                className="flex flex-row gap-2 cursor-pointer"
                                                onSelect={() => handleSelectedValue(course.id)}
                                            >
                                                <div className="aspect-square w-4">
                                                    {
                                                        isSelected
                                                            ? <IoIosCheckbox />
                                                            : <IoMdSquareOutline />
                                                    }
                                                </div>
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
