import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Search, Plus, Edit2, Trash2, UserPlus } from 'lucide-react';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Project Manager',
      department: 'Management',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, USA',
      startDate: '2021-03-15',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, USA',
      startDate: '2020-08-22',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'UX/UI Designer',
      department: 'Design',
      email: 'emma.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, USA',
      startDate: '2022-01-10',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      status: 'Active'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Marketing Specialist',
      department: 'Marketing',
      email: 'david.kim@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, USA',
      startDate: '2019-11-05',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Jessica Williams',
      role: 'QA Engineer',
      department: 'Engineering',
      email: 'jessica.williams@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Remote',
      startDate: '2022-05-20',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      status: 'Active'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'DevOps Engineer',
      department: 'Engineering',
      email: 'james.wilson@company.com',
      phone: '+1 (555) 678-9012',
      location: 'Boston, USA',
      startDate: '2020-02-14',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Sophia Brown',
      role: 'Product Manager',
      department: 'Product',
      email: 'sophia.brown@company.com',
      phone: '+1 (555) 789-0123',
      location: 'Seattle, USA',
      startDate: '2021-09-30',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
      status: 'Active'
    },
    {
      id: 8,
      name: 'Robert Taylor',
      role: 'HR Manager',
      department: 'HR',
      email: 'robert.taylor@company.com',
      phone: '+1 (555) 890-1234',
      location: 'New York, USA',
      startDate: '2018-07-12',
      image: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      status: 'Active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    email: '',
    phone: '',
    location: '',
    startDate: '',
    status: 'Active'
  });

  const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Management', 'Product', 'HR', 'Sales'];

  const openAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      department: 'Engineering',
      email: '',
      phone: '',
      location: '',
      startDate: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setFormData(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingMember) {
      // Update existing team member
      setTeamMembers(teamMembers.map(member => 
        member.id === editingMember.id ? { ...formData, id: editingMember.id, image: editingMember.image } : member
      ));
    } else {
      // Add new team member
      const newMember = {
        ...formData,
        id: teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      };
      setTeamMembers([...teamMembers, newMember]);
    }
    
    closeModal();
  };

  const deleteMember = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the team?`)) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || member.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const getDepartmentColor = (department) => {
    switch (department) {
      case 'Engineering': return 'bg-blue-100 text-blue-800';
      case 'Design': return 'bg-purple-100 text-purple-800';
      case 'Marketing': return 'bg-pink-100 text-pink-800';
      case 'Management': return 'bg-yellow-100 text-yellow-800';
      case 'Product': return 'bg-green-100 text-green-800';
      case 'HR': return 'bg-red-100 text-red-800';
      case 'Sales': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <UserPlus size={18} className="mr-2" />
          Add Team Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept} Department</option>
            ))}
          </select>
          
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <span className="text-sm text-gray-600">Total Members: </span>
            <span className="font-semibold">{filteredMembers.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map(member => (
          <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-4 right-4 text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(member.status)}`}>
                {member.status}
              </span>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDepartmentColor(member.department)}`}>
                  {member.department}
                </span>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail size={14} className="mr-2" />
                  <span className="truncate">{member.email}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Phone size={14} className="mr-2" />
                  <span>{member.phone}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-2" />
                  <span>{member.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-2" />
                  <span>Joined {new Date(member.startDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={() => openEditModal(member)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => deleteMember(member.id, member.name)}
                  className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={16} className="mr-1" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <div className="text-gray-400 mb-4">No team members found</div>
          <button
            onClick={openAddModal}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add your first team member
          </button>
        </div>
      )}

      {/* Add/Edit Team Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Management">Management</option>
                        <option value="Product">Product</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;