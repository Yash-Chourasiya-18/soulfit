export const PRODUCTS = [
  { id:1, name:"Black Track Pant",       cat:"Pant",    price:1299, mrp:1799, disc:28, sizes:["S","M","L","XL"],    img:"sf_pant.png",   isNew:true,  hot:false, tags:["track","pant","workout","gym","black","comfortable"] },
  { id:2, name:"Soul Fit Oversized Tee", cat:"T-Shirt", price:1199, mrp:1599, disc:25, sizes:["S","M","L","XL"],    img:"sf_tshirt.png", isNew:false, hot:true,  tags:["tshirt","oversized","tee","cotton","casual","everyday"] },
  { id:3, name:"Navy Formal Shirt",      cat:"Shirt",   price:1299, mrp:1699, disc:24, sizes:["S","M","L","XL"],    img:"sf_shirt.png",  isNew:true,  hot:false, tags:["shirt","formal","navy","office","meeting","blue"] },
  { id:4, name:"Beige Cargo Pant",       cat:"Cargo",   price:1399, mrp:1999, disc:30, sizes:["30","32","34","36"], img:"sf_cargo.png",  isNew:false, hot:true,  tags:["cargo","beige","utility","pocket","streetwear"], soon:true },
  { id:5, name:"Classic White Polo",     cat:"T-Shirt", price:899,  mrp:1299, disc:31, sizes:["S","M","L","XL"],    img:"soulfit_category_tshirt_1777394453783.png", isNew:true, hot:true, tags:["polo","white","classic","cotton","collar"] },
  { id:6, name:"Olive Green Track Pant", cat:"Pant",    price:1499, mrp:2199, disc:32, sizes:["30","32","34","36"], img:"soulfit_straight_pant_1777394417759.png",   isNew:false,hot:false,tags:["track","pant","olive","green","gym","zip"] },
  { id:7, name:"Black Printed Shirt",    cat:"Shirt",   price:1199, mrp:1599, disc:25, sizes:["S","M","L","XL"],    img:"soulfit_category_shirt_1777394467745.png",  isNew:false,hot:true, tags:["shirt","printed","black","casual","smart"] },
  { id:8, name:"Grey Utility Cargo",     cat:"Cargo",   price:1599, mrp:2299, disc:30, sizes:["30","32","34","36"], img:"soulfit_category_cargo_1777394485440.png",  isNew:true, hot:true, tags:["cargo","grey","utility","rugged","durable"], soon:true },
];

const KB = {
  brand:    "Soul Fit is a premium Indian clothing brand — *'Threads That Connect Souls'*. We craft high-quality T-Shirts, Shirts, Track Pants & Cargo Pants at prices everyone can afford.",
  shipping: "🚚 Free shipping on orders above ₹999. Standard delivery: 3–5 days. Express (1–2 days) available at checkout. All orders dispatched within 24–48 hrs.",
  returns:  "↩️ 7-day hassle-free returns. Items must be unused, original packaging. Refunds processed in 5–7 business days after receiving the item.",
  payment:  "💳 We accept: Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking & QR Code — all via secure Razorpay gateway.",
  sizes:    "📐 T-Shirts & Shirts: S / M / L / XL. Track Pants & Cargos: waist 30 / 32 / 34 / 36. Tip: If between sizes, go one UP for comfort.",
  contact:  "📞 Email: support@soulfit.com | Phone: +91 12345 67890 | Mon–Sat, 10AM–7PM. Live chat also available on the Support page.",
  quality:  "👌 100% cotton, moisture-wicking polyester blends, wrinkle-resistant fabrics. Every piece is quality-checked before dispatch. Wash care: cold machine wash, inside out.",
  offers:   `🏷️ Current discounts: ${PRODUCTS.map(p=>`${p.name} – ${p.disc}% off`).join(' | ')}. Best deal: Olive Green Track Pant at 32% off!`,
};

