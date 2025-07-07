import React from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="font-heading text-4xl text-neutral-900 mb-2">
            Welcome to SyraRobot Academy
          </h1>
          <p className="text-neutral-600 text-lg">
            Your robotics learning journey starts here
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="font-heading text-xl text-neutral-900 mb-3">Schools</h3>
            <p className="text-neutral-600 mb-4">Discover and join robotics schools in your area</p>
            <button className="text-primary-500 hover:text-primary-600 font-medium">
              Explore Schools →
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="font-heading text-xl text-neutral-900 mb-3">Competitions</h3>
            <p className="text-neutral-600 mb-4">Participate in robotics competitions and challenges</p>
            <button className="text-primary-500 hover:text-primary-600 font-medium">
              View Competitions →
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="font-heading text-xl text-neutral-900 mb-3">Community</h3>
            <p className="text-neutral-600 mb-4">Connect with fellow robotics enthusiasts</p>
            <button className="text-primary-500 hover:text-primary-600 font-medium">
              Join Community →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Dashboard | SyraRobot Academy',
  description: 'Your SyraRobot Academy dashboard with access to schools, competitions, and community.',
};