import { TextareaAutosize } from "@mui/base/TextareaAutosize";

function CustomTextArea({
  value,
  style,
  placeholder,
  handleInput,
}: {
  style?: string;
  value?: string;
  placeholder?: string;
  handleInput: (e: React.BaseSyntheticEvent) => void;
}) {
  return (
    <TextareaAutosize
      maxRows={4}
      value={value}
      onChange={handleInput}
      className={`${style} p-2 w-full border-none outline-none resize-none border-2 rounded-md` }
      aria-label="maximum height"
      placeholder={placeholder}
    />
  );
}

export default CustomTextArea;
