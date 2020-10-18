import { format } from "date-fns";
import ar from "date-fns/locale/ar-SA";

interface DateProps {
  dateString: string;
}

function DateComponent({ dateString }: DateProps) {
  const date = new Date(dateString);
  return (
    <time dateTime={dateString}>
      <span className="text-gray-700 opacity-50 text-sm">
        {format(date, "d/LLLL/yyyy", {
          locale: ar,
        })}
      </span>
    </time>
  );
}

export default DateComponent;
