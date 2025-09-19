-- Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'tourist', 'provider');
CREATE TYPE public.artisan_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.experience_category AS ENUM ('Agriculture', 'Art & Craft', 'Village Life', 'Food');
CREATE TYPE public.marketplace_category AS ENUM ('handicraft', 'homestay', 'event');
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'cancelled', 'pending');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE public.eco_points_type AS ENUM ('earn', 'redeem');

-- Create users table (extending auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT,
  role user_role DEFAULT 'tourist',
  eco_points_balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create artisans table
CREATE TABLE public.artisans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  status artisan_status DEFAULT 'pending',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category experience_category NOT NULL,
  price DECIMAL(10,2),
  available_slots INTEGER DEFAULT 0,
  location TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create marketplace_items table
CREATE TABLE public.marketplace_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  stock INTEGER DEFAULT 0,
  category marketplace_category NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  marketplace_item_id UUID REFERENCES public.marketplace_items(id) ON DELETE CASCADE,
  status booking_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  slot_time TIMESTAMP WITH TIME ZONE,
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT booking_item_check CHECK (
    (experience_id IS NOT NULL AND marketplace_item_id IS NULL) OR
    (experience_id IS NULL AND marketplace_item_id IS NOT NULL)
  )
);

-- Create eco_points_transactions table
CREATE TABLE public.eco_points_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type eco_points_type NOT NULL,
  points INTEGER NOT NULL,
  reference_id UUID,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_points_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies for all tables
CREATE POLICY "Admins can view all artisans" 
ON public.artisans FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can manage artisans" 
ON public.artisans FOR ALL 
USING (public.is_admin());

CREATE POLICY "Everyone can view approved artisans" 
ON public.artisans FOR SELECT 
USING (status = 'approved');

-- Experiences policies
CREATE POLICY "Everyone can view experiences" 
ON public.experiences FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage experiences" 
ON public.experiences FOR ALL 
USING (public.is_admin());

-- Marketplace policies
CREATE POLICY "Everyone can view marketplace items" 
ON public.marketplace_items FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage marketplace items" 
ON public.marketplace_items FOR ALL 
USING (public.is_admin());

-- Bookings policies
CREATE POLICY "Users can view their own bookings" 
ON public.bookings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings" 
ON public.bookings FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can manage all bookings" 
ON public.bookings FOR UPDATE 
USING (public.is_admin());

-- Eco points policies
CREATE POLICY "Users can view their own eco points" 
ON public.eco_points_transactions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create eco points transactions" 
ON public.eco_points_transactions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all eco points" 
ON public.eco_points_transactions FOR SELECT 
USING (public.is_admin());

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('artisan-images', 'artisan-images', true),
('experience-images', 'experience-images', true),
('marketplace-images', 'marketplace-images', true);

-- Storage policies for artisan images
CREATE POLICY "Anyone can view artisan images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'artisan-images');

CREATE POLICY "Admins can upload artisan images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'artisan-images' AND public.is_admin());

CREATE POLICY "Admins can update artisan images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'artisan-images' AND public.is_admin());

-- Storage policies for experience images
CREATE POLICY "Anyone can view experience images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'experience-images');

CREATE POLICY "Admins can upload experience images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'experience-images' AND public.is_admin());

CREATE POLICY "Admins can update experience images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'experience-images' AND public.is_admin());

-- Storage policies for marketplace images
CREATE POLICY "Anyone can view marketplace images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'marketplace-images');

CREATE POLICY "Admins can upload marketplace images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'marketplace-images' AND public.is_admin());

CREATE POLICY "Admins can update marketplace images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'marketplace-images' AND public.is_admin());

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    'tourist'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_artisans_updated_at
  BEFORE UPDATE ON public.artisans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_updated_at
  BEFORE UPDATE ON public.marketplace_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample admin user (will be created when someone signs up with this email)
-- Note: The actual user signup needs to happen through auth, this just ensures admin role
CREATE OR REPLACE FUNCTION public.set_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'admin@jatra.com' THEN
    UPDATE public.profiles 
    SET role = 'admin' 
    WHERE user_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_admin_role_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_admin_role();