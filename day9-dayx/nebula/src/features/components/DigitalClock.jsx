import { useEffect, useState } from "react";
import { formatDateMonthDayYear } from "../../utils/formatDateMonthDayYear";

function DigitalClock() {
  const [parts, setParts] = useState({
    hour: "00",
    minute: "00",
    second: "00",
  });
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const timePart = timeString.split(" ");
      const [hour, minute, second] = timePart[0].split(":");

      setParts({ hour, minute, second });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const d = new Date();
    setDate(formatDateMonthDayYear(d));
  }, []);

  return (
    <div className="bg-base-200 mt-4 w-xs mx-auto rounded-lg p-4">
      <table className="text-3xl font-semibold w-full flex flex-col items-center justify-center">
        <tr className="flex gap-2">
          <td className="w-[1.5ch] text-center">{parts.hour}</td>
          <td className="w-[1.5ch] text-center">:</td>
          <td className="w-[1.5ch] text-center">{parts.minute}</td>
          <td className="w-[1.5ch] text-center">:</td>
          <td className="w-[1.5ch] text-center">{parts.second}</td>
        </tr>
      </table>
      <p className="font-semibold text-center mt-2">{date}</p>
    </div>
  );
}

export default DigitalClock;
