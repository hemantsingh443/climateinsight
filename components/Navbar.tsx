
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between">
        <div className="text-lg font-semibold">
          <Link href="/">ClimateInsight</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/data-analysis">
            <a className="hover:text-blue-600">Data Analysis</a>
          </Link>
          <Link href="/regional-insights">
            <a className="hover:text-blue-600">Regional Insights</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
