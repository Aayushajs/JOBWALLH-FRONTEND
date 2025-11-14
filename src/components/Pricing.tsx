"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { Briefcase, CheckCheck, Database, Server, Zap, Crown, Rocket, Award } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { PAYMENT_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";

// Declare Razorpay on window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just starting with recruitment",
    price: 12,
    yearlyPrice: 99,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    features: [
      { text: "Up to 5 job posts per month", icon: <Briefcase size={20} /> },
      { text: "Up to 50 applications", icon: <Database size={20} /> },
      { text: "Basic analytics", icon: <Server size={20} /> },
    ],
    includes: [
      "Free includes:",
      "Standard job listings",
      "Email notifications",
      "Basic applicant tracking",
      "Up to 2 recruiters",
      "7-day support response",
    ],
  },
  {
    name: "Professional",
    description: "Best for growing companies with regular hiring needs",
    price: 29,
    yearlyPrice: 249,
    buttonText: "Get started",
    buttonVariant: "default" as const,
    features: [
      { text: "Up to 20 job posts", icon: <Briefcase size={20} /> },
      { text: "Unlimited applications", icon: <Database size={20} /> },
      { text: "Advanced analytics", icon: <Server size={20} /> },
    ],
    includes: [
      "Everything in Starter, plus:",
      "Featured job listings",
      "Custom branding",
      "Advanced filters",
      "Up to 5 recruiters",
      "24-hour support response",
    ],
  },
  {
    name: "Business",
    description: "Ideal for businesses with high-volume recruitment",
    price: 48,
    yearlyPrice: 399,
    buttonText: "Get started",
    buttonVariant: "default" as const,
    popular: true,
    features: [
      { text: "Unlimited job posts", icon: <Briefcase size={20} /> },
      { text: "Unlimited applications", icon: <Database size={20} /> },
      { text: "Premium analytics & reports", icon: <Server size={20} /> },
    ],
    includes: [
      "Everything in Professional, plus:",
      "Priority job placement",
      "Dedicated account manager",
      "API access",
      "Up to 15 recruiters",
      "Instant support response",
    ],
  },
  {
    name: "Premium",
    description: "Advanced features for competitive hiring advantage",
    price: 79,
    yearlyPrice: 649,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    features: [
      { text: "Unlimited premium posts", icon: <Zap size={20} /> },
      { text: "AI-powered matching", icon: <Database size={20} /> },
      { text: "Custom integrations", icon: <Server size={20} /> },
    ],
    includes: [
      "Everything in Business, plus:",
      "AI candidate screening",
      "Video interview tools",
      "Bulk job posting",
      "Up to 30 recruiters",
      "Premium support 24/7",
    ],
  },
  {
    name: "Elite",
    description: "For large enterprises with complex recruitment needs",
    price: 129,
    yearlyPrice: 1099,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    features: [
      { text: "Unlimited everything", icon: <Crown size={20} /> },
      { text: "White-label solution", icon: <Database size={20} /> },
      { text: "Custom development", icon: <Server size={20} /> },
    ],
    includes: [
      "Everything in Premium, plus:",
      "Custom feature development",
      "Multi-location support",
      "Advanced security features",
      "Unlimited recruiters",
      "Dedicated technical team",
    ],
  },
  {
    name: "Enterprise",
    description: "Ultimate solution with enhanced security and unlimited access",
    price: 199,
    yearlyPrice: 1699,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    features: [
      { text: "Unlimited everything", icon: <Rocket size={20} /> },
      { text: "Enterprise-grade security", icon: <Database size={20} /> },
      { text: "Custom SLA & compliance", icon: <Server size={20} /> },
    ],
    includes: [
      "Everything in Elite, plus:",
      "On-premise deployment option",
      "Custom compliance requirements",
      "Dedicated infrastructure",
      "Unlimited everything",
      "Executive support team",
    ],
  },
  {
    name: "Custom",
    description: "Tailored solution designed specifically for your needs",
    price: null,
    yearlyPrice: null,
    buttonText: "Contact Us",
    buttonVariant: "outline" as const,
    customPrice: true,
    features: [
      { text: "Custom job post limits", icon: <Briefcase size={20} /> },
      { text: "Tailored features", icon: <Database size={20} /> },
      { text: "Flexible pricing", icon: <Server size={20} /> },
    ],
    includes: [
      "Fully customizable:",
      "Choose your features",
      "Custom pricing structure",
      "Scalable infrastructure",
      "Custom team size",
      "Personalized onboarding",
    ],
  },
];

