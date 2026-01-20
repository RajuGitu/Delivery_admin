// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { deliveryBoys } from "@/data/mockData";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { cn } from "@/lib/utils";
// import {
//   Truck,
//   MapPin,
//   Clock,
//   Phone,
//   Play,
//   CheckCircle,
//   AlertCircle,
//   Navigation,
//   Package,
// } from "lucide-react";
// import { toast } from "sonner";

// const statusStyles = {
//   not_started: "bg-muted text-muted-foreground border-muted",
//   out_for_delivery: "bg-success/10 text-success border-success/20",
//   completed: "bg-accent/10 text-accent border-accent/20",
// };

// const statusLabels = {
//   not_started: "Not Started",
//   out_for_delivery: "Out for Delivery",
//   completed: "Completed",
// };

// const deliveryStatusStyles = {
//   pending: "bg-muted text-muted-foreground",
//   in_transit: "bg-warning/10 text-warning",
//   delivered: "bg-success/10 text-success",
//   failed: "bg-destructive/10 text-destructive",
// };

// export const DeliveryPlanTable = () => {
//   const [selectedAgent, setSelectedAgent] = useState(null);

//   const handleDispatch = (agent) => {
//     toast.success(`${agent.name} dispatched!`, {
//       description: `Agent is now out for ${agent.totalDeliveriesToday} deliveries`,
//     });
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-card rounded-2xl border border-border shadow-md overflow-hidden"
//       >
//         {/* Header */}
//         <div className="p-6 border-b border-border">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-display font-bold text-xl">
//                 Delivery Agents
//               </h2>
//               <p className="text-muted-foreground text-sm">
//                 Manage daily delivery plans and agent dispatching
//               </p>
//             </div>

//             <Badge
//               variant="outline"
//               className="bg-success/10 text-success border-success/20"
//             >
//               <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
//               {
//                 deliveryBoys.filter(
//                   (d) => d.status === "out_for_delivery"
//                 ).length
//               }{" "}
//               Active
//             </Badge>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-muted/50">
//                 <TableHead>Agent</TableHead>
//                 <TableHead>Employee ID</TableHead>
//                 <TableHead>Assigned Area</TableHead>
//                 <TableHead>Deliveries Today</TableHead>
//                 <TableHead>Shift Time</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               <AnimatePresence>
//                 {deliveryBoys.map((agent, index) => (
//                   <motion.tr
//                     key={agent.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="group hover:bg-muted/50 transition-colors cursor-pointer"
//                     onDoubleClick={() => setSelectedAgent(agent)}
//                   >
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <div className="relative">
//                           <img
//                             src={agent.avatar}
//                             alt={agent.name}
//                             className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
//                           />
//                           <div
//                             className={cn(
//                               "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
//                               agent.status === "out_for_delivery"
//                                 ? "bg-success"
//                                 : agent.status === "completed"
//                                 ? "bg-accent"
//                                 : "bg-muted-foreground"
//                             )}
//                           />
//                         </div>

//                         <div>
//                           <p className="font-medium">{agent.name}</p>
//                           <p className="text-sm text-muted-foreground flex items-center gap-1">
//                             <Phone className="w-3 h-3" />
//                             {agent.phone}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>

//                     <TableCell className="font-mono text-sm">
//                       {agent.employeeId}
//                     </TableCell>

//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <MapPin className="w-4 h-4 text-muted-foreground" />
//                         {agent.assignedArea}
//                       </div>
//                     </TableCell>

//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Truck className="w-4 h-4 text-primary" />
//                         <span className="text-2xl font-display font-bold">
//                           {agent.totalDeliveriesToday}
//                         </span>
//                       </div>
//                     </TableCell>

//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-4 h-4 text-muted-foreground" />
//                         {agent.shiftTime}
//                       </div>
//                     </TableCell>

//                     <TableCell>
//                       <Badge
//                         className={cn("border", statusStyles[agent.status])}
//                       >
//                         {statusLabels[agent.status]}
//                       </Badge>
//                     </TableCell>

