import "./App.css";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import WelcomeMessage from "./components/WelcomeMessage";
import UserProfile from "./components/UserProfile";
import Counter from "./components/Counter";

function App() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <MainContent />

      {/* Body Section */}
      <div style={{ padding: "16px" }}>
        <WelcomeMessage />

        <UserProfile
          name="Jane Doe"
          age={28}
          bio="Frontend learner building React applications."
        />

        {/* Counter Component - Task 1 */}
        <Counter />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
