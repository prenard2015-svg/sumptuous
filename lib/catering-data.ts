export type CategoryId =
  | "event-packages"
  | "private-chef"
  | "weekly-prep"
  | "platters"

export type OccasionId = "wedding" | "corporate" | "intimate" | "weekly"

export type Category = {
  id: CategoryId
  label: string
}

export type Occasion = {
  id: OccasionId
  name: string
  concern: string
  headline: string
  message: string
  categories: CategoryId[]
}

export type Package = {
  id: string
  title: string
  category: CategoryId
  description: string
  startingPrice: number | null
  priceUnit: "person" | "package" | "week"
  badge: "Chef's Special" | "Popular" | null
  image: string
  inclusions: string[]
  dietaryOptions: string[]
  serviceNotes: string[]
  courseCount: number | null
  presentationNote: string | null
}

export const CATEGORIES: Category[] = [
  { id: "event-packages", label: "Event Packages" },
  { id: "private-chef", label: "Private Chef & Multi-Course" },
  { id: "weekly-prep", label: "Weekly Meal Prep" },
  { id: "platters", label: "Platters & Small Bites" },
]

export const DIETARY_TAGS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Nut-Free",
  "Dairy-Free",
] as const

export const SERVICE_STYLES = [
  "On-site plated service",
  "Buffet / family style",
  "Drop-off & delivery",
  "Chef at your table",
] as const

export const BUDGET_COMFORT = [
  "Keep it modest",
  "Balanced value",
  "Premium experience",
  "No ceiling — impress me",
] as const

export const OCCASIONS: Occasion[] = [
  {
    id: "wedding",
    name: "Wedding planning",
    concern:
      "Keeping service flow, dietary needs, and presentation effortless across a large, once-in-a-lifetime guest list.",
    headline: "Make guest coordination feel effortless",
    message:
      "Tell the chef what matters most for your celebration, and we'll shape the tasting, service flow, and presentation around it.",
    categories: ["event-packages", "private-chef", "platters"],
  },
  {
    id: "corporate",
    name: "Corporate planning",
    concern:
      "Reliable service and clear portions that keep the room fed without slowing the schedule.",
    headline: "Keep the room well fed and the schedule moving",
    message:
      "Share your headcount and timing, and we'll prepare dependable service with clear portions and easy dietary labeling.",
    categories: ["event-packages", "weekly-prep", "platters"],
  },
  {
    id: "intimate",
    name: "Intimate dinner",
    concern:
      "Course pacing and personal chef attention that turn a private table into a memorable evening.",
    headline: "Turn a private table into a memorable evening",
    message:
      "Let the chef know the mood you're after, and we'll pace each course for an unhurried, personal evening.",
    categories: ["private-chef", "platters"],
  },
  {
    id: "weekly",
    name: "Weekly households",
    concern:
      "Recurring convenience and dietary preferences that make thoughtful meals easy to repeat each week.",
    headline: "Make thoughtful meals easier to repeat",
    message:
      "Tell us how your household eats, and we'll build a repeatable weekly rhythm around your preferences.",
    categories: ["weekly-prep", "platters"],
  },
]