//                     <TableCell className="text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => setSelectedAgent(agent)}
//                         >
//                           View Plan
//                         </Button>

//                         {agent.status === "not_started" && (
//                           <Button
//                             size="sm"
//                             className="gradient-success text-success-foreground"
//                             onClick={() => handleDispatch(agent)}
//                           >
//                             <Play className="w-4 h-4 mr-1" />
//                             Dispatch
//                           </Button>
//                         )}
//                       </div>
//                     </TableCell>
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </TableBody>
//           </Table>
//         </div>
//       </motion.div>

//       {/* Dialog */}
//       <Dialog
//         open={!!selectedAgent}
//         onOpenChange={() => setSelectedAgent(null)}
//       >
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-3">
//               {selectedAgent && (
//                 <>
//                   <img
//                     src={selectedAgent.avatar}
//                     alt={selectedAgent.name}
//                     className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
//                   />
//                   <div>
//                     <p className="font-display">{selectedAgent.name}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {selectedAgent.employeeId}
//                     </p>
//                   </div>
//                 </>
//               )}
//             </DialogTitle>
//             <DialogDescription>
//               Detailed delivery route and schedule for today
//             </DialogDescription>
//           </DialogHeader>

//           {selectedAgent && (
//             <div className="space-y-6 py-4">
//               {/* Route Timeline */}
//               <h4 className="font-display font-semibold flex items-center gap-2">
//                 <Navigation className="w-5 h-5 text-primary" />
//                 Route Timeline
//               </h4>

//               {selectedAgent.deliveries.map((stop, index) => (
//                 <motion.div
//                   key={stop.orderId}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex gap-4"
//                 >
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={cn(
//                         "w-10 h-10 rounded-full flex items-center justify-center",
//                         stop.status === "delivered"
//                           ? "gradient-success"
//                           : stop.status === "failed"
//                           ? "bg-destructive"
//                           : "gradient-primary animate-pulse"
//                       )}
//                     >
//                       {stop.status === "delivered" ? (
//                         <CheckCircle className="w-5 h-5 text-white" />
//                       ) : stop.status === "failed" ? (
//                         <AlertCircle className="w-5 h-5 text-white" />
//                       ) : (
//                         <Package className="w-5 h-5 text-white" />
//                       )}
//                     </div>
//                     {index < selectedAgent.deliveries.length - 1 && (
//                       <div className="w-0.5 h-16 bg-border" />
//                     )}
//                   </div>

//                   <div className="flex-1 p-4 rounded-xl bg-muted/50">
//                     <p className="font-semibold">{stop.recipient}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {stop.address}
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Slot: {stop.slot} • ETA: {stop.eta}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  Play,
  CheckCircle,
  AlertCircle,
  Navigation,
  Package,
} from "lucide-react";
import { toast } from "sonner";
import axios from "../../../utils/axiosinstance";

/* STATIC IMAGES (UNCHANGED UI) */
import deliveryPerson1 from "@/assets/delivery-person-1.jpg";
import deliveryPerson2 from "@/assets/delivery-person-2.jpg";
import deliveryPerson3 from "@/assets/delivery-person-3.jpg";

const avatars = [
  deliveryPerson3,
  deliveryPerson2,
  deliveryPerson1,
  deliveryPerson1,
];

/* STATUS STYLES (UNCHANGED) */
const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-muted",
};

const statusLabels = {
  active: "Active",
  inactive: "Inactive",
};

