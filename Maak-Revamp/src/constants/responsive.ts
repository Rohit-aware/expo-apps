import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const [shortDimension, longDimension] = SCREEN_WIDTH < SCREEN_HEIGHT ? [SCREEN_WIDTH, SCREEN_HEIGHT] : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => shortDimension / guidelineBaseWidth * size;
const verticalScale = (size: number) => longDimension / guidelineBaseHeight * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export default moderateScale;
export { verticalScale, SCREEN_WIDTH, SCREEN_HEIGHT }