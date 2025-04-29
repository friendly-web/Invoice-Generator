import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Search, FileText, HelpCircle, Mail, MessageSquare, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

// FAQ data
const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    questions: [
      {
        id: 'what-is-due-clear',
        question: 'What is Due Clear?',
        answer: 'Due Clear is a free online invoice generator that helps businesses create professional invoices quickly and easily. Our platform provides customizable templates, automatic calculations, and PDF downloads - all completely free.'
      },
      {
        id: 'create-first-invoice',
        question: 'How do I create my first invoice?',
        answer: 'To create your first invoice, click on "Create Invoice" button from the homepage. Fill in your business details, client information, and invoice items. The system will automatically calculate totals. You can then preview and download your invoice as a PDF.'
      },
      {
        id: 'cost',
        question: 'How much does Due Clear cost?',
        answer: 'Due Clear is completely free to use. You can create unlimited invoices, download them as PDFs, and access all features without paying anything. There are no hidden fees or premium tiers.'
      },
      {
        id: 'account-needed',
        question: 'Do I need to create an account?',
        answer: 'No, you don\'t need to create an account to use Due Clear. You can create and download invoices instantly without signing up. However, if you want to save your invoices for future reference, we recommend creating a free account.'
      },
    ]
  },
  {
    id: 'using-the-app',
    title: 'Using the Application',
    questions: [
      {
        id: 'customize-invoice',
        question: 'How can I customize my invoice?',
        answer: 'Due Clear offers multiple ways to customize your invoice. You can add your logo, choose from different currencies, add custom line items, apply discounts, include shipping charges, and add notes to the client. All these options are available in the invoice creation form.'
      },
      {
        id: 'save-invoices',
        question: 'Can I save my invoices for later?',
        answer: 'Yes, you can save your invoices by clicking the "Save" button after creating your invoice. Your invoices will be stored securely in our system, allowing you to access, edit, or resend them at any time.'
      },
      {
        id: 'recurring-invoices',
        question: 'Can I set up recurring invoices?',
        answer: 'Currently, we don\'t support automatic recurring invoices. However, you can duplicate an existing invoice and change the dates and invoice number to quickly create a new invoice with the same details.'
      },
      {
        id: 'supported-payment-methods',
        question: 'What payment methods can I include on my invoice?',
        answer: 'Due Clear allows you to specify bank transfer details, PayPal information, or cash payment instructions on your invoices. You can choose which payment methods to include based on your preferences and client needs.'
      },
    ]
  },
  {
    id: 'technical',
    title: 'Technical Questions',
    questions: [
      {
        id: 'data-security',
        question: 'Is my data secure?',
        answer: 'Yes, we take data security seriously. Your invoice data is encrypted and stored securely. We don\'t share your information with third parties, and you retain full ownership of your data. Our system uses industry-standard security protocols to protect your information.'
      },
      {
        id: 'supported-browsers',
        question: 'Which browsers are supported?',
        answer: 'Due Clear works with all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser.'
      },
      {
        id: 'mobile-support',
        question: 'Can I use Due Clear on mobile devices?',
        answer: 'Yes, Due Clear is fully responsive and works on smartphones and tablets. You can create, view, and download invoices on the go using any mobile device with a web browser.'
      },
      {
        id: 'export-formats',
        question: 'In what formats can I export my invoices?',
        answer: 'Currently, Due Clear supports exporting invoices as PDF files, which is the industry standard for invoices. The PDFs are professionally formatted and ready to send to your clients.'
      },
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    questions: [
      {
        id: 'logo-not-showing',
        question: 'Why is my logo not showing on the invoice?',
        answer: 'If your logo isn\'t appearing, please check that the file is in a supported format (JPG, PNG, or SVG) and is smaller than 2MB. Also ensure you\'ve uploaded it correctly by clicking the logo upload area in the form. If problems persist, try using a different image file.'
      },
      {
        id: 'calculations-incorrect',
        question: 'The calculations on my invoice seem incorrect',
        answer: 'Due Clear automatically calculates subtotals, taxes, discounts, and final totals. If something seems incorrect, check that you\'ve entered the correct rates, quantities, tax percentages, and discount values. The system uses standard rounding to two decimal places for all calculations.'
      },
      {
        id: 'pdf-not-downloading',
        question: 'My PDF invoice isn\'t downloading',
        answer: 'If you\'re having trouble downloading your invoice, try using a different browser or check your browser\'s download settings. Make sure you\'ve completed all required fields in the invoice form. If the problem continues, try clearing your browser cache or disabling any ad-blockers temporarily.'
      },
      {
        id: 'email-not-sent',
        question: 'I tried to email an invoice but it wasn\'t sent',
        answer: 'If your invoice email wasn\'t sent, first check that you\'ve entered the correct email address. Also verify that all required fields in the invoice are completed. If problems persist, try downloading the PDF and sending it as an attachment from your own email client.'
      },
    ]
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('getting-started');

  // Toggle expanded state for a question
  const toggleQuestion = (questionId: string) => {
    if (expandedQuestions.includes(questionId)) {
      setExpandedQuestions(expandedQuestions.filter(id => id !== questionId));
    } else {
      setExpandedQuestions([...expandedQuestions, questionId]);
    }
  };

  // Filter questions based on search query
  const getFilteredQuestions = () => {
    if (!searchQuery.trim()) {
      return faqCategories;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    
    return faqCategories.map(category => ({
      ...category,
      questions: category.questions.filter(
        q => q.question.toLowerCase().includes(lowercaseQuery) || 
             q.answer.toLowerCase().includes(lowercaseQuery)
      )
    })).filter(category => category.questions.length > 0);
  };

  const filteredCategories = getFilteredQuestions();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-100 to-indigo-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Help Center</h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Find answers to common questions and learn how to get the most out of Due Clear
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search for help topics..."
                  className="pl-10 py-6 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Sidebar - Categories */}
              <div className="md:w-1/4">
                <div className="sticky top-24">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Help Topics</h2>
                  <nav className="space-y-1">
                    {faqCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-md flex items-center ${
                          activeCategory === category.id 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {activeCategory === category.id && (
                          <div className="w-1 h-6 bg-blue-700 mr-3 rounded-full" />
                        )}
                        {category.title}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-10 p-6 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Need More Help?</h3>
                    <p className="text-gray-700 mb-4 text-sm">
                      If you can't find the answer you're looking for, our support team is ready to help.
                    </p>
                    <Link href="/contact-us">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Contact Support
                        <Mail className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Content - FAQ */}
              <div className="md:w-3/4">
                {searchQuery && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h2>
                    <p className="text-gray-600">
                      {filteredCategories.reduce((count, cat) => count + cat.questions.length, 0)} results for "{searchQuery}"
                    </p>
                  </div>
                )}
                
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any help articles matching your search.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery('')}
                      >
                        Clear Search
                      </Button>
                      <Link href="/contact-us">
                        <Button>Contact Support</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {filteredCategories.map(category => (
                      <div 
                        key={category.id} 
                        id={category.id}
                        className={`mb-12 ${!searchQuery && activeCategory !== category.id ? 'hidden' : ''}`}
                      >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
                        
                        <div className="space-y-4">
                          {category.questions.map(item => (
                            <div 
                              key={item.id}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                              <button
                                onClick={() => toggleQuestion(item.id)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                              >
                                <span className="font-semibold text-gray-900">{item.question}</span>
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center border border-gray-300 transition-transform ${expandedQuestions.includes(item.id) ? 'bg-blue-500 border-blue-500 rotate-180' : ''}`}>
                                  <ArrowRight className={`h-3 w-3 ${expandedQuestions.includes(item.id) ? 'text-white rotate-90' : 'text-gray-500'}`} />
                                </div>
                              </button>
                              
                              {expandedQuestions.includes(item.id) && (
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                  <p className="text-gray-700">{item.answer}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Additional Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Invoicing Guide</h3>
                <p className="text-gray-700 mb-4">
                  Learn best practices for creating professional invoices and getting paid faster.
                </p>
                <Link href="/invoicing-guide">
                  <Button variant="outline" className="w-full">
                    Read the Guide
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Contact Support</h3>
                <p className="text-gray-700 mb-4">
                  Need personalized help? Our support team is ready to assist with your specific questions.
                </p>
                <Link href="/contact-us">
                  <Button variant="outline" className="w-full">
                    Contact Us
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">About Due Clear</h3>
                <p className="text-gray-700 mb-4">
                  Learn more about our mission to provide free, professional invoicing tools for everyone.
                </p>
                <Link href="/about">
                  <Button variant="outline" className="w-full">
                    About Us
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Create Your Invoice?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Generate professional invoices in minutes with our easy-to-use, free invoice creator.
            </p>
            <Link href="/invoice/create">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium">
                Create Invoice Now
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