export const DeliveryPlanTable = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("/delivery-boys");
      setAgents(res.data.agents || []);
    } catch (err) {
      console.error("Failed to fetch agents", err);
    }
  };

  const handleDispatch = (agent) => {
    toast.success(`${agent.name} dispatched!`, {
      description: `Agent assigned to plan ${agent.currentPlanId}`,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border shadow-md overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl">
                Delivery Agents
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage daily delivery plans and agent dispatching
              </p>
            </div>

            <Badge
              variant="outline"
              className="bg-success/10 text-success border-success/20"
            >
              <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
              {agents.filter((a) => a.accountStatus === "active").length} Active
            </Badge>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Agent</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Assigned Area</TableHead>
                <TableHead>Deliveries Today</TableHead>
                <TableHead>Shift Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <AnimatePresence>
                {agents.map((agent, index) => (
                  <motion.tr
                    key={agent._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-muted/50 transition-colors cursor-pointer"
                    onDoubleClick={() => setSelectedAgent(agent)}
                  >
                    {/* Agent */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={avatars[index % avatars.length]}
                            alt={agent.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                          />
                          <div
                            className={cn(
                              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                              agent.accountStatus === "active"
                                ? "bg-success"
                                : "bg-muted-foreground",
                            )}
                          />
                        </div>

                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {agent.phone}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Employee ID */}
                    <TableCell className="font-mono text-sm">
                      {agent._id}
                    </TableCell>

                    {/* Assigned Area → PINCODE */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {agent.pincode}
                      </div>
                    </TableCell>

                    {/* Deliveries Today → currentPlanId */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-primary" />
                        <span className="text-2xl font-display font-bold">
                          {agent.currentPlanId ? 1 : 0}
                        </span>
                      </div>
                    </TableCell>

                    {/* Shift Time */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {agent.shiftTime || "—"}
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        className={cn(
                          "border",
                          statusStyles[agent.accountStatus],
                        )}
                      >
                        {statusLabels[agent.accountStatus]}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            try {
                              const res = await axios.get(
                                `/delivery-plans/agent/${agent._id}`,
                              );

                              setSelectedAgent({
                                ...agent,
                                plan: res.data.plan || null,
                              });
                            } catch (err) {
                              console.error(err);

                              // 👇 OPEN dialog EVEN IF NO PLAN
                              setSelectedAgent({
                                ...agent,
                                plan: null,
                              });

                              toast.error(
                                err?.response?.data?.message ||
                                  "Failed to load delivery plan",
                              );
                            }
                          }}
                        >
                          View Plan
                        </Button>

                        {agent.accountStatus === "active" &&
                          !agent.currentPlanId && (
                            <Button
                              size="sm"
                              className="gradient-success text-success-foreground"
                              onClick={() => handleDispatch(agent)}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Dispatch
                            </Button>
                          )}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Dialog (UNCHANGED STRUCTURE, FUTURE PLAN MODEL) */}
      {/* Dialog (UNCHANGED STRUCTURE, PLAN INTEGRATED) */}
      <Dialog
        open={!!selectedAgent}
        onOpenChange={() => setSelectedAgent(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedAgent && (
                <>
                  <img
                    src={avatars[0]}
                    alt={selectedAgent.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
                  />
                  <div>
                    <p className="font-display">{selectedAgent.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedAgent._id}
                    </p>
                  </div>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Detailed delivery route and schedule for today
            </DialogDescription>
          </DialogHeader>

          {/* ================= PLAN BODY ================= */}
          {!selectedAgent?.plan ? (
            <div className="py-10 text-muted-foreground text-center">
              No delivery plan assigned for today
            </div>
          ) : (
            <div className="py-6 space-y-8">
              {selectedAgent.plan.slots.map((slot, slotIndex) => (
                <div key={slot._id || slotIndex}>
                  {/* SLOT HEADER */}
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <p className="font-medium">
                      {slot.startTime} – {slot.endTime}
                    </p>
                    <Badge variant="outline">
                      {slot.deliveries.length} deliveries
                    </Badge>
                  </div>

                  {/* DELIVERY LIST */}
                  <div className="space-y-3 pl-8">
                    {slot.deliveries.map((delivery, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl border bg-muted/30"
                      >
                        <Package className="w-5 h-5 text-primary mt-1" />

                        <div className="flex-1">
                          <p className="font-medium">
                            {delivery.recipientName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {delivery.address}
                          </p>
                        </div>

                        {/* STATUS */}
                        <Badge
                          variant="outline"
                          className={cn(
                            "capitalize",
                            delivery.status === "delivered"
                              ? "bg-success/10 text-success border-success/20"
                              : delivery.status === "issue"
                                ? "bg-destructive/10 text-destructive border-destructive/20"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {delivery.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
