import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Wallet as WalletIcon, CreditCard, Building, DollarSign } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface WalletProps {
  balance: number;
  onNavigate: (screen: Screen) => void;
  updateBalance: (amount: number) => void;
}

export function Wallet({ balance, onNavigate, updateBalance }: WalletProps) {
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('fund');

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const handleFundWallet = (method: string) => {
    if (!amount) {
      toast.error('Please enter amount');
      return;
    }

    const amountNum = parseInt(amount);
    updateBalance(amountNum);
    toast.success(`Wallet funded with ₦${amountNum.toLocaleString()} via ${method}!`);
    setAmount('');
  };

  const handleWithdraw = () => {
    if (!amount) {
      toast.error('Please enter amount');
      return;
    }

    const amountNum = parseInt(amount);
    if (amountNum > balance) {
      toast.error('Insufficient balance');
      return;
    }

    updateBalance(-amountNum);
    toast.success(`Withdrawal of ₦${amountNum.toLocaleString()} initiated!`);
    setAmount('');
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
          <h2>Wallet</h2>
        </div>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-6 text-center">
            <p className="opacity-90 mb-2">Available Balance</p>
            <h1>₦{balance.toLocaleString()}</h1>
          </CardContent>
        </Card>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="fund">Fund Wallet</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>

          <TabsContent value="fund" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Amount (NGN)</Label>
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

            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start h-auto p-4"
                  variant="outline"
                  onClick={() => handleFundWallet('Card')}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p>Pay with Card</p>
                    <p className="text-gray-500">Debit/Credit Card</p>
                  </div>
                </Button>

                <Button
                  className="w-full justify-start h-auto p-4"
                  variant="outline"
                  onClick={() => handleFundWallet('Bank Transfer')}
                >
                  <Building className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p>Bank Transfer</p>
                    <p className="text-gray-500">Transfer to account</p>
                  </div>
                </Button>

                <Button
                  className="w-full justify-start h-auto p-4"
                  variant="outline"
                  onClick={() => handleFundWallet('USSD')}
                >
                  <WalletIcon className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p>USSD</p>
                    <p className="text-gray-500">*737# or *894#</p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="mb-2">Bank Transfer Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Name:</span>
                    <span>Providus Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span>9876543210</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span>VTU App - John Doe</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Amount (NGN)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <p className="text-gray-500 mt-2">
                    Available: ₦{balance.toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {quickAmounts.filter(amt => amt <= balance).map((amt) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Bank Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Bank Name</Label>
                  <Input
                    type="text"
                    placeholder="Select your bank"
                    defaultValue="GTBank"
                    disabled
                  />
                </div>
                <div>
                  <Label>Account Number</Label>
                  <Input
                    type="text"
                    placeholder="Account number"
                    defaultValue="0123456789"
                    disabled
                  />
                </div>
                <div>
                  <Label>Account Name</Label>
                  <Input
                    type="text"
                    defaultValue="John Doe"
                    disabled
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              size="lg"
              onClick={handleWithdraw}
            >
              Withdraw Funds
            </Button>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <p className="text-yellow-800">
                  <span>Note:</span> Withdrawals are processed within 24 hours on business days
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
