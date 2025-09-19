import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useExperiences } from '@/hooks/useExperiences';
import { useAuth } from '@/hooks/useAuth';

const Experiences = () => {
  const { data: experiences, isLoading, error } = useExperiences();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Agriculture', 'Art & Craft', 'Village Life', 'Food'];

  // Filter experiences based on selected category
  const filteredExperiences = experiences?.filter(experience => 
    selectedCategory === 'All' || experience.category === selectedCategory
  ) || [];

  if (isLoading) {
    return (
      <section id="experiences" className="py-20 bg-card-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading experiences...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experiences" className="py-20 bg-card-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-destructive mb-4">Error loading experiences</p>
            <p className="text-muted-foreground text-sm">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

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
              variant={category === selectedCategory ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Experiences Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((experience, index) => (
              <div
                key={experience.id}
                className="jatra-card group hover:shadow-xl transition-all duration-300 slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-muted rounded-lg mb-6 overflow-hidden">
                  {experience.image_url ? (
                    <img 
                      src={experience.image_url} 
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <p className="text-muted-foreground">Experience Image</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {experience.category}
                    </Badge>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-primary">
                        ₹{experience.price?.toLocaleString('en-IN') || 'Price TBD'}
                      </p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {experience.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {experience.description || 'Experience description coming soon...'}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Duration varies</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location || 'Location TBD'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{experience.available_slots ? `Up to ${experience.available_slots} people` : 'Slots available'}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button
                      className="w-full jatra-button-primary"
                      disabled={!user}
                      onClick={() => {
                        if (!user) {
                          // This will be handled by the auth modal
                        } else {
                          // TODO: Implement booking functionality
                          console.log('Booking experience:', experience.id);
                        }
                      }}
                    >
                      {!user ? 'Sign In to Book' : 'Book Experience'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No experiences found for this category.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new experiences!</p>
            </div>
          )}
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