import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Activity, Calendar } from 'lucide-react';
import { Screen } from '../App';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  onNavigate: (screen: Screen) => void;
}

export function Analytics({ onNavigate }: AnalyticsProps) {
  const spendingData = [
    { month: 'Jan', airtime: 4000, data: 2400, bills: 2400 },
    { month: 'Feb', airtime: 3000, data: 1398, bills: 2210 },
    { month: 'Mar', airtime: 2000, data: 9800, bills: 2290 },
    { month: 'Apr', airtime: 2780, data: 3908, bills: 2000 },
    { month: 'May', airtime: 1890, data: 4800, bills: 2181 },
    { month: 'Jun', airtime: 2390, data: 3800, bills: 2500 },
  ];

  const categoryData = [
    { name: 'Airtime', value: 30, color: '#3b82f6' },
    { name: 'Data', value: 45, color: '#8b5cf6' },
    { name: 'Bills', value: 15, color: '#f97316' },
    { name: 'Others', value: 10, color: '#10b981' },
  ];

  const stats = [
    { label: 'Total Spent', value: '₦156,000', change: '+12%', trend: 'up', icon: DollarSign, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Transactions', value: '234', change: '+8%', trend: 'up', icon: Activity, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
    { label: 'Avg. Daily', value: '₦2,600', change: '-3%', trend: 'down', icon: Calendar, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Analytics</h2>
        </div>
        <p className="opacity-90">Track your spending and usage patterns</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="dark:bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                      <p className="dark:text-foreground">{stat.value}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Spending Trends */}
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle className="dark:text-foreground">Spending Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
                <XAxis dataKey="month" className="dark:fill-foreground" />
                <YAxis className="dark:fill-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="airtime" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="data" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="bills" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle className="dark:text-foreground">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col justify-center space-y-2">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                    <span className="ml-auto dark:text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Comparison */}
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle className="dark:text-foreground">Monthly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
                <XAxis dataKey="month" className="dark:fill-foreground" />
                <YAxis className="dark:fill-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="airtime" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="data" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="bills" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h4 className="mb-3 dark:text-foreground">💡 Insights</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Your data purchases increased by 45% this month</li>
              <li>• You save an average of ₦500 per transaction</li>
              <li>• Best time to buy: Weekends (lower demand)</li>
              <li>• Recommended: Set up auto-recharge for bills</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
