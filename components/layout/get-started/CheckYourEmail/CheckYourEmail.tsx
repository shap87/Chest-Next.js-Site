// components
import { H4,Paragraph } from "../../../common";

interface ICheckYourEmail {
  setStep: any;
  email: string;
}

export const CheckYourEmail = ({ setStep, email }: ICheckYourEmail) => {
  return (
    <div className="md:max-w-[344px] md:pt-10">
      <div
        className="mb-8 md:mb-16 flex items-center group cursor-pointer"
        onClick={() =>
          setStep({
            state: "",
            email: "",
          })
        }
      >
        <img
          className="relative w-3 mr-3 transition-all left-0 group-hover:left-1 brightness-0 rotate-180"
          src={"./arrow-right.svg"}
          alt=""
        />
        Back
      </div>
      <H4>Check your email</H4>
      <Paragraph>
        We emailed a magic link to{" "}
        <span className="text-[#FF46AF] font-bold">{email}</span> <br />
        Click the link to continue.
      </Paragraph>
    </div>
  );
};
