'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  MapPin, 
  Star, 
  Users, 
  Calendar,
  Clock,
  Award,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface SchoolDetail {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  rating: number;
  totalStudents: number;
  establishedYear: number;
  programs: string[];
  image: string;
  verified: boolean;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  schedule: {
    days: string;
    hours: string;
  };
  features: string[];
  gallery: string[];
}

// Mock data - in real app, this would come from API
const mockSchoolDetail: SchoolDetail = {
  id: '1',
  name: 'Robotics Academy of Excellence',
  description: 'Leading robotics education institution with hands-on learning and competitive teams. We offer comprehensive programs for students aged 8-18, covering everything from basic programming to advanced robotics engineering.',
  location: 'San Francisco, CA',
  address: '123 Innovation Drive, San Francisco, CA 94105',
  rating: 4.8,
  totalStudents: 245,
  establishedYear: 2015,
  programs: ['FIRST Robotics', 'VEX Robotics', 'Programming', 'AI & Machine Learning', 'Mechanical Design'],
  image: '/api/placeholder/800/400',
  verified: true,
  contact: {
    email: 'info@roboticsacademy.edu',
    phone: '(555) 123-4567',
    website: 'www.roboticsacademy.edu'
  },
  schedule: {
    days: 'Monday - Friday',
    hours: '3:00 PM - 7:00 PM'
  },
  features: [
    'State-of-the-art robotics lab',
    'Competition preparation',
    'Industry mentors',
    'Project-based learning',
    'Small class sizes',
    'Certification programs'
  ],
  gallery: [
    '/api/placeholder/300/200',
    '/api/placeholder/300/200',
    '/api/placeholder/300/200',
    '/api/placeholder/300/200'
  ]
};

export default function SchoolDetailPage({ params }: { params: { id: string } }) {
  const [school] = useState<SchoolDetail>(mockSchoolDetail);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-neutral-300'
            }`}
          />
        ))}
        <span className="text-lg font-semibold text-neutral-900 ml-2">{rating}</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/schools"
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Schools
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden mb-8">
        {/* Hero Image */}
        <div className="h-64 sm:h-80 bg-neutral-200 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {school.verified && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Verified School
            </div>
          )}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
              {school.name}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {school.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Est. {school.establishedYear}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-6 border-b border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <StarRating rating={school.rating} />
              <p className="text-sm text-neutral-600 mt-1">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-5 h-5 mr-2 text-neutral-600" />
                <span className="text-lg font-semibold text-neutral-900">
                  {school.totalStudents}
                </span>
              </div>
              <p className="text-sm text-neutral-600">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Award className="w-5 h-5 mr-2 text-neutral-600" />
                <span className="text-lg font-semibold text-neutral-900">
                  {school.programs.length}
                </span>
              </div>
              <p className="text-sm text-neutral-600">Programs</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1"
              onClick={() => setShowEnrollmentForm(true)}
            >
              Enroll Now
            </Button>
            <Button variant="outline" className="flex-1">
              Schedule Visit
            </Button>
            <Button variant="outline">
              Contact School
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">About</h2>
            <p className="text-neutral-700 leading-relaxed">
              {school.description}
            </p>
          </div>

          {/* Programs */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Programs Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {school.programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-primary-50 text-primary-700 px-4 py-3 rounded-lg font-medium"
                >
                  {program}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Features & Facilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {school.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {school.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video bg-neutral-200 rounded-lg overflow-hidden"
                >
                  {/* Image placeholder */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-neutral-500 mr-3" />
                <span className="text-neutral-700">{school.address}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-neutral-500 mr-3" />
                <a
                  href={`mailto:${school.contact.email}`}
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                >
                  {school.contact.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-neutral-500 mr-3" />
                <a
                  href={`tel:${school.contact.phone}`}
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                >
                  {school.contact.phone}
                </a>
              </div>
              <div className="flex items-center">
                <ExternalLink className="w-5 h-5 text-neutral-500 mr-3" />
                <a
                  href={`https://${school.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                >
                  {school.contact.website}
                </a>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-neutral-500 mr-3" />
                <span className="text-neutral-700">{school.schedule.days}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-neutral-500 mr-3" />
                <span className="text-neutral-700">{school.schedule.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Enroll */}
          <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Ready to Join?
            </h3>
            <p className="text-primary-700 text-sm mb-4">
              Start your robotics journey today with our expert instructors.
            </p>
            <Button 
              className="w-full"
              onClick={() => setShowEnrollmentForm(true)}
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>

      {/* Enrollment Modal/Form would go here */}
      {showEnrollmentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Enrollment Form
            </h3>
            <p className="text-neutral-600 mb-4">
              Contact the school directly to begin the enrollment process.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEnrollmentForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button className="flex-1">
                Contact School
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}