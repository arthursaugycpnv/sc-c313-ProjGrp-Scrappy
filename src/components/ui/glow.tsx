export function Glow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="absolute -top-24 left-[15%] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-40 right-[10%] h-[520px] w-[520px] rounded-full bg-fuchsia-400/10 blur-3xl" />
    </div>
  );
}
