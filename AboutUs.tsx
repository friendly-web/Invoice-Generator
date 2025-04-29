import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, Trophy, Users, Star, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-100 to-indigo-50 py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">The Team Behind Due Clear</h1>
                <p className="text-xl text-gray-700 mb-8">
                  We're a team of finance experts and software engineers passionate about making invoicing simple, 
                  professional, and accessible to everyone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/invoice/create">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg">
                      Try Our Invoice Creator
                    </Button>
                  </Link>
                  <Link href="/contact-us">
                    <Button variant="outline" className="px-6 py-3 text-lg">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative aspect-video bg-white p-4 rounded-lg shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-center">
                      <div className="mb-4 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-white">
                          <rect width="18" height="18" x="3" y="3" fill="none" stroke="currentColor" strokeWidth="2" rx="2" />
                          <path fill="currentColor" d="M7 9h10v2H7z" />
                          <path fill="currentColor" d="M7 13h5v2H7z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Due Clear</h2>
                      <p className="text-gray-600">Professional invoicing for everyone</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              We believe that professional invoicing should be accessible to everyone, regardless of budget or technical expertise. 
              Due Clear was created to empower freelancers, small businesses, and entrepreneurs with enterprise-grade invoicing 
              tools that are completely free, beautifully designed, and incredibly easy to use.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Simplicity</h3>
                <p className="text-gray-600">Creating professional invoices in minutes, not hours</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Quality</h3>
                <p className="text-gray-600">Professional design that builds trust with your clients</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Reliability</h3>
                <p className="text-gray-600">A dependable platform that's available when you need it</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Team collaboration" 
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
                <p className="text-gray-700 mb-6">
                  Due Clear was born out of frustration with the existing invoicing solutions. As freelancers ourselves, 
                  we were tired of the limitations of free tools and the high costs of premium solutions.
                </p>
                <p className="text-gray-700 mb-6">
                  We started with a simple question: "Why can't invoicing be both powerful and free?" In 2023, 
                  we assembled a team of developers and financial experts to create the solution we wished existed.
                </p>
                <p className="text-gray-700">
                  Today, Due Clear helps thousands of businesses create professional invoices, get paid faster, 
                  and maintain a professional image with their clients—all without spending a dime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Meet Our Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  OB
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Om Bhavsar</h3>
                <p className="text-blue-600 mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Finance expert with 10+ years experience in helping businesses optimize their invoicing processes.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  JSV
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">JSV Team</h3>
                <p className="text-blue-600 mb-3">Lead Developer</p>
                <p className="text-gray-600 text-sm">
                  Full-stack developer passionate about creating clean, intuitive user experiences.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  JSV
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">JSV Team</h3>
                <p className="text-blue-600 mb-3">UX Designer</p>
                <p className="text-gray-600 text-sm">
                  Design specialist focused on creating beautiful, functional interfaces that delight users.
                </p>
              </div>
              
              {/* Team Member 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  JSV
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">JSV Team</h3>
                <p className="text-blue-600 mb-3">Customer Success</p>
                <p className="text-gray-600 text-sm">
                  Dedicated to ensuring customers get the most out of Due Clear's features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Users Love Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why Users Love Due Clear</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center font-semibold text-gray-600">
                    RK
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Rahul Kapoor</h3>
                    <p className="text-sm text-gray-600">Freelance Web Developer</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "Due Clear has transformed how I handle invoicing. It's intuitive, professional, and best of all, completely free. 
                  I save hours each month and my clients are impressed with the professional invoices."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center font-semibold text-gray-600">
                    NT
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Neha Tiwari</h3>
                    <p className="text-sm text-gray-600">Small Business Owner</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "As a small business owner, every rupee counts. Due Clear gives me the professional invoicing capabilities 
                  I need without the cost. The multiple payment options have helped me get paid faster too!"
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">10,000+</p>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">₹50M+</p>
                <p className="text-gray-600">Invoiced Monthly</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">4.9/5</p>
                <p className="text-gray-600">User Rating</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">24/7</p>
                <p className="text-gray-600">Customer Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to simplify your invoicing?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals who trust Due Clear for their invoicing needs.
            </p>
            <Link href="/invoice/create">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium">
                Create Your First Invoice
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <PageFooter />
    </div>
  );
}