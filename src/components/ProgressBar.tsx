interface Props {
  current: number; // 1-based
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-foreground/60">
        <span>
          {current} / {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-blue-950">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
