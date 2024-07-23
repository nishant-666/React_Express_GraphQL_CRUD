import { ChangeEvent } from "react";

export interface CommonInput {
  placeholder: string;
  type?: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface Data {}
