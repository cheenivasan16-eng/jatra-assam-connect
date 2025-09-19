import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingBag } from 'lucide-react';

const Marketplace = () => {
  // Mock data - will be replaced with Supabase data later
  const marketplaceItems = [
    {
      id: 1,
      name: "Handwoven Tribal Saree",
      description: "Beautiful traditional saree woven by local artisans using ancient techniques.",
      price: "₹3,500",
      originalPrice: "₹4,200",
      category: "Handicraft",
      rating: 4.8,
      reviews: 23,
      stock: 5,
      image: "/placeholder.svg",
      artisan: "Sita Devi",
      village: "Khunti"
    },
    {
      id: 2,
      name: "Bamboo Craft Set",
      description: "Eco-friendly bamboo products including baskets, decorative items, and kitchen utensils.",
      price: "₹1,200",
      originalPrice: null,
      category: "Handicraft",
      rating: 4.6,
      reviews: 15,
      stock: 12,
      image: "/placeholder.svg",
      artisan: "Ram Kumar",
      village: "Ranchi"
    },
    {
      id: 3,
      name: "Forest Homestay Experience",
      description: "2-day stay in traditional tribal home with organic meals and cultural activities.",
      price: "₹2,800",
      originalPrice: "₹3,200",
      category: "Homestay",
      rating: 4.9,
      reviews: 8,
      stock: 3,
      image: "/placeholder.svg",
      artisan: "Tribal Family",
      village: "Gumla"
    },
    {
      id: 4,
      name: "Organic Honey & Herbs",
      description: "Pure forest honey and traditional medicinal herbs harvested sustainably.",
      price: "₹800",
      originalPrice: null,
      category: "Food",
      rating: 4.7,
      reviews: 31,
      stock: 20,
      image: "/placeholder.svg",
      artisan: "Honey Collective",
      village: "Lohardaga"
    },
    {
      id: 5,
      name: "Metal Craft Jewelry",
      description: "Traditional Dokra metal craft jewelry featuring tribal motifs and designs.",
      price: "₹1,500",
      originalPrice: "₹1,800",
      category: "Handicraft",
      rating: 4.5,
      reviews: 19,
      stock: 8,
      image: "/placeholder.svg",
      artisan: "Mohan Prasad",
      village: "Chaibasa"
    },
    {
      id: 6,
      name: "Tribal Art Workshop Kit",
      description: "Complete kit to learn traditional Pattachitra painting at home with video tutorials.",
      price: "₹950",
      originalPrice: null,
      category: "Art Kit",
      rating: 4.4,
      reviews: 12,
      stock: 15,
      image: "/placeholder.svg",
      artisan: "Art Collective",
      village: "Multiple Villages"
    }
  ];

  const categories = ["All", "Handicraft", "Homestay", "Food", "Art Kit"];

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
              variant={category === "All" ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Marketplace Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketplaceItems.map((item, index) => (
            <div
              key={item.id}
              className="jatra-card group hover:shadow-xl transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="h-48 bg-muted rounded-lg mb-4 overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                {item.originalPrice && (
                  <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                    Sale
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({item.reviews} reviews)</span>
                </div>

                {/* Artisan Info */}
                <div className="text-xs text-muted-foreground">
                  <p>By <span className="font-medium">{item.artisan}</span></p>
                  <p>{item.village}</p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-primary">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="text-xs text-muted-foreground">
                  {item.stock > 10 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : item.stock > 0 ? (
                    <span className="text-yellow-600">Only {item.stock} left</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>

                {/* CTA */}
                <Button
                  className="w-full jatra-button-primary"
                  disabled={item.stock === 0}
                >
                  {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          ))}
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