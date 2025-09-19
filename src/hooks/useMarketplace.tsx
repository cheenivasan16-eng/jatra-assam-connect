import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  stock: number | null;
  category: 'handicraft' | 'homestay' | 'event';
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useMarketplaceItems = () => {
  return useQuery({
    queryKey: ['marketplace_items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MarketplaceItem[];
    }
  });
};

export const useCreateMarketplaceItem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (item: Omit<MarketplaceItem, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('marketplace_items')
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace_items'] });
      toast({
        title: "Success",
        description: "Marketplace item created successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};

export const useUpdateMarketplaceItem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<MarketplaceItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('marketplace_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace_items'] });
      toast({
        title: "Success",
        description: "Marketplace item updated successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};

export const useDeleteMarketplaceItem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('marketplace_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace_items'] });
      toast({
        title: "Success",
        description: "Marketplace item deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};