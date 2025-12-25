import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { familyApi } from './services/api';
import type { Family, Statistics, EventType } from './types';
import StatsCard from './components/StatsCard';
import FamilyTable from './components/FamilyTable';
import FamilyFormModal from './components/FamilyFormModal';
import EventStats from './components/EventStats';

const EVENTS: EventType[] = ['Engagement', 'Devkarya', 'Sangeet', 'Marriage morning', 'Marriage afternoon'];

function App() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFamily, setEditingFamily] = useState<Family | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventType | 'All'>('All');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [familiesData, statsData] = await Promise.all([
        familyApi.getAllFamilies(),
        familyApi.getStatistics(),
      ]);
      setFamilies(familiesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data. Make sure the backend server is running on port 5001.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFamily = async (data: { familyName: string; event: EventType; members: any[] }) => {
    try {
      if (editingFamily) {
        await familyApi.updateFamily(editingFamily._id, data);
      } else {
        await familyApi.createFamily(data);
      }
      fetchData();
      setEditingFamily(null);
    } catch (error) {
      console.error('Error saving family:', error);
      alert('Failed to save family');
    }
  };

  const handleEdit = (family: Family) => {
    setEditingFamily(family);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await familyApi.deleteFamily(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting family:', error);
      alert('Failed to delete family');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFamily(null);
  };

  const handleExportToExcel = () => {
    // Prepare data for export
    const exportData = filteredFamilies.flatMap((family) => 
      family.members.map((member) => ({
        'Family Name': family.familyName,
        'Event': family.event || 'Not Set',
        'Member Name': member.name,
        'Gender': member.gender === 'male' ? 'Male' : 'Female',
        'Attending': member.attending ? 'Yes' : 'No',
      }))
    );

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Guest List');

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `Pallavi-Shadi-Guest-List-${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  const filteredFamilies = families
    .filter((family) => {
      const matchesSearch = family.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        family.members.some((member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesEvent = selectedEvent === 'All' || family.event === selectedEvent;
      return matchesSearch && matchesEvent;
    })
    .sort((a, b) => a.familyName.localeCompare(b.familyName));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            💒 Pallavi ki shadi
          </h1>
          <p className="text-gray-600">Kon kab kaha ka details yeha pe hai!</p>
        </div>

        {/* Stats Dashboard */}
        <StatsCard stats={stats} loading={loading} />

        {/* Event-wise Statistics */}
        <EventStats families={families} loading={loading} />

        {/* Search, Filter and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search families or members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value as EventType | 'All')}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Events</option>
              {EVENTS.map((evt) => (
                <option key={evt} value={evt}>
                  {evt}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={handleExportToExcel}
              className="flex-1 md:flex-none px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-md hover:shadow-lg transition-all"
            >
              📥 Export Excel
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 md:flex-none px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-md hover:shadow-lg transition-all"
            >
              + Add Family
            </button>
          </div>
        </div>

        {/* Family Table */}
        <FamilyTable
          families={filteredFamilies}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Family Form Modal */}
        <FamilyFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddFamily}
          family={editingFamily}
        />

        {/* Footer */}
        <div className="mt-12 text-center pb-8">
          <p className="text-gray-600 text-sm">
            Made by Tarun - Dhulhan ka bhai 👨‍💻
          </p>
          <p className="text-gray-500 text-xs mt-1">
            MS karne US jane ke parinam 🎓✈️
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
