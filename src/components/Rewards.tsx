import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, Gift, Star, Trophy, Zap, TrendingUp } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface RewardsProps {
  points: number;
  onNavigate: (screen: Screen) => void;
  updateBalance: (amount: number) => void;
  updatePoints: (points: number) => void;
}

export function Rewards({ points, onNavigate, updateBalance, updatePoints }: RewardsProps) {
  const pointsToNextTier = 500;
  const currentTier = 'Silver';
  const nextTier = 'Gold';

  const rewardTiers = [
    { name: 'Bronze', minPoints: 0, color: 'bg-orange-600' },
    { name: 'Silver', minPoints: 100, color: 'bg-gray-400' },
    { name: 'Gold', minPoints: 500, color: 'bg-yellow-500' },
    { name: 'Platinum', minPoints: 1000, color: 'bg-purple-600' },
  ];

  const redeemOptions = [
    { id: 1, title: '₦500 Cashback', points: 100, value: 500 },
    { id: 2, title: '₦1,000 Cashback', points: 180, value: 1000 },
    { id: 3, title: '₦2,000 Cashback', points: 350, value: 2000 },
    { id: 4, title: '₦5,000 Cashback', points: 800, value: 5000 },
    { id: 5, title: '5% Discount Voucher', points: 50, value: 0, type: 'voucher' },
    { id: 6, title: '10% Discount Voucher', points: 100, value: 0, type: 'voucher' },
  ];

  const recentActivities = [
    { type: 'earned', description: 'Airtime purchase', points: 10, date: '2 hours ago' },
    { type: 'earned', description: 'Data bundle purchase', points: 25, date: '1 day ago' },
    { type: 'redeemed', description: 'Cashback redeemed', points: -100, date: '3 days ago' },
    { type: 'earned', description: 'Bill payment', points: 50, date: '5 days ago' },
    { type: 'earned', description: 'Referral bonus', points: 100, date: '1 week ago' },
  ];

  const handleRedeem = (option: typeof redeemOptions[0]) => {
    if (points < option.points) {
      toast.error('Insufficient reward points');
      return;
    }

    updatePoints(-option.points);
    if (option.value > 0) {
      updateBalance(option.value);
      toast.success(`₦${option.value} added to your wallet!`);
    } else {
      toast.success(`${option.title} added to your account!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Rewards</h2>
        </div>

        {/* Points Balance */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="opacity-90">Your Points</p>
                <div className="flex items-center gap-2">
                  <h1>{points}</h1>
                  <Star className="w-8 h-8 fill-yellow-300 text-yellow-300" />
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="opacity-90">Current Tier: {currentTier}</span>
                <span className="opacity-90">{pointsToNextTier - points} to {nextTier}</span>
              </div>
              <Progress
                value={((pointsToNextTier - (pointsToNextTier - points)) / pointsToNextTier) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Reward Tiers */}
        <Card>
          <CardHeader>
            <CardTitle>Reward Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rewardTiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    tier.name === currentTier ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${tier.color} flex items-center justify-center text-white`}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <p>{tier.name}</p>
                      <p className="text-gray-600">{tier.minPoints}+ points</p>
                    </div>
                  </div>
                  {tier.name === currentTier && (
                    <Badge className="bg-yellow-500">Current</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How to Earn */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              How to Earn Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center justify-between">
                <span>• Airtime purchase</span>
                <span className="text-blue-600">1 point per ₦100</span>
              </li>
              <li className="flex items-center justify-between">
                <span>• Data bundle purchase</span>
                <span className="text-blue-600">1 point per ₦100</span>
              </li>
              <li className="flex items-center justify-between">
                <span>• Bill payments</span>
                <span className="text-blue-600">1 point per ₦100</span>
              </li>
              <li className="flex items-center justify-between">
                <span>• Referral bonus</span>
                <span className="text-blue-600">100 points</span>
              </li>
              <li className="flex items-center justify-between">
                <span>• Daily login streak</span>
                <span className="text-blue-600">5 points/day</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Redeem Rewards */}
        <Card>
          <CardHeader>
            <CardTitle>Redeem Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {redeemOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p>{option.title}</p>
                      <p className="text-gray-600">{option.points} points</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    disabled={points < option.points}
                    onClick={() => handleRedeem(option)}
                  >
                    Redeem
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'earned' ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      {activity.type === 'earned' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <Gift className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p>{activity.description}</p>
                      <p className="text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  <p className={activity.points > 0 ? 'text-green-600' : 'text-red-600'}>
                    {activity.points > 0 ? '+' : ''}{activity.points}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Special Offer */}
        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-8 h-8 fill-yellow-300 text-yellow-300" />
              <div>
                <h4>Double Points Weekend!</h4>
                <p className="opacity-90">Earn 2x points on all transactions</p>
              </div>
            </div>
            <p className="opacity-90">This Saturday & Sunday only</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
