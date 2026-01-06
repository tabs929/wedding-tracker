import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { familyApi } from './services/api';
import type { Family, Statistics, EventType } from './types';
import StatsCard from './components/StatsCard';
import FamilyTable from './components/FamilyTable';
import FamilyFormModal from './components/FamilyFormModal';
import EventStats from './components/EventStats';

const EVENTS: EventType[] = ['Engagement', 'Devkarya', 'Sangeet', 'Marriage morning', 'Marriage afternoon reception'];

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
      alert('Failed to load data. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFamily = async (data: { familyName: string; events: EventType[]; members: any[] }) => {
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

  const getFilteredFamilies = () => {
    return families
      .filter((family) => {
        const matchesSearch = family.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          family.members.some((member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        
        // Handle both new events array and old event field - ensure we have an array
        let familyEvents = family.events && family.events.length > 0 
          ? family.events 
          : (family.event ? [family.event] : []);
        
        const matchesEvent = selectedEvent === 'All' || familyEvents.includes(selectedEvent);
        
        return matchesSearch && matchesEvent;
      })
      .sort((a, b) => a.familyName.localeCompare(b.familyName));
  };

  const handleExportToExcel = () => {
    const filteredFamilies = getFilteredFamilies();
    
    // Prepare data for export - one row per member with Yes/No for each event
    const exportData = filteredFamilies.flatMap((family) => {
      // Get family's events
      let familyEvents = family.events && family.events.length > 0 
        ? family.events 
        : (family.event ? [family.event] : []);
      
      // Create one row per member
      return family.members.map((member) => {
        const row: any = {
          'Family Name': family.familyName,
          'Member Name': member.name,
          'Gender': member.gender === 'male' ? 'Male' : 'Female',
        };
        
        // Add Yes/No for each event
        EVENTS.forEach(event => {
          row[event] = familyEvents.includes(event) ? 'Yes' : 'No';
        });
        
        return row;
      });
    });

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Guest List');

    // Generate filename with current date and event filter
    const date = new Date().toISOString().split('T')[0];
    const eventSuffix = selectedEvent !== 'All' ? `-${selectedEvent.replace(/\s+/g, '-')}` : '';
    const filename = `Pallavi-Shadi-Guest-List${eventSuffix}-${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  const handlePrint = () => {
    const filteredFamilies = getFilteredFamilies();
    
    // Create printable content from filtered families
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow pop-ups to print');
      return;
    }

    const printData = filteredFamilies.flatMap((family) => {
      // If a specific event is selected, only print that event
      let familyEvents = family.events && family.events.length > 0 
        ? family.events 
        : (family.event ? [family.event] : ['Not Set']);
      
      if (selectedEvent !== 'All') {
        familyEvents = familyEvents.filter(evt => evt === selectedEvent);
      }
      
      return familyEvents.map(event => ({
        family: family.familyName,
        event,
        members: family.members,
        memberCount: family.members.length
      }));
    });

    const totalGuests = printData.reduce((sum, item) => sum + item.memberCount, 0);
    const filterText = selectedEvent !== 'All' ? ` - ${selectedEvent}` : ' - All Events';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Guest List${filterText}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #4F46E5; text-align: center; }
            .summary { margin: 20px 0; padding: 15px; background: #F3F4F6; border-radius: 8px; }
            .filter-info { color: #059669; font-weight: bold; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #4F46E5; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .member-list { list-style: none; padding: 0; margin: 5px 0; }
            .member-item { padding: 3px 0; }
            .gender-badge { 
              display: inline-block; 
              padding: 2px 8px; 
              border-radius: 4px; 
              font-size: 12px; 
              margin-left: 8px;
            }
            .male { background: #DBEAFE; color: #1E40AF; }
            .female { background: #FCE7F3; color: #BE185D; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>💒 Pallavi ki Shadi - Guest List</h1>
          <div class="summary">
            <div class="filter-info">Filter: ${filterText}</div>
            <div>Total Families: ${filteredFamilies.length}</div>
            <div>Total Guests: ${totalGuests}</div>
            <div>Date: ${new Date().toLocaleDateString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Family Name</th>
                <th>Event</th>
                <th>Members</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              ${printData.map(item => `
                <tr>
                  <td><strong>${item.family}</strong></td>
                  <td>${item.event}</td>
                  <td>
                    <ul class="member-list">
                      ${item.members.map(m => `
                        <li class="member-item">
                          ${m.name}
                          <span class="gender-badge ${m.gender}">${m.gender === 'male' ? 'M' : 'F'}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </td>
                  <td>${item.memberCount}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  const filteredFamilies = getFilteredFamilies();

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
              onClick={handlePrint}
              className="flex-1 md:flex-none px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium shadow-md hover:shadow-lg transition-all"
              title={selectedEvent !== 'All' ? `Print ${selectedEvent} list` : 'Print all events'}
            >
              🖨️ Print
            </button>
            <button
              onClick={handleExportToExcel}
              className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-md hover:shadow-lg transition-all"
              title={selectedEvent !== 'All' ? `Export ${selectedEvent} to Excel` : 'Export all events to Excel'}
            >
              📥 Excel
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
