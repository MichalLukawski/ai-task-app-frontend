//frontend/src/components/DueDateProgress.jsx

import { formatDate } from '../utils/dateUtils';

export default function DueDateProgress({ createdAt, dueDate }) {
  const now = new Date();
  const start = new Date(createdAt);
  const end = new Date(dueDate);

  // Ustaw wszystko na 00:00
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const effectiveEnd = new Date(end);
  effectiveEnd.setDate(effectiveEnd.getDate() - 1); // dzień przed terminem to ostatni roboczy

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.max(1, Math.round((effectiveEnd - start) / msPerDay) + 1);
  const passedDays = Math.max(0, Math.min(totalDays, Math.floor((now - start) / msPerDay)));

  const percent = Math.min(100, Math.round((passedDays / totalDays) * 100));

  return (
    <div
      className="relative bg-blue-100 text-blue-900 px-3 py-1 rounded-full overflow-hidden text-sm font-medium whitespace-nowrap"
      title={`Termin: ${formatDate(dueDate, true)} — ${percent}% czasu minęło`}
    >
      <div
        className="absolute inset-0 bg-blue-500/20"
        style={{ width: `${percent}%` }}
      ></div>

      <span className="relative z-10 flex items-center gap-1">
        📅 {formatDate(dueDate, true)}
      </span>
    </div>
  );
}
