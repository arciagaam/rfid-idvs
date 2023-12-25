import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ValidationStatusFilter = ({ setStatus }: { setStatus: (value: "all" | "validated" | "non-validated") => void }) => {
    return (
        <Select onValueChange={setStatus} defaultValue="all">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="non-validated">Non-Validated</SelectItem>
            </SelectContent>
        </Select>

    )
}

export { ValidationStatusFilter };
