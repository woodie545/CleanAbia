import { useState, useEffect } from "react";
import { Recycle, Trash2, Plus, Leaf, BarChart2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const PRICE_PER_KG = 600; // fixed rate in ₦, set by the system

export const Tracker = () => {
  const [logs, setLogs] = useState([]); 
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    const savedLogs = localStorage.getItem("ecotrack_logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveLogs = (newLogs) => {
    setLogs(newLogs);
    localStorage.setItem("ecotrack_logs", JSON.stringify(newLogs));
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!item || !category || !weight) {
      toast.error("Please fill in all fields");
      return;
    }

    const parsedWeight = parseFloat(weight);

    const newLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      item,
      category,
      weight: parsedWeight,
      pricePerKg: PRICE_PER_KG,
      earnings: parsedWeight * PRICE_PER_KG,
      date: new Date().toLocaleDateString(),
    };

    const updatedLogs = [newLog, ...logs];
    saveLogs(updatedLogs);
    setItem("");
    setCategory("");
    setWeight("");
    toast.success("Recycling log added!");
  };

  const handleDeleteLog = (id) => {
    const updatedLogs = logs.filter((log) => log.id !== id);
    saveLogs(updatedLogs);
    toast.info("Log entry removed");
  };

  const totalWeight = logs.reduce((sum, log) => sum + log.weight, 0);
  const totalItems = logs.length;
  const totalEarnings = logs.reduce((sum, log) => sum + (log.earnings || 0), 0);

  const formatNaira = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="container px-4 md:px-6 py-12 space-y-12 bg-[#F3F5EE]">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-[#11633b]">Tracking System</h1>
        <p className="text-muted-foreground text-lg">
          Log your recycling activities and see how much waste you've diverted from landfills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#1E5B3E] text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Total Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-center pb-8">
              <p className="text-5xl font-extrabold">{totalWeight.toFixed(1)}</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Kilograms Recycled</p>
            </CardContent>
          </Card>

          <Card className="bg-[#F5A623] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-center pb-8">
              <p className="text-4xl font-extrabold">{formatNaira(totalEarnings)}</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Value of Recyclables</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold">{totalItems}</p>
                <p className="text-sm text-muted-foreground mb-1">items logged</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span>Equivalent to saving</span>
                <span className="font-bold">{(totalWeight * 2.5).toFixed(0)} kWh</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full transition-all duration-500" style={{ width: `${Math.min(totalWeight, 100)}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground text-center italic">Energy saved based on average aluminum and paper recycling</p>
            </CardContent>
          </Card>
        </div>

        {/* Form and Logs */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Log New Item</CardTitle>
              <CardDescription>Keep track of what you've recycled today.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddLog} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="item">Item Name</Label>
                  <Input
                    id="item"
                    placeholder="e.g., Plastic Bottles"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Plastic">Plastic</SelectItem>
                      <SelectItem value="Glass">Glass</SelectItem>
                      <SelectItem value="Paper">Paper</SelectItem>
                      <SelectItem value="Metal">Metal</SelectItem>
                      <SelectItem value="Electronic">Electronic</SelectItem>
                      <SelectItem value="Organic">Organic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Approx. Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="0.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rate (set by system)</Label>
                  <div className="h-10 flex items-center px-3 rounded-md border bg-muted text-sm font-medium text-muted-foreground">
                    ₦{PRICE_PER_KG.toLocaleString("en-NG")} / kg
                  </div>
                </div>
                <div className="flex items-end md:col-span-2">
                  <Button type="submit" className="w-full gap-2 bg-[#1E5B3E] hover:bg-[#1E5B3E]/90 text-white">
                    <Plus className="w-4 h-4" /> Add Log Entry
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BarChart2 className="w-5 h-5" /> Recent Activity
            </h3>
            {logs.length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed rounded-xl space-y-3">
                <Recycle className="w-10 h-10 mx-auto text-muted-foreground/30" />
                <p className="text-muted-foreground">No logs yet. Start by adding your first recycling activity!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-card border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="space-y-1">
                      <p className="font-semibold">{log.item}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-[10px] h-4 px-1">{log.category}</Badge>
                        <span>•</span>
                        <span>{log.date}</span>
                        {log.pricePerKg !== undefined && (
                          <>
                            <span>•</span>
                            <span>{formatNaira(log.pricePerKg)}/kg</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{log.weight} kg</p>
                        {log.earnings !== undefined && (
                          <p className="text-xs font-semibold text-[#1E5B3E]">{formatNaira(log.earnings)}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteLog(log.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
