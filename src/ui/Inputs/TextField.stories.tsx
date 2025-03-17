import type { StoryObj } from "@storybook/react";

import { TextField, TextFieldPrefix, TextFieldTrailingIcon } from "./TextField";
import { KeyRound } from "lucide-react";

const meta = {
  title: "Inputs/TextField",
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <TextField type="text"/>
  )
};

export const WithPrefixItem = () => {
  return (
    <TextField type="email" className="!w-2xs">
      <TextFieldPrefix className="flex items-center justify-center pl-3 h-full">
        <KeyRound size={16} />
      </TextFieldPrefix>
    </TextField>
  );
};

export const WithTrailingIcon= () => {
  return (
    <TextField type="email" className="!w-2xs">
      <TextFieldTrailingIcon />
    </TextField>
  );
};

export const Combined = () => {
  return (
    <TextField type="email" className="!w-2xs">
      <TextFieldPrefix className="flex items-center justify-center pl-3 h-full">
        <KeyRound size={16} />
      </TextFieldPrefix>
      <TextFieldTrailingIcon />
    </TextField>
  );
};

