import { useState } from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { AirtimePurchase } from './components/AirtimePurchase';
import { DataPurchase } from './components/DataPurchase';
import { VirtualCards } from './components/VirtualCards';
import { BillPayment } from './components/BillPayment';
import { Transactions } from './components/Transactions';
import { Profile } from './components/Profile';
import { Wallet } from './components/Wallet';
import { SecuritySettings } from './components/SecuritySettings';
import { HelpSupport } from './components/HelpSupport';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { ProfileEdit } from './components/ProfileEdit';
import { NotificationSettings } from './components/NotificationSettings';
import { KYC } from './components/KYC';
import { Referrals } from './components/Referrals';
import { Rewards } from './components/Rewards';
import { Beneficiaries } from './components/Beneficiaries';
import { BettingWallet } from './components/BettingWallet';
import { RechargeCard } from './components/RechargeCard';
import { Analytics } from './components/Analytics';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';

export type Screen = 
  | 'login' 
  | 'signup' 
  | 'dashboard' 
  | 'airtime' 
  | 'data' 
  | 'virtual-cards' 
  | 'bills' 
  | 'transactions' 
  | 'profile'
  | 'wallet'
  | 'security'
  | 'help-support'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'profile-edit'
  | 'notifications'
  | 'kyc'
  | 'referrals'
  | 'rewards'
  | 'beneficiaries'
  | 'betting'
  | 'recharge-card'
  | 'analytics';

export interface User {
  name: string;
  email: string;
  phone: string;
  kycStatus: 'unverified' | 'pending' | 'verified';
  bvn?: string;
  address?: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(50000); // Demo balance in Naira
  const [referralCode, setReferralCode] = useState('VTU' + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [rewardPoints, setRewardPoints] = useState(250);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({
      name: 'John Doe',
      email: email,
      phone: '+234 810 123 4567',
      kycStatus: 'unverified'
    });
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleSignup = (name: string, email: string, phone: string, password: string) => {
    // Mock signup
    setUser({
      name: name,
      email: email,
      phone: phone,
      kycStatus: 'unverified'
    });
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const updateRewardPoints = (points: number) => {
    setRewardPoints(prev => prev + points);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentScreen('login');
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        {currentScreen === 'login' ? (
          <Login 
            onLogin={handleLogin} 
            onNavigateToSignup={() => setCurrentScreen('signup')} 
          />
        ) : (
          <Signup 
            onSignup={handleSignup} 
            onNavigateToLogin={() => setCurrentScreen('login')} 
          />
        )}
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
    <div className="min-h-screen bg-background transition-colors duration-300">
      {currentScreen === 'dashboard' && (
        <Dashboard 
          user={user!} 
          balance={balance} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'airtime' && (
        <AirtimePurchase 
          balance={balance} 
          onNavigate={navigate} 
          updateBalance={updateBalance} 
        />
      )}
      {currentScreen === 'data' && (
        <DataPurchase 
          balance={balance} 
          onNavigate={navigate} 
          updateBalance={updateBalance} 
        />
      )}
      {currentScreen === 'virtual-cards' && (
        <VirtualCards 
          balance={balance} 
          onNavigate={navigate} 
          updateBalance={updateBalance} 
        />
      )}
      {currentScreen === 'bills' && (
        <BillPayment 
          balance={balance} 
          onNavigate={navigate} 
          updateBalance={updateBalance} 
        />
      )}
      {currentScreen === 'transactions' && (
        <Transactions onNavigate={navigate} />
      )}
      {currentScreen === 'profile' && (
        <Profile 
          user={user!} 
          onNavigate={navigate} 
          onLogout={handleLogout} 
        />
      )}
      {currentScreen === 'wallet' && (
        <Wallet 
          balance={balance} 
          onNavigate={navigate} 
          updateBalance={updateBalance} 
        />
      )}
      {currentScreen === 'security' && (
        <SecuritySettings onNavigate={navigate} />
      )}
      {currentScreen === 'help-support' && (
        <HelpSupport onNavigate={navigate} />
      )}
      {currentScreen === 'privacy-policy' && (
        <PrivacyPolicy onNavigate={navigate} />
      )}
      {currentScreen === 'terms-conditions' && (
        <TermsConditions onNavigate={navigate} />
      )}
      {currentScreen === 'profile-edit' && (
        <ProfileEdit user={user!} onNavigate={navigate} updateUser={updateUser} />
      )}
      {currentScreen === 'notifications' && (
        <NotificationSettings onNavigate={navigate} />
      )}
      {currentScreen === 'kyc' && (
        <KYC user={user!} onNavigate={navigate} updateUser={updateUser} />
      )}
      {currentScreen === 'referrals' && (
        <Referrals referralCode={referralCode} onNavigate={navigate} balance={balance} />
      )}
      {currentScreen === 'rewards' && (
        <Rewards points={rewardPoints} onNavigate={navigate} updateBalance={updateBalance} updatePoints={updateRewardPoints} />
      )}
      {currentScreen === 'beneficiaries' && (
        <Beneficiaries onNavigate={navigate} />
      )}
      {currentScreen === 'betting' && (
        <BettingWallet balance={balance} onNavigate={navigate} updateBalance={updateBalance} />
      )}
      {currentScreen === 'recharge-card' && (
        <RechargeCard balance={balance} onNavigate={navigate} updateBalance={updateBalance} />
      )}
      {currentScreen === 'analytics' && (
        <Analytics onNavigate={navigate} />
      )}
      <Toaster />
    </div>
    </ThemeProvider>
  );
}

export default App;
