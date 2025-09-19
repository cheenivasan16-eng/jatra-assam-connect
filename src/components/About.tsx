const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-headline mb-4">
            More than Tourism. This is <span className="text-primary">Trust</span>
          </h2>
          <p className="text-subhead max-w-3xl mx-auto">
            At Jatra, we connect you with the soul of Jharkhand, where every home opens its doors, 
            every tradition invites you in, and every journey becomes a cherished memory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Values */}
          <div className="space-y-8 slide-up">
            <div className="jatra-card">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Hosted by Locals</h3>
              <p className="text-muted-foreground">
                Every experience is curated and hosted by local communities who know their land, 
                culture, and stories intimately.
              </p>
            </div>
            
            <div className="jatra-card">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Rooted in Culture</h3>
              <p className="text-muted-foreground">
                Immerse yourself in authentic tribal traditions, ancient crafts, and 
                time-honored practices passed down through generations.
              </p>
            </div>
            
            <div className="jatra-card">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Built on Community</h3>
              <p className="text-muted-foreground">
                Your journey directly supports local artisans, families, and communities, 
                ensuring sustainable tourism that benefits everyone.
              </p>
            </div>
          </div>

          {/* Right Side - Mission */}
          <div className="slide-up">
            <div className="bg-card-subtle rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We believe tourism should grow from within communities, not imposed from outside. 
                Jatra creates meaningful connections between visitors and the rich cultural heritage 
                of Jharkhand, fostering mutual respect and understanding.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Cultural Preservation</p>
                    <p className="text-sm text-muted-foreground">Keeping traditions alive through tourism</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Economic Empowerment</p>
                    <p className="text-sm text-muted-foreground">Direct earnings for local communities</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">Authentic Experiences</p>
                    <p className="text-sm text-muted-foreground">Real connections, not staged performances</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-16 slide-up">
          <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
            "What if tourism wasn't something that came from outside, 
            but something that grew from within?"
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;