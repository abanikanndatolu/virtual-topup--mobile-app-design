import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { ArrowLeft, Lock, Fingerprint, Shield, Key } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface SecuritySettingsProps {
  onNavigate: (screen: Screen) => void;
}

export function SecuritySettings({ onNavigate }: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSetPin = () => {
    if (!pin || !confirmPin) {
      toast.error('Please fill in all fields');
      return;
    }
    if (pin.length !== 4) {
      toast.error('PIN must be 4 digits');
      return;
    }
    if (pin !== confirmPin) {
      toast.error('PINs do not match');
      return;
    }
    toast.success('Transaction PIN set successfully!');
    setPin('');
    setConfirmPin('');
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
          <h2>Security Settings</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleChangePassword} className="w-full">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Transaction PIN */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Transaction PIN
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Set a 4-digit PIN to authorize transactions
            </p>
            <div>
              <Label>New PIN</Label>
              <Input
                type="password"
                maxLength={4}
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <div>
              <Label>Confirm PIN</Label>
              <Input
                type="password"
                maxLength={4}
                placeholder="Confirm PIN"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <Button onClick={handleSetPin} className="w-full">
              Set Transaction PIN
            </Button>
          </CardContent>
        </Card>

        {/* Security Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p>Biometric Login</p>
                  <p className="text-gray-500">Use fingerprint or face ID</p>
                </div>
              </div>
              <Switch
                checked={biometricEnabled}
                onCheckedChange={(checked) => {
                  setBiometricEnabled(checked);
                  toast.success(`Biometric login ${checked ? 'enabled' : 'disabled'}`);
                }}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p>Two-Factor Authentication</p>
                  <p className="text-gray-500">Extra layer of security</p>
                </div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={(checked) => {
                  setTwoFactorEnabled(checked);
                  toast.success(`2FA ${checked ? 'enabled' : 'disabled'}`);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="mb-2">Security Tips</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Never share your password or PIN with anyone</li>
              <li>• Use a strong, unique password</li>
              <li>• Enable two-factor authentication</li>
              <li>• Regularly update your password</li>
              <li>• Be cautious of phishing attempts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
