export const PRODUCTS = [
  { id:1, name:"Velvet Cloud Sectional",  cat:"Sofa",    price:89999,  mrp:120000, disc:25, sizes:["Standard", "L-Shape"], img:"products/velvet_sectional.png",   isNew:true,  hot:true,  tags:["sofa","sectional","velvet","luxury","living room","blue"] },
  { id:2, name:"Marble Elegance Dining",  cat:"Dining",  price:145000, mrp:180000, disc:19, sizes:["6-Seater", "8-Seater"], img:"products/marble_dining_set.png", isNew:true,  hot:true,  tags:["dining","marble","table","set","luxury","kitchen"] },
  { id:3, name:"Aura Crystal Chandelier", cat:"Lighting",price:24999,  mrp:35000,  disc:28, sizes:["Standard"],           img:"products/crystal_chandelier.png", isNew:true,  hot:false, tags:["lighting","chandelier","crystal","ceiling","luxury"] },
  { id:4, name:"Royal Canopy Bed",        cat:"Bed",     price:95000,  mrp:130000, disc:27, sizes:["King", "Queen"],      img:"products/royal_canopy_bed.png",    isNew:false, hot:true,  tags:["bed","canopy","royal","bedroom","luxury","sleep"] },
  { id:5, name:"Scandi Oak Sideboard",    cat:"Sideboard",price:42000, mrp:55000,  disc:24, sizes:["Standard"],           img:"products/scandi_oak_sideboard.png", isNew:false, hot:false, tags:["sideboard","oak","scandinavian","storage","wood"] },
  { id:6, name:"Leather Armchair",        cat:"Armchair", price:32000, mrp:45000,  disc:29, sizes:["Standard"],           img:"products/leather_armchair.png",    isNew:false, hot:false, tags:["armchair","leather","reading","chair","tan"] },
];

const KB = {
  brand:    "Ghar Saaj is a premium luxury furniture brand — *'Elevating Homes, Connecting Souls'*. We craft bespoke furniture and interior solutions for the modern home.",
  shipping: "🚚 White-glove delivery and professional installation. Furniture orders are dispatched within 7–14 days. Delivery depends on location and piece complexity.",
  returns:  "↩️ 48-hour return window for defective or damaged items. Since our pieces are built to order, we do not accept returns for change of mind or dimension issues.",
  payment:  "💳 Secure payments via UPI, Credit/Debit Cards, and Net Banking. We offer EMI options for large furniture purchases via our secure gateway.",
  sizes:    "📐 Detailed dimension guides (W x D x H) are available on every product page. Please measure your space carefully. Need help? Ask for a design consultation!",
  contact:  "📞 Email: support@gharsaa.in | Phone: +91 81037 58319 | Instagram: @gharsaa.in | Mon–Sat, 10AM–7PM.",
  quality:  "👌 Premium hardwoods, top-grain leathers, and designer fabrics. Every piece undergoes rigorous quality checks before dispatch. 1-year warranty included.",
  offers:   `🏷️ Current highlights: ${PRODUCTS.map(p=>`${p.name} – ${p.disc}% off`).join(' | ')}. Best deal: Leather Armchair at 29% off!`,
};

const INTENTS = [
  { name:'greeting',   words:['hi','hello','hey','namaste','hii','hlo','howdy','sup'],  weight:10 },
  { name:'bye',        words:['bye','goodbye','thanks','thank','thx','shukriya'],        weight:10 },
  { name:'sofa',       words:['sofa','sectional','couch','seating','living'],           weight:8  },
  { name:'dining',     words:['dining','table','chair','kitchen'],                      weight:8  },
  { name:'bed',        words:['bed','bedroom','sleep','mattress','king','queen'],       weight:8  },
  { name:'lighting',   words:['lighting','lamp','chandelier','light'],                  weight:8  },
  { name:'price',      words:['price','cost','kitna','budget','expensive','cheap'],     weight:7  },
  { name:'offer',      words:['offer','discount','sale','deal','promo','coupon'],       weight:8  },
  { name:'shipping',   words:['shipping','delivery','deliver','dispatch','install'],    weight:8  },
  { name:'return',     words:['return','refund','exchange','cancel','damaged'],         weight:8  },
  { name:'payment',    words:['payment','pay','upi','card','emi','installments'],      weight:8  },
  { name:'size',       words:['size','dimension','measurement','height','width','fit'], weight:8  },
  { name:'new',        words:['new','arrival','latest','fresh','collection'],           weight:7  },
  { name:'bestseller', words:['best','seller','popular','trending','top'],              weight:7  },
  { name:'track',      words:['track','tracking','order','status','where'],             weight:7  },
  { name:'account',    words:['account','login','signup','register','profile'],         weight:8  },
  { name:'quality',    words:['quality','material','wood','leather','warranty'],        weight:7  },
  { name:'brand',      words:['gharsaj','gharsaa','gharsaj','brand','about','story'],   weight:7  },
  { name:'wishlist',   words:['wishlist','favourite','favorite','save','heart'],        weight:7  },
  { name:'contact',    words:['contact','support','help','phone','email','consult'],    weight:7  },
  { name:'all',        words:['all','show','list','catalog','everything','products'],   weight:6  },
  { name:'hindi',      words:['kya','kaise','kitna','chahiye','batao','mujhe','aur'],   weight:5  },
];

