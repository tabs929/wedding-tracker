import { useState, useEffect } from 'react';
import { familyApi } from './services/api';
import type { Family, Statistics } from './types';
import StatsCard from './components/StatsCard';
import FamilyTable from './components/FamilyTable';
import FamilyFormModal from './components/FamilyFormModal';

function App() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFamily, setEditingFamily] = useState<Family | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleAddFamily = async (data: { familyName: string; members: any[] }) => {
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

  const filteredFamilies = families.filter((family) =>
    family.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.members.some((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            💒 Wedding Guest Tracker
          </h1>
          <p className="text-gray-600">Manage your wedding guest list with ease</p>
        </div>

        {/* Stats Dashboard */}
        <StatsCard stats={stats} loading={loading} />

        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Search families or members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-md hover:shadow-lg transition-all"
          >
            + Add Family
          </button>
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
      </div>
    </div>
  );
}

export default App;