const PricingSwitch = ({
  onSwitch,
  className,
}: {
  onSwitch: (value: string) => void;
  className?: string;
}) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    
    <div className={cn("flex justify-center", className)}>
      <div className="relative z-10 mx-auto flex w-fit rounded-xl bg-neutral-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit cursor-pointer h-12 rounded-xl sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors sm:text-base text-sm",
            selected === "0"
              ? "text-white"
              : "text-muted-foreground hover:text-black dark:hover:text-white",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-12 w-full rounded-xl border-4 shadow-sm shadow-orange-600 border-orange-600 bg-gradient-to-t from-orange-500 via-orange-400 to-orange-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly Billing</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit cursor-pointer h-12 flex-shrink-0 rounded-xl sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors sm:text-base text-sm",
            selected === "1"
              ? "text-white"
              : "text-muted-foreground hover:text-black dark:hover:text-white",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-12 w-full rounded-xl border-4 shadow-sm shadow-orange-600 border-orange-600 bg-gradient-to-t from-orange-500 via-orange-400 to-orange-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Yearly Billing
            <span className="rounded-full bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 text-xs font-medium text-black dark:text-orange-300">
              Save 20%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  const handlePayment = async (plan: any) => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please login to purchase a plan");
      return;
    }

    // Check for custom plan
    if (plan.customPrice) {
      toast.info("Please contact our sales team for custom pricing");
      return;
    }

    try {
      setLoading(true);
      const amount = isYearly ? plan.yearlyPrice : plan.price;
      
      // 1. Create order on backend
      const { data } = await axios.post(`${PAYMENT_API_END_POINT}/create-order`, {
        amount: amount,
        planName: plan.name,
        purchaseType: "premium_membership"
      }, {
        withCredentials: true
      });

      const order = data.order;

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_RfZUfWH4jnWuVQ", // Replace with your Razorpay TEST key ID
        amount: order.amount,
        currency: "INR",
        name: "Job Search Premium",
        description: `${plan.name} Plan - ${isYearly ? "Yearly" : "Monthly"}`,
        image: "https://img.freepik.com/premium-vector/chat-suitcase-icon-outline-vector-work-job-business-portfolio-color-flat_96318-94993.jpg",
        order_id: order.id,
        
        // Enable all payment methods for testing
        config: {
          display: {
            blocks: {
              banks: {
                name: 'All payment methods',
                instruments: [
                  {
                    method: 'card'
                  },
                  {
                    method: 'netbanking'
                  },
                  {
                    method: 'upi'
                  },
                  {
                    method: 'wallet'
                  }
                ]
              }
            },
            sequence: ['block.banks'],
            preferences: {
              show_default_blocks: true
            }
          }
        },

        handler: async function (response: any) {
          try {
            // 3. Verify payment on backend
            const verifyRes = await axios.post(
              `${PAYMENT_API_END_POINT}/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                withCredentials: true
              }
            );

            if (verifyRes.data.success) {
              // Fetch updated user data
              try {
                const userRes = await axios.get(`${USER_API_END_POINT}/premium-status`, {
                  withCredentials: true
                });
                
                // Update user in Redux with premium status
                const updatedUser = {
                  ...user,
                  hasPremiumAccess: userRes.data.hasPremiumAccess,
                  premiumPlans: userRes.data.premiumPlans
                };
                dispatch(setUser(updatedUser));
                
                // Find the newly added plan
                const newPlan = userRes.data.premiumPlans.find((p: any) => p.planName === plan.name);
                const expiryDate = newPlan ? new Date(newPlan.expiryDate).toLocaleDateString() : 'N/A';
                toast.success(`Payment successful! ${plan.name} plan activated until ${expiryDate}`);
                
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              } catch (error) {
                console.error("Error fetching premium status:", error);
                toast.success("Payment successful! Premium access activated.");
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              }
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error: any) {
            console.error("Verification error:", error);
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },

        prefill: {
          name: user.fullname,
          email: user.email,
          contact: user.phoneNumber || "9999999999",
        },

        theme: {
          color: "#f97316", // Orange color matching your theme
        },

        modal: {
          ondismiss: function() {
            setLoading(false);
            toast.info("Payment cancelled");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        setLoading(false);
        console.error("Payment failed:", response.error);
        toast.error("Payment failed: " + (response.error.description || "Please try again"));
      });
      
      rzp.open();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Failed to initiate payment");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="px-4 pt-24 pb-12 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="max-w-7xl mx-auto relative" ref={pricingRef}>
          <article className="text-left mb-6 space-y-4 max-w-2xl">
        <h2 className="md:text-6xl text-4xl capitalize font-medium text-gray-900 dark:text-white mb-4">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-start"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Premium Job Posting Plans
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="md:text-base text-sm text-gray-600 dark:text-gray-400 w-[80%]"
        >
          Choose the perfect plan for your recruitment needs. Post premium jobs and reach thousands of qualified candidates.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} className="w-fit" />
        </TimelineContent>
      </article>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 py-6">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                z: 50,
                transition: { duration: 0.3 }
              }}
              className="h-full"
            >
              <Card
                className={`relative border-2 transition-all duration-300 h-full cursor-pointer
                  ${plan.popular
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30 shadow-xl shadow-orange-500/20"
                    : "border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-500/10"
                  }
                `}
              >
              <CardHeader className="text-left">
                <div className="flex justify-between items-start">
                  <h3 className="xl:text-3xl md:text-2xl text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                    {plan.name} Plan
                  </h3>
                  {plan.popular && (
                    <div className="">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className="xl:text-sm md:text-xs text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  {plan.customPrice ? (
                    <span className="text-4xl font-semibold text-gray-900 dark:text-white">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold text-gray-900 dark:text-white">
                        ₹
                        <NumberFlow
                          value={isYearly ? plan.yearlyPrice : plan.price}
                          className="text-4xl font-semibold"
                        />
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Premium Status Badge with Crown - Only on Active Plans that user owns */}
                {(() => {
                  const activePlan = user?.premiumPlans?.find(
                    (p) => p.planName === plan.name && new Date(p.expiryDate) > new Date()
                  );
                  return activePlan ? (
                    <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <Crown className="w-7 h-7 text-yellow-500 fill-yellow-400" />
                        </motion.div>
                        <div className="flex-1">
                          <p className="font-bold text-sm flex items-center gap-1">
                            Active Premium Plan
                            <CheckCheck className="w-4 h-4" />
                          </p>
                          <p className="text-xs">Expires: {new Date(activePlan.expiryDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}

                <button
                  onClick={() => handlePayment(plan)}
                  disabled={loading || user?.premiumPlans?.some((p) => p.planName === plan.name && new Date(p.expiryDate) > new Date())}
                  className={`w-full mb-6 p-4 text-xl rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    user?.premiumPlans?.some((p) => p.planName === plan.name && new Date(p.expiryDate) > new Date())
                      ? "bg-gradient-to-t from-green-500 to-green-600 shadow-lg shadow-green-500/50 border border-green-400 text-white"
                      : plan.popular
                      ? "bg-gradient-to-t from-orange-500 to-orange-600 shadow-lg shadow-orange-500/50 border border-orange-400 text-white"
                      : plan.buttonVariant === "outline"
                        ? "bg-gradient-to-t from-neutral-900 to-neutral-600 shadow-lg shadow-neutral-900/50 border border-neutral-700 text-white"
                        : "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 border border-blue-400 text-white"
                  }`}
                >
                  {loading ? "Processing..." : 
                   user?.premiumPlans?.some((p) => p.planName === plan.name && new Date(p.expiryDate) > new Date()) ? "✓ Active" : 
                   plan.buttonText}
                </button>

                <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold uppercase text-gray-900 dark:text-white mb-3">
                    Features
                  </h2>
                  <h4 className="font-medium text-base text-gray-900 dark:text-white mb-3">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2 font-semibold">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="h-6 w-6 bg-white dark:bg-gray-800 border border-orange-500 rounded-full grid place-content-center mt-0.5 mr-3">
                          <CheckCheck className="h-4 w-4 text-orange-500" />
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          </TimelineContent>
        ))}
      </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
