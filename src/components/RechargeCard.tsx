import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, CreditCard, Copy, CheckCircle2 } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface RechargeCardProps {
  balance: number;
  onNavigate: (screen: Screen) => void;
  updateBalance: (amount: number) => void;
}

export function RechargeCard({ balance, onNavigate, updateBalance }: RechargeCardProps) {
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [generatedPins, setGeneratedPins] = useState<{ serial: string; pin: string }[]>([]);

  const networks = [
    { value: 'mtn', label: 'MTN', color: 'bg-yellow-400' },
    { value: 'glo', label: 'Glo', color: 'bg-green-500' },
    { value: 'airtel', label: 'Airtel', color: 'bg-red-500' },
    { value: '9mobile', label: '9Mobile', color: 'bg-green-600' },
  ];

  const availableAmounts = [100, 200, 500, 1000, 1500, 2000, 5000];

  const handlePurchase = () => {
    if (!network || !amount || !quantity) {
      toast.error('Please fill in all fields');
      return;
    }

    const amountNum = parseInt(amount);
    const quantityNum = parseInt(quantity);
    const totalCost = amountNum * quantityNum;

    if (totalCost > balance) {
      toast.error('Insufficient balance');
      return;
    }

    // Generate mock recharge pins
    const pins = Array.from({ length: quantityNum }, (_, i) => ({
      serial: Math.floor(10000000000000 + Math.random() * 90000000000000).toString(),
      pin: Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString()
    }));

    setGeneratedPins(pins);
    updateBalance(-totalCost);
    toast.success(`${quantityNum} recharge card(s) purchased successfully!`);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const handleReset = () => {
    setGeneratedPins([]);
    setNetwork('');
    setAmount('');
    setQuantity('1');
  };

  if (generatedPins.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-br from-teal-600 to-blue-600 text-white p-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleReset}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2>Recharge Cards</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-green-900 mb-2">Purchase Successful!</h3>
              <p className="text-green-700">
                Your recharge card pins are ready
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Recharge Cards</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const text = generatedPins.map(p => `Serial: ${p.serial}\nPIN: ${p.pin}`).join('\n\n');
                    copyToClipboard(text, 'All cards');
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedPins.map((pin, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                    <p className="text-gray-600 mb-2">Card {index + 1}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-gray-500">Serial Number</p>
                          <p className="font-mono">{pin.serial}</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(pin.serial, 'Serial number')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-gray-500">PIN</p>
                          <p className="font-mono">{pin.pin}</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(pin.pin, 'PIN')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="text-blue-900 mb-2">How to Use</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• Dial the network's recharge code</li>
                <li>• Enter the PIN when prompted</li>
                <li>• Confirm to load airtime</li>
                <li>• Keep these details safe</li>
              </ul>
            </CardContent>
          </Card>

          <Button onClick={handleReset} className="w-full" size="lg">
            Buy More Cards
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-teal-600 to-blue-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Recharge Card</h2>
        </div>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <span>Wallet Balance</span>
            <span>₦{balance.toLocaleString()}</span>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Info Card */}
        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-teal-700" />
              <div>
                <h4 className="text-teal-900">Buy Recharge Cards</h4>
                <p className="text-teal-700">Get instant recharge card PINs for any network</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Select Network */}
        <Card>
          <CardHeader>
            <CardTitle>Select Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {networks.map((net) => (
                <button
                  key={net.value}
                  onClick={() => setNetwork(net.value)}
                  className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${
                    network === net.value
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${net.color} flex items-center justify-center`}>
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                </button>
              ))}
            </div>
            {network && (
              <p className="mt-3 text-center text-teal-600">
                {networks.find(n => n.value === network)?.label} selected
              </p>
            )}
          </CardContent>
        </Card>

        {/* Select Amount */}
        <Card>
          <CardHeader>
            <CardTitle>Card Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {availableAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant={amount === amt.toString() ? 'default' : 'outline'}
                  onClick={() => setAmount(amt.toString())}
                >
                  ₦{amt}
                </Button>
              ))}
            </div>
            <div>
              <Label>Custom Amount</Label>
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quantity */}
        <Card>
          <CardHeader>
            <CardTitle>Quantity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, parseInt(quantity) - 1).toString())}
              >
                -
              </Button>
              <Input
                type="number"
                className="text-center"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(10, parseInt(quantity) + 1).toString())}
              >
                +
              </Button>
            </div>
            {amount && quantity && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Cost:</span>
                  <span>₦{(parseInt(amount) * parseInt(quantity)).toLocaleString()}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Purchase Button */}
        <Button
          onClick={handlePurchase}
          className="w-full"
          size="lg"
          disabled={!network || !amount || !quantity}
        >
          Purchase Recharge Card{parseInt(quantity) > 1 ? 's' : ''}
        </Button>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Why Buy Recharge Cards?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li>• Instant PIN generation</li>
              <li>• Perfect for gifting</li>
              <li>• No expiration worries</li>
              <li>• Bulk purchase available</li>
              <li>• Works on all phones</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
