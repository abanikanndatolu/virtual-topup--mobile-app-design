import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowLeft, MessageCircle, Phone, Mail, Send, HelpCircle, Clock } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface HelpSupportProps {
  onNavigate: (screen: Screen) => void;
}

export function HelpSupport({ onNavigate }: HelpSupportProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const faqs = [
    {
      question: 'How do I fund my wallet?',
      answer: 'You can fund your wallet through card payment, bank transfer, or USSD. Go to Wallet > Fund Wallet and select your preferred payment method.'
    },
    {
      question: 'How long does airtime purchase take?',
      answer: 'Airtime purchase is instant. You should receive the airtime within seconds of completing the transaction.'
    },
    {
      question: 'Can I get a refund for a failed transaction?',
      answer: 'Yes, failed transactions are automatically reversed to your wallet within 24 hours. If this doesn\'t happen, please contact support.'
    },
    {
      question: 'How do I create a virtual card?',
      answer: 'Go to Virtual Cards section and click "New Card". A creation fee of ₦2,000 applies. You can then fund the card with USD.'
    },
    {
      question: 'What is KYC and why is it required?',
      answer: 'KYC (Know Your Customer) is a verification process to ensure security. It\'s required for higher transaction limits and certain features.'
    },
    {
      question: 'How do I earn rewards?',
      answer: 'You earn reward points for every transaction you make. Points can be redeemed for discounts or cashback.'
    },
    {
      question: 'How does the referral program work?',
      answer: 'Share your referral code with friends. When they sign up and make their first transaction, both of you earn rewards.'
    },
    {
      question: 'Are my transactions secure?',
      answer: 'Yes, we use bank-level encryption and security measures to protect all your transactions and personal data.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Your message has been sent! We\'ll respond within 24 hours.');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('profile')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Help & Support</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Options */}
        <div className="grid grid-cols-1 gap-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p>Live Chat</p>
                <p className="opacity-90">Chat with our support team</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p>Call Us</p>
                <p className="text-green-600">+234 800 123 4567</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p>Email Us</p>
                <p className="text-purple-600">support@vtuapp.com</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operating Hours */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-700" />
            <div>
              <p className="text-yellow-900">Support Hours</p>
              <p className="text-yellow-700">Mon - Fri: 8AM - 8PM | Sat - Sun: 9AM - 5PM</p>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Subject</Label>
                <Input
                  type="text"
                  placeholder="What do you need help with?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  placeholder="Describe your issue or question..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
