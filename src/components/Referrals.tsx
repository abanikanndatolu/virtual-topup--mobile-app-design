import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Users, Copy, Share2, Gift, TrendingUp } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface ReferralsProps {
  referralCode: string;
  onNavigate: (screen: Screen) => void;
  balance: number;
}

export function Referrals({ referralCode, onNavigate, balance }: ReferralsProps) {
  const [referrals] = useState([
    { name: 'Sarah Johnson', date: '2 days ago', status: 'active', earned: 500 },
    { name: 'Mike Brown', date: '5 days ago', status: 'active', earned: 500 },
    { name: 'Emily Davis', date: '1 week ago', status: 'pending', earned: 0 },
    { name: 'David Wilson', date: '2 weeks ago', status: 'active', earned: 500 },
  ]);

  const totalEarned = referrals.reduce((sum, ref) => sum + ref.earned, 0);
  const activeReferrals = referrals.filter(r => r.status === 'active').length;

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const shareReferral = () => {
    const message = `Join VTU App and use my referral code: ${referralCode} to get ₦500 bonus on your first transaction!`;
    if (navigator.share) {
      navigator.share({
        title: 'Join VTU App',
        text: message
      });
    } else {
      navigator.clipboard.writeText(message);
      toast.success('Referral message copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Referral Program</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <p className="opacity-90">Total Referrals</p>
              <h3>{referrals.length}</h3>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardContent className="p-4 text-center">
              <Gift className="w-6 h-6 mx-auto mb-2" />
              <p className="opacity-90">Total Earned</p>
              <h3>₦{totalEarned.toLocaleString()}</h3>
            </CardContent>
          </Card>
        </div>

        {/* Referral Code */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-4">
            <p className="opacity-90 mb-2">Your Referral Code</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/20 rounded-lg p-3 text-center">
                <h3>{referralCode}</h3>
              </div>
              <Button
                variant="secondary"
                size="icon"
                onClick={copyReferralCode}
              >
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Share Button */}
        <Button onClick={shareReferral} className="w-full" size="lg">
          <Share2 className="w-5 h-5 mr-2" />
          Share Referral Link
        </Button>

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle>How it Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600">1</span>
                </div>
                <div>
                  <p>Share your referral code</p>
                  <p className="text-gray-600">Invite friends to join VTU App</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600">2</span>
                </div>
                <div>
                  <p>They sign up and transact</p>
                  <p className="text-gray-600">Friend uses your code and makes their first transaction</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600">3</span>
                </div>
                <div>
                  <p>You both earn rewards</p>
                  <p className="text-gray-600">Get ₦500 bonus for each successful referral</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Rewards */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-yellow-900">Referral Rewards</h4>
                <p className="text-yellow-700">Earn ₦500 per successful referral</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <p className="text-yellow-700">You Get</p>
                <p className="text-yellow-900">₦500</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <p className="text-yellow-700">Friend Gets</p>
                <p className="text-yellow-900">₦500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Referrals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Referrals</CardTitle>
              <Badge>{activeReferrals} Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referrals.map((referral, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      {referral.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p>{referral.name}</p>
                      <p className="text-gray-500">{referral.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={referral.status === 'active' ? 'default' : 'secondary'}
                    >
                      {referral.status}
                    </Badge>
                    {referral.earned > 0 && (
                      <p className="text-green-600 mt-1">
                        +₦{referral.earned}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Teaser */}
        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8" />
              <div>
                <h4>Top Referrer Challenge</h4>
                <p className="opacity-90">Refer 10 friends and win ₦10,000!</p>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              View Leaderboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
