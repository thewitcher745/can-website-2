import { useCategory, useMonthYear } from "@src/domains/results/context";
import { useCategoriesForMonthYear } from "@src/domains/results/hooks";
import { Category } from "@src/domains/results/types";
import { Lightbulb, Code2 } from "lucide-react";

const CategorySelector = () => {
  const { currentMonthYear } = useMonthYear();
  const { data: availableCategories } =
    useCategoriesForMonthYear(currentMonthYear);
  const { category, setCategory } = useCategory();

  const CategorySelectorButton = ({
    text,
    id,
    icon: Icon,
  }: {
    text: string;
    id: Category;
    icon: React.ElementType;
  }) => {
    const isActive = category === id;

    return (
      <button
        onClick={() => setCategory(id)}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-base
          transition-all duration-200 ease-in-out
          ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-text-muted hover:text-text-main hover:bg-surface"
          }
          focus:outline-none focus:ring-2 focus:ring-primary/20
        `}
      >
        <Icon size={20} />
        <span>{text}</span>
      </button>
    );
  };

  const InsightsSelector = (
    <CategorySelectorButton text="Insights" id="insights" icon={Lightbulb} />
  );
  const AlgorithmSelector = (
    <CategorySelectorButton text="Algorithm" id="algorithm" icon={Code2} />
  );

  return (
    <div className="flex items-center gap-2 mb-8 bg-surface/50 rounded-lg p-1 w-fit mx-auto">
      {availableCategories.includes("insights") ? InsightsSelector : null}
      {availableCategories.includes("algorithm") ? AlgorithmSelector : null}
    </div>
  );
};

export default CategorySelector;
