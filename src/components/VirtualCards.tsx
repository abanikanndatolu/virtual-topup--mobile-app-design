import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, CreditCard, Plus, Eye, EyeOff, Copy, DollarSign } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';
import { Badge } from './ui/badge';

interface VirtualCardsProps {
  balance: number;
  onNavigate: (screen: Screen) => void;
  updateBalance: (amount: number) => void;
}

interface VirtualCard {
  id: string;
  type: string;
  last4: string;
  balance: number;
  expiryDate: string;
  cvv: string;
  cardNumber: string;
  status: 'active' | 'frozen';
}

export function VirtualCards({ balance, onNavigate, updateBalance }: VirtualCardsProps) {
  const [cards, setCards] = useState<VirtualCard[]>([
    {
      id: '1',
      type: 'USD Card',
      last4: '4532',
      balance: 50,
      expiryDate: '12/25',
      cvv: '123',
      cardNumber: '4532 8765 4321 4532',
      status: 'active'
    }
  ]);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showCardDetails, setShowCardDetails] = useState<string | null>(null);

  const handleCreateCard = () => {
    const creationFee = 2000;
    if (balance < creationFee) {
      toast.error('Insufficient balance to create card');
      return;
    }

    const newCard: VirtualCard = {
      id: Date.now().toString(),
      type: 'USD Card',
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      balance: 0,
      expiryDate: '12/26',
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      cardNumber: `4532 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active'
    };

    setCards([...cards, newCard]);
    updateBalance(-creationFee);
    toast.success('Virtual card created successfully!');
    setShowCreateCard(false);
  };

  const handleFundCard = () => {
    if (!selectedCard || !fundAmount) {
      toast.error('Please select a card and enter amount');
      return;
    }

    const amountNum = parseInt(fundAmount);
    const usdAmount = amountNum / 1500; // Mock conversion rate

    if (amountNum > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setCards(cards.map(card => 
      card.id === selectedCard 
        ? { ...card, balance: card.balance + usdAmount }
        : card
    ));
    updateBalance(-amountNum);
    toast.success(`Card funded with $${usdAmount.toFixed(2)}!`);
    setFundAmount('');
    setSelectedCard(null);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const toggleCardStatus = (cardId: string) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, status: card.status === 'active' ? 'frozen' : 'active' }
        : card
    ));
    toast.success('Card status updated');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-pink-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Virtual Cards</h2>
        </div>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <span>Wallet Balance</span>
            <span>₦{balance.toLocaleString()}</span>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* My Cards */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3>My Cards</h3>
            <Button
              size="sm"
              onClick={() => setShowCreateCard(!showCreateCard)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Card
            </Button>
          </div>

          {showCreateCard && (
            <Card className="mb-4 border-pink-200">
              <CardContent className="p-6">
                <p className="mb-4">
                  Create a new USD virtual card for $2 (₦2,000) fee
                </p>
                <Button onClick={handleCreateCard} className="w-full">
                  Create Card
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {cards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="opacity-75 mb-1">Balance</p>
                      <h3 className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        {card.balance.toFixed(2)}
                      </h3>
                    </div>
                    <Badge variant={card.status === 'active' ? 'default' : 'secondary'}>
                      {card.status}
                    </Badge>
                  </div>
                  <div className="mb-4">
                    {showCardDetails === card.id ? (
                      <div className="flex items-center gap-2">
                        <p>{card.cardNumber}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white h-6 w-6"
                          onClick={() => copyToClipboard(card.cardNumber.replace(/\s/g, ''), 'Card number')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <p>•••• •••• •••• {card.last4}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6">
                      <div>
                        <p className="opacity-75">Expiry</p>
                        <p>{card.expiryDate}</p>
                      </div>
                      <div>
                        <p className="opacity-75">CVV</p>
                        <div className="flex items-center gap-2">
                          <p>{showCardDetails === card.id ? card.cvv : '•••'}</p>
                          {showCardDetails === card.id && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white h-6 w-6"
                              onClick={() => copyToClipboard(card.cvv, 'CVV')}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white"
                      onClick={() => setShowCardDetails(
                        showCardDetails === card.id ? null : card.id
                      )}
                    >
                      {showCardDetails === card.id ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedCard(card.id)}
                    >
                      Fund Card
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => toggleCardStatus(card.id)}
                    >
                      {card.status === 'active' ? 'Freeze' : 'Unfreeze'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fund Card */}
        {selectedCard && (
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle>Fund Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Amount (NGN)</Label>
                <Input
                  type="number"
                  placeholder="Enter amount in Naira"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                />
                {fundAmount && (
                  <p className="text-gray-500 mt-2">
                    ≈ ${(parseInt(fundAmount) / 1500).toFixed(2)} USD
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleFundCard} className="flex-1">
                  Fund Card
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCard(null);
                    setFundAmount('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
