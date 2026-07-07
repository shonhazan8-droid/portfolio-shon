export type Testimonial = { quote: string; name: string; role: string; company?: string; avatar?: string };

export const testimonials: Testimonial[] = [
  { quote: "When we brought him in, the problem felt unsolvable. The first thing he did wasn't design, it was reframing the question. Suddenly the team was arguing about the right things.", name: "Shani Konyak", role: "Head of Product", company: "Ministry of Defense", avatar: "/people/shani.jpeg" },
  { quote: "He has judgment you can't teach, knowing which detail matters and which to let go. He thinks like a product person, so the work holds up under real constraints. And he raised the bar quietly.", name: "Yury Vitman", role: "Head of Design", company: "Matrix", avatar: "/people/yuri.jpeg" },
  { quote: "Most designers hand you screens. He sat in the messy middle with me, balancing regulation, business goals and real people, and pushed back when a business ask would have hurt users.", name: "Maya Michal", role: "Head of Product", company: "Israel Post", avatar: "/people/maya.jpeg" },
  { quote: "He never told me what to design. He asked the question that made me notice what I'd missed, then let me get there myself. I stopped chasing pixels and started thinking in trade-offs.", name: "Raz Talbi", role: "Product Designer", avatar: "/people/raz.jpeg" },
];
