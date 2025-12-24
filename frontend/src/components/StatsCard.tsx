import type { Statistics } from '../types';

interface StatsCardProps {
  stats: Statistics | null;
  loading: boolean;
}

const StatsCard = ({ stats, loading }: StatsCardProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    { label: 'Total Families', value: stats.totalFamilies, color: 'bg-blue-500' },
    { label: 'Total Guests', value: stats.totalGuests, color: 'bg-purple-500' },
    { label: 'Men', value: stats.totalMen, color: 'bg-indigo-500' },
    { label: 'Women', value: stats.totalWomen, color: 'bg-pink-500' },
    { label: 'Attending', value: stats.totalAttending, color: 'bg-green-500' },
    { label: 'Not Attending', value: stats.totalNotAttending, color: 'bg-red-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">{item.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{item.value}</p>
            </div>
            <div className={`w-12 h-12 ${item.color} rounded-full opacity-20`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
