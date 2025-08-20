import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, FileText, Users, Target } from 'lucide-react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      startDate: '2023-09-15',
      endDate: '2023-12-20',
      status: 'In Progress',
      budget: 15000,
      teamSize: 5,
      progress: 65
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Development of a cross-platform mobile application',
      startDate: '2023-10-01',
      endDate: '2024-02-15',
      status: 'Planning',
      budget: 25000,
      teamSize: 8,
      progress: 15
    },
    {
      id: 3,
      name: 'CRM Implementation',
      description: 'Implementation of new customer relationship management system',
      startDate: '2023-08-10',
      endDate: '2023-11-30',
      status: 'Completed',
      budget: 18000,
      teamSize: 6,
      progress: 100
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Planning',
    budget: '',
    teamSize: '',
    progress: 0
  });

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Planning',
      budget: '',
      teamSize: '',
      progress: 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData(project);
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
    
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === editingProject.id ? { ...formData, id: editingProject.id } : project
      ));
    } else {
      // Add new project
      const newProject = {
        ...formData,
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1
      };
      setProjects([...projects, newProject]);
    }
    
    closeModal();
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              
              <div className="space-y-3 mb-5">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Target size={16} className="mr-2" />
                  <span>Budget: ${project.budget.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Users size={16} className="mr-2" />
                  <span>Team: {project.teamSize} members</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => openEditModal(project)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                      <input
                        type="number"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                    <input
                      type="range"
                      name="progress"
                      value={formData.progress}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full"
                    />
                    <div className="text-right text-sm text-gray-500">{formData.progress}%</div>
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
                    {editingProject ? 'Update Project' : 'Add Project'}
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

export default ProjectsPage;