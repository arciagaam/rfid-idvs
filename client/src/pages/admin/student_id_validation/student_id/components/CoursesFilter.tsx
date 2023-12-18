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

const CoursesFilter = ({ courses }: { courses?: { value: string, label: string }[] }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? courses?.find((course) => course.value === value)?.label
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
                                    {courses.map((course) => (
                                        <CommandItem
                                            key={course.value}
                                            value={course.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            {course.label}
                                        </CommandItem>
                                    ))}
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
