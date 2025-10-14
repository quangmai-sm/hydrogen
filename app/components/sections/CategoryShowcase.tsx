import { Link } from 'react-router';
import { Section } from '~/components/layout/Section';

interface Category {
  title: string;
  handle: string;
  image: string;
  imageAlt?: string;
}

interface CategoryShowcaseProps {
  categories: Category[];
  className?: string;
}

export function CategoryShowcase({ categories, className = '' }: CategoryShowcaseProps) {
  return (
    <Section variant="mila" className={className}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.handle}
            to={`/collections/${category.handle}`}
            className="group relative overflow-hidden rounded-sm"
          >
            <div className="aspect-square w-full">
              <img
                src={category.image}
                alt={category.imageAlt || category.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <h3 className="text-2xl font-medium text-white">
                  {category.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
