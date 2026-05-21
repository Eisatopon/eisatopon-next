export default function DyscalculiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#04080f', minHeight: '100vh' }}>
      {children}
    </div>
  );
}