import FlexContainer from '../atoms/containers/FlexContainer';
import Text from '../atoms/Typography/Text';

export const EmptyMessage = () => {
  return (
    <FlexContainer
      direction="col"
      align="center"
      justify="center"
      className="rounded-[28px] border border-dashed border-gray-200 bg-white/85 px-6 py-16 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-md"
    >
      <Text size={20} weight={600} color="dark" className="text-center">
        No products found
      </Text>

      <Text size={14} weight={400} color="muted" className="mt-2 text-center">
        Try changing your search text or category filter.
      </Text>
    </FlexContainer>
  );
};