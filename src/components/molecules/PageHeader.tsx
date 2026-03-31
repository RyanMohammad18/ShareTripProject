import Badge from "../atoms/Badge/Badge";
import Title from "../atoms/Typography/Title";
import FlexContainer from "../atoms/containers/FlexContainer";
import Section from "../atoms/section/Section";
import Text from '../atoms/Typography/Text';

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

const PageHeader = ({ badge, title, subtitle }: PageHeaderProps) => {
  return (
    <Section
      as="header"
      className="relative overflow-hidden rounded-[28px] border border-gray-200/80 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_24px_80px_rgba(99,102,241,0.10)]"
    >
      <FlexContainer
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.08),transparent_25%)]"
      />

      <FlexContainer direction="col" className="relative z-10">
        {badge && (
          <Badge color="primary" className="mb-3">
            {badge}
          </Badge>
        )}

        <Title>{title}</Title>

        {subtitle && (
          <Text size={14} weight={400} lineHeight="relaxed" color="secondary" className="mt-3 max-w-2xl sm:text-base">
            {subtitle}
          </Text>
        )}
      </FlexContainer>
    </Section>
  );
};

export default PageHeader;