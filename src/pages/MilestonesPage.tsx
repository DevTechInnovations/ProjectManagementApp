import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Flag, Target, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const MilestonesPage = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      milestones: [
        {
          id: 101,
          name: 'Design Phase Completion',
          description: 'Finalize all UI/UX designs and get client approval',
          dueDate: '2023-10-15',
          status: 'Completed',
          progress: 100,
          isCritical: true
        },
        {
          id: 102,
          name: 'Frontend Development',
          description: 'Implement all frontend components and pages',
          dueDate: '2023-11-20',
          status: 'In Progress',
          progress: 75,
          isCritical: true
        }
      ]
    },
    {
      id: 2,
      name: 'Mobile App Development',
      milestones: [
        {
          id: 201,
          name: 'Requirements Gathering',
          description: 'Finalize all functional and technical requirements',
          dueDate: '2023-10-10',
          status: 'Completed',
          progress: 100,
          isCritical: false
        },
        {
          id: 202,
          name: 'API Development',
          description: 'Develop and test all backend APIs',
          dueDate: '2023-11-30',
          status: 'Not Started',
          progress: 0,
          isCritical: true
        }
      ]
    },
    {
      id: 3,
      name: 'CRM Implementation',
      milestones: [
        {
          id: 301,
          name: 'Data Migration',
          description: 'Migrate all customer data to the new system',
          dueDate: '2023-09-30',
          status: 'Completed',
          progress: 100,
          isCritical: true
        }
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 'Not Started',
    progress: 0,
    isCritical: false
  });

  const openAddModal = (projectId = '') => {
    setEditingMilestone(null);
    setSelectedProjectId(projectId || projects[0]?.id || '');
    setFormData({
      name: '',
      description: '',
      dueDate: '',
      status: 'Not Started',
      progress: 0,
      isCritical: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (projectId, milestone) => {
    setEditingMilestone(milestone);
    setSelectedProjectId(projectId);
    setFormData(milestone);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would update your state or make an API call here
    if (editingMilestone) {
      // Update existing milestone
      alert(`Milestone "${formData.name}" would be updated in project ${selectedProjectId}`);
    } else {
      // Add new milestone
      alert(`Milestone "${formData.name}" would be added to project ${selectedProjectId}`);
    }
    
    closeModal();
  };

  const deleteMilestone = (projectId, milestoneId, milestoneName) => {
    if (window.confirm(`Are you sure you want to delete the milestone "${milestoneName}"?`)) {
      alert(`Milestone "${milestoneName}" would be deleted from project ${projectId}`);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'In Progress': return <Clock size={16} className="text-yellow-500" />;
      case 'Delayed': return <AlertCircle size={16} className="text-red-500" />;
      default: return <Target size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Milestones Management</h1>
        <button
          onClick={() => openAddModal()}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add New Milestone
        </button>
      </div>

      <div className="space-y-8">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>
            </div>
            
            <div className="p-5">
              {project.milestones.length > 0 ? (
                <div className="space-y-4">
                  {project.milestones.map(milestone => {
                    const daysUntilDue = calculateDaysUntilDue(milestone.dueDate);
                    const isOverdue = daysUntilDue < 0 && milestone.status !== 'Completed';
                    
                    return (
                      <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-start">
                            {milestone.isCritical && <Flag size={18} className="text-red-500 mr-2 mt-1" />}
                            <div>
                              <h3 className="font-medium text-gray-800">{milestone.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                            </div>
                          </div>
                          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(milestone.status)}`}>
                            {milestone.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={16} className="mr-2" />
                            <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                            {isOverdue && (
                              <span className="ml-2 text-red-500 font-medium">({Math.abs(daysUntilDue)} days overdue)</span>
                            )}
                            {!isOverdue && milestone.status !== 'Completed' && (
                              <span className="ml-2 text-gray-500">({daysUntilDue} days remaining)</span>
                            )}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            {getStatusIcon(milestone.status)}
                            <span className="ml-2">Progress: {milestone.progress}%</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Completion</span>
                            <span>{milestone.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                milestone.progress === 100 ? 'bg-green-500' : 
                                milestone.progress > 75 ? 'bg-blue-500' : 
                                milestone.progress > 50 ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`} 
                              style={{ width: `${milestone.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between pt-3 border-t border-gray-100">
                          <button
                            onClick={() => openEditModal(project.id, milestone)}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Edit2 size={16} className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteMilestone(project.id, milestone.id, milestone.name)}
                            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No milestones yet for this project.</p>
                  <button
                    onClick={() => openAddModal(project.id)}
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add the first milestone
                  </button>
                </div>
              )}
              
              {project.milestones.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openAddModal(project.id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Milestone to {project.name}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Milestone Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                    <select
                      value={selectedProjectId}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Milestone Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Delayed">Delayed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                      <input
                        type="number"
                        name="progress"
                        value={formData.progress}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isCritical"
                      checked={formData.isCritical}
                      onChange={handleInputChange}
                      id="isCritical"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isCritical" className="ml-2 block text-sm text-gray-700">
                      Critical milestone
                    </label>
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
                    {editingMilestone ? 'Update Milestone' : 'Add Milestone'}
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

export default MilestonesPage;