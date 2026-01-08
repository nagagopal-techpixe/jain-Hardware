
import { StoreProvider, useStore } from "./context/StoreContext";
import AppContent from "./AppContent";
// --- MAIN APP ---
export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
