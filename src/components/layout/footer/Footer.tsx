import Copyright from "./Copyright";
import FooterLinks from "./FooterLinks";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterLogo />

          <FooterLinks />
        </div>

        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
