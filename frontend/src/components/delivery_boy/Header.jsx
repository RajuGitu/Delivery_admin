import { Clock } from "lucide-react";
import logo from "../../assets/logo_image.png"

const Header = () => {
  return (
    <header className="flex items-center gap-3 px-4  bg-card border-b border-border">
      <div className=" overflow-hidden flex items-center justify-center">
        <img
          src={logo} // Replace with your logo path
          alt="Logo"
          className="w-20 h-20 object-cover"
        />
      </div>

      <div>
        <h1 className="text-lg font-bold text-black">SlotSync</h1>
        <p className="text-xs text-muted-foreground">Delivery Agent</p>
      </div>
    </header>
  );
};

export default Header;
