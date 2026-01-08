
import { useStore } from "../../context/StoreContext"; 
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react"; 
export default function ToastContainer() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px]"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-sm font-medium">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};