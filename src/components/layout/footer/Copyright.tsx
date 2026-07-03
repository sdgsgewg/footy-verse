import Link from "next/link";

const Copyright = () => {
  return (
    <p className="font-medium text-xs text-slate-500 text-center">
      Made with <span className="text-pink-500">❤️</span> by{" "}
      <Link
        href="https://www.instagram.com/jessen_/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-primary"
      >
        Jessen
      </Link>
      , using{" "}
      <Link
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-300 font-bold"
      >
        React
      </Link>{" "}
      and{" "}
      <Link
        href="https://tailwindcss.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-500 font-bold"
      >
        Tailwind CSS
      </Link>
      .
    </p>
  );
};

export default Copyright;
