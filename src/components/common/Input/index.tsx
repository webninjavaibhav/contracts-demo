type InputProps = {
  value: string;
  placeholder : string;
  handleInput: (e: React.BaseSyntheticEvent) => void;
};

const Input = ({ value, handleInput , placeholder }: InputProps) => {
  return (
    <input
      className="focus-within:outline-none items-center w-full border border-[#D4D4D7] mx-2 p-2 rounded-[4px]"
      value={value}
      placeholder={placeholder}
      onChange={handleInput}
    />
  );
};


export default Input
