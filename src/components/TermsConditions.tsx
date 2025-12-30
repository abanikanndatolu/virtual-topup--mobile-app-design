import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Screen } from '../App';

interface TermsConditionsProps {
  onNavigate: (screen: Screen) => void;
}

export function TermsConditions({ onNavigate }: TermsConditionsProps) {
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
          <h2>Terms & Conditions</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3>Terms of Service</h3>
                <p className="text-gray-600">Effective date: November 4, 2025</p>
              </div>
            </div>
            <p className="text-gray-600">
              Please read these terms and conditions carefully before using VTU App.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="mb-2">1. Acceptance of Terms</h4>
              <p className="text-gray-600 ml-4">
                By creating an account and using VTU App, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h4 className="mb-2">2. Eligibility</h4>
              <p className="text-gray-600 ml-4">
                You must be at least 18 years old to use VTU App. By using our services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these terms.
              </p>
            </div>

            <div>
              <h4 className="mb-2">3. Account Registration</h4>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• You must provide accurate and complete information</li>
                <li>• You are responsible for maintaining account security</li>
                <li>• You must not share your account credentials</li>
                <li>• One person may not maintain multiple accounts</li>
                <li>• We reserve the right to suspend or terminate accounts</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">4. Services Provided</h4>
              <p className="text-gray-600 ml-4">VTU App provides:</p>
              <ul className="space-y-2 text-gray-600 ml-4 mt-2">
                <li>• Airtime and data bundle purchases</li>
                <li>• Bill payment services</li>
                <li>• Virtual card creation and management</li>
                <li>• Wallet services for fund management</li>
                <li>• Betting wallet top-up services</li>
                <li>• Recharge card purchases</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">5. Transaction Terms</h4>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• All transactions are final once processed</li>
                <li>• Refunds are only provided for failed transactions</li>
                <li>• Transaction fees may apply to certain services</li>
                <li>• We are not responsible for incorrect recipient details</li>
                <li>• Disputed transactions must be reported within 48 hours</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">6. Wallet and Payment Terms</h4>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• Wallet balances do not earn interest</li>
                <li>• Minimum and maximum transaction limits apply</li>
                <li>• We reserve the right to verify large transactions</li>
                <li>• Unauthorized transactions must be reported immediately</li>
                <li>• Wallet withdrawals may take up to 24 hours</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">7. KYC and Verification</h4>
              <p className="text-gray-600 ml-4">
                To comply with regulations and enhance security, we may require identity verification (KYC). Higher transaction limits and certain features require completed KYC verification.
              </p>
            </div>

            <div>
              <h4 className="mb-2">8. Prohibited Activities</h4>
              <p className="text-gray-600 ml-4">You agree not to:</p>
              <ul className="space-y-2 text-gray-600 ml-4 mt-2">
                <li>• Use the service for fraudulent purposes</li>
                <li>• Engage in money laundering or terrorist financing</li>
                <li>• Violate any applicable laws or regulations</li>
                <li>• Attempt to hack or compromise our systems</li>
                <li>• Use automated systems without permission</li>
                <li>• Resell our services without authorization</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">9. Service Availability</h4>
              <p className="text-gray-600 ml-4">
                While we strive for 24/7 availability, we do not guarantee uninterrupted service. We may perform maintenance or updates that temporarily affect service availability.
              </p>
            </div>

            <div>
              <h4 className="mb-2">10. Limitation of Liability</h4>
              <p className="text-gray-600 ml-4">
                VTU App is not liable for indirect, incidental, or consequential damages arising from service use. Our total liability is limited to the amount of your transaction.
              </p>
            </div>

            <div>
              <h4 className="mb-2">11. Intellectual Property</h4>
              <p className="text-gray-600 ml-4">
                All content, trademarks, and intellectual property on VTU App are owned by us or our licensors. You may not use, copy, or distribute our content without permission.
              </p>
            </div>

            <div>
              <h4 className="mb-2">12. Termination</h4>
              <p className="text-gray-600 ml-4">
                We reserve the right to suspend or terminate your account for violations of these terms, suspicious activity, or at our discretion. You may close your account at any time.
              </p>
            </div>

            <div>
              <h4 className="mb-2">13. Changes to Terms</h4>
              <p className="text-gray-600 ml-4">
                We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div>
              <h4 className="mb-2">14. Governing Law</h4>
              <p className="text-gray-600 ml-4">
                These terms are governed by the laws of the Federal Republic of Nigeria. Disputes shall be resolved in Nigerian courts.
              </p>
            </div>

            <div>
              <h4 className="mb-2">15. Contact Information</h4>
              <p className="text-gray-600 ml-4">
                For questions about these terms, contact us at:<br />
                Email: legal@vtuapp.com<br />
                Phone: +234 800 123 4567
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-900">
                By using VTU App, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
