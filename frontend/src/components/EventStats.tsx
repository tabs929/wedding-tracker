import type { Family, EventType } from '../types';

interface EventStatsProps {
  families: Family[];
  loading: boolean;
}

const EVENTS: EventType[] = ['Engagement', 'Devkarya', 'Sangeet', 'Marriage morning', 'Marriage afternoon reception'];

const EventStats = ({ families, loading }: EventStatsProps) => {
  if (loading) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">kitne ladke aur kitni ladkiyan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const eventStats = EVENTS.map((event) => {
    // Handle both new events array and old event field
    const eventFamilies = families.filter((f) => {
      const familyEvents = f.events || (f.event ? [f.event] : []);
      return familyEvents.includes(event);
    });
    const allMembers = eventFamilies.flatMap((f) => f.members);
    
    return {
      event,
      totalFamilies: eventFamilies.length,
      totalGuests: allMembers.length,
      males: allMembers.filter((m) => m.gender === 'male').length,
      females: allMembers.filter((m) => m.gender === 'female').length,
    };
  });

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 kitne ladke aur kitni ladkiyan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventStats.map((stat) => (
          <div key={stat.event} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
            <h3 className="font-semibold text-gray-800 text-lg mb-3">{stat.event}</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Guests:</span>
                <span className="font-bold text-purple-600 text-lg">{stat.totalGuests}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">👨 Males:</span>
                <span className="font-semibold text-blue-600">{stat.males}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">👩 Females:</span>
                <span className="font-semibold text-pink-600">{stat.females}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-xs text-gray-500">Families:</span>
                <span className="text-xs text-gray-700">{stat.totalFamilies}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventStats;
