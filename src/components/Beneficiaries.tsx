import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ArrowLeft, User, Trash2, Plus, Smartphone, Wifi } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface BeneficiariesProps {
  onNavigate: (screen: Screen) => void;
}

interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  network: string;
  type: 'airtime' | 'data';
}

export function Beneficiaries({ onNavigate }: BeneficiariesProps) {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: '1', name: 'Mom', phone: '08012345678', network: 'MTN', type: 'airtime' },
    { id: '2', name: 'Dad', phone: '08098765432', network: 'Glo', type: 'data' },
    { id: '3', name: 'Sister', phone: '07012345678', network: 'Airtel', type: 'airtime' },
    { id: '4', name: 'Brother', phone: '09087654321', network: '9Mobile', type: 'data' },
  ]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    phone: '',
    network: '',
    type: 'airtime' as 'airtime' | 'data'
  });

  const networks = ['MTN', 'Glo', 'Airtel', '9Mobile'];

  const handleAddBeneficiary = () => {
    if (!newBeneficiary.name || !newBeneficiary.phone || !newBeneficiary.network) {
      toast.error('Please fill in all fields');
      return;
    }

    const beneficiary: Beneficiary = {
      id: Date.now().toString(),
      ...newBeneficiary
    };

    setBeneficiaries([...beneficiaries, beneficiary]);
    toast.success('Beneficiary added successfully!');
    setShowAddDialog(false);
    setNewBeneficiary({ name: '', phone: '', network: '', type: 'airtime' });
  };

  const handleDelete = (id: string) => {
    setBeneficiaries(beneficiaries.filter(b => b.id !== id));
    toast.success('Beneficiary removed');
  };

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'MTN':
        return 'bg-yellow-400';
      case 'Glo':
        return 'bg-green-500';
      case 'Airtel':
        return 'bg-red-500';
      case '9Mobile':
        return 'bg-green-600';
      default:
        return 'bg-gray-400';
    }
  };

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
          <h2>Saved Beneficiaries</h2>
        </div>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <span>Total Beneficiaries</span>
            <span>{beneficiaries.length}</span>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Add Beneficiary Button */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Add New Beneficiary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Beneficiary</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="Enter name"
                  value={newBeneficiary.name}
                  onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="080 1234 5678"
                  value={newBeneficiary.phone}
                  onChange={(e) => setNewBeneficiary({ ...newBeneficiary, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Network</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newBeneficiary.network}
                  onChange={(e) => setNewBeneficiary({ ...newBeneficiary, network: e.target.value })}
                >
                  <option value="">Select network</option>
                  {networks.map((network) => (
                    <option key={network} value={network}>{network}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={newBeneficiary.type === 'airtime' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setNewBeneficiary({ ...newBeneficiary, type: 'airtime' })}
                  >
                    Airtime
                  </Button>
                  <Button
                    type="button"
                    variant={newBeneficiary.type === 'data' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setNewBeneficiary({ ...newBeneficiary, type: 'data' })}
                  >
                    Data
                  </Button>
                </div>
              </div>
              <Button onClick={handleAddBeneficiary} className="w-full">
                Add Beneficiary
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-900">
              Save frequently used numbers for quick and easy transactions
            </p>
          </CardContent>
        </Card>

        {/* Beneficiaries List */}
        <Card>
          <CardHeader>
            <CardTitle>My Beneficiaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {beneficiaries.map((beneficiary) => (
                <div
                  key={beneficiary.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full ${getNetworkColor(beneficiary.network)} flex items-center justify-center text-white`}>
                      {beneficiary.type === 'airtime' ? (
                        <Smartphone className="w-5 h-5" />
                      ) : (
                        <Wifi className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p>{beneficiary.name}</p>
                      <p className="text-gray-600">{beneficiary.phone}</p>
                    </div>
                    <Badge variant="outline">{beneficiary.network}</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(beneficiary.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {beneficiaries.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No beneficiaries saved yet</p>
            <p className="text-gray-400">Add beneficiaries for quick transactions</p>
          </div>
        )}
      </div>
    </div>
  );
}
