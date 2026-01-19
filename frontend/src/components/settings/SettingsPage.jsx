import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Clock, Bell, Truck, Settings2, Mail, Globe } from "lucide-react";
import { toast } from "sonner";

export const SettingsPage = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully!", {
      description: "Your configuration has been updated",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure system settings and preferences
        </p>
      </motion.div>

      <div className="grid gap-6">
        {/* Slot Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">
                Slot Configuration
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure delivery time slots
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Slot Duration</Label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Maximum Slots per Area</Label>
              <Input type="number" defaultValue="20" />
            </div>

            <div className="space-y-2">
              <Label>First Slot Start Time</Label>
              <Input type="time" defaultValue="09:00" />
            </div>

            <div className="space-y-2">
              <Label>Last Slot End Time</Label>
              <Input type="time" defaultValue="21:00" />
            </div>
          </div>
        </motion.div>

        {/* Delivery Agent Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Truck className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">
                Delivery Agent Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure agent schedules
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Default Shift Start</Label>
              <Input type="time" defaultValue="08:00" />
            </div>

            <div className="space-y-2">
              <Label>Default Shift End</Label>
              <Input type="time" defaultValue="18:00" />
            </div>

            <div className="space-y-2">
              <Label>Max Deliveries per Agent</Label>
              <Input type="number" defaultValue="15" />
            </div>

            <div className="space-y-2">
              <Label>Break Duration (minutes)</Label>
              <Input type="number" defaultValue="30" />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-medium">Working Days</h3>
            <div className="flex flex-wrap gap-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => (
                  <label
                    key={day}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={index < 6}
                      className="rounded border-border"
                    />
                    <span className="font-medium">{day}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center">
              <Bell className="w-5 h-5 text-success-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">
                Notification Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure alerts and reminders
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Pre-delivery Confirmation",
                desc: "Send confirmation request before dispatch",
              },
              {
                title: "Delivery Reminders",
                desc: "Send reminders 2 hours before delivery",
              },
              {
                title: "Reschedule Alerts",
                desc: "Notify when delivery needs rescheduling",
              },
              {
                title: "Agent Dispatch Notifications",
                desc: "Notify agents when dispatched",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Confirmation Lead Time (hours)</Label>
              <Input type="number" defaultValue="24" />
            </div>

            <div className="space-y-2">
              <Label>Reminder Lead Time (hours)</Label>
              <Input type="number" defaultValue="2" />
            </div>
          </div>
        </motion.div>

        {/* Integration Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-dark flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">
                Integration Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure external integrations
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Provider</p>
                  <p className="text-sm text-muted-foreground">
                    SendGrid configured
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Maps API</p>
                  <p className="text-sm text-muted-foreground">
                    Google Maps configured
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end"
        >
          <Button className="gradient-primary" size="lg" onClick={handleSave}>
            Save All Settings
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
