import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Smartphone,
  Wifi,
  CreditCard,
  Zap,
  Calendar
} from 'lucide-react';
import { Screen } from '../App';

interface TransactionsProps {
  onNavigate: (screen: Screen) => void;
}

interface Transaction {
  id: string;
  type: 'airtime' | 'data' | 'card' | 'bill' | 'funding';
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  reference: string;
}

export function Transactions({ onNavigate }: TransactionsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'airtime',
      description: 'MTN Airtime - 08012345678',
      amount: -1000,
      status: 'completed',
      date: '2 hours ago',
      reference: 'TXN123456789'
    },
    {
      id: '2',
      type: 'data',
      description: 'Glo 2GB Data Bundle',
      amount: -2500,
      status: 'completed',
      date: '1 day ago',
      reference: 'TXN123456788'
    },
    {
      id: '3',
      type: 'funding',
      description: 'Wallet Funding',
      amount: 10000,
      status: 'completed',
      date: '2 days ago',
      reference: 'TXN123456787'
    },
    {
      id: '4',
      type: 'card',
      description: 'Virtual Card Creation',
      amount: -2000,
      status: 'completed',
      date: '3 days ago',
      reference: 'TXN123456786'
    },
    {
      id: '5',
      type: 'bill',
      description: 'EKEDC Electricity Bill',
      amount: -5000,
      status: 'completed',
      date: '5 days ago',
      reference: 'TXN123456785'
    },
    {
      id: '6',
      type: 'card',
      description: 'USD Card Funding',
      amount: -15000,
      status: 'completed',
      date: '1 week ago',
      reference: 'TXN123456784'
    },
    {
      id: '7',
      type: 'data',
      description: 'Airtel 5GB Data Bundle',
      amount: -4000,
      status: 'pending',
      date: '1 week ago',
      reference: 'TXN123456783'
    },
    {
      id: '8',
      type: 'airtime',
      description: '9Mobile Airtime - 08087654321',
      amount: -500,
      status: 'failed',
      date: '2 weeks ago',
      reference: 'TXN123456782'
    },
  ];

  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'airtime':
        return Smartphone;
      case 'data':
        return Wifi;
      case 'card':
        return CreditCard;
      case 'bill':
        return Zap;
      case 'funding':
        return TrendingUp;
      default:
        return TrendingDown;
    }
  };

  const getIconColor = (amount: number) => {
    return amount > 0 ? 'text-green-500 bg-green-50' : 'text-blue-500 bg-blue-50';
  };

  const filteredTransactions = activeTab === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Transactions</h2>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="airtime">Airtime</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="card">Cards</TabsTrigger>
            <TabsTrigger value="bill">Bills</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-3">
          {filteredTransactions.map((transaction) => {
            const Icon = getIcon(transaction.type);
            return (
              <Card key={transaction.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(transaction.amount)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={transaction.amount > 0 ? 'text-green-500' : ''}>
                        {transaction.amount > 0 ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <Badge 
                        variant={
                          transaction.status === 'completed' ? 'default' : 
                          transaction.status === 'pending' ? 'secondary' : 
                          'destructive'
                        }
                        className="mt-1"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-gray-500">
                      Ref: {transaction.reference}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
