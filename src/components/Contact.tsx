import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-card-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 slide-up">
          <h2 className="text-headline mb-4">
            Start Your <span className="text-primary">Journey</span>
          </h2>
          <p className="text-subhead max-w-3xl mx-auto">
            Ready to explore authentic Jharkhand? Get in touch with us to plan your perfect cultural immersion
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="slide-up">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-foreground">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Visit Us</h4>
                      <p className="text-muted-foreground">
                        Tourism House, Main Road<br />
                        Ranchi, Jharkhand 834001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Call Us</h4>
                      <p className="text-muted-foreground">
                        +91 94311 23456<br />
                        +91 94311 23457
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Email Us</h4>
                      <p className="text-muted-foreground">
                        hello@jatrajharkhand.com<br />
                        experiences@jatrajharkhand.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Chat with AI Assistant</h4>
                      <p className="text-muted-foreground">
                        Available 24/7 in Hindi & English<br />
                        Click the chat button below
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="jatra-card">
                <h4 className="font-semibold mb-4 text-foreground">Why Choose Jatra?</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">100% community-owned experiences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Direct support to local artisans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Authentic cultural immersion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Sustainable tourism practices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="slide-up">
            <div className="jatra-card">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input 
                      placeholder="Your first name"
                      className="border-border focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Your last name"
                      className="border-border focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com"
                    className="border-border focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input 
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="border-border focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What interests you most?
                  </label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary bg-background">
                    <option>Select an option</option>
                    <option>Cultural Experiences</option>
                    <option>Handicraft Shopping</option>
                    <option>Homestay Booking</option>
                    <option>Custom Itinerary</option>
                    <option>Group Tours</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell us about your travel plans
                  </label>
                  <Textarea 
                    placeholder="Share your interests, travel dates, group size, or any specific experiences you're looking for..."
                    rows={4}
                    className="border-border focus:ring-primary focus:border-primary"
                  />
                </div>

                <Button className="w-full jatra-button-primary">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;