// ── Intent scoring ───────────────────────────────────────────────────────────
const INTENTS = [
  { name:'greeting',   words:['hi','hello','hey','namaste','hii','hlo','howdy','sup'],  weight:10 },
  { name:'bye',        words:['bye','goodbye','thanks','thank','thx','shukriya'],        weight:10 },
  { name:'tshirt',     words:['tshirt','tee','polo','oversized','t-shirt'],             weight:8  },
  { name:'shirt',      words:['shirt','formal','printed'],                              weight:7  },
  { name:'pant',       words:['pant','trouser','track'],                                weight:7  },
  { name:'cargo',      words:['cargo','utility'],                                       weight:8  },
  { name:'price',      words:['price','cost','kitna','budget','cheap','afford'],        weight:7  },
  { name:'offer',      words:['offer','discount','sale','deal','promo','coupon'],       weight:8  },
  { name:'shipping',   words:['shipping','delivery','deliver','dispatch','express'],    weight:8  },
  { name:'return',     words:['return','refund','exchange','cancel','damaged'],         weight:8  },
  { name:'payment',    words:['payment','pay','upi','card','razorpay','qr','gpay'],    weight:8  },
  { name:'size',       words:['size','sizing','fit','measurement','xl','medium'],       weight:8  },
  { name:'new',        words:['new','arrival','latest','fresh','collection'],           weight:7  },
  { name:'bestseller', words:['best','seller','popular','trending','top'],              weight:7  },
  { name:'track',      words:['track','tracking','order','status','where'],             weight:7  },
  { name:'account',    words:['account','login','signup','register','profile'],         weight:8  },
  { name:'quality',    words:['quality','fabric','material','cotton','wash','durable'], weight:7  },
  { name:'brand',      words:['soulfit','soul','brand','about','story','company'],      weight:7  },
  { name:'wishlist',   words:['wishlist','favourite','favorite','save','heart'],        weight:7  },
  { name:'contact',    words:['contact','support','help','phone','email','call'],       weight:7  },
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

// ── Context-aware response generator ────────────────────────────────────────
export function getSmartResponse(input, ctx) {
  const intent = detectIntent(input);
  const sentiment = detectSentiment(input);
  const q = input.toLowerCase();

  // Sentiment first
  if (sentiment === 'negative') {
    return { text:"I'm really sorry you're feeling that way 😔 We always aim to give the best experience. Please reach out at **support@soulfit.com** or call **+91 12345 67890** and we'll make it right immediately!", quickReplies:["Contact support","Return policy","Track order"] };
  }
  if (sentiment === 'positive') {
    return { text:"Thank you so much! 🙏 We love happy customers. Anything else I can help you with?", quickReplies:["Show offers","New arrivals","Best sellers"] };
  }

  // Budget filter: "under 1000", "below 1200"
  const budgetMatch = q.match(/(?:under|below|less than|within)\s*₹?\s*(\d+)/);
  if (budgetMatch) {
    const budget = parseInt(budgetMatch[1]);
    const fits = PRODUCTS.filter(p => p.price <= budget);
    if (!fits.length) return { text:`We don't have products below ₹${budget} yet. Our lowest price is **Classic White Polo at ₹899**! 🏷️`, quickReplies:["Show all products","Best sellers"] };
    return { text:`Products under ₹${budget}:`, products:fits, quickReplies:["Add to wishlist","Return policy"] };
  }

  switch(intent) {
    case 'greeting':
      return { text:ctx.isReturning
        ? "Welcome back to Soul Fit! 😊 Great to see you again. How can I help today?"
        : "Hey! 👋 I'm the **Soul Fit AI Assistant** — I know everything about our brand, products, offers & policies. Ask me anything!",
        quickReplies:["Show all products","Best sellers","New arrivals","Current offers"] };

    case 'bye':
      return { text:"Thanks for visiting Soul Fit! 🙏 *Threads That Connect Souls* — hope to see you again soon. Happy shopping! 🛍️", quickReplies:[] };

    case 'tshirt': {
      const items = PRODUCTS.filter(p => p.cat === 'T-Shirt');
      return { text:`We have **${items.length} T-Shirts** in stock:`, products:items, quickReplies:["Size guide","Shipping info","Return policy"] };
    }
    case 'shirt': {
      const items = PRODUCTS.filter(p => p.cat === 'Shirt');
      return { text:`We have **${items.length} Shirts** available:`, products:items, quickReplies:["Size guide","Formal vs casual","Shipping info"] };
    }
    case 'pant': {
      const items = PRODUCTS.filter(p => p.cat === 'Pant');
      return { text:`**${items.length} Track Pants** available:`, products:items, quickReplies:["Size guide","Shipping info"] };
    }
    case 'cargo': {
      const items = PRODUCTS.filter(p => p.cat === 'Cargo');
      return { text:`**${items.length} Cargo Pants** — both launching soon! Add to Wishlist to get notified:`, products:items, quickReplies:["Notify me","Size guide"] };
    }
    case 'offer':
      return { text:KB.offers, quickReplies:["Show best deal","New arrivals","All products"] };

    case 'shipping':
      return { text:KB.shipping, quickReplies:["Return policy","Track order","Payment methods"] };

    case 'return':
      return { text:KB.returns, quickReplies:["Contact support","Track order","Payment methods"] };

    case 'payment':
      return { text:KB.payment, quickReplies:["Shipping info","Return policy"] };

    case 'size':
      return { text:KB.sizes, quickReplies:["Show T-Shirts","Show Shirts","Show Pants"] };

    case 'price':
      return { text:`Our price range: **₹899 – ₹1,599** with up to **32% off** on MRP!\n\n💡 Cheapest: Classic White Polo at ₹899\n🌟 Premium: Grey Utility Cargo at ₹1,599\n\nAll products have transparent pricing — no hidden charges!`, quickReplies:["Show all products","Best offers","Under ₹1000"] };

    case 'new': {
      const items = PRODUCTS.filter(p => p.isNew);
      return { text:`✨ **${items.length} New Arrivals** just dropped:`, products:items, quickReplies:["Best sellers","Show offers"] };
    }
    case 'bestseller': {
      const items = PRODUCTS.filter(p => p.hot);
      return { text:`🔥 **Top ${items.length} Best Sellers** right now:`, products:items, quickReplies:["New arrivals","Current offers"] };
    }
    case 'track':
      return { text:`📦 **Track Your Order:**\nGo to the **Track Order** page from the sidebar → enter your Order ID or Tracking Number.\n\n🔍 Your Order ID is in the confirmation email sent after purchase.`, quickReplies:["Return policy","Contact support"] };

    case 'account':
      return { text:`👤 **Soul Fit Account Benefits:**\n• Track all your orders in one place\n• Save multiple delivery addresses\n• Manage your Wishlist\n• Get exclusive member-only deals\n\n👉 Sign up free via the sidebar → Account!`, quickReplies:["Current offers","Track order"] };

    case 'quality':
      return { text:KB.quality, quickReplies:["Size guide","Show products","Shipping info"] };

    case 'brand':
      return { text:`${KB.brand}\n\n🧵 We believe in making premium fashion accessible. Every product goes through strict quality checks. Our mission: *Threads That Connect Souls.*`, quickReplies:["Show all products","Contact us"] };

    case 'wishlist':
      return { text:`❤️ **Wishlist:**\nTap the heart icon on any product to save it. Access your Wishlist from the header.\n\nPro tip: Cargo Pants are coming soon — Wishlist them to get notified first! 🛍️`, quickReplies:["Show Cargos","Account info"] };

    case 'contact':
      return { text:KB.contact, quickReplies:["Return policy","Track order","FAQs"] };

    case 'all':
      return { text:`🛍️ **All ${PRODUCTS.length} Products:**`, products:PRODUCTS, quickReplies:["Best sellers","New arrivals","Current offers"] };

    case 'hindi':
      return { text:`Namaste! 🙏 Main Soul Fit ke baare mein sab kuch jaanta hoon!\n\nAap pooch sakte hain:\n• **Products** – T-Shirts, Shirts, Pants, Cargos\n• **Price** – ₹899 se ₹1,599 tak\n• **Shipping** – ₹999+ pe free delivery\n• **Return** – 7 din ki policy\n• **Offers** – 32% tak discount\n\nKya jaanna chahte hain? 😊`, quickReplies:["Sab products dikhao","Best offers","Size guide"] };

    default: {
      const matched = searchProducts(input);
      if (matched.length) return { text:`Here's what I found for you:`, products:matched, quickReplies:["Size guide","Shipping info","Return policy"] };
      return { text:`Hmm, I'm not sure about that 🤔 But I can help with:\n\n🛍️ **Products** • 💰 **Prices** • 🚚 **Shipping**\n↩️ **Returns** • 💳 **Payments** • 📦 **Tracking**\n\nTry asking: *"Show T-Shirts"*, *"Under ₹1000"*, *"Return policy"*`, quickReplies:["Show all products","Best sellers","Contact support"] };
    }
  }
}
