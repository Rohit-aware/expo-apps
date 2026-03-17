export const Typography = {
  notoSansRegular: 'NotoSansRegular',
  notoSansMedium: 'NotoSansMedium',
  notoSansSemiBold: 'NotoSansSemiBold',
  notoSansBold: 'NotoSansBold',
  notoSansExtraBold: 'NotoSansExtraBold',
} as const;

export type TypographyType = typeof Typography;
export default Typography;