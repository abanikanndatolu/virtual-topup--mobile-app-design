import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ArrowLeft, Bell, Mail, Smartphone, DollarSign, Gift, AlertTriangle } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface NotificationSettingsProps {
  onNavigate: (screen: Screen) => void;
}

export function NotificationSettings({ onNavigate }: NotificationSettingsProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [rewards, setRewards] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const handleSave = () => {
    toast.success('Notification preferences saved!');
  };

  const notificationTypes = [
    {
      id: 'push',
      icon: Bell,
      title: 'Push Notifications',
      description: 'Receive notifications on your device',
      enabled: pushNotifications,
      onChange: setPushNotifications,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email Notifications',
      description: 'Receive updates via email',
      enabled: emailNotifications,
      onChange: setEmailNotifications,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'sms',
      icon: Smartphone,
      title: 'SMS Notifications',
      description: 'Get text messages for important updates',
      enabled: smsNotifications,
      onChange: setSmsNotifications,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const alertTypes = [
    {
      id: 'transactions',
      icon: DollarSign,
      title: 'Transaction Alerts',
      description: 'Get notified for all transactions',
      enabled: transactionAlerts,
      onChange: setTransactionAlerts,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'promotions',
      icon: Gift,
      title: 'Promotions & Offers',
      description: 'Receive special offers and deals',
      enabled: promotions,
      onChange: setPromotions,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 'rewards',
      icon: Gift,
      title: 'Rewards Updates',
      description: 'Get notified about reward points',
      enabled: rewards,
      onChange: setRewards,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'security',
      icon: AlertTriangle,
      title: 'Security Alerts',
      description: 'Important security notifications',
      enabled: securityAlerts,
      onChange: setSecurityAlerts,
      color: 'text-red-600 bg-red-50',
      required: true
    }
  ];

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
          <h2>Notification Settings</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Notification Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type.color}`}>
                    <type.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p>{type.title}</p>
                    <p className="text-gray-500">{type.description}</p>
                  </div>
                </div>
                <Switch
                  checked={type.enabled}
                  onCheckedChange={(checked) => {
                    type.onChange(checked);
                    toast.success(`${type.title} ${checked ? 'enabled' : 'disabled'}`);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alert Types */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alertTypes.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${alert.color}`}>
                    <alert.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p>{alert.title}</p>
                      {alert.required && (
                        <span className="text-red-600">(Required)</span>
                      )}
                    </div>
                    <p className="text-gray-500">{alert.description}</p>
                  </div>
                </div>
                <Switch
                  checked={alert.enabled}
                  disabled={alert.required}
                  onCheckedChange={(checked) => {
                    alert.onChange(checked);
                    toast.success(`${alert.title} ${checked ? 'enabled' : 'disabled'}`);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-900">
              Security alerts cannot be disabled to ensure your account safety.
            </p>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full" size="lg">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
