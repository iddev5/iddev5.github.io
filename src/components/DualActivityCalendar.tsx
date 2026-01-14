import React, { useEffect, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import "./dual-activity-calendar.css";

type Activity = {
  date: string;
  count: number;
  level?: number;
};

type Props = {
  githubUsername: string;
  leetcodeUsername: string;
  githubColors?: string[];
  leetcodeColors?: string[];
};

export default function DualActivityCalendar({
  githubUsername,
  leetcodeUsername,
  githubColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  leetcodeColors = ["#2d2d2d", "#ffd866", "#ffb000", "#ff8800", "#ff5c00"],
}: Props) {
  const [githubData, setGithubData] = useState<Activity[]>([]);
  const [leetcodeData, setLeetcodeData] = useState<Activity[]>([]);
  const [split, setSplit] = useState(50);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`
    )
      .then((res) => res.json())
      .then((data) => {
        setGithubData(data.contributions || []);
      });
  }, [githubUsername]);

  useEffect(() => {
    fetch(
      `https://leetcode-sub-endpoint.vercel.app/leetcode/${leetcodeUsername}`
    )
      .then((res) => res.json())
      .then((data) => {
        const normalized = Object.entries(data || {}).map(
          ([date, count]) => ({
            date,
            count: Number(count),
            level: Math.min(4, Number(count)),
          })
        );

        setLeetcodeData(normalized);
      });
  }, [leetcodeUsername]);

  const startDrag = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (ev: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const percent = ((ev.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.min(95, Math.max(5, percent)));
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  if (githubData.length === 0 || leetcodeData.length === 0) {
    return <div style={{ padding: "1rem" }}>Loading activity…</div>;
  }

  return (
    <div className="compare-wrapper">
      <div className="calendar-header">
        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(
          (m) => (
            <span key={m}>{m}</span>
          )
        )}
      </div>
      <div className="calendar-container" ref={containerRef}>
        <div
          className="calendar github"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          <ActivityCalendar
            data={githubData}
            theme={{ light: githubColors, dark: githubColors }}
            hideColorLegend
            hideMonthLabels
            hideTotalCount
          />
        </div>
        <div
          className="calendar leetcode"
          style={{ clipPath: `inset(0 0 0 ${split}%)` }}
        >
          <ActivityCalendar
            data={leetcodeData}
            theme={{ light: leetcodeColors, dark: leetcodeColors }}
            hideColorLegend
            hideMonthLabels
            hideTotalCount
          />
        </div>

        <div
          className="divider"
          style={{ left: `${split}%` }}
          onMouseDown={startDrag}
        />
      </div>
      <div className="flex justify-between w-[95%]">
        <a href="https://github.com/iddev5" target="_blank" className="hover:text-accent">github</a>
        <a href="https://leetcode.com/u/ayushbardhan/" target="_blank" className="hover:text-accent">leetcode</a>
      </div>
    </div>
  );
}
