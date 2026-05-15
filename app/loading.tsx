export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <span className="text-white text-sm tracking-widest uppercase font-mono">
        Loading...
      </span>
    </div>
  );
}