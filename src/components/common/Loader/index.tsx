const Loader = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center text-[#92929C] text-lg">
      <div>{text}</div>
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default Loader;
