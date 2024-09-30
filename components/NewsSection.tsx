// components/NewsSection.js
export default function NewsSection({ darkMode }) {
  const news = [
    { id: 1, title: 'Global CO2 Levels Reach New High', date: '2024-05-15' },
    { id: 2, title: 'Arctic Sea Ice at Record Low', date: '2024-05-10' },
    { id: 3, title: 'New Study Reveals Accelerated Glacier Melting', date: '2024-05-05' },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Climate News</h2>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
        {news.map((item) => (
          <div key={item.id} className="mb-4 last:mb-0">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
