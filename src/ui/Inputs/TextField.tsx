"use client";

import React, { ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { X } from "lucide-react";

export interface TextFieldPrefixProps extends React.ComponentProps<"div"> {
  children: ReactElement;
}

export const TextFieldPrefix = (props: TextFieldPrefixProps) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};

export interface FieldTrailingIconProps
  extends React.ComponentProps<"button"> {}

export const TextFieldTrailingIcon = (props: FieldTrailingIconProps) => {
  const { children, ...rest } = props;
  return (
    <button
      type={"button"}
      className={
        "h-full pr-2 flex flex-row items-center justify-center text-gray-600 cursor-pointer"
      }
      {...rest}
    >
      {children && children}
      {!children && (
        <span className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-gray-200">
          <X size={18} />
        </span>
      )}
    </button>
  );
};

export interface FieldErrorMessage extends React.ComponentProps<"span"> {
  message: string;
}

export const ErrorMessage = (props: FieldErrorMessage) => {
  const { message, className, ...rest } = props;
  return (
    <span
      className={classNames("text-red-500 font-medium", className)}
      {...rest}
    >
      {message}
    </span>
  );
};

interface TextFieldProps extends React.ComponentProps<"input"> {
  invalid?: boolean;
  type: "text" | "email" | "tel";
  disabled?: boolean;
  children?: ReactNode;
}

export const TextField = (props: TextFieldProps) => {
    const {
      className,
      invalid = false,
      disabled,
      type = "text",
      children,
      onChange,
      ...rest
    } = props;

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isInputEmpty, setIsInputEmpty] = React.useState(true);
    let trailingIconButton = null;
    let errorMessage = null;
    let prefix = null;

    React.useEffect(() => {
      if (!props.value) {
        setIsInputEmpty(true);
      }
    }, [props.value]);

    //Action
    let trailingIconAction = () => {
      if (!inputRef.current) return;
      inputRef.current.value = "";
      setIsInputEmpty(true);
    };

    if (children) {
      React.Children.forEach(
        children as ReactElement,
        (child: ReactElement) => {
          if (child.type == TextFieldTrailingIcon) {
            trailingIconButton = React.cloneElement(child, {
              onClick: () => trailingIconAction(),
            } as React.HTMLAttributes<HTMLElement>);
          } else if (child.type == ErrorMessage) {
            errorMessage = child;
          } else if (child.type === TextFieldPrefix) {
            prefix = child;
          }
        }
      );
    }

    const cn = classNames(
      "flex w-full text-gray-800 text-sm outline-none py-2 px-3 flex-1 placeholder:text-gray-500 placeholder:text-sm bg-transparent border-none appearance-none overflow-none",
      { "!pl-2": prefix ? true : false },
      { "!pr-2": trailingIconButton ? true : false }
    );

    return (
      <div
        className={classNames("flex flex-col gap-y-2 px-[2px]", {
          "opacity-50": disabled,
        })}
      >
        <div
          className={classNames(
            "flex flex-row rounded-[.7rem] border-solid border-gray-200 border-[1px] h-10 w-full overflow-hidden",
            className,
            {
              "focus-within:shadow-input-focused focus-within:border-gray-400":
                !invalid,
            },
            {
              "invalid:shadow-input-invalid focus:invalid:shadow-input-invalid shadow-input-invalid":
                invalid,
            }
          )}
        >
          {/*LEFT ICON - OPTIONAL*/}
          {prefix && prefix}

          {/*INPUT*/}
          <input
            className={cn}
            type={type}
            ref={inputRef}
            disabled={disabled}
            onChange={(e) => {
              if (!e.currentTarget.value) {
                setIsInputEmpty(true);
              } else {
                setIsInputEmpty(false);
              }
              onChange?.(e);
            }}
            {...rest}
          />

          {/*TRAILING ICON*/}
          {!isInputEmpty && trailingIconButton}
        </div>

        {invalid && errorMessage}
      </div>
    );
  }

TextField.displayName = "TextField";
