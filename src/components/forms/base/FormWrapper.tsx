import React from "react";

interface Props {
  children: React.ReactNode;
}

const FormWrapper = ({ children }: Props) => {
  return (
    <div className="lg:col-span-6">
      {/* <div className="bg-card border border-border/50 shadow-sm rounded-2xl overflow-hidden sticky top-24"> */}
      <div className="bg-card border border-border/50 shadow-sm rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
