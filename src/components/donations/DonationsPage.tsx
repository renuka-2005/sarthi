import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { 
  DollarSign, 
  Heart, 
  Trophy, 
  Users, 
  Target, 
  Calendar,
  TrendingUp,
  Gift,
  CreditCard,
  History
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'alumni';
  graduationYear: string;
  degree: string;
  company?: string;
  location?: string;
  profileImage?: string | null;
}

interface DonationsPageProps {
  user: User;
}

export function DonationsPage({ user }: DonationsPageProps) {
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedFund, setSelectedFund] = useState('general');
  const [isRecurring, setIsRecurring] = useState(false);

  const campaigns = [
    {
      id: '1',
      title: 'Scholarship Fund',
      description: 'Support deserving students with financial assistance for their education.',
      goal: 100000,
      raised: 67500,
      donors: 245,
      daysLeft: 45,
      category: 'Education',
    },
    {
      id: '2',
      title: 'New Library Construction',
      description: 'Help us build a state-of-the-art library facility for future generations.',
      goal: 500000,
      raised: 275000,
      donors: 89,
      daysLeft: 120,
      category: 'Infrastructure',
    },
    {
      id: '3',
      title: 'Research Equipment Fund',
      description: 'Fund cutting-edge research equipment for our science departments.',
      goal: 75000,
      raised: 32500,
      donors: 156,
      daysLeft: 30,
      category: 'Research',
    },
  ];

  const donationHistory = [
    {
      id: '1',
      amount: 250,
      fund: 'Scholarship Fund',
      date: '2024-08-15',
      status: 'Completed',
      tax_deductible: true,
    },
    {
      id: '2',
      amount: 100,
      fund: 'General Fund',
      date: '2024-06-20',
      status: 'Completed',
      tax_deductible: true,
    },
    {
      id: '3',
      amount: 500,
      fund: 'Research Equipment Fund',
      date: '2024-03-10',
      status: 'Completed',
      tax_deductible: true,
    },
  ];

  const stats = [
    { label: 'Total Donated', value: '$850', icon: DollarSign, color: 'text-green-600' },
    { label: 'Students Helped', value: '12', icon: Users, color: 'text-blue-600' },
    { label: 'Donations Made', value: '3', icon: Heart, color: 'text-red-600' },
    { label: 'Recognition Level', value: 'Silver', icon: Trophy, color: 'text-yellow-600' },
  ];

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  const handleDonate = () => {
    if (!donationAmount) {
      toast.error('Please enter a donation amount');
      return;
    }

    // Mock donation process
    toast.success(`Thank you for your $${donationAmount} donation to ${selectedFund}!`);
    setDonationAmount('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Donations</h1>
          <p className="text-muted-foreground">
            Support your alma mater and help future generations
          </p>
        </div>
        <Badge variant="secondary" className="w-fit">
          Total Alumni Donated: $2.3M this year
        </Badge>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Make a Donation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Make a Donation
              </CardTitle>
              <CardDescription>Support the causes you care about</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fund">Select Fund</Label>
                <Select value={selectedFund} onValueChange={setSelectedFund}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a fund" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Fund</SelectItem>
                    <SelectItem value="scholarship">Scholarship Fund</SelectItem>
                    <SelectItem value="library">Library Construction</SelectItem>
                    <SelectItem value="research">Research Equipment</SelectItem>
                    <SelectItem value="athletics">Athletics Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setDonationAmount(amount.toString())}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message..."
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="recurring" className="text-sm">
                  Make this a monthly donation
                </Label>
              </div>

              <Button onClick={handleDonate} className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Donate ${donationAmount || '0'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your donation is tax-deductible. You will receive a receipt via email.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Campaigns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Current fundraising initiatives you can support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{campaign.title}</CardTitle>
                          <CardDescription>{campaign.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{campaign.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">{Math.round((campaign.raised / campaign.goal) * 100)}%</p>
                          <p className="text-xs text-muted-foreground">Funded</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{campaign.donors}</p>
                          <p className="text-xs text-muted-foreground">Donors</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{campaign.daysLeft}</p>
                          <p className="text-xs text-muted-foreground">Days Left</p>
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={() => {
                          setSelectedFund(campaign.title.toLowerCase().replace(/\s+/g, '-'));
                          document.getElementById('amount')?.focus();
                        }}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Support This Campaign
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Donation History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Donation History
          </CardTitle>
          <CardDescription>Your contribution history and tax records</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="impact">Your Impact</TabsTrigger>
              <TabsTrigger value="recognition">Recognition</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Recent Donations</h3>
                <Button variant="outline" size="sm">
                  Download Tax Receipt
                </Button>
              </div>
              <div className="space-y-3">
                {donationHistory.map((donation) => (
                  <Card key={donation.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">${donation.amount}</p>
                            <p className="text-sm text-muted-foreground">{donation.fund}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{new Date(donation.date).toLocaleDateString()}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{donation.status}</Badge>
                            {donation.tax_deductible && (
                              <Badge variant="outline" className="text-xs">Tax Deductible</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Students Supported</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Scholarship Recipients</span>
                        <span className="font-bold">8 students</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Emergency Aid</span>
                        <span className="font-bold">4 students</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Total Impact</span>
                        <span className="font-bold text-green-600">12 students</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Research Contributions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Research Projects</span>
                        <span className="font-bold">3 projects</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Equipment Purchased</span>
                        <span className="font-bold">2 items</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Publications</span>
                        <span className="font-bold">5 papers</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recognition" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full">
                  <Trophy className="h-10 w-10 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Silver Donor</h3>
                  <p className="text-muted-foreground">Thank you for your generous support!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-bronze rounded-full mx-auto mb-2 bg-amber-600"></div>
                    <p className="text-sm font-medium">Bronze</p>
                    <p className="text-xs text-muted-foreground">$100+</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-accent">
                    <div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Silver</p>
                    <p className="text-xs text-muted-foreground">$500+</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Gold</p>
                    <p className="text-xs text-muted-foreground">$1,000+</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}