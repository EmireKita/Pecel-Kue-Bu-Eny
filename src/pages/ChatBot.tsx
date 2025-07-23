import { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { getFaqs } from "@/services/faqService";
import { getProducts, getBestSellerProducts } from "@/services/productService";
import { getStore } from "@/services/storeService";
import ProdukDetailModal from "@/modals/ProdukDetailModal";
import type { Product } from "@/types/Product";
import type { Store } from "@/types/Store";
import type { Faq } from "@/types/Faq";
import { analyticsPromise } from "@/services/firebase";
import { logEvent } from "firebase/analytics";

interface Message {
  sender: "bot" | "user";
  text: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([{
    sender: "bot",
    text: "Halo! Ada yang bisa saya bantu hari ini?",
  }]);
  const [input, setInput] = useState("");
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [store, setStore] = useState<Store | null>(null);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    analyticsPromise.then((analytics) => {
      if (analytics) {
        logEvent(analytics, "chatbot_visited");
      }
    });
    const loadData = async () => {
      setFaqs(await getFaqs());
      setProducts(await getProducts());
      setStore(await getStore());
    };
    loadData();
  }, []);

  // Scroll otomatis ke bawah saat ada pesan baru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


const handleSend = (text: string, sender: "bot" | "user" = "user") => {
  if (!text.trim()) return;
  setMessages((prev) => [...prev, { sender, text }]);
  setInput("");
  if (sender === "user") {
    analyticsPromise.then((analytics) => {
      if (analytics) {
        logEvent(analytics, "chatbot_user_message", {
          content: text,
        });
      }
    });
    setTimeout(() => handleBotReply(text), 500);
  }
};

  const handleBotReply = (text: string) => {
    const lower = text.toLowerCase();

    if (currentStep === "kategori") {
      const produkByKategori = products.filter(p => p.kategori.toLowerCase() === lower);
      setMessages(prev => [
        ...prev,
        { sender: "bot" as const, text: produkByKategori.length ? "Silakan pilih produk untuk melihat detail:" : "Produk tidak ditemukan." },
        ...produkByKategori.map(p => ({
          sender: "bot" as const,
          text: `__produk__:${p.nama}`,
        })),
      ]);
      setCurrentStep(null);
      return;
    }

    if (text === "Best Seller") {
      getBestSellerProducts().then((items) => {
        if (items.length === 0) {
          setMessages((prev) => [...prev, { sender: "bot", text: "Belum ada produk best seller." }]);
          return;
        }
    
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Berikut produk best seller kami (Tekan untuk melihat detail):" },
          ...items.map((p) => ({
            sender: "bot" as const,
            text: `__produk__:${p.nama}`,
          })),
        ]);
      });
      return;
    }
    

    if (text === "Info Produk") {
      const kategoriSet = Array.from(new Set(products.map(p => p.kategori)));
      if (kategoriSet.length === 0) {
        setMessages(prev => [...prev, { sender: "bot", text: "Belum ada kategori produk." }]);
        return;
      }
      setMessages(prev => [...prev, { sender: "bot", text: "Silakan pilih kategori:" }]);
      setCurrentStep("kategori");
      return;
    }

    if (text === "Info Toko") {
      if (store) {
        const info = `Nama: ${store.nama}\nAlamat: ${store.alamat}\nKontak: ${store.kontak}\nJadwal: ${store.jadwal}`;
        setMessages(prev => [...prev, { sender: "bot", text: info }]);
      }
      return;
    }

    if (text === "Pemesanan") {
      if (store) {
        const msg = `Silakan pilih metode pemesanan:\n- WhatsApp: ${store.whatsApp}\n- GoFood: ${store.goFood}\n- GrabFood: ${store.grabFood}`;
        setMessages(prev => [...prev, { sender: "bot", text: msg }]);
      }
      return;
    }

    const found = faqs.find(faq =>
      faq.keywords?.some(keyword => lower.includes(keyword.toLowerCase())) ||
      lower.includes(faq.pertanyaan.toLowerCase())
    );
    const reply = found ? found.jawaban : "Maaf, saya belum mengerti maksud Anda.";
    setMessages(prev => [...prev, { sender: "bot", text: reply }]);
  };

  const renderQuickReplies = () => {
    if (currentStep === "kategori") {
      const kategoriSet = Array.from(new Set(products.map(p => p.kategori)));
      return kategoriSet.map(kategori => (
        <Button key={kategori} variant="outline" size="sm" className="capitalize" onClick={() => handleSend(kategori)}>
          {kategori}
        </Button>
      ));
    }
    return (
      <>
        <Button onClick={() => { handleSend("Best Seller"); analyticsPromise.then(a => a && logEvent(a, "chatbot_quickreply_clicked", { label: "Best Seller" }));
  }} variant="outline" size="sm">Best Seller</Button>
        <Button onClick={() => { handleSend("Info Produk"); analyticsPromise.then(a => a && logEvent(a, "chatbot_quickreply_clicked", { label: "Info Produk" }));
      }} variant="outline" size="sm">Info Produk</Button>
        <Button onClick={() => { handleSend("Info Toko"); analyticsPromise.then(a => a && logEvent(a, "chatbot_quickreply_clicked", { label: "Info Toko" }));
  }} variant="outline" size="sm">Info Toko</Button>
        <Button onClick={() => { handleSend("Pemesanan"); analyticsPromise.then(a => a && logEvent(a, "chatbot_quickreply_clicked", { label: "Pemesanan" }));
  }} variant="outline" size="sm">Pemesanan</Button>
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-green-100">
      <Header title="Chatbot" backTo="/" />
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-xs px-3 py-2 rounded-xl whitespace-pre-wrap text-sm ${msg.sender === "bot" ? "bg-gray-200" : "bg-white"}`}>
              {msg.text.startsWith("__produk__:") ? (
                <Button
                  onClick={() => {
                    const nama = msg.text.replace("__produk__:", "");
                    const produk = products.find(p => p.nama === nama);
                    if (produk) setSelectedProduct(produk);
                  }}
                  variant="outline"
                  size="sm"
                >
                  {msg.text.replace("__produk__:", "")}
                </Button>
              ) : (
                msg.text.split("\n").map((line, idx) => {
                  const parts = line.split(/(https?:\/\/[^\s]+)/g); // cari URL dengan regex
                  return (
                    <div key={idx} className="text-sm">
                      {parts.map((part, i) =>
                        part.match(/^https?:\/\/[^\s]+$/) ? (
                          <a
                            key={i}
                            href={part}
                            className="text-blue-600 underline break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {part}
                          </a>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </div>
                  );
                })
                
              )}
            </div>
          </div>
        ))}

        {selectedProduct && (
          <ProdukDetailModal
            isOpen={true}
            onClose={() => setSelectedProduct(null)}
            nama={selectedProduct.nama}
            deskripsi={selectedProduct.deskripsi}
            harga={selectedProduct.harga}
            imageUrl={selectedProduct.imageUrl}
          />
        )}

        <div className="flex flex-wrap gap-2 mt-2">
          {renderQuickReplies()}
        </div>
        <div ref={bottomRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="bg-gray-300 p-3 flex items-center">
        <Input
          className="flex-1 mr-2"
          placeholder="Tulis pertanyaan..."
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
