import LoginButton from "@/components/shared/buttons/LoginButton";
import RegisterButton from "@/components/shared/buttons/RegisterButton";

const AuthButtons = () => {
  return (
    <div className="hidden md:flex gap-4">
      <LoginButton />
      <RegisterButton />
    </div>
  );
};

export default AuthButtons;
