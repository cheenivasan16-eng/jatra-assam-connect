import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users } from 'lucide-react';

const Experiences = () => {
  // Mock data - will be replaced with Supabase data later
  const experiences = [
    {
      id: 1,
      title: "Traditional Tribal Art Workshop",
      description: "Learn the ancient art of Pattachitra painting from master artisans in their village studio.",
      category: "Art & Craft",
      price: "₹1,500",
      duration: "4 hours",
      location: "Ranchi District",
      participants: "Up to 8",
      image: "/placeholder.svg",
      available: true
    },
    {
      id: 2,
      title: "Village Life Immersion",
      description: "Experience authentic tribal village life, participate in daily activities and enjoy traditional meals.",
      category: "Village Life",
      price: "₹2,200",
      duration: "Full day",
      location: "Khunti District",
      participants: "Up to 6",
      image: "/placeholder.svg",
      available: true
    },
    {
      id: 3,
      title: "Forest Medicine Walk",
      description: "Discover traditional herbal medicines with tribal healers in the pristine forests of Jharkhand.",
      category: "Nature & Wellness",
      price: "₹1,800",
      duration: "3 hours",
      location: "Gumla District",
      participants: "Up to 10",
      image: "/placeholder.svg",
      available: false
    },
    {
      id: 4,
      title: "Organic Farm Experience",
      description: "Work alongside local farmers using traditional organic methods and enjoy farm-fresh meals.",
      category: "Agriculture",
      price: "₹1,200",
      duration: "5 hours",
      location: "Lohardaga District",
      participants: "Up to 12",
      image: "/placeholder.svg",
      available: true
    }
  ];

  const categories = ["All", "Art & Craft", "Village Life", "Agriculture", "Nature & Wellness"];

  return (
    <section id="experiences" className="py-20 bg-card-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 slide-up">
          <h2 className="text-headline mb-4">
            Authentic <span className="text-primary">Experiences</span>
          </h2>
          <p className="text-subhead max-w-3xl mx-auto">
            Discover meaningful connections through immersive experiences designed by and with local communities
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 slide-up">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Experiences Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="jatra-card group hover:shadow-xl transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-muted rounded-lg mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <p className="text-muted-foreground">Experience Image</p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {experience.category}
                  </Badge>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-primary">{experience.price}</p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {experience.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{experience.participants}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button
                    className="w-full jatra-button-primary"
                    disabled={!experience.available}
                  >
                    {experience.available ? 'Book Experience' : 'Currently Unavailable'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12 slide-up">
          <Button variant="outline" className="jatra-button-secondary">
            View All Experiences
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Experiences;