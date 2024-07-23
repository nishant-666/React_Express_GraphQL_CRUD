import { CommonInput } from "../interfaces";

export default function Input({
  placeholder,
  type,
  onChange,
  name,
  value,
}: CommonInput) {
  return (
    <div>
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
