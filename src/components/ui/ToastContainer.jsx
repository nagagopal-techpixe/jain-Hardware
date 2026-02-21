import { useStore } from "../../context/StoreContext"; 
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react"; 

export default function ToastContainer() {
  const { toasts } = useStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const isSuccess = toast.type === "success";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px] text-white
                ${isSuccess ? "bg-green-600" : "bg-red-600"}
              `}
            >
              {/* Icon */}
              {isSuccess ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <XCircle className="w-5 h-5 text-white" />
              )}

              {/* Message */}
              <p className="text-sm font-medium">
                {toast.message}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
