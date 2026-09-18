import type { Category } from "../types";

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", tagline: "Phones, audio and smart devices", emoji: "\u{1F4F1}" },
  { id: "fashion", name: "Fashion", tagline: "Everyday and occasion wear", emoji: "\u{1F457}" },
  { id: "home-kitchen", name: "Home & Kitchen", tagline: "Appliances and essentials", emoji: "\u{1F373}" },
  { id: "beauty", name: "Beauty & Personal Care", tagline: "Skin, hair and grooming", emoji: "\u{1F9F4}" },
  { id: "sports", name: "Sports & Fitness", tagline: "Train, run and recover", emoji: "\u{1F3CB}" }
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
