import { Link } from "react-router-dom";

type Props = {
  to: string;
  tooltip: string;
  children: React.ReactNode;
};

export default function TooltipLink({ to, tooltip, children }: Props) {
  return (
    <Link to={to} className="relative group">
      {children}
      <span
        className="
          absolute bottom-[-30px] left-1/2 -translate-x-1/2
          bg-black text-white text-xs px-2 py-1 rounded
          opacity-0 group-hover:opacity-100
          pointer-events-none whitespace-nowrap
          transition
        "
      >
        {tooltip}
      </span>
    </Link>
  );
}
