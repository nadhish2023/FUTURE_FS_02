import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border-color bg-dark-base py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} EchoPulse. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;