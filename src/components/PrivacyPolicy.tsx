import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import { Screen } from '../App';

interface PrivacyPolicyProps {
  onNavigate: (screen: Screen) => void;
}

export function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
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
          <h2>Privacy Policy</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3>Your Privacy Matters</h3>
                <p className="text-gray-600">Last updated: November 4, 2025</p>
              </div>
            </div>
            <p className="text-gray-600">
              At VTU App, we are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Information We Collect
              </h4>
              <ul className="space-y-2 text-gray-600 ml-7">
                <li>• Personal information (name, email, phone number)</li>
                <li>• Transaction history and payment information</li>
                <li>• Device information and usage data</li>
                <li>• KYC documents for verification purposes</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" />
                How We Use Your Information
              </h4>
              <ul className="space-y-2 text-gray-600 ml-7">
                <li>• To provide and improve our services</li>
                <li>• To process your transactions securely</li>
                <li>• To communicate important updates</li>
                <li>• To prevent fraud and enhance security</li>
                <li>• To personalize your experience</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                Data Security
              </h4>
              <p className="text-gray-600 ml-7">
                We implement industry-standard security measures including:
              </p>
              <ul className="space-y-2 text-gray-600 ml-7 mt-2">
                <li>• End-to-end encryption for all transactions</li>
                <li>• Secure data storage with regular backups</li>
                <li>• Multi-factor authentication options</li>
                <li>• Regular security audits and updates</li>
                <li>• PCI DSS compliance for payment processing</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">Information Sharing</h4>
              <p className="text-gray-600 ml-7">
                We do not sell or rent your personal information to third parties. We may share your information only:
              </p>
              <ul className="space-y-2 text-gray-600 ml-7 mt-2">
                <li>• With service providers who assist our operations</li>
                <li>• When required by law or legal process</li>
                <li>• To protect our rights and prevent fraud</li>
                <li>• With your explicit consent</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">Your Rights</h4>
              <p className="text-gray-600 ml-7">You have the right to:</p>
              <ul className="space-y-2 text-gray-600 ml-7 mt-2">
                <li>• Access your personal information</li>
                <li>• Request corrections to your data</li>
                <li>• Delete your account and data</li>
                <li>• Opt-out of marketing communications</li>
                <li>• Export your transaction history</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">Cookies and Tracking</h4>
              <p className="text-gray-600 ml-7">
                We use cookies and similar technologies to improve your experience, analyze usage, and provide personalized features. You can manage cookie preferences in your device settings.
              </p>
            </div>

            <div>
              <h4 className="mb-2">Data Retention</h4>
              <p className="text-gray-600 ml-7">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Transaction records are kept for a minimum of 7 years as required by financial regulations.
              </p>
            </div>

            <div>
              <h4 className="mb-2">Children's Privacy</h4>
              <p className="text-gray-600 ml-7">
                Our services are not intended for children under 18. We do not knowingly collect information from minors.
              </p>
            </div>

            <div>
              <h4 className="mb-2">Changes to This Policy</h4>
              <p className="text-gray-600 ml-7">
                We may update this privacy policy from time to time. We will notify you of any significant changes via email or app notification.
              </p>
            </div>

            <div>
              <h4 className="mb-2">Contact Us</h4>
              <p className="text-gray-600 ml-7">
                If you have any questions about this privacy policy or how we handle your data, please contact us at privacy@vtuapp.com or call +234 800 123 4567.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-blue-900">
              By using VTU App, you agree to this Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
