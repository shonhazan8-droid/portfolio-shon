export default function HomeContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 md:px-8 xl:px-0 ${className}`}>
      {children}
    </div>
  );
}
