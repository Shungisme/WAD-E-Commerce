import { useTheme } from "@mui/material";
import { useState } from "react";

interface TProps{
    label:string
    onBlur?: () => void;
}

const TextBlockComponent = ({ label, ...rest }: TProps) => {
  const theme = useTheme();
  const [value, setValue] = useState<string>("");

  return (
    <>
      <div className="relative mb-3">
        <input
          style={{
            color: theme.palette.common.black,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          {...rest}
          id={label}
          className=" w-full outline-none px-2 py-3 border-2 rounded-md text-[13px] peer"
        />
        <label
          style={{
            color: theme.palette.common.black,
          }}
          className={`absolute left-[0.55rem] transition-all duration-200 ease-in-out
                ${
                  value
                    ? "text-[10px] top-[2px] translate-y-0"
                    : "text-[0.8rem] top-1/2 translate-y-[-50%] peer-focus:text-[10px] peer-focus:top-[2px] peer-focus:translate-y-0"
                }
                `}
          htmlFor={label}
        >
          {label.toUpperCase()}
        </label>
      </div>
    </>
  );
};

export default TextBlockComponent;
