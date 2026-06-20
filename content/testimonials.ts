export type Testimonial = { quote: string; name: string; role: string; company?: string; avatar?: string };

export const testimonials: Testimonial[] = [
  { quote: "Turned a vague, high-stakes problem into a structure the whole team could build against.", name: "Shani Konyak", role: "Head of Product", company: "Ministry of Defense", avatar: "/people/shani.jpeg" },
  { quote: "Rare mix of systems thinking and craft — the design system he built still holds up two years on.", name: "Yury Vitman", role: "Head of Design", company: "Matrix", avatar: "/people/yuri.jpeg" },
  { quote: "Made a complex onboarding flow feel obvious. Drop-off fell the week we shipped it.", name: "Maya Michal", role: "Head of Product", company: "Israel Post", avatar: "/people/maya.jpeg" },
  { quote: "The kind of designer who makes everyone around him better — clear, fast, and never loses the details.", name: "Raz Talbi", role: "Product Designer", avatar: "/people/raz.jpeg" },
];
