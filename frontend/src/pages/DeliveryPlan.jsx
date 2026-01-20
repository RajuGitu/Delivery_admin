// import { motion } from "framer-motion";
// import { DeliveryPlanTable } from "@/components/delivery/DeliveryPlanTable";
// import { Truck, MapPin, Clock, Navigation } from "lucide-react";
// import deliveryPerson1 from "@/assets/delivery-person-1.jpg";
// import deliveryPerson2 from "@/assets/delivery-person-2.jpg";
// import deliveryPerson3 from "@/assets/delivery-person-3.jpg";

// const DeliveryPlan = () => {
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center justify-between"
//             >
//                 <div>
//                     <h1 className="text-3xl font-display font-bold flex items-center gap-3">
//                         <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
//                             <Truck className="w-6 h-6 text-accent-foreground" />
//                         </div>
//                         Delivery Plan
//                     </h1>
//                     <p className="text-muted-foreground mt-2">
//                         Manage delivery agents, routes, and dispatch orders for today
//                     </p>
//                 </div>
//             </motion.div>

//             {/* Featured Agents */}
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="grid grid-cols-1 md:grid-cols-3 gap-4"
//             >
//                 {[
//                     { img: deliveryPerson1, name: "Rajesh Kumar", area: "Whitefield", status: "Active", deliveries: 12 },
//                     { img: deliveryPerson2, name: "Suresh Babu", area: "Koramangala", status: "Active", deliveries: 8 },
//                     { img: deliveryPerson3, name: "Lakshmi Devi", area: "Indiranagar", status: "Ready", deliveries: 10 },
//                 ].map((agent, index) => (
//                     <motion.div
//                         key={agent.name}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.2 + index * 0.1 }}
//                         whileHover={{ y: -4 }}
//                         className="relative p-4 rounded-xl bg-card border border-border overflow-hidden group cursor-pointer"
//                     >
//                         <div className="absolute top-0 right-0 w-24 h-24 gradient-primary opacity-10 rounded-bl-full" />
//                         <div className="flex items-center gap-4">
//                             <div className="relative">
//                                 <img
//                                     src={agent.img}
//                                     alt={agent.name}
//                                     className="w-16 h-16 rounded-full object-cover ring-2 ring-border group-hover:ring-primary transition-all"
//                                 />
//                                 <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${agent.status === "Active" ? "bg-success" : "bg-muted-foreground"
//                                     }`} />
//                             </div>
//                             <div className="flex-1">
//                                 <p className="font-semibold">{agent.name}</p>
//                                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                                     <MapPin className="w-3 h-3" />
//                                     {agent.area}
//                                 </div>
//                                 <div className="flex items-center gap-3 mt-2">
//                                     <span className={`text-xs px-2 py-0.5 rounded-full ${agent.status === "Active"
//                                         ? "bg-success/10 text-success"
//                                         : "bg-muted text-muted-foreground"
//                                         }`}>
//                                         {agent.status}
//                                     </span>
//                                     <span className="text-xs text-muted-foreground">
//                                         <Truck className="w-3 h-3 inline mr-1" />
//                                         {agent.deliveries} deliveries
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 ))}
//             </motion.div>

//             {/* Info Bar */}
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-between"
//             >
//                 <div className="flex items-center gap-3">
//                     <Navigation className="w-5 h-5 text-accent" />
//                     <span className="font-medium">Route Optimization Active</span>
//                     <span className="text-muted-foreground">•</span>
//                     <span className="text-muted-foreground">AI-optimized delivery routes based on traffic and time slots</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                     <Clock className="w-4 h-4 text-muted-foreground" />
//                     <span className="text-muted-foreground">Last updated: 2 min ago</span>
//                 </div>
//             </motion.div>

//             {/* Delivery Plan Table */}
//             <DeliveryPlanTable />
//         </div>
//     );
// };

// export default DeliveryPlan;



import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DeliveryPlanTable } from "@/components/delivery/DeliveryPlanTable";
import { Truck, MapPin, Clock, Navigation } from "lucide-react";
import axios from "../../utils/axiosinstance";

// KEEP SAME IMAGES
import deliveryPerson1 from "@/assets/delivery-person-1.jpg";
import deliveryPerson2 from "@/assets/delivery-person-2.jpg";
import deliveryPerson3 from "@/assets/delivery-person-3.jpg";

const DeliveryPlan = () => {
  const [agents, setAgents] = useState([]);

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

  // Map images statically (UI requirement)
  const images = [deliveryPerson3, deliveryPerson2, deliveryPerson1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
              <Truck className="w-6 h-6 text-accent-foreground" />
            </div>
            Delivery Plan
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage delivery agents, routes, and dispatch orders for today
          </p>
        </div>
      </motion.div>

      {/* Featured Agents (UNCHANGED UI) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {agents.slice(0, 3).map((agent, index) => (
          <motion.div
            key={agent._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className="relative p-4 rounded-xl bg-card border border-border overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-24 h-24 gradient-primary opacity-10 rounded-bl-full" />

            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={images[index % images.length]}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-border group-hover:ring-primary transition-all"
                />

                {/* STATUS DOT (UNCHANGED LOGIC) */}
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
                    agent.agentAvailable ? "bg-success" : "bg-muted-foreground"
                  }`}
                />
              </div>

              <div className="flex-1">
                {/* NAME FROM DB */}
                <p className="font-semibold">{agent.name}</p>

                {/* AREA → PINCODE (DB) */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  Pincode: {agent.pincode}
                </div>

                <div className="flex items-center gap-3 mt-2">
                  {/* STATUS BADGE */}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      agent.agentAvailable
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {agent.agentAvailable ? "Active" : "Ready"}
                  </span>

                  {/* DELIVERIES TODAY */}
                  <span className="text-xs text-muted-foreground">
                    <Truck className="w-3 h-3 inline mr-1" />
                    {agent.agentCurrentLoad || 0} deliveries
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Info Bar (UNCHANGED) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Navigation className="w-5 h-5 text-accent" />
          <span className="font-medium">Route Optimization Active</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">
            AI-optimized delivery routes based on traffic and time slots
          </span>
        </div>
        {/* <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Last updated: 2 min ago</span>
        </div> */}
      </motion.div>

      {/* Delivery Plan Table (NEXT STEP) */}
      <DeliveryPlanTable />
    </div>
  );
};

export default DeliveryPlan;
