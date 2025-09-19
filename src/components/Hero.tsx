import { Button } from '@/components/ui/button';
import heroImage from '@/assets/jharkhand-hero.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful landscape of Jharkhand with lush forests and tribal heritage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 fade-in">
          <div className="space-y-4">
            <h1 className="text-display text-foreground">
              Discover Authentic
              <span className="block text-primary font-medium">Jharkhand</span>
            </h1>
            <p className="text-subhead max-w-2xl mx-auto">
              Step beyond sightseeing. Connect with the heart of tribal India, where every 
              home opens its doors, every tradition invites you in, and every journey becomes a memory.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="jatra-button-primary text-lg px-8 py-4">
              Explore Experiences
            </Button>
            <Button variant="outline" className="jatra-button-secondary text-lg px-8 py-4">
              Discover Stories
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Community-Driven</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>100% Local Experiences</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Cultural Preservation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;