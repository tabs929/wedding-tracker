import { useState, useEffect } from 'react';
import type { Family, Member, EventType } from '../types';

interface FamilyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { familyName: string; events: EventType[]; members: Member[] }) => void;
  family?: Family | null;
}

const EVENTS: EventType[] = ['Engagement', 'Devkarya', 'Sangeet', 'Marriage morning', 'Marriage afternoon reception'];

const FamilyFormModal = ({ isOpen, onClose, onSubmit, family }: FamilyFormModalProps) => {
  const [familyName, setFamilyName] = useState('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (family) {
      setFamilyName(family.familyName);
      // Handle backward compatibility: convert old event field to events array
      setEvents(family.events && family.events.length > 0 
        ? family.events 
        : (family.event ? [family.event] : []));
      setMembers(family.members);
    } else {
      setFamilyName('');
      setEvents([]);
      setMembers([]);
    }
  }, [family, isOpen]);

  const addMember = () => {
    setMembers([...members, { name: '', gender: 'male', attending: true }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof Member, value: any) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const toggleEvent = (event: EventType) => {
    if (events.includes(event)) {
      setEvents(events.filter(e => e !== event));
    } else {
      setEvents([...events, event]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyName.trim()) {
      alert('Please enter a family name');
      return;
    }
    if (events.length === 0) {
      alert('Please select at least one event');
      return;
    }
    if (members.length === 0) {
      alert('Please add at least one member');
      return;
    }
    if (members.some(m => !m.name.trim())) {
      alert('Please fill in all member names');
      return;
    }
    onSubmit({ familyName, events, members });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {family ? 'Edit Family' : 'Add New Family'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Family Name *
            </label>
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter family name"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Events * (Select all that apply)
            </label>
            <div className="space-y-2 border border-gray-300 rounded-md p-3">
              {EVENTS.map((evt) => (
                <label key={evt} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={events.includes(evt)}
                    onChange={() => toggleEvent(evt)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{evt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Family Members *
              </label>
              <button
                type="button"
                onClick={addMember}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
              >
                + Add Member
              </button>
            </div>

            {members.length === 0 && (
              <p className="text-gray-500 text-sm mb-3">No members added yet</p>
            )}

            <div className="space-y-3">
              {members.map((member, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Member name"
                    required
                  />
                  <select
                    value={member.gender}
                    onChange={(e) => updateMember(index, 'gender', e.target.value as 'male' | 'female')}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {family ? 'Update Family' : 'Add Family'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilyFormModal;
