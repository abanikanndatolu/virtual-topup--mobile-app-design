import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { QuickActions } from './QuickActions';
import { 
  Smartphone, 
  Wifi, 
  CreditCard, 
  Zap, 
  History, 
  User, 
  Wallet,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Gift,
  Users,
  Gamepad2,
  CreditCard as CardIcon,
  Bell,
  BarChart3
} from 'lucide-react';
import { Screen } from '../App';

interface DashboardProps {
  user: { name: string; email: string; phone: string };
  balance: number;
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ user, balance, onNavigate }: DashboardProps) {
  const services = [
    { id: 'airtime', icon: Smartphone, label: 'Buy Airtime', color: 'bg-blue-500', screen: 'airtime' as Screen },
    { id: 'data', icon: Wifi, label: 'Buy Data', color: 'bg-purple-500', screen: 'data' as Screen },
    { id: 'cards', icon: CreditCard, label: 'Virtual Cards', color: 'bg-pink-500', screen: 'virtual-cards' as Screen },
    { id: 'bills', icon: Zap, label: 'Pay Bills', color: 'bg-orange-500', screen: 'bills' as Screen },
    { id: 'recharge', icon: CardIcon, label: 'Recharge Card', color: 'bg-teal-500', screen: 'recharge-card' as Screen },
    { id: 'betting', icon: Gamepad2, label: 'Betting Wallet', color: 'bg-red-500', screen: 'betting' as Screen },
    { id: 'rewards', icon: Gift, label: 'Rewards', color: 'bg-yellow-500', screen: 'rewards' as Screen },
    { id: 'referrals', icon: Users, label: 'Referrals', color: 'bg-green-500', screen: 'referrals' as Screen },
  ];

  const recentTransactions = [
    { id: 1, type: 'Airtime', amount: -1000, date: '2 hours ago', icon: TrendingDown, color: 'text-red-500' },
    { id: 2, type: 'Data Bundle', amount: -2500, date: '1 day ago', icon: TrendingDown, color: 'text-red-500' },
    { id: 3, type: 'Wallet Funding', amount: 10000, date: '2 days ago', icon: TrendingUp, color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="opacity-90">Welcome back,</p>
            <h1>{user.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => onNavigate('notifications')}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <div className="text-white">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => onNavigate('profile')}
            >
              <User className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Wallet Balance */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white animate-scale-in hover:bg-white/15 transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="opacity-90 mb-1">Wallet Balance</p>
                <h2>₦{balance.toLocaleString()}</h2>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('wallet')}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Fund
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="p-6">
        <h3 className="mb-4 dark:text-foreground">Services</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="cursor-pointer hover:shadow-lg dark:hover:shadow-2xl transition-all hover:scale-105 animate-scale-in border-border dark:bg-card"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onNavigate(service.screen)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`${service.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-md`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <p className="dark:text-foreground">{service.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Quick View */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all dark:bg-card dark:border-border mb-6"
          onClick={() => onNavigate('analytics')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="dark:text-foreground">View Analytics</p>
                  <p className="text-gray-500 dark:text-gray-400">Track your spending</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <div className="mb-4 flex justify-between items-center">
          <h3 className="dark:text-foreground">Recent Transactions</h3>
          <Button
            variant="link"
            size="sm"
            onClick={() => onNavigate('transactions')}
            className="dark:text-blue-400"
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-md transition-shadow dark:bg-card dark:border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${transaction.color}`}>
                    <transaction.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="dark:text-foreground">{transaction.type}</p>
                    <p className="text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <p className={transaction.amount > 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
                  {transaction.amount > 0 ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background dark:bg-card border-t border-border backdrop-blur-lg bg-opacity-80 dark:bg-opacity-90 px-6 py-4 shadow-lg">
        <div className="flex justify-around max-w-md mx-auto">
          <Button
            variant="ghost"
            className="flex-col h-auto py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={() => onNavigate('dashboard')}
          >
            <Smartphone className="w-6 h-6 mb-1 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto py-2 dark:text-foreground dark:hover:bg-accent"
            onClick={() => onNavigate('transactions')}
          >
            <History className="w-6 h-6 mb-1" />
            <span>History</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto py-2 dark:text-foreground dark:hover:bg-accent"
            onClick={() => onNavigate('wallet')}
          >
            <Wallet className="w-6 h-6 mb-1" />
            <span>Wallet</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto py-2 dark:text-foreground dark:hover:bg-accent"
            onClick={() => onNavigate('profile')}
          >
            <User className="w-6 h-6 mb-1" />
            <span>Profile</span>
          </Button>
        </div>
      </div>

      {/* Quick Actions FAB */}
      <QuickActions onNavigate={onNavigate} />
    </div>
  );
}
