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
      className="glass-panel relative overflow-hidden p-8 transition-all duration-500 hover:shadow-[0_24px_80px_rgba(37,99,235,0.10)]"
    >
      <FlexContainer
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at top right, rgba(37, 99, 235, 0.12), transparent 30%), radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.08), transparent 25%)`,
        }}
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