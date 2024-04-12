import Navigation from "@/components/common/Navigation";

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <Navigation />
      <div className="flex flex-col w-full p-5 pl-[250px]">{children}</div>
    </div>
  );
}
