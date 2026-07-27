import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Send, X, MessageSquare, Activity, Sparkles, 
  Calculator, AlertTriangle, Pill, Check, Search, Info 
} from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'finder' | 'tools'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm Pharmakon's Smart Health & Catalog Assistant. How can I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ["Search Medical Catalog", "Delivery & Logistics FAQ", "Check Symptoms", "Health Calculators"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Symptom finder states
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  // Health tools states
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [dosageWeight, setDosageWeight] = useState('');
  const [dosageMed, setDosageMed] = useState('paracetamol'); // paracetamol, ibuprofen
  const [dosageResult, setDosageResult] = useState(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getAIResponse(queryText);
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: response.text,
        recommendations: response.recommendations || null,
        links: response.links || null,
        suggestions: response.suggestions || null,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const getAIResponse = (query) => {
    const q = query.toLowerCase().trim();
    
    // Default reply template
    let text = "";
    let recommendations = [];
    let links = [];
    let suggestions = [];

    // Greetings
    if (q.match(/\b(hi|hello|hey|greetings|morning|afternoon|yo)\b/)) {
      return {
        text: "Hello! I am your Pharmakon Smart Assistant. I can recommend medical catalog supplies, answer delivery/ordering FAQs, or compute health indicators. Try asking something like 'Do you deliver cold chain?' or select from below.",
        suggestions: ["Do you deliver cold chain?", "Show Products Catalog", "How to order?", "Health Calculators"]
      };
    }

    // Products / Catalog
    if (q.includes("product") || q.includes("catalog") || q.includes("medicine") || q.includes("supplies") || q.includes("equipment")) {
      text = "Pharmakon distributes premium pharmaceutical products across 5 primary categories. We ensure all inventory is sourced directly from WHO-GMP certified manufacturers.";
      recommendations = [
        "Prescription Medicines (Antibiotics, Cardiovascular, Diabetes Care)",
        "Over-the-Counter Medicines (Vitamins, Cold & Flu, Digestive Care)",
        "Medical & Laboratory Supplies (Gloves, Testing Kits, Syringes)",
        "Hospital Equipment (Beds, Wheelchairs, Monitors)"
      ];
      links = [{ name: "Browse Catalog", path: "/products" }];
      suggestions = ["Do you have testing kits?", "What prescription medicines do you have?", "Request wholesale price"];
      return { text, recommendations, links, suggestions };
    }

    // Testing kits / Lab
    if (q.includes("testing") || q.includes("kit") || q.includes("lab") || q.includes("reagent") || q.includes("microscope")) {
      text = "Yes, we supply premium Laboratory Supplies including rapid diagnostic test kits, laboratory reagents, and analytical equipment for clinics and diagnostic labs.";
      recommendations = ["Laboratory Supplies (Testing Kits, Reagents, Equipment)"];
      links = [{ name: "View Laboratory Products", path: "/products" }];
      suggestions = ["Are these WHO certified?", "Request a quote", "Back to catalog"];
      return { text, recommendations, links, suggestions };
    }

    // Prescription specific
    if (q.includes("prescription") || q.includes("antibiotic") || q.includes("cardio") || q.includes("diabetes") || q.includes("insulin")) {
      text = "Our Prescription Medicines section covers critical therapeutic areas such as Cardiovascular agents, Diabetes care (insulin, oral hypoglycemics), and high-grade Antibiotics. These require a valid license/prescription from medical practitioners.";
      recommendations = ["Prescription Medicines (Antibiotics, Pain Relief, Cardiovascular, Diabetes Care)"];
      links = [{ name: "View Prescription Line", path: "/products" }];
      suggestions = ["Do you supply OTC drugs?", "How to order bulk?", "Symptom Finder"];
      return { text, recommendations, links, suggestions };
    }

    // Cold chain / Logistics
    if (q.includes("cold chain") || q.includes("temperature") || q.includes("fridge") || q.includes("refrigerat") || q.includes("sensitive")) {
      text = "Pharmakon features state-of-the-art Cold Chain Logistics. We guarantee climate-controlled warehousing and temperature-monitored refrigerated transport for sensitive vaccines, biologicals, and insulin products.";
      recommendations = ["Cold Chain Logistics (Refrigerated transport, active data loggers)"];
      links = [{ name: "Our Distribution System", path: "/distribution" }];
      suggestions = ["What are your delivery times?", "Do you deliver nationwide?", "Contact Logistics Team"];
      return { text, recommendations, links, suggestions };
    }

    // Delivery / Logistics
    if (q.includes("delivery") || q.includes("ship") || q.includes("transport") || q.includes("logistics") || q.includes("timelines")) {
      text = "Standard nationwide distribution takes 2-3 business days. For urgent medical emergencies, we offer dedicated express 24-hour delivery options.";
      recommendations = [
        "Standard Delivery: 2-3 business days",
        "Express Delivery: Under 24 hours (subject to urgency level)",
        "Cold Chain: Custom climate monitored containers"
      ];
      links = [{ name: "Distribution Network", path: "/distribution" }];
      suggestions = ["Is delivery nationwide?", "Do you have cold chain?", "How to order?"];
      return { text, recommendations, links, suggestions };
    }

    // Wholesale / How to order
    if (q.includes("order") || q.includes("wholesale") || q.includes("bulk") || q.includes("buy") || q.includes("price") || q.includes("quote")) {
      text = "To place an order or receive a wholesale quote:\n1. You can email us at info@pharmakon.com\n2. Call our sales office at +1 (555) 123-4567\n3. Fill out the contact form on our website.";
      links = [{ name: "Get in touch / Contact Form", path: "/contact" }];
      suggestions = ["What is the phone number?", "Where are you located?", "Show Products"];
      return { text, links, suggestions };
    }

    // Symptom-based
    if (q.includes("fever") || q.includes("cold") || q.includes("cough") || q.includes("flu") || q.includes("running nose") || q.includes("congestion")) {
      text = "For common cold, flu, and fever, we distribute multiple OTC options including antihistamines, cough syrups, vitamins, and antipyretics (like paracetamol).\n\n⚠️ Disclaimer: Self-medication can be risky. Always check with a medical professional. If symptoms persist for more than 3 days, please see a doctor.";
      recommendations = ["OTC Medicines (Vitamins, Cold & Flu, First Aid)"];
      links = [{ name: "View OTC Catalog", path: "/products" }];
      suggestions = ["Calculate child paracetamol dose", "Do you supply testing kits?"];
      return { text, recommendations, links, suggestions };
    }

    if (q.includes("pain") || q.includes("headache") || q.includes("sprain") || q.includes("inflammation") || q.includes("joint")) {
      text = "We offer a wide array of pain relief medications, from OTC NSAIDs (Ibuprofen, Naproxen) to prescription cardiovascular and orthopedic remedies.\n\n⚠️ Note: NSAIDs should be taken with food. Do not exceed the maximum daily allowance.";
      recommendations = ["OTC Medicines (Pain Relief, First Aid)", "Prescription Medicines (Pain Relief, Cardiovascular)"];
      links = [{ name: "View Products", path: "/products" }];
      suggestions = ["Ibuprofen Dosage Calculator", "Contact Sales"];
      return { text, recommendations, links, suggestions };
    }

    // Contact info
    if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("address") || q.includes("location") || q.includes("hours")) {
      text = `Here is our official contact information:
📍 Address: ${siteData.contact.info.address}
📞 Phone: ${siteData.contact.info.phone}
✉️ Email: ${siteData.contact.info.email}
⏰ Office Hours: ${siteData.contact.info.hours}`;
      links = [{ name: "Contact Page", path: "/contact" }];
      suggestions = ["Send an Inquiry", "Explore Products"];
      return { text, links, suggestions };
    }

    // Calculators
    if (q.includes("calculator") || q.includes("bmi") || q.includes("dosage") || q.includes("weight") || q.includes("height")) {
      text = "I have built-in Health Calculators! Click on the 'Health Tools' tab at the top of this widget to calculate your Body Mass Index (BMI) or get a safe pediatric dosage estimate.";
      suggestions = ["Go to Health Tools", "What products do you have?"];
      return { text, suggestions };
    }

    // Default fallbacks
    return {
      text: "I've processed your message. I am constantly learning, but I might not have specific data on that. You can browse our product lines, read our services, or speak directly with our logistics team for precise answers.",
      suggestions: ["Browse Products", "Delivery Timelines", "Contact Customer Support"]
    };
  };

  // Symptom categories for Product Finder
  const symptomCategories = [
    {
      id: 'cold_flu',
      symptom: 'Cold, Flu & Fever',
      matchText: 'For congestion, runny nose, or mild fever, standard OTC remedies are recommended.',
      products: ['Vitamins & Zinc', 'Cough & Cold Syrups', 'Paracetamol Tablets', 'Thermometers']
    },
    {
      id: 'pain_inflammation',
      symptom: 'Body Pain & Headaches',
      matchText: 'For muscle aches, joint pain, or dental pain, anti-inflammatory medicines are appropriate.',
      products: ['Ibuprofen Tablets', 'Pain Relief Gel/Sprays', 'Bandages & Braces', 'Ice Packs']
    },
    {
      id: 'wound_care',
      symptom: 'Minor Cuts & First Aid',
      matchText: 'Essential supplies for immediate skin protection, antiseptic treatment, and dressings.',
      products: ['Sterile Gloves', 'Adhesive Bandages', 'Antiseptic Solution', 'Cotton & Gauze Roll']
    },
    {
      id: 'chronic_care',
      symptom: 'Hypertension or Diabetes Monitoring',
      matchText: 'Daily tracking and management tools for cardiovascular and metabolic conditions.',
      products: ['BP Machines', 'Blood Glucose Test Kits', 'Lancets & Test Strips', 'Insulin Cooling Cases']
    }
  ];

  // Calculators logic
  const calculateBMI = (e) => {
    e.preventDefault();
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100; // to meters
    if (!w || !h) return;
    
    const bmi = (w / (h * h)).toFixed(1);
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-yellow-600';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-600';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-orange-600';
    } else {
      category = 'Obese';
      color = 'text-red-600';
    }

    setBmiResult({ bmi, category, color });
  };

  const calculateDosage = (e) => {
    e.preventDefault();
    const wt = parseFloat(dosageWeight);
    if (!wt) return;

    let doseRange = '';
    let frequency = '';

    if (dosageMed === 'paracetamol') {
      // 10-15 mg/kg per dose
      const min = Math.round(wt * 10);
      const max = Math.round(wt * 15);
      doseRange = `${min}mg - ${max}mg`;
      frequency = 'Every 4 to 6 hours as needed (Max 4 times in 24 hours)';
    } else {
      // Ibuprofen: 5-10 mg/kg per dose
      const min = Math.round(wt * 5);
      const max = Math.round(wt * 10);
      doseRange = `${min}mg - ${max}mg`;
      frequency = 'Every 6 to 8 hours as needed (Max 3 times in 24 hours)';
    }

    setDosageResult({ doseRange, frequency, med: dosageMed === 'paracetamol' ? 'Paracetamol / Acetaminophen' : 'Ibuprofen' });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group pulse-glow-primary cursor-pointer border border-white/20"
      >
        <Sparkles className="animate-pulse group-hover:rotate-12 transition-transform duration-300" size={20} />
        <span className="font-semibold text-sm tracking-wide">Pharmakon AI</span>
        {/* Glowing circle indicator */}
        <span className="w-2.5 h-2.5 bg-green-400 rounded-full border border-white animate-ping absolute -top-0.5 -right-0.5"></span>
        <span className="w-2.5 h-2.5 bg-green-400 rounded-full border border-white absolute -top-0.5 -right-0.5"></span>
      </button>

      {/* AI Assistant Modal Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[550px] z-50 rounded-2xl glass-panel-dark text-slate-100 flex flex-col shadow-2xl border border-white/10 animate-slide-in overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary/30 to-blue-900/40 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/40">
                <Bot className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-bold font-heading text-sm text-white flex items-center gap-1.5">
                  Pharmakon AI Assistant
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                </h4>
                <p className="text-xs text-slate-400">Online & ready to consult</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex text-xs bg-slate-900/60 border-b border-white/5">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-center font-medium border-b-2 transition-all ${
                activeTab === 'chat' 
                  ? 'border-primary text-primary bg-primary/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              💬 AI Chat
            </button>
            <button
              onClick={() => setActiveTab('finder')}
              className={`flex-1 py-3 text-center font-medium border-b-2 transition-all ${
                activeTab === 'finder' 
                  ? 'border-primary text-primary bg-primary/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              🩺 Symptom Finder
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex-1 py-3 text-center font-medium border-b-2 transition-all ${
                activeTab === 'tools' 
                  ? 'border-primary text-primary bg-primary/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              📊 Health Tools
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-slate-950/20">
            {activeTab === 'chat' && (
              <>
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {/* Speaker name */}
                    <span className="text-[10px] text-slate-500 mb-1 px-1 flex items-center gap-1">
                      {msg.sender === 'bot' ? <Bot size={10} /> : null}
                      {msg.sender === 'bot' ? 'Pharmakon AI' : 'You'} • {msg.time}
                    </span>

                    {/* Bubble */}
                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-slate-800/80 border border-slate-700/50 text-slate-100 rounded-tl-none'
                    }`}>
                      {msg.text.split('\n').map((line, idx) => (
                        <p key={idx} className="mb-1 last:mb-0">{line}</p>
                      ))}

                      {/* AI Recommendations */}
                      {msg.recommendations && (
                        <div className="mt-3 pt-2.5 border-t border-slate-700/50 space-y-1.5">
                          <p className="text-xs font-semibold text-primary flex items-center gap-1">
                            <Pill size={12} /> Matches in Catalog:
                          </p>
                          <ul className="text-xs space-y-1 list-disc list-inside text-slate-300">
                            {msg.recommendations.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Custom links */}
                      {msg.links && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.links.map((link, i) => (
                            <Link
                              key={i}
                              to={link.path}
                              onClick={() => { if (link.path === '/contact' || link.path === '/products') setIsOpen(false); }}
                              className="text-xs bg-primary/20 hover:bg-primary/30 text-sky-400 font-medium px-2.5 py-1 rounded-lg border border-primary/30 transition-colors flex items-center gap-1"
                            >
                              <Info size={12} /> {link.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Suggestions list */}
                    {msg.suggestions && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 justify-start max-w-[90%]">
                        {msg.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              if (suggestion === "Health Calculators" || suggestion === "Go to Health Tools") {
                                setActiveTab('tools');
                              } else {
                                handleSend(suggestion);
                              }
                            }}
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 transition-all hover:border-slate-500 cursor-pointer"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] text-slate-500 mb-1 px-1 flex items-center gap-1">
                      <Bot size={10} /> Pharmakon AI is analyzing...
                    </span>
                    <div className="bg-slate-800/50 border border-slate-700/30 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </>
            )}

            {activeTab === 'finder' && (
              <div className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex gap-2">
                  <Bot className="text-primary shrink-0" size={18} />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Select a symptom below. Our smart engine will match it with our pharmaceutical catalog line.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {symptomCategories.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedSymptom(selectedSymptom?.id === sc.id ? null : sc)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        selectedSymptom?.id === sc.id 
                          ? 'bg-primary/20 border-primary text-white shadow-lg' 
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{sc.symptom}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedSymptom?.id === sc.id ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {selectedSymptom?.id === sc.id ? 'Selected' : 'View'}
                        </span>
                      </div>
                      
                      {selectedSymptom?.id === sc.id && (
                        <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-2 animate-slide-in">
                          <p className="text-xs text-slate-300 leading-relaxed italic">
                            "{sc.matchText}"
                          </p>
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Recommended Supplies:</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {sc.products.map((p) => (
                                <span key={p} className="text-xs bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1 rounded-md flex items-center gap-1">
                                  <Check size={10} className="text-green-500" /> {p}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-2 flex justify-end">
                            <Link 
                              to="/products"
                              onClick={() => setIsOpen(false)}
                              className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-1"
                            >
                              <Search size={12} /> Explore Products Catalog
                            </Link>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="space-y-6">
                {/* BMI Calculator */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h5 className="font-bold text-sm text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <Activity size={16} className="text-primary" /> Body Mass Index (BMI)
                  </h5>
                  <form onSubmit={calculateBMI} className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider">Weight (kg)</label>
                      <input
                        type="number"
                        placeholder="70"
                        value={bmiWeight}
                        onChange={(e) => setBmiWeight(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider">Height (cm)</label>
                      <input
                        type="number"
                        placeholder="175"
                        value={bmiHeight}
                        onChange={(e) => setBmiHeight(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="col-span-2 bg-primary hover:bg-blue-600 text-white rounded-lg py-2 text-xs font-semibold mt-1 transition-colors cursor-pointer"
                    >
                      Calculate BMI
                    </button>
                  </form>

                  {bmiResult && (
                    <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center animate-slide-in">
                      <p className="text-xs text-slate-400">Your Body Mass Index is</p>
                      <p className="text-2xl font-bold text-white my-1">{bmiResult.bmi}</p>
                      <p className={`text-xs font-bold ${bmiResult.color}`}>{bmiResult.category}</p>
                    </div>
                  )}
                </div>

                {/* Pediatric Dosage Calculator */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h5 className="font-bold text-sm text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <Calculator size={16} className="text-primary" /> Pediatric Dosage Estimator
                  </h5>
                  <form onSubmit={calculateDosage} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider">Child Weight (kg)</label>
                        <input
                          type="number"
                          placeholder="15"
                          value={dosageWeight}
                          onChange={(e) => setDosageWeight(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider">Medication</label>
                        <select
                          value={dosageMed}
                          onChange={(e) => setDosageMed(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-primary"
                        >
                          <option value="paracetamol">Paracetamol</option>
                          <option value="ibuprofen">Ibuprofen</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-blue-600 text-white rounded-lg py-2 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Estimate Safe Dosage
                    </button>
                  </form>

                  {dosageResult && (
                    <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 space-y-2 animate-slide-in">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-primary">
                        <Pill size={12} /> {dosageResult.med} Dose
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase">Recommended Dose:</span>
                        <p className="text-lg font-bold text-white">{dosageResult.doseRange}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase">Frequency:</span>
                        <p className="text-xs text-slate-300 leading-normal">{dosageResult.frequency}</p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2 flex gap-1.5">
                        <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={12} />
                        <p className="text-[9px] text-yellow-400 leading-normal">
                          Disclaimer: Always verify with a pediatrician before administering medication.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Input for Chat */}
          {activeTab === 'chat' && (
            <div className="p-3 border-t border-white/10 bg-slate-950/40 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                placeholder="Ask about catalogs, cold chain, ordering..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => handleSend()}
                className="bg-primary hover:bg-blue-600 text-white p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