export const PACKAGES: Package[] = [
  {
    id: "golden-table",
    title: "Golden Table Celebration",
    category: "event-packages",
    description:
      "A full-service celebration menu built for a room full of guests, with a canapé welcome, two shared mains, and a dessert moment.",
    startingPrice: 45,
    priceUnit: "person",
    badge: "Popular",
    image: "/packages/golden-table.png",
    inclusions: [
      "Four-course seated menu",
      "Welcome canapés on arrival",
      "On-site plating & service team",
      "Table styling & warm service ware",
    ],
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Halal"],
    serviceNotes: [
      "On-site plated or family style",
      "Service staff for up to 120 guests",
      "Setup and cleanup included",
    ],
    courseCount: 4,
    presentationNote:
      "Gold-rimmed service ware with seasonal floral plating touches.",
  },
  {
    id: "seasonal-afro-fusion",
    title:
      "Seasonal Afro-Fusion Celebration with Vegetarian and Gluten-Free Guest Options",
    category: "event-packages",
    description:
      "A vibrant, spice-forward celebration spread that layers West African classics with modern plating for a memorable shared table.",
    startingPrice: 58,
    priceUnit: "person",
    badge: "Chef's Special",
    image: "/packages/golden-table.png",
    inclusions: [
      "Five shared feasting platters",
      "Signature jollof & suya stations",
      "Live grill finish on-site",
      "Dedicated dietary labeling",
    ],
    dietaryOptions: ["Vegetarian", "Gluten-Free", "Halal", "Dairy-Free"],
    serviceNotes: ["Station-style service", "On-site chef finish"],
    courseCount: 5,
    presentationNote:
      "Bold family-style boards with hand-painted ceramic serving dishes.",
  },
  {
    id: "chef-supper",
    title: "Chef's Six-Course Supper",
    category: "private-chef",
    description:
      "An intimate tasting menu cooked and paced at your table, where the chef guides each course and adjusts to the mood of the evening.",
    startingPrice: 120,
    priceUnit: "person",
    badge: "Chef's Special",
    image: "/packages/chef-supper.png",
    inclusions: [
      "Six-course tasting menu",
      "Chef cooking at your table",
      "Personalized menu consultation",
      "Wine pairing guidance",
    ],
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Nut-Free"],
    serviceNotes: [
      "Chef at your table",
      "Best for 2–12 guests",
      "Full kitchen cleanup included",
    ],
    courseCount: 6,
    presentationNote:
      "Progressive plating with a narrated course-by-course reveal.",
  },
  {
    id: "table-for-two",
    title: "Table for Two Tasting",
    category: "private-chef",
    description:
      "A pared-back private chef evening for two, focused on unhurried pacing and a few perfect plates.",
    startingPrice: null,
    priceUnit: "package",
    badge: null,
    image: "/packages/chef-supper.png",
    inclusions: [
      "Three considered courses",
      "Chef at your table",
      "Simple wine suggestion",
    ],
    dietaryOptions: [],
    serviceNotes: ["Chef at your table", "Two guests"],
    courseCount: 3,
    presentationNote: null,
  },
  {
    id: "weekday-table",
    title: "Balanced Weekday Table",
    category: "weekly-prep",
    description:
      "A repeatable weekly rhythm of balanced, ready-to-heat meals designed around your household's preferences and portions.",
    startingPrice: 180,
    priceUnit: "week",
    badge: "Popular",
    image: "/packages/weekday-table.png",
    inclusions: [
      "10 chef-prepared meals per week",
      "Rotating seasonal menu",
      "Fresh, locally sourced ingredients",
      "Weekly delivery to your door",
    ],
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    serviceNotes: [
      "Drop-off & delivery",
      "Flexible weekly scheduling",
      "Recyclable, labeled containers",
    ],
    courseCount: null,
    presentationNote: "Neatly labeled portions with reheating guidance.",
  },
  {
    id: "gathered-bites",
    title: "Gathered Bites Board",
    category: "platters",
    description:
      "An abundant grazing board of cheeses, charcuterie, seasonal fruit, and house dips — ready to set out and share.",
    startingPrice: 85,
    priceUnit: "package",
    badge: null,
    image: "/packages/gathered-bites.png",
    inclusions: [
      "Serves 8–10 guests",
      "Artisan cheese & charcuterie",
      "Seasonal fruit & house dips",
      "Delivered ready to display",
    ],
    dietaryOptions: ["Vegetarian", "Nut-Free"],
    serviceNotes: ["Drop-off & delivery", "Disposable board optional"],
    courseCount: null,
    presentationNote:
      "Overflowing wood board styled with fresh herbs and edible flowers.",
  },
  {
    id: "small-bites-canapes",
    title: "Small Bites Canapé Selection",
    category: "platters",
    description:
      "A curated run of passed or displayed canapés for receptions and welcomes, priced by the dozen.",
    startingPrice: 36,
    priceUnit: "package",
    badge: "Popular",
    image: "/packages/gathered-bites.png",
    inclusions: [
      "Choice of 6 canapé styles",
      "Minimum 3 dozen",
      "Cold & warm options",
    ],
    dietaryOptions: ["Vegetarian", "Gluten-Free", "Halal"],
    serviceNotes: ["Drop-off or passed service"],
    courseCount: null,
    presentationNote: "Uniform bite-size plating on slate trays.",
  },
]

export function priceUnitLabel(unit: Package["priceUnit"]): string {
  switch (unit) {
    case "person":
      return "/ person"
    case "week":
      return "/ week"
    case "package":
      return "Per Package"
  }
}

export function formatStartingPrice(pkg: Package): string {
  if (pkg.startingPrice == null) return "Custom quote"
  if (pkg.priceUnit === "package") return `From $${pkg.startingPrice} · Per Package`
  return `From $${pkg.startingPrice} ${priceUnitLabel(pkg.priceUnit)}`
}
