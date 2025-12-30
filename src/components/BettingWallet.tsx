import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Gamepad2, TrendingUp } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface BettingWalletProps {
  balance: number;
  onNavigate: (screen: Screen) => void;
  updateBalance: (amount: number) => void;
}

export function BettingWallet({ balance, onNavigate, updateBalance }: BettingWalletProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');

  const bettingPlatforms = [
    { id: 'bet9ja', name: 'Bet9ja', logo: '🎲', color: 'bg-green-600' },
    { id: 'sportybet', name: 'SportyBet', logo: '⚽', color: 'bg-red-600' },
    { id: 'betway', name: 'Betway', logo: '🎰', color: 'bg-black' },
    { id: '1xbet', name: '1xBet', logo: '🏆', color: 'bg-blue-600' },
    { id: 'nairabet', name: 'NairaBet', logo: '🎯', color: 'bg-orange-600' },
    { id: 'betking', name: 'BetKing', logo: '👑', color: 'bg-yellow-600' },
  ];

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000];

  const recentTransactions = [
    { platform: 'Bet9ja', amount: 5000, date: '2 hours ago', status: 'success' },
    { platform: 'SportyBet', amount: 2000, date: '1 day ago', status: 'success' },
    { platform: '1xBet', amount: 10000, date: '3 days ago', status: 'success' },
  ];

  const handleTopup = () => {
    if (!selectedPlatform || !userId || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    const amountNum = parseInt(amount);
    if (amountNum > balance) {
      toast.error('Insufficient wallet balance');
      return;
    }

    updateBalance(-amountNum);
    const platform = bettingPlatforms.find(p => p.id === selectedPlatform);
    toast.success(`${platform?.name} wallet funded with ₦${amountNum.toLocaleString()}!`);
    
    // Reset form
    setSelectedPlatform('');
    setUserId('');
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Betting Wallet</h2>
        </div>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <span>Available Balance</span>
            <span>₦{balance.toLocaleString()}</span>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Select Platform */}
        <Card>
          <CardHeader>
            <CardTitle>Select Betting Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {bettingPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPlatform === platform.id
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center text-white`}>
                      <span className="text-2xl">{platform.logo}</span>
                    </div>
                    <p>{platform.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Details */}
        {selectedPlatform && (
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>User ID / Phone Number</Label>
                <Input
                  type="text"
                  placeholder="Enter your account ID or phone number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    onClick={() => setAmount(amt.toString())}
                  >
                    ₦{amt.toLocaleString()}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fund Button */}
        {selectedPlatform && (
          <Button onClick={handleTopup} className="w-full" size="lg">
            <Gamepad2 className="w-5 h-5 mr-2" />
            Fund Betting Wallet
          </Button>
        )}

        {/* Info Card */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <h4 className="text-yellow-900 mb-2">Important Information</h4>
            <ul className="space-y-1 text-yellow-800">
              <li>• Instant wallet funding</li>
              <li>• No additional charges</li>
              <li>• Funds reflect immediately</li>
              <li>• Please gamble responsibly</li>
            </ul>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                      <Gamepad2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p>{transaction.platform}</p>
                      <p className="text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>₦{transaction.amount.toLocaleString()}</p>
                    <p className="text-green-600">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Responsible Gambling */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-red-900">
              <span>⚠️ Gamble Responsibly:</span> Betting can be addictive. Only bet what you can afford to lose. If you need help, contact the National Gambling Helpline.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
