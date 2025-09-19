import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    experiences: [
      'Cultural Tours',
      'Art Workshops',
      'Village Stays',
      'Food Experiences',
      'Nature Walks'
    ],
    marketplace: [
      'Handicrafts',
      'Homestays',
      'Organic Products',
      'Art Supplies',
      'Traditional Wear'
    ],
    support: [
      'Help Center',
      'Booking Policy',
      'Cancellation',
      'Payment Options',
      'Travel Guidelines'
    ],
    company: [
      'About Jatra',
      'Our Mission',
      'Community Impact',
      'Sustainability',
      'Careers'
    ]
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary">Jatra</h3>
                  <p className="text-sm text-background/70">Jharkhand Tourism</p>
                </div>
                <p className="text-background/80 text-sm leading-relaxed">
                  Connecting travelers with authentic Jharkhand experiences through 
                  community-driven tourism that preserves culture and empowers locals.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-background/70">
                    <MapPin className="w-4 h-4" />
                    <span>Ranchi, Jharkhand 834001</span>
                  </div>
                  <div className="flex items-center gap-2 text-background/70">
                    <Phone className="w-4 h-4" />
                    <span>+91 94311 23456</span>
                  </div>
                  <div className="flex items-center gap-2 text-background/70">
                    <Mail className="w-4 h-4" />
                    <span>hello@jatrajharkhand.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 pt-2">
                  <a href="#" className="text-background/70 hover:text-primary transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold text-background mb-4">Experiences</h4>
                <ul className="space-y-2">
                  {footerLinks.experiences.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-background mb-4">Marketplace</h4>
                <ul className="space-y-2">
                  {footerLinks.marketplace.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-background mb-4">Support</h4>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-background mb-4">Company</h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-background/70">
              © {currentYear} Jatra Jharkhand Tourism. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <Link to="/admin" className="text-background/70 hover:text-primary transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;