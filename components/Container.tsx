export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[752px] px-6 md:px-0 ${className}`}>
      {children}
    </div>
  );
}
