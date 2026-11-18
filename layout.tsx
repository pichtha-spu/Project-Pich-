import Sidebar from './Sidebar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-[#f8f9fb]">
        <Sidebar />
        <div className="min-h-screen min-w-0 ml-[260px]">{children}</div>
      </body>
    </html>
  );
}