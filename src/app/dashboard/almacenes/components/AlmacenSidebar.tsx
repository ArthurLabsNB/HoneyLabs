"use client";

export default function AlmacenSidebar({ style }: { style?: React.CSSProperties }) {
  return (
    <aside
      style={style}
      className="w-48 p-2 border-r border-[var(--dashboard-border)] bg-[var(--dashboard-sidebar)] flex flex-col gap-1 fixed"
    >
      <button className="p-2 rounded hover:bg-white/10 text-left">Información</button>
      <button className="p-2 rounded hover:bg-white/10 text-left">Inventario</button>
      <button className="p-2 rounded hover:bg-white/10 text-left">Usuarios</button>
    </aside>
  );
}
