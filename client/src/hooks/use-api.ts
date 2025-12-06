import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Rsvp, GuestbookEntry, GalleryImage } from "@/types";

// RSVP API calls
export const useRsvps = () => {
  return useQuery({
    queryKey: ["rsvps"],
    queryFn: async () => {
      const response = await fetch("/api/rsvps");
      if (!response.ok) throw new Error("Failed to fetch RSVPs");
      return response.json() as Promise<Rsvp[]>;
    },
  });
};

export const useCreateRsvp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone?: string;
      numberOfGuests?: number;
      dietaryRestrictions?: string;
      specialRequests?: string;
    }) => {
      const response = await fetch("/api/rsvps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create RSVP");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
    },
  });
};

// Guestbook API calls
export const useGuestbookEntries = () => {
  return useQuery({
    queryKey: ["guestbook"],
    queryFn: async () => {
      const response = await fetch("/api/guestbook");
      if (!response.ok) throw new Error("Failed to fetch guestbook entries");
      return response.json() as Promise<GuestbookEntry[]>;
    },
  });
};

export const useCreateGuestbookEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      message: string;
      email?: string;
    }) => {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          is_approved: 1, // ✔ luôn approved
        }),
      });
      if (!response.ok) throw new Error("Failed to create guestbook entry");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guestbook"] });
    },
  });
};


// Gallery API calls
export const useGalleryImages = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch gallery images");
      return response.json() as Promise<GalleryImage[]>;
    },
  });
};

export const useGalleryByCategory = (category: string) => {
  return useQuery({
    queryKey: ["gallery", category],
    queryFn: async () => {
      const response = await fetch(`/api/gallery/${category}`);
      if (!response.ok) throw new Error("Failed to fetch gallery images");
      return response.json() as Promise<GalleryImage[]>;
    },
    enabled: !!category,
  });
};

export const useCreateGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description?: string;
      imageUrl: string;
      thumbnailUrl?: string;
      category?: string;
      uploadedBy?: string;
    }) => {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};
