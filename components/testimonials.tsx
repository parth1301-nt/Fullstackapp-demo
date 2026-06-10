import { Star, Quote } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Founder',
    company: 'TechStart Inc.',
    content: 'This platform made it incredibly easy to set up our multi-tenant SaaS. The subdomain system is flawless and the emoji identity feature adds a nice personal touch.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Digital Solutions',
    content: 'We launched our customer portal in minutes. The instant setup and clean interface exceeded our expectations. Highly recommended for any startup.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Developer',
    company: 'CloudScale',
    content: 'As a developer, I appreciate the clean codebase and the multi-tenant architecture. It\'s production-ready and scales beautifully as our user base grows.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'CEO',
    company: 'Innovate Labs',
    content: 'The custom subdomain feature is a game-changer for our brand. Our clients love having their own dedicated spaces. This platform delivers on every promise.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Marketing Director',
    company: 'GrowthHub',
    content: 'We needed a quick solution for our campaign landing pages. This platform delivered exactly what we needed with zero friction. Amazing experience!',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'CTO',
    company: 'NextGen Tech',
    content: 'The technical foundation is solid. Multi-tenant isolation works perfectly, and the performance is excellent. This is how SaaS platforms should be built.',
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full hover:-translate-y-0.5 hover:shadow-md motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-reduce:hover:translate-y-0">
      <CardHeader>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="size-4 fill-primary text-primary"
              aria-hidden
            />
          ))}
        </div>
        <Quote className="size-8 text-primary/20 mb-2" aria-hidden />
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          {testimonial.content}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by developers and founders
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See what our users are saying about their experience with the platform.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsCompact() {
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            What our users say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Trusted by teams worldwide
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {featuredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
