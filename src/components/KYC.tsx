import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, CheckCircle2, Upload, AlertCircle, Shield } from 'lucide-react';
import { Screen, User } from '../App';
import { toast } from 'sonner@2.0.3';

interface KYCProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  updateUser: (user: User) => void;
}

export function KYC({ user, onNavigate, updateUser }: KYCProps) {
  const [bvn, setBvn] = useState(user.bvn || '');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [step, setStep] = useState(1);

  const getStatusColor = () => {
    switch (user.kycStatus) {
      case 'verified':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = () => {
    switch (user.kycStatus) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Pending Review';
      default:
        return 'Not Verified';
    }
  };

  const handleSubmitBVN = () => {
    if (!bvn || bvn.length !== 11) {
      toast.error('Please enter a valid 11-digit BVN');
      return;
    }
    setStep(2);
    toast.success('BVN verified successfully!');
  };

  const handleSubmitID = () => {
    if (!idType || !idNumber) {
      toast.error('Please fill in all fields');
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = () => {
    updateUser({
      ...user,
      kycStatus: 'pending',
      bvn
    });
    toast.success('KYC documents submitted for review!');
    setTimeout(() => {
      onNavigate('profile');
    }, 1500);
  };

  if (user.kycStatus === 'verified') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => onNavigate('profile')}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2>KYC Verification</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-green-900 mb-2">Account Verified!</h3>
              <p className="text-green-700">
                Your account has been successfully verified. You now have access to all features and higher transaction limits.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Higher transaction limits</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Access to virtual card services</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Enhanced security features</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('profile')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>KYC Verification</h2>
        </div>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span>Verification Status</span>
              <Badge className={getStatusColor()}>
                {getStatusText()}
              </Badge>
            </div>
            <Progress value={step * 33.33} className="h-2" />
            <p className="mt-2 opacity-90">Step {step} of 3</p>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Why KYC */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-900 mb-1">Why verify your account?</h4>
                <p className="text-blue-700">
                  Verification ensures security, prevents fraud, and gives you access to higher limits and premium features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: BVN Verification */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 1: BVN Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Enter your Bank Verification Number to verify your identity
              </p>
              <div>
                <Label>BVN (Bank Verification Number)</Label>
                <Input
                  type="text"
                  maxLength={11}
                  placeholder="Enter 11-digit BVN"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value.replace(/\D/g, ''))}
                />
                <p className="text-gray-500 mt-2">
                  Your BVN is secure and used only for verification
                </p>
              </div>
              <Button onClick={handleSubmitBVN} className="w-full">
                Verify BVN
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: ID Verification */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 2: ID Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Select and upload a valid government-issued ID
              </p>
              <div>
                <Label>ID Type</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                >
                  <option value="">Select ID type</option>
                  <option value="nin">National ID (NIN)</option>
                  <option value="drivers">Driver's License</option>
                  <option value="passport">International Passport</option>
                  <option value="voters">Voter's Card</option>
                </select>
              </div>
              <div>
                <Label>ID Number</Label>
                <Input
                  type="text"
                  placeholder="Enter ID number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Click to upload ID document</p>
                <p className="text-gray-500">PDF, JPG, or PNG (Max 5MB)</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmitID} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Selfie Verification */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Selfie Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Take a selfie holding your ID document for final verification
              </p>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Upload selfie with ID</p>
                <p className="text-gray-500">Make sure your face and ID are clearly visible</p>
              </div>
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0" />
                    <div className="text-yellow-900">
                      <p>Tips for a good selfie:</p>
                      <ul className="mt-2 space-y-1 text-yellow-800">
                        <li>• Ensure good lighting</li>
                        <li>• Hold ID next to your face</li>
                        <li>• Face the camera directly</li>
                        <li>• Remove glasses if possible</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleFinalSubmit} className="flex-1">
                  Submit for Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Verification Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p>Increased transaction limits</p>
                    <p className="text-gray-500">Up to ₦1,000,000 per transaction</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p>Virtual card access</p>
                    <p className="text-gray-500">Create and manage USD cards</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p>Priority support</p>
                    <p className="text-gray-500">24/7 dedicated support team</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
