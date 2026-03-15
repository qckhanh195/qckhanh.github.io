export default function MarqueeTrack({ children, speed = 25 }) {
  return (
    <div className="overflow-hidden w-full select-none">
      <div
        className="flex gap-3 w-max"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
