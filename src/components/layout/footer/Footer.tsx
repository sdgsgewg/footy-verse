import Copyright from "./Copyright";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="flex flex-col items-center justify-center bg-dark pt-24 pb-12">
        <div className="container">
          <div className="flex flex-wrap"></div>

          <div className="w-full pt-10 border-t border-slate-700">
            <div className="flex items-center justify-center mb-5"></div>

            <Copyright />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
