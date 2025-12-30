import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  HelpCircle, 
  FileText, 
  LogOut,
  ChevronRight,
  Bell,
  Lock,
  Edit,
  CheckCircle2,
  AlertCircle,
  Users as UsersIcon,
  Clock
} from 'lucide-react';
import { Screen, User as UserType } from '../App';
import { toast } from 'sonner@2.0.3';

interface ProfileProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function Profile({ user, onNavigate, onLogout }: ProfileProps) {
  const getKYCStatusBadge = () => {
    switch (user.kycStatus) {
      case 'verified':
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Not Verified</Badge>;
    }
  };

  const menuItems = [
    {
      id: 'edit-profile',
      icon: Edit,
      label: 'Edit Profile',
      description: 'Update your information',
      action: () => onNavigate('profile-edit')
    },
    {
      id: 'kyc',
      icon: CheckCircle2,
      label: 'KYC Verification',
      description: 'Verify your account',
      action: () => onNavigate('kyc'),
      badge: getKYCStatusBadge()
    },
    {
      id: 'beneficiaries',
      icon: UsersIcon,
      label: 'Saved Beneficiaries',
      description: 'Manage saved contacts',
      action: () => onNavigate('beneficiaries')
    },
    {
      id: 'security',
      icon: Shield,
      label: 'Security Settings',
      description: 'Change password, PIN',
      action: () => onNavigate('security')
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      description: 'Manage notifications',
      action: () => onNavigate('notifications')
    },
    {
      id: 'privacy',
      icon: Lock,
      label: 'Privacy Policy',
      description: 'View privacy policy',
      action: () => onNavigate('privacy-policy')
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help, contact us',
      action: () => onNavigate('help-support')
    },
    {
      id: 'terms',
      icon: FileText,
      label: 'Terms & Conditions',
      description: 'View terms of service',
      action: () => onNavigate('terms-conditions')
    },
  ];

  const handleLogout = () => {
    toast.success('Logged out successfully');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Profile</h2>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarFallback className="bg-white text-blue-600">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3>{user.name}</h3>
                </div>
                <p className="opacity-90 mb-2">Member since Nov 2024</p>
                {getKYCStatusBadge()}
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('profile-edit')}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="mb-4">Personal Information</h3>
          <Card>
            <CardContent className="p-0 divide-y">
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500">Full Name</p>
                  <p>{user.name}</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500">Phone Number</p>
                  <p>{user.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div>
          <h3 className="mb-4">Settings & Support</h3>
          <Card>
            <CardContent className="p-0 divide-y">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p>{item.label}</p>
                      {item.badge}
                    </div>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* App Version */}
        <Card className="bg-gray-100">
          <CardContent className="p-4 text-center">
            <p className="text-gray-500">VTU App v1.0.0</p>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full"
          size="lg"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