export function detectIntent(input) {
  const words = input.toLowerCase().split(/\s+/);
  const scores = {};
  for (const intent of INTENTS) {
    let score = 0;
    for (const w of words) {
      if (intent.words.some(iw => w.includes(iw) || iw.includes(w))) score += intent.weight;
    }
    if (score > 0) scores[intent.name] = score;
  }
  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  return sorted[0]?.[0] || 'fallback';
}

export function detectSentiment(input) {
  const q = input.toLowerCase();
  if (/worst|terrible|bad|rubbish|pathetic|useless|angry|hate|fraud|scam/.test(q)) return 'negative';
  if (/great|amazing|love|excellent|awesome|thanks|perfect|happy/.test(q)) return 'positive';
  return 'neutral';
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.tags.some(t => q.includes(t)) || q.includes(p.name.toLowerCase()) || q.includes(p.cat.toLowerCase())
  );
}

export function getSmartResponse(input, ctx) {
  const intent = detectIntent(input);
  const sentiment = detectSentiment(input);
  const q = input.toLowerCase();

  if (sentiment === 'negative') {
    return { text:"I'm truly sorry for any inconvenience 😔 Our goal is to provide a seamless luxury experience. Please contact us at **support@gharsaa.in** or call **+91 81037 58319** and a design expert will assist you immediately.", quickReplies:["Contact support","Return policy","Track order"] };
  }
  if (sentiment === 'positive') {
    return { text:"We're delighted to hear that! 🙏 At Ghar Saaj, we love making your home beautiful. Is there anything else I can help you with?", quickReplies:["Show offers","New arrivals","Best sellers"] };
  }

  const budgetMatch = q.match(/(?:under|below|less than|within)\s*₹?\s*(\d+)/);
  if (budgetMatch) {
    const budget = parseInt(budgetMatch[1]);
    const fits = PRODUCTS.filter(p => p.price <= budget);
    if (!fits.length) return { text:`Our luxury pieces start from **₹24,999 (Aura Crystal Chandelier)**. We don't have items below ₹${budget} currently. 🏷️`, quickReplies:["Show all products","Best sellers"] };
    return { text:`Luxury pieces under ₹${budget}:`, products:fits, quickReplies:["Add to wishlist","Book consultation"] };
  }

  switch(intent) {
    case 'greeting':
      return { text:ctx.isReturning
        ? "Welcome back to Ghar Saaj! 😊 Ready to continue elevating your home? How can I help today?"
        : "Hey! 👋 I'm the **Ghar Saaj AI** — your personal interior design and shopping guide. Ask me anything about our furniture or services!",
        quickReplies:["Show all products","Best sellers","New arrivals","Current offers"] };

    case 'bye':
      return { text:"Thank you for visiting Ghar Saaj! 🙏 *Elevating Homes, Connecting Souls* — we hope to see you again soon. Have a beautiful day! 🏠", quickReplies:[] };

    case 'sofa': {
      const items = PRODUCTS.filter(p => p.cat === 'Sofa');
      return { text:`We have premium **Sofa & Sectional** designs for your living room:`, products:items, quickReplies:["Dimension guide","Installation info","Return policy"] };
    }
    case 'dining': {
      const items = PRODUCTS.filter(p => p.cat === 'Dining');
      return { text:`Discover our **Marble & Oak Dining** sets:`, products:items, quickReplies:["Dimension guide","Material details","Shipping info"] };
    }
    case 'bed': {
      const items = PRODUCTS.filter(p => p.cat === 'Bed');
      return { text:`Upgrade your bedroom with our **Royal Collection**:`, products:items, quickReplies:["Dimension guide","Mattress compatibility"] };
    }
    case 'lighting': {
      const items = PRODUCTS.filter(p => p.cat === 'Lighting');
      return { text:`Illuminate your space with our **Designer Chandeliers**:`, products:items, quickReplies:["Installation info","Bulb types"] };
    }
    case 'offer':
      return { text:KB.offers, quickReplies:["Show best deal","New arrivals","All products"] };

    case 'shipping':
      return { text:KB.shipping, quickReplies:["Installation help","Track order","Return policy"] };

    case 'return':
      return { text:KB.returns, quickReplies:["Contact support","Track order","Warranty info"] };

    case 'payment':
      return { text:KB.payment, quickReplies:["EMI options","Shipping info"] };

    case 'size':
      return { text:KB.sizes, quickReplies:["Sofa dimensions","Bed dimensions","Dining dimensions"] };

    case 'price':
      return { text:`Our premium collection ranges from **₹24,999 to ₹1,45,000** with significant seasonal discounts.\n\n🌟 Entry: Aura Crystal Chandelier at ₹24,999\n👑 Signature: Marble Elegance Dining at ₹1,45,000\n\nAll prices include professional installation and 1-year warranty.`, quickReplies:["Show all products","Best offers","Book consultation"] };

    case 'new': {
      const items = PRODUCTS.filter(p => p.isNew);
      return { text:`✨ **${items.length} New Arrivals** in our Modern Collection:`, products:items, quickReplies:["Best sellers","Show offers"] };
    }
    case 'bestseller': {
      const items = PRODUCTS.filter(p => p.hot);
      return { text:`🔥 Our **Most Loved** signature pieces:`, products:items, quickReplies:["New arrivals","Current offers"] };
    }
    case 'track':
      return { text:`📦 **Track Your Furniture Order:**\nGo to the **Track Order** page from the sidebar → enter your GHAR Order ID.\n\n🔍 Tracking details are also sent via WhatsApp once the piece is dispatched.`, quickReplies:["Contact support","Shipping info"] };

    case 'account':
      return { text:`👤 **Ghar Saaj Member Benefits:**\n• Exclusive early access to new collections\n• Save your favorite designs to Wishlist\n• Personalized design consultations\n• Order history & tracking\n\n👉 Sign up via the sidebar → Account!`, quickReplies:["Current offers","New arrivals"] };

    case 'quality':
      return { text:KB.quality, quickReplies:["Warranty info","Material guide","Show products"] };

    case 'brand':
      return { text:`${KB.brand}\n\n🧵 We believe that furniture is not just about utility; it's about the soul of your home. Our mission: *Elevating Homes, Connecting Souls.*`, quickReplies:["Show all products","Contact us"] };

    case 'wishlist':
      return { text:`❤️ **Wishlist:**\nTap the heart icon on any design to save it for later. Access your Wishlist from the header to plan your home makeover!`, quickReplies:["Show best sellers","Account info"] };

    case 'contact':
      return { text:KB.contact, quickReplies:["Book consultation","FAQs","Return policy"] };

    case 'all':
      return { text:`🛍️ **Discover our Full Collection:**`, products:PRODUCTS, quickReplies:["Best sellers","New arrivals","Current offers"] };

    case 'hindi':
      return { text:`Namaste! 🙏 Main Ghar Saaj ke furniture aur services ke baare mein sab jaanta hoon!\n\nAap pooch sakte hain:\n• **Furniture** – Sofas, Beds, Dining, Lighting\n• **Price** – Luxury pieces ₹24,999 se shuru\n• **Services** – Free installation aur design consultation\n• **Return** – 48-hour damaged item policy\n\nAapko kya jaanna hai? 😊`, quickReplies:["Sare products dikhao","Offers kya hain","Sofa collection"] };

    default: {
      const matched = searchProducts(input);
      if (matched.length) return { text:`I found these beautiful pieces for you:`, products:matched, quickReplies:["Dimension guide","Installation info"] };
      return { text:`I'm here to help you find the perfect furniture for your home 🤔 You can ask about:\n\n🛍️ **Furniture Types** • 💰 **Pricing** • 🚚 **Delivery**\n🎨 **Design Help** • 💳 **EMI Options** • 📦 **Tracking**\n\nTry asking: *"Show Sofa Collection"*, *"Best dining sets"*, *"Under ₹50,000"*`, quickReplies:["Show all products","Best sellers","Contact support"] };
    }
  }
}
