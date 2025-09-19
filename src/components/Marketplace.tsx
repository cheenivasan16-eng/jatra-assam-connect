import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingBag, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useMarketplaceItems } from '@/hooks/useMarketplace';
import { useAuth } from '@/hooks/useAuth';

const Marketplace = () => {
  const { data: marketplaceItems, isLoading, error } = useMarketplaceItems();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'handicraft', 'homestay', 'event'];

  // Filter items based on selected category
  const filteredItems = marketplaceItems?.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  ) || [];

  if (isLoading) {
    return (
      <section id="marketplace" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading marketplace...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="marketplace" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-destructive mb-4">Error loading marketplace items</p>
            <p className="text-muted-foreground text-sm">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="marketplace" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 slide-up">
          <h2 className="text-headline mb-4">
            Artisan <span className="text-primary">Marketplace</span>
          </h2>
          <p className="text-subhead max-w-3xl mx-auto">
            Support local artisans and take home authentic pieces that tell the story of Jharkhand's rich heritage
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
              {category === 'handicraft' ? 'Handicraft' : 
               category === 'homestay' ? 'Homestay' : 
               category === 'event' ? 'Event' : category}
            </Badge>
          ))}
        </div>

        {/* Marketplace Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="jatra-card group hover:shadow-xl transition-all duration-300 slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="h-48 bg-muted rounded-lg mb-4 overflow-hidden relative">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <Badge variant="secondary" className="text-xs mb-2">
                      {item.category === 'handicraft' ? 'Handicraft' : 
                       item.category === 'homestay' ? 'Homestay' : 
                       item.category === 'event' ? 'Event' : item.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description || 'Description coming soon...'}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-primary">
                      ₹{item.price?.toLocaleString('en-IN') || 'Price TBD'}
                    </span>
                  </div>

                  {/* Stock Status */}
                  <div className="text-xs text-muted-foreground">
                    {(item.stock || 0) > 10 ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (item.stock || 0) > 0 ? (
                      <span className="text-yellow-600">Only {item.stock} left</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full jatra-button-primary"
                    disabled={!user || (item.stock || 0) === 0}
                    onClick={() => {
                      if (!user) {
                        // This will be handled by the auth modal
                      } else {
                        // TODO: Implement add to cart functionality
                        console.log('Adding to cart:', item.id);
                      }
                    }}
                  >
                    {!user ? 'Sign In to Buy' : 
                     (item.stock || 0) > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No items found for this category.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new products!</p>
            </div>
          )}
        </div>

        {/* View More */}
        <div className="text-center mt-12 slide-up">
          <Button variant="outline" className="jatra-button-secondary">